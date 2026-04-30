(function(){
  function esc(v){return AsUI.escape(v)}
  function chip(v){return '<span class="chip">'+esc(v)+'</span>'}
  function btn(label,action,cls){return '<button class="btn focusable '+(cls||'')+'" onclick="'+action+'">'+label+'</button>'}
  function getQuery(){const a=document.getElementById('realSourceQuery');const b=document.getElementById('q');return ((a&&a.value)||(b&&b.value)||'').trim()}
  function openDemoItems(){return AsApp.openCatalogData||AsApp.catalog||[]}
  function demoCard(x){return '<article tabindex="0" class="card focusable" onclick="AsApp.details(\''+esc(x.id)+'\')"><div class="poster '+esc(x.art||'')+'"><span>'+esc(x.tag||'Demo')+'</span></div><div class="card-body"><h3>'+esc(x.t||x.title)+'</h3><p class="muted">'+esc((x.y||'')+' · '+(x.g||'')+' · '+(x.ep||''))+'</p>'+chip(x.rights||'Open/Public demo')+'</div></article>'}
  window.AsQaFix={
    sourceResults:[],sourceReports:[],lastQuery:'',lastTorrServerResult:null,
    show(i){const r=this.sourceResults[i];if(!r)return;alert(JSON.stringify({title:r.title,source:r.sourceName,type:r.type,sourceType:r.sourceType,classification:r.classification,url:r.url||'',magnetUrl:r.magnetUrl?'present':'missing',torrentUrl:r.torrentUrl||'',seeders:r.seeders,peers:r.peers,size:r.size,quality:r.quality,rightsStatus:r.rightsStatus,requiresUserConfirmation:r.requiresUserConfirmation},null,2))},
    play(i){const r=this.sourceResults[i];if(!r||!r.url)return;if(window.AsgardBridge&&AsgardBridge.openPlayer)AsgardBridge.openPlayer(r.url,r.title||'Source video',0);else window.open(r.url,'_blank')},
    open(i){const r=this.sourceResults[i];if(!r||!r.url)return;if(window.AsgardBridge&&AsgardBridge.openExternalUrl)AsgardBridge.openExternalUrl(r.url);else window.open(r.url,'_blank')},
    async addToTorrServer(i){const r=this.sourceResults[i];if(!r)return;const out=window.AsParserSettings&&AsParserSettings.addToTorrServer?await AsParserSettings.addToTorrServer(r):{ok:false,status:'torrserver_settings_unavailable'};alert(JSON.stringify(out,null,2))},
    async playViaTorrServer(i){
      const r=this.sourceResults[i];
      if(!r)return;
      const ok=confirm('I confirm I have rights to access this content.');
      if(!ok)return;
      const outEl=document.getElementById('results')||document.getElementById('realSourceResults');
      if(outEl)outEl.insertAdjacentHTML('afterbegin','<div class="panel"><h2>TorrServer</h2><p class="muted">Preparing stream URL...</p></div>');
      const out=await AsTorrServerAdapter.preparePlayableFromResult(r);
      this.lastTorrServerResult=out;
      if(out.ok&&out.streamUrl){
        if(window.AsgardBridge&&AsgardBridge.openPlayer)AsgardBridge.openPlayer(out.streamUrl,r.title||'TorrServer stream',0);
        else window.open(out.streamUrl,'_blank');
        return;
      }
      alert(JSON.stringify(out,null,2));
    }
  };
  function patch(){
    if(!window.AsApp||!window.AsSources||!window.AsStore||!window.AsUI){setTimeout(patch,100);return;}
    if(!AsApp.__asgardDetailsBackPatched){
      const oldDetails=AsApp.details&&AsApp.details.bind(AsApp);
      AsApp.__asgardDetailsBackPatched=true;
      AsApp.details=function(id){
        if(AsUI.state.screen!=='Детали'){
          if(AsUI.state.screen){AsUI.history.push(AsUI.state.screen);if(AsUI.history.length>40)AsUI.history.shift();}
          AsUI.state.screen='Детали';AsUI.renderMenu();
        }
        oldDetails&&oldDetails(id);
      };
    }
    AsApp.search=function(){
      const srcCount=AsSources.parse(AsStore.readSources()).filter(s=>s.ok&&s.enabled).length;
      AsApp.shell('Поиск','Ищет по mock/open catalog и enabled user sources. Ошибки источников показываются отдельно и не ломают экран.','<div class="search-box"><input class="focusable" id="q" placeholder="Название, жанр или источник"><button class="btn focusable" onclick="AsApp.doSearch()">Искать</button></div><div class="panel"><h2>Enabled sources: '+srcCount+'</h2><p class="muted">Search combines local demo catalog and AsSources.searchContent(query). Torrent/magnet playback requires user-configured TorrServer and rights confirmation.</p></div><div id="results"><div class="panel"><h2>Введите запрос</h2><p class="muted">Результаты появятся здесь.</p></div></div>');
      setTimeout(function(){if(window.AsInput&&AsInput.refresh)AsInput.refresh();},50);
    };
    AsApp.doSearch=async function(){
      const query=getQuery();
      const q=query.toLowerCase();
      const demo=openDemoItems().filter(x=>!q||String((x.t||x.title||'')+' '+(x.g||'')+' '+(x.s||'')+' '+(x.tag||'')).toLowerCase().includes(q));
      const out=document.getElementById('results');if(!out)return;
      out.innerHTML='<div class="panel"><h2>Ищу...</h2><p class="muted">Mock catalog + enabled user sources</p></div>';
      let report={sourceCount:0,reportsOk:0,results:[],reports:[],summary:{playable:0,magnet:0,torrent:0,link:0,not_playable:0}};
      try{report=await AsSources.searchContent(query)}catch(e){report={sourceCount:0,reportsOk:0,results:[],reports:[{ok:false,source:'AsSources',status:'exception',error:e.message||String(e)}],summary:{playable:0,magnet:0,torrent:0,link:0,not_playable:0}}}
      AsQaFix.lastQuery=query;
      AsQaFix.sourceResults=report.results||[];
      AsQaFix.sourceReports=report.reports||[];
      const sourceCards=AsQaFix.sourceResults.map((r,i)=>{
        const canPlay=AsSources.isDirectPlayable(r.type,r.url);
        const torrentLike=r.classification==='torrent'||r.magnetUrl||r.torrentUrl||AsSources.isMagnet(r.type,r.url)||AsSources.isTorrent(r.type,r.url);
        let action='';
        if(canPlay)action+=btn('▶ Смотреть','AsQaFix.play('+i+')');
        else if(torrentLike)action+=btn('▶ TorrServer → ExoPlayer','AsQaFix.playViaTorrServer('+i+')','secondary')+btn('Add only','AsQaFix.addToTorrServer('+i+')','secondary');
        else if(r.url)action+=btn('Открыть ссылку','AsQaFix.open('+i+')','secondary');
        action+=btn('Diagnostics','AsQaFix.show('+i+')','secondary');
        return '<div tabindex="0" class="source-row focusable"><h3>'+esc(r.title||r.sourceName||'Source result')+'</h3><p>'+chip(r.classification||r.type||'source')+chip(r.sourceName||'source')+chip(r.rightsStatus||'User Source / Unknown Rights')+(r.seeders!==undefined?chip('S '+r.seeders):'')+(r.peers!==undefined?chip('P '+r.peers):'')+'</p><p class="muted">'+esc(r.url||r.magnetUrl||r.torrentUrl||'')+'</p>'+action+'</div>';
      }).join('');
      const errors=(report.reports||[]).filter(r=>!r.ok).map(r=>({source:r.source,type:r.type,status:r.status,error:r.error}));
      const s=report.summary||{};
      out.innerHTML='<div class="panel"><h2>Summary</h2><p>'+chip('sourceCount '+(report.sourceCount||0))+chip('reportsOk '+(report.reportsOk||0))+chip('total '+(demo.length+AsQaFix.sourceResults.length))+chip('playable '+(s.playable||0))+chip('magnet '+(s.magnet||0))+chip('torrent '+(s.torrent||0))+chip('link '+(s.link||0))+chip('errors '+errors.length)+'</p>'+(errors.length?'<pre>'+esc(JSON.stringify(errors,null,2))+'</pre>':'')+'</div>'+(demo.length?'<section class="shelf"><h2>Mock/Open catalog</h2><div class="cards">'+demo.map(demoCard).join('')+'</div></section>':'')+(sourceCards?'<section class="shelf"><h2>User sources</h2>'+sourceCards+'</section>':'')+(!demo.length&&!sourceCards?'<div class="empty"><h2>Ничего не найдено</h2><p>Проверьте запрос или enabled sources.</p></div>':'');
      AsInput&&AsInput.refresh();
    };
    const oldSettings=AsApp.settings&&AsApp.settings.bind(AsApp);
    AsApp.settings=function(){
      if(oldSettings)oldSettings();
      const p=document.querySelector('.page');
      if(!p||document.getElementById('experimentalSettingsPanel'))return;
      p.insertAdjacentHTML('beforeend','<section class="shelf" id="experimentalSettingsPanel"><div class="shelf-head"><h2>Experimental / Developer</h2><span>moved from top menu</span></div><div class="settings-grid"><div tabindex="0" class="setting-card focusable" onclick="AsUI.nav(\'AI подбор\')"><h3>AI подбор</h3><p class="muted">Demo / Not fully implemented.</p></div><div tabindex="0" class="setting-card focusable" onclick="AsUI.nav(\'QR импорт\')"><h3>QR импорт</h3><p class="muted">Demo / Not fully implemented.</p></div><div tabindex="0" class="setting-card focusable" onclick="AsUI.nav(\'Torrent\')"><h3>Torrent</h3><p class="muted">No P2P engine in APK; TorrServer handoff supported when user-configured.</p></div><div tabindex="0" class="setting-card focusable" onclick="AsUI.nav(\'Player Pro\')"><h3>Player Pro</h3><p class="muted">Web UI placeholder.</p></div><div tabindex="0" class="setting-card focusable" onclick="AsUI.nav(\'Серии\')"><h3>Серии</h3><p class="muted">Tracking placeholder.</p></div><div tabindex="0" class="setting-card focusable" onclick="AsUI.nav(\'Диагностика\')"><h3>Диагностика</h3><p class="muted">Developer checks.</p></div></div></section>');
      AsInput&&AsInput.refresh();
    };
    if(AsUI.state.screen==='Поиск')AsApp.search();
    if(AsUI.state.screen==='Настройки')AsApp.settings();
  }
  patch();
})();
