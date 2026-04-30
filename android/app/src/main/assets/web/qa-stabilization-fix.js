(function(){
  function esc(v){return AsUI.escape(v)}
  function chip(v){return '<span class="chip">'+esc(v)+'</span>'}
  function js(v){return JSON.stringify(String(v||''))}
  function btn(label,action,cls){return '<button class="btn focusable '+(cls||'')+'" onclick="'+action+'">'+label+'</button>'}
  function getQuery(){const a=document.getElementById('realSourceQuery');const b=document.getElementById('q');return ((a&&a.value)||(b&&b.value)||'').trim()}
  function sizeLabel(v){const n=Number(v||0);if(!n)return '';if(n>=1073741824)return (n/1073741824).toFixed(2)+' GB';if(n>=1048576)return (n/1048576).toFixed(1)+' MB';if(n>=1024)return (n/1024).toFixed(1)+' KB';return String(n)}
  window.AsQaFix={
    sourceResults:[],sourceReports:[],lastQuery:'',
    show(i){const r=this.sourceResults[i];if(!r)return;alert(JSON.stringify({title:r.title,source:r.sourceName,type:r.type,sourceType:r.sourceType,classification:r.classification,url:r.url||'',magnetUrl:r.magnetUrl?'present':'missing',torrentUrl:r.torrentUrl||'',seeders:r.seeders,peers:r.peers,size:r.size,quality:r.quality,rightsStatus:r.rightsStatus,requiresUserConfirmation:r.requiresUserConfirmation},null,2))},
    showReport(i){const r=this.sourceReports[i];if(!r)return;alert(JSON.stringify(r,null,2))},
    play(i){const r=this.sourceResults[i];if(!r||!r.url)return;if(window.AsgardBridge&&AsgardBridge.openPlayer)AsgardBridge.openPlayer(r.url,r.title||'Source video',0);else window.open(r.url,'_blank')},
    open(i){const r=this.sourceResults[i];if(!r||!r.url)return;if(window.AsgardBridge&&AsgardBridge.openExternalUrl)AsgardBridge.openExternalUrl(r.url);else window.open(r.url,'_blank')},
    async addToTorrServer(i){const r=this.sourceResults[i];if(!r)return;const out=window.AsParserSettings&&AsParserSettings.addToTorrServer?await AsParserSettings.addToTorrServer(r):{ok:false,status:'torrserver_settings_unavailable'};alert(JSON.stringify(out,null,2))}
  };
  function patch(){
    if(!window.AsApp||!window.AsSources||!window.AsStore||!window.AsUI){setTimeout(patch,100);return;}
    const oldDetails=AsApp.details&&AsApp.details.bind(AsApp);
    if(oldDetails&&!AsApp.__asgardDetailsBackPatched){
      AsApp.__asgardDetailsBackPatched=true;
      AsApp.details=function(id){if(window.AsNav&&AsUI.state.screen!=='Детали')AsNav.push('Детали');else AsUI.state.screen='Детали';oldDetails(id);};
    }
    AsApp.search=function(){
      const srcCount=AsSources.parse(AsStore.readSources()).filter(s=>s.ok&&s.enabled).length;
      const active=window.AsParserManager&&AsParserManager.getActiveParser?AsParserManager.getActiveParser():null;
      AsApp.shell('Поиск через Parser / Sources','Ищет по Open Demo Catalog и enabled user sources. Ошибки источников показываются отдельно и не ломают экран.','<div class="warn"><b>User Source / Unknown Rights:</b> результаты из пользовательских источников требуют проверки прав. Для torrent/magnet нужна отдельная отправка в TorrServer с подтверждением.</div><div class="search-box"><input class="focusable" id="realSourceQuery" placeholder="Название фильма / сериала / ключевое слово"><button class="btn focusable" onclick="AsApp.doSearch()">Искать</button><button class="btn secondary focusable" onclick="window.AsParserSettings?AsParserSettings.render():AsUI.nav(\'Настройки\')">Parser & TorrServer</button></div><div class="panel"><h2>Активные источники: '+srcCount+'</h2><p class="muted">Active parser: '+esc(active&&active.name||'auto')+'. Настройка: Settings → Parser & TorrServer.</p></div><div id="results"><div class="panel"><h2>Введите запрос</h2><p class="muted">Проверка объединяет demo/open каталог и ваши TXT/parser sources.</p></div></div>');
      setTimeout(function(){if(window.AsInput&&AsInput.refresh)AsInput.refresh();},50);
    };
    AsApp.doSearch=async function(){
      const query=getQuery();
      const q=query.toLowerCase();
      const demo=(AsApp.openCatalogData||AsApp.catalog||[]).filter(x=>!q||String((x.t||x.title||'')+' '+(x.g||'')+' '+(x.s||'')+' '+(x.source||'')).toLowerCase().includes(q));
      const out=document.getElementById('results')||document.getElementById('realSourceResults');if(!out)return;
      out.innerHTML='<div class="panel"><h2>Ищу...</h2><p class="muted">Open Demo Catalog + user sources через nativeFetch где доступно.</p></div>';
      let report={results:[],reports:[],summary:{}};
      try{report=await AsSources.searchContent(query)}catch(e){report={results:[],reports:[{ok:false,source:'AsSources',status:'exception',error:e.message||String(e)}],summary:{}}}
      AsQaFix.lastQuery=query;
      AsQaFix.sourceResults=report.results||[];
      AsQaFix.sourceReports=report.reports||[];
      const demoCards=demo.map(x=>'<article tabindex="0" class="card focusable" onclick="AsApp.details('+js(x.id)+')"><div class="poster"><span>'+esc(x.tag||'Demo')+'</span></div><div class="card-body"><h3>'+esc(x.t||x.title)+'</h3><p class="muted">'+esc((x.y||'')+' · '+(x.g||'')+' · '+(x.ep||''))+'</p>'+chip(x.rights||'Open/Public demo')+'</div></article>').join('');
      const sourceCards=AsQaFix.sourceResults.map((r,i)=>{const canPlay=AsSources.isDirectPlayable(r.type,r.url);const torrentLike=r.classification==='torrent'||r.magnetUrl||r.torrentUrl||AsSources.isMagnet(r.type,r.url)||AsSources.isTorrent(r.type,r.url);let action='';if(canPlay)action+=btn('▶ Смотреть','AsQaFix.play('+i+')');else if(torrentLike)action+=btn('Add to TorrServer','AsQaFix.addToTorrServer('+i+')','secondary');else if(r.url)action+=btn('Открыть ссылку','AsQaFix.open('+i+')','secondary');action+=btn('Diagnostics','AsQaFix.show('+i+')','secondary');return '<div tabindex="0" class="source-row focusable"><h3>'+esc(r.title||r.sourceName||'Source result')+'</h3><p>'+chip(r.classification||r.type||'source')+chip(r.sourceName||'source')+chip(r.rightsStatus||'User Source / Unknown Rights')+(r.quality?chip(r.quality):'')+(r.size?chip(sizeLabel(r.size)):'')+(r.seeders!==undefined?chip('S '+r.seeders):'')+(r.peers!==undefined?chip('P '+r.peers):'')+'</p><p class="muted">'+esc(r.description||'')+'</p><p class="muted">'+esc(r.magnetUrl||r.torrentUrl||r.url||'')+'</p>'+action+'</div>'}).join('');
      const errors=(report.reports||[]).filter(r=>!r.ok).map((r,i)=>({index:i,source:r.source,type:r.type,status:r.status,error:r.error,elapsedMs:r.elapsedMs,attempts:r.attempts||(r.diagnostics&&r.diagnostics.attempts)||[]}));
      const s=report.summary||AsSources.summarize(AsQaFix.sourceResults);
      const errorHtml=errors.length?'<pre>'+esc(JSON.stringify(errors.map(e=>({source:e.source,status:e.status,error:e.error,attempts:e.attempts.length})),null,2))+'</pre>':'';
      out.innerHTML='<div class="panel"><h2>Summary</h2><p>'+chip('query '+(query||'empty'))+chip('demo '+demo.length)+chip('sources '+(report.sourceCount||0))+chip('source results '+AsQaFix.sourceResults.length)+chip('playable '+(s.playable||0))+chip('torrent '+(s.torrent||0))+chip('errors '+errors.length)+'</p>'+errorHtml+'</div>'+(demo.length?'<section class="shelf"><h2>Open Demo Catalog</h2><div class="cards">'+demoCards+'</div></section>':'')+(sourceCards?'<section class="shelf"><h2>User sources</h2>'+sourceCards+'</section>':'')+(!demo.length&&!sourceCards?'<div class="empty"><h2>Ничего не найдено</h2><p>Проверьте enabled=true в Sources и настройки Parser & TorrServer.</p></div>':'');
      AsInput&&AsInput.refresh();
    };
    if(AsUI.state.screen==='Поиск')AsApp.search();
  }
  patch();
})();
