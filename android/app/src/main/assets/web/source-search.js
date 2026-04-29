(function(){
  function esc(v){return AsUI.escape(v)}
  function btn(label,action,cls){return '<button class="btn focusable '+(cls||'')+'" onclick="'+action+'">'+label+'</button>'}
  function chip(v){return '<span class="chip">'+esc(v)+'</span>'}
  let lastResults=[];
  function sizeLabel(v){const n=Number(v||0);if(!n)return '';if(n>1073741824)return (n/1073741824).toFixed(2)+' GB';if(n>1048576)return (n/1048576).toFixed(1)+' MB';return String(n)}
  function resultCard(r,i){
    const playable=AsSources.isDirectPlayable(r.type,r.url);
    const torrentLike=(r.classification==='torrent'||r.magnetUrl||r.torrentUrl||AsSources.isMagnet(r.type,r.url)||AsSources.isTorrent(r.type,r.url));
    const action=playable?btn('▶ Смотреть','AsSourceSearch.play('+i+')'):torrentLike?btn('Add to TorrServer','AsSourceSearch.addToTorrServer('+i+')','secondary'):btn('Открыть ссылку','AsSourceSearch.open('+i+')','secondary');
    return '<div tabindex="0" class="source-row focusable"><h3>'+esc(r.title||r.sourceName)+'</h3><p>'+chip(r.classification||r.type||'source')+chip(r.sourceName||'source')+chip(r.rightsStatus||'User Source / Unknown Rights')+(r.quality?chip(r.quality):'')+(r.size?chip(sizeLabel(r.size)): '')+(r.seeders!==undefined?chip('S '+r.seeders):'')+(r.peers!==undefined?chip('P '+r.peers):'')+(r.pubDate?chip(r.pubDate):'')+'</p><p class="muted">'+esc(r.description||r.url||'')+'</p><p class="muted">'+esc(r.magnetUrl||r.torrentUrl||r.url||'')+'</p>'+action+btn('Diagnostics','AsSourceSearch.diagnostics('+i+')','secondary')+'</div>';
  }
  window.AsSourceSearch={
    async search(){
      const q=(document.getElementById('realSourceQuery')&&document.getElementById('realSourceQuery').value)||'';
      const out=document.getElementById('realSourceResults');
      if(!out)return;
      out.innerHTML='<div class="panel"><h2>Ищу...</h2><p class="muted">Проверяю JacRed/user sources. Один источник не должен ломать общий поиск.</p></div>';
      if(window.AsInput&&AsInput.refresh)AsInput.refresh();
      const report=await AsSources.searchContent(q);
      lastResults=report.results||[];
      const errors=(report.reports||[]).filter(r=>!r.ok);
      const s=report.summary||{};
      out.innerHTML='<div class="panel"><h2>Результаты</h2><p>'+chip('sources '+report.sourceCount)+chip('ok '+report.reportsOk)+chip('results '+lastResults.length)+chip('playable '+(s.playable||0))+chip('torrent '+(s.torrent||0))+chip('magnet '+(s.magnet||0))+'</p>'+(errors.length?'<pre>'+esc(JSON.stringify(errors.map(e=>({source:e.source,status:e.status,error:e.error,elapsedMs:e.elapsedMs})),null,2))+'</pre>':'')+'</div>'+(lastResults.length?lastResults.map(resultCard).join(''):'<div class="empty"><h2>Ничего не найдено</h2><p>Проверь Settings → Parser & TorrServer, enabled=true для jacred source и диагностику.</p></div>');
      if(window.AsInput&&AsInput.refresh)AsInput.refresh();
    },
    play(i){const r=lastResults[i];if(!r)return;if(window.AsgardBridge&&AsgardBridge.openPlayer){AsgardBridge.openPlayer(r.url,r.title||r.sourceName||'User source',0)}else{window.open(r.url,'_blank')}},
    async addToTorrServer(i){const r=lastResults[i];if(!r)return;const out=await AsParserSettings.addToTorrServer(r);alert(JSON.stringify(out,null,2));},
    diagnostics(i){const r=lastResults[i];if(!r)return;alert(JSON.stringify({title:r.title,source:r.sourceName,type:r.sourceType,classification:r.classification,size:r.size,seeders:r.seeders,peers:r.peers,magnetUrl:r.magnetUrl?'present':'missing',torrentUrl:r.torrentUrl||r.url||'',rightsStatus:r.rightsStatus,requiresUserConfirmation:r.requiresUserConfirmation},null,2));},
    open(i){const r=lastResults[i];if(!r)return;if(window.AsgardBridge&&AsgardBridge.openExternalUrl)AsgardBridge.openExternalUrl(r.url);else window.open(r.url,'_blank')}
  };
  function patch(){
    if(!window.AsApp||!window.AsUI){setTimeout(patch,100);return;}
    AsApp.search=function(){
      const srcCount=AsSources.parse(AsStore.readSources()).filter(s=>s.ok&&s.enabled).length;
      AsApp.shell('Поиск через JacRed / Sources','Ищет по user-configured JacRed/Torznab parser и другим enabled sources. Результаты torrent/magnet требуют подтверждения перед отправкой в TorrServer.','<div class="warn"><b>User confirmation required:</b> перед отправкой результата в TorrServer подтвердите, что у вас есть право доступа к контенту.</div><div class="search-box"><input class="focusable" id="realSourceQuery" placeholder="Название фильма / сериала / ключевое слово"><button class="btn focusable" onclick="AsSourceSearch.search()">Искать</button><button class="btn secondary focusable" onclick="AsParserSettings.render()">Parser & TorrServer</button></div><div class="panel"><h2>Активные источники: '+srcCount+'</h2><p class="muted">Для JacRed добавьте source type jacred и настройте URL/API key в Settings → Parser & TorrServer.</p></div><div id="realSourceResults"></div>');
      setTimeout(function(){if(window.AsInput&&AsInput.refresh)AsInput.refresh();},50);
    };
    if(AsUI.state.screen==='Поиск')AsApp.search();
  }
  patch();
})();
