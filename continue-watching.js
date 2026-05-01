(function(){
  function esc(v){return AsUI.escape(v)}
  function chip(v){return '<span class="chip">'+esc(v)+'</span>'}
  function btn(label,action,cls){return '<button class="btn focusable '+(cls||'')+'" onclick="'+action+'">'+esc(label)+'</button>'}
  function catalog(){return (AsApp.openCatalogData||AsApp.catalog||[]).filter(x=>x&&x.id)}
  function progress(){try{return AsStore.progress?AsStore.progress():[]}catch(e){return []}}
  function pct(p){const d=Number(p.duration||0);const pos=Number(p.position||0);if(!d||d<=0)return 0;return Math.max(0,Math.min(99,Math.round(pos/d*100)))}
  function time(ms){ms=Number(ms||0);if(!ms)return '0:00';const t=Math.floor(ms/1000);const h=Math.floor(t/3600);const m=Math.floor((t%3600)/60);const s=t%60;return h?h+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0'):m+':'+String(s).padStart(2,'0')}
  function metaFor(p){const c=catalog();const id=String(p.itemId||p.id||'');const title=String(p.title||'').toLowerCase();return c.find(x=>String(x.id)===id)||c.find(x=>String(x.title||x.t||'').toLowerCase()===title)||null}
  function items(){return progress().filter(p=>pct(p)>0&&pct(p)<96).sort((a,b)=>Number(b.updatedAt||0)-Number(a.updatedAt||0)).map((p,i)=>{const m=metaFor(p)||{};return {id:p.itemId||m.id||('progress_'+i),title:p.title||m.title||m.t||'Saved video',url:m.url||p.url||'',position:Number(p.position||0),duration:Number(p.duration||0),updatedAt:p.updatedAt||0,percent:pct(p),art:m.art||('art'+((i%6)+1)),meta:m,progress:p}})}
  function open(url,title,pos,itemId){if(!url){AsUI.toast('No playable URL for this saved item');return;}if(window.AsgardBridge&&AsgardBridge.openPlayer){try{AsgardBridge.openPlayer(url,title||'Continue watching',Number(pos||0),itemId||title||url)}catch(e){AsgardBridge.openPlayer(url,title||'Continue watching',Number(pos||0))}}else window.open(url,'_blank')}
  function card(x){return '<article tabindex="0" class="card focusable continue-card"><div class="poster '+esc(x.art)+'"><span>Continue</span></div><div class="card-body"><h3>'+esc(x.title)+'</h3><p class="muted">'+esc(time(x.position)+' / '+time(x.duration))+'</p><div class="progress-line"><i style="width:'+x.percent+'%"></i></div><p class="muted progress-label">'+x.percent+'% watched</p><div class="mini-actions">'+btn('▶ Resume','AsContinueWatching.resume(\''+esc(x.id)+'\')')+btn('Start over','AsContinueWatching.startOver(\''+esc(x.id)+'\')','secondary')+btn('Remove','AsContinueWatching.remove(\''+esc(x.id)+'\')','danger')+btn('Info','AsContinueWatching.diag(\''+esc(x.id)+'\')','secondary')+'</div></div></article>'}
  function shelf(){const list=items();if(!list.length)return '<section class="shelf"><div class="shelf-head"><h2>Continue Watching</h2><span>0 titles</span></div><div class="empty state-card"><h2>No saved progress yet</h2><p>Start a demo video, exit the native player, then saved progress should appear here.</p><div class="source-actions">'+btn('Open Catalog','AsUI.nav(\'Каталог\')')+btn('Search','AsUI.nav(\'Поиск\')','secondary')+'</div></div></section>';return '<section class="shelf"><div class="shelf-head"><h2>Continue Watching</h2><span>'+list.length+' titles</span></div><div class="cards">'+list.map(card).join('')+'</div></section>'}
  function replaceShelf(){const shelves=[...document.querySelectorAll('.shelf')];const target=shelves.find(s=>/Continue Watching/i.test(s.textContent||''));if(target){target.outerHTML=shelf();AsInput&&AsInput.refresh&&AsInput.refresh();return true}return false}
  window.AsContinueWatching={
    items:items,
    renderShelf:shelf,
    patchHome(){setTimeout(()=>replaceShelf(),80)},
    resume(id){const x=items().find(i=>String(i.id)===String(id));if(!x){AsUI.toast('Progress item not found');return;}open(x.url,x.title,x.position,x.id)},
    startOver(id){const x=items().find(i=>String(i.id)===String(id));if(!x){AsUI.toast('Progress item not found');return;}open(x.url,x.title,0,x.id)},
    remove(id){const b=window.AsgardBridge;if(b&&b.removeWatchProgress){b.removeWatchProgress(id)}else{const next=progress().filter(p=>String(p.itemId||p.id)!==String(id));localStorage.setItem('watch_progress',JSON.stringify(next))}AsUI.toast('Removed from Continue Watching');if(AsUI.state.screen==='Главная')AsApp.home();},
    diag(id){const x=items().find(i=>String(i.id)===String(id));alert(JSON.stringify(x||{error:'not found',id:id},null,2))}
  };
  function boot(){if(!window.AsApp||!window.AsUI||!window.AsStore){setTimeout(boot,100);return;}if(AsApp.__continueWatchingPatch)return;AsApp.__continueWatchingPatch=true;const oldHome=AsApp.home&&AsApp.home.bind(AsApp);AsApp.home=function(){oldHome&&oldHome();AsContinueWatching.patchHome()};if(AsUI.state&&AsUI.state.screen==='Главная')AsApp.home()}
  boot();
})();
