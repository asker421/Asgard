(function(){
  function esc(v){return AsUI.escape(v)}
  function btn(label,action,cls){return '<button class="btn focusable '+(cls||'')+'" onclick="'+action+'">'+label+'</button>'}
  function chip(v){return '<span class="chip">'+esc(v)+'</span>'}
  let lastResults=[];
  let lastReport=null;
  function sizeLabel(v){const n=Number(v||0);if(!n)return '';if(n>1073741824)return (n/1073741824).toFixed(2)+' GB';if(n>1048576)return (n/1048576).toFixed(1)+' MB';return String(n)}
  function resultCard(r,i){
    const playable=AsSources.isDirectPlayable(r.type,r.url);
    const torrentLike=(r.classification==='torrent'||r.magnetUrl||r.torrentUrl||AsSources.isMagnet(r.type,r.url)||AsSources.isTorrent(r.type,r.url));
    const action=playable?btn('▶ Смотреть','AsSourceSearch.play('+i+')'):torrentLike?btn('Add to TorrServer','AsSourceSearch.addToTorrServer('+i+')','secondary'):btn('Открыть ссылку','AsSourceSearch.open('+i+')','secondary');
    return '<div tabindex="0" class="source-row focusable"><h3>'+esc(r.title||r.sourceName)+'</h3><p>'+chip(r.classification||r.type||'source')+chip(r.sourceName||'source')+(r.parserName?chip('parser '+r.parserName):'')+chip(r.rightsStatus||'User Source / Unknown Rights')+(r.quality?chip(r.quality):'')+(r.size?chip(sizeLabel(r.size)): '')+(r.seeders!==undefined?chip('S '+r.seeders):'')+(r.peers!==undefined?chip('P '+r.peers):'')+(r.pubDate?chip(r.pubDate):'')+'</p><p class="muted">'+esc(r.description||r.url||'')+'</p><p class="muted">'+esc(r.magnetUrl||r.torrentUrl||r.url||'')+'</p>'+action+btn('Diagnostics','AsSourceSearch.diagnostics('+i+')','secondary')+'</div>';
  }
  async function searchViaActiveParser(query){
    if(!window.AsParserManager||!window.AsJacRedAdapter)return null;
    let parser=await AsParserManager.selectBestParser();
    if(!parser)return null;
    const tried=[];
    for(let loop=0;loop<8;loop++){
      if(!parser||tried.includes(parser.url))break;
      tried.push(parser.url);
      const source={name:parser.name||'Active parser',type:parser.type||'jacred',url:parser.url,enabled:true,ok:true,row:0,notes:'active parser'};
      const report=await AsJacRedAdapter.search(source,query,{settings:{jacredBaseUrl:parser.url,jacredApiKey:parser.apiKey||''}});
      if(report.ok&&Array.isArray(report.results)&&report.results.length){AsParserManager.saveActiveParser(parser);return {parser,report,tried};}
      const retryStatus=['timeout','Timeout','Network/CORS blocked','http_error','parse_or_network_error','api_not_detected','api_detected_empty','empty'];
      if(report.ok&&(!report.results||!report.results.length))return {parser,report,tried};
      parser=await AsParserManager.fallbackToNextParser(parser);
      if(!parser) return {parser:null,report,tried};
    }
    return null;
  }
  window.AsSourceSearch={
    async search(){
      const q=(document.getElementById('realSourceQuery')&&document.getElementById('realSourceQuery').value)||'';
      const out=document.getElementById('realSourceResults');
      if(!out)return;
      out.innerHTML='<div class="panel"><h2>Ищу...</h2><p class="muted">Выбираю рабочий parser, затем проверяю JacRed/user sources. Один источник не должен ломать общий поиск.</p></div>';
      if(window.AsInput&&AsInput.refresh)AsInput.refresh();
      const active=await searchViaActiveParser(q);
      let report=await AsSources.searchContent(q);
      if(active&&active.report){
        const activeResults=(active.report.results||[]).map((r,i)=>Object.assign({parserName:active.parser&&active.parser.name,parserUrl:active.parser&&active.parser.url,sourceName:active.parser&&active.parser.name||r.sourceName},r));
        report.results=[...activeResults,...(report.results||[])];
        report.reports=[Object.assign({activeParser:true,triedParsers:active.tried},active.report),...(report.reports||[])];
        report.summary=AsSources.summarize(report.results);
      }
      lastReport=report;
      lastResults=report.results||[];
      const errors=(report.reports||[]).filter(r=>!r.ok);
      const s=report.summary||{};
      const activeName=active&&active.parser?active.parser.name:'none';
      out.innerHTML='<div class="panel"><h2>Результаты</h2><p>'+chip('active '+activeName)+chip('sources '+report.sourceCount)+chip('ok '+report.reportsOk)+chip('results '+lastResults.length)+chip('playable '+(s.playable||0))+chip('torrent '+(s.torrent||0))+chip('magnet '+(s.magnet||0))+'</p>'+(errors.length?'<pre>'+esc(JSON.stringify(errors.map(e=>({source:e.source,status:e.status,error:e.error,elapsedMs:e.elapsedMs,triedParsers:e.triedParsers})),null,2))+'</pre>':'')+'</div>'+(lastResults.length?lastResults.map(resultCard).join(''):'<div class="empty"><h2>Ничего не найдено</h2><p>Проверь Settings → Parser & TorrServer, enabled=true для parser, и диагностику.</p></div>');
      if(window.AsInput&&AsInput.refresh)AsInput.refresh();
    },
    play(i){const r=lastResults[i];if(!r)return;if(window.AsgardBridge&&AsgardBridge.openPlayer){AsgardBridge.openPlayer(r.url,r.title||r.sourceName||'User source',0)}else{window.open(r.url,'_blank')}},
    async addToTorrServer(i){const r=lastResults[i];if(!r)return;const out=await AsParserSettings.addToTorrServer(r);alert(JSON.stringify(out,null,2));},
    diagnostics(i){const r=lastResults[i];if(!r)return;alert(JSON.stringify({title:r.title,source:r.sourceName,type:r.sourceType,parser:r.parserName||'',classification:r.classification,size:r.size,seeders:r.seeders,peers:r.peers,magnetUrl:r.magnetUrl?'present':'missing',torrentUrl:r.torrentUrl||r.url||'',rightsStatus:r.rightsStatus,requiresUserConfirmation:r.requiresUserConfirmation},null,2));},
    open(i){const r=lastResults[i];if(!r)return;if(window.AsgardBridge&&AsgardBridge.openExternalUrl)AsgardBridge.openExternalUrl(r.url);else window.open(r.url,'_blank')}
  };
  function patch(){
    if(!window.AsApp||!window.AsUI){setTimeout(patch,100);return;}
    AsApp.search=function(){
      const srcCount=AsSources.parse(AsStore.readSources()).filter(s=>s.ok&&s.enabled).length;
      const active=AsParserManager&&AsParserManager.getActiveParser?AsParserManager.getActiveParser():null;
      AsApp.shell('Поиск через Parser / Sources','Ищет через active JacRed/Torznab parser с fallback и по другим enabled sources. Результаты torrent/magnet требуют подтверждения перед отправкой в TorrServer.','<div class="warn"><b>User confirmation required:</b> перед отправкой результата в TorrServer подтвердите, что у вас есть право доступа к контенту.</div><div class="search-box"><input class="focusable" id="realSourceQuery" placeholder="Название фильма / сериала / ключевое слово"><button class="btn focusable" onclick="AsSourceSearch.search()">Искать</button><button class="btn secondary focusable" onclick="AsParserSettings.render()">Parser & TorrServer</button></div><div class="panel"><h2>Активные источники: '+srcCount+'</h2><p class="muted">Active parser: '+esc(active&&active.name||'auto')+'. Для JacRed/Torznab настройте URL/API key в Settings → Parser & TorrServer.</p></div><div id="realSourceResults"></div>');
      setTimeout(function(){if(window.AsInput&&AsInput.refresh)AsInput.refresh();},50);
    };
    if(AsUI.state.screen==='Поиск')AsApp.search();
  }
  patch();
})();
