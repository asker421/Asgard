(function(){
  function esc(v){return AsUI.escape(v)}
  function chip(v){return '<span class="chip">'+esc(v)+'</span>'}
  function btn(label,action,cls){return '<button class="btn focusable '+(cls||'')+'" onclick="'+action+'">'+label+'</button>'}
  function demoBadge(){return '<div class="warn"><b>Demo / Not fully implemented:</b> этот экран пока частично mock и будет дорабатываться.</div>'}
  function sourceSummary(list){return {total:list.length,valid:list.filter(x=>x.ok).length,invalid:list.filter(x=>!x.ok).length,enabled:list.filter(x=>x.ok&&x.enabled).length}}
  function openNativePlayer(item){
    const url=item&&item.url;
    if(window.AsgardBridge&&AsgardBridge.openPlayer&&url){AsgardBridge.openPlayer(url,item.t||item.title||'Asgard TV',0);return true}
    return false;
  }
  function patch(){
    if(!window.AsApp||!window.AsUI||!window.AsSources||!window.AsStore){setTimeout(patch,100);return;}
    const oldPlayer=AsApp.player&&AsApp.player.bind(AsApp);
    AsApp.play=function(itemOrId){
      const list=AsApp.openCatalogData||AsApp.catalog||[];
      const item=typeof itemOrId==='string'?list.find(x=>x.id===itemOrId):itemOrId;
      const media=item||list[0]||{title:'Demo video',url:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'};
      if(openNativePlayer(media))return;
      if(oldPlayer&&media.id)oldPlayer(media.id);else AsApp.toast('Player is available only in Android APK');
    };
    AsApp.player=function(id){
      if(oldPlayer){oldPlayer(id);const p=document.querySelector('.page');if(p)p.insertAdjacentHTML('afterbegin',demoBadge());}
    };
    const oldAi=AsApp.ai&&AsApp.ai.bind(AsApp);AsApp.ai=function(){oldAi&&oldAi();const p=document.querySelector('.page');if(p)p.insertAdjacentHTML('afterbegin',demoBadge())};
    const oldQr=AsApp.qr&&AsApp.qr.bind(AsApp);AsApp.qr=function(){oldQr&&oldQr();const p=document.querySelector('.page');if(p)p.insertAdjacentHTML('afterbegin',demoBadge())};
    const oldLibrary=AsApp.library&&AsApp.library.bind(AsApp);AsApp.library=function(){oldLibrary&&oldLibrary();const p=document.querySelector('.page');if(p)p.insertAdjacentHTML('afterbegin',demoBadge())};
    const oldDiagnostics=AsApp.diagnostics&&AsApp.diagnostics.bind(AsApp);AsApp.diagnostics=function(){oldDiagnostics&&oldDiagnostics();const p=document.querySelector('.page');if(p&&!document.querySelector('.source-row'))p.insertAdjacentHTML('afterbegin',demoBadge())};
    const oldSettings=AsApp.settings&&AsApp.settings.bind(AsApp);AsApp.settings=function(){oldSettings&&oldSettings();const p=document.querySelector('.page');if(p)p.insertAdjacentHTML('afterbegin','<div class="warn"><b>Settings:</b> часть настроек активна, часть помечена как roadmap.</div>')};
    AsApp.sources=function(){
      const text=AsStore.readSources()||'';
      AsApp.shell('Источники','TXT configuration: preview, validation, save and reset. Invalid rows are not saved.','<div class="layout2"><div class="panel"><h2>sources.txt</h2><textarea class="focusable" id="sourcesText" rows="14" placeholder="# one source per line">'+esc(text)+'</textarea>'+btn('Preview','AsApp.previewSources()')+btn('Save','AsApp.saveSources()','secondary')+btn('Reset bundled','AsApp.resetSources()','danger')+'</div><div class="panel"><h2>Preview / Summary</h2><pre id="sourcesOut">Press Preview</pre></div></div>');
      setTimeout(()=>AsInput&&AsInput.refresh(),50);
    };
    AsApp.previewSources=function(){const text=document.getElementById('sourcesText').value||'';const list=AsSources.parse(text);const s=sourceSummary(list);document.getElementById('sourcesOut').textContent=JSON.stringify({summary:s,rows:list.map(x=>({row:x.row,name:x.name,type:x.type,enabled:x.enabled,ok:x.ok,error:x.error}))},null,2);AsInput&&AsInput.refresh()};
    AsApp.saveSources=function(){const text=document.getElementById('sourcesText').value||'';const list=AsSources.parse(text);const invalid=list.filter(x=>!x.ok);const s=sourceSummary(list);if(invalid.length){document.getElementById('sourcesOut').textContent=JSON.stringify({saved:false,summary:s,errors:invalid.map(x=>({row:x.row,line:x.name,error:x.error}))},null,2);return;}AsStore.saveSources(text);document.getElementById('sourcesOut').textContent=JSON.stringify({saved:true,summary:s},null,2);AsApp.toast('Sources saved')};
    AsApp.resetSources=function(){AsStore.resetSources();AsApp.sources()};
    const oldDoSearch=AsApp.doSearch&&AsApp.doSearch.bind(AsApp);
    AsApp.search=function(){
      AsApp.shell('Поиск','Ищет по demo/open catalog и enabled user sources. Ошибки источников показываются отдельно и не ломают поиск.','<div class="search-box"><input class="focusable" id="q" placeholder="Название, жанр, источник"><button class="btn focusable" onclick="AsApp.doSearch()">Искать</button><button class="btn focusable secondary" onclick="AsParserSettings&&AsParserSettings.render&&AsParserSettings.render()">Parser & TorrServer</button></div><div id="results"><div class="panel"><h2>Введите запрос</h2><p class="muted">Поиск объединяет demo catalog + user sources.</p></div></div>');
      setTimeout(()=>AsInput&&AsInput.refresh(),50);
    };
    AsApp.doSearch=async function(){
      const q=(document.getElementById('q')&&document.getElementById('q').value||'').toLowerCase();
      const demo=(AsApp.openCatalogData||AsApp.catalog||[]).filter(x=>!q||String((x.t||x.title||'')+' '+(x.g||'')+' '+(x.s||'')).toLowerCase().includes(q));
      const demoCards=demo.map((x,i)=>'<article tabindex="0" class="card focusable" onclick="AsApp.details(\''+esc(x.id)+'\')"><div class="poster"><span>Demo</span></div><div class="card-body"><h3>'+esc(x.t||x.title)+'</h3><p class="muted">'+esc((x.y||'')+' · '+(x.g||''))+'</p>'+chip('Demo catalog')+'</div></article>').join('');
      const out=document.getElementById('results');out.innerHTML='<div class="panel"><h2>Ищу...</h2><p class="muted">Demo catalog + user sources</p></div>';
      let sourceReport={results:[],reports:[],summary:{}};
      try{sourceReport=await AsSources.searchContent(q)}catch(e){sourceReport={results:[],reports:[{ok:false,source:'AsSources',error:e.message,status:'exception'}],summary:{}}}
      const sourceCards=(sourceReport.results||[]).map((r,i)=>'<div tabindex="0" class="source-row focusable"><h3>'+esc(r.title||r.sourceName)+'</h3><p>'+chip(r.classification||r.type||'source')+chip(r.sourceName||'source')+(r.seeders!==undefined?chip('S '+r.seeders):'')+(r.peers!==undefined?chip('P '+r.peers):'')+'</p><p class="muted">'+esc(r.url||r.magnetUrl||r.torrentUrl||'')+'</p>'+(AsSources.isDirectPlayable(r.type,r.url)?btn('▶ Смотреть','AsgardBridge&&AsgardBridge.openPlayer?AsgardBridge.openPlayer(\''+esc(r.url)+'\',\''+esc(r.title||'Source video')+'\',0):window.open(\''+esc(r.url)+'\')'):btn('Diagnostics','alert(JSON.stringify('+JSON.stringify({title:r.title,type:r.type,classification:r.classification,source:r.sourceName}).replace(/'/g,'&apos;')+'))','secondary'))+'</div>').join('');
      const errors=(sourceReport.reports||[]).filter(r=>!r.ok).map(r=>({source:r.source,status:r.status,error:r.error}));
      out.innerHTML='<div class="panel"><h2>Summary</h2><p>'+chip('demo '+demo.length)+chip('source results '+(sourceReport.results||[]).length)+chip('source errors '+errors.length)+'</p>'+(errors.length?'<pre>'+esc(JSON.stringify(errors,null,2))+'</pre>':'')+'</div>'+(demo.length?'<section class="shelf"><h2>Demo catalog</h2><div class="cards">'+demoCards+'</div></section>':'')+(sourceCards?'<section class="shelf"><h2>User sources</h2>'+sourceCards+'</section>':'');
      AsInput&&AsInput.refresh();
    };
    if(AsUI.state.screen==='Источники')AsApp.sources();
  }
  patch();
})();
