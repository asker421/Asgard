window.AsUI={
 // Keep this list aligned with android/app/src/main/assets/web/menu.txt.
 // Do not add, remove, rename or reorder menu items without a backlog story.
 menu:['Главная','Каталог','Поиск','AI подбор','Детали','Player Pro','Библиотека','Серии','Источники','Torrent','QR импорт','Диагностика','Обновления','Настройки'],
 history:[],
 state:{screen:'Главная'},
 lastBackAt:0,
 icons:{
  'Главная':'M3 11.5 12 4l9 7.5V21a1 1 0 0 1-1 1h-6v-6H8v6H4a1 1 0 0 1-1-1v-9.5Z',
  'Каталог':'M4 5h7v7H4V5Zm9 0h7v7h-7V5ZM4 14h7v6H4v-6Zm9 0h7v6h-7v-6Z',
  'Поиск':'M10.5 18a7.5 7.5 0 1 1 5.3-12.8A7.5 7.5 0 0 1 10.5 18Zm5.1-2.4L21 21',
  'AI подбор':'M12 3l1.35 4.15L17.5 8.5l-4.15 1.35L12 14l-1.35-4.15L6.5 8.5l4.15-1.35L12 3Zm6 9l.85 2.65L21.5 15.5l-2.65.85L18 19l-.85-2.65-2.65-.85 2.65-.85L18 12ZM5.5 14l.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7.7-2.1Z',
  'Детали':'M12 17v-6M12 7h.01M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z',
  'Player Pro':'M8 5v14l11-7L8 5Zm-3 2v10',
  'Библиотека':'M6 4h10a2 2 0 0 1 2 2v15l-6-3-6 3V6a2 2 0 0 1 2-2Z',
  'Серии':'M7 3v4M17 3v4M4 8h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm2 7h3v3H8v-3Zm5 0h3v3h-3v-3Z',
  'Источники':'M12 5v14M5 8h14M5 16h14M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z',
  'Torrent':'M4 12a8 8 0 0 1 13.65-5.65M20 12A8 8 0 0 1 6.35 17.65M8 6h9V3M16 18H7v3M12 8v4l3 2',
  'QR импорт':'M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm11 1h2v2h-2v-2Zm3 3h2v2h-2v-2Zm-4 0h2v2h-2v-2Zm4-4h2v2h-2v-2Z',
  'Диагностика':'M4 13h4l2-7 4 14 2-7h4M5 5l14 14',
  'Обновления':'M12 3v12m0 0 4-4m-4 4-4-4M5 19h14',
  'Настройки':'M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0-5v3m0 12v3M4.9 4.9 7 7m10 10 2.1 2.1M3 12h3m12 0h3M4.9 19.1 7 17m10-10 2.1-2.1'
 },
 escape(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;').replace(/'/g,'&#39;')},
 icon(name){const p=this.icons[name]||'M4 6h16M4 12h16M4 18h16';return '<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="'+p+'"/></svg>'},
 renderMenu(){
  const m=document.getElementById('menu');if(!m)return;
  m.innerHTML='<div class="brand"><span class="brand-mark">A</span><span>Asgard</span></div><nav class="nav-list">'+this.menu.map(x=>'<div tabindex="0" class="nav-item focusable '+(x===this.state.screen?'active':'')+'" onclick="AsUI.nav(\''+x+'\')">'+this.icon(x)+'<span>'+this.escape(x)+'</span></div>').join('')+'</nav><div class="nav-note">TV-first navigation · D-pad focus · Legal user sources only</div>';
 },
 nav(screen,options){
  options=options||{};
  if(!options.fromBack&&!options.replace&&this.state.screen&&this.state.screen!==screen){this.history.push(this.state.screen);if(this.history.length>40)this.history.shift();}
  this.state.screen=screen;
  this.renderMenu();
  if(window.AsApp&&AsApp.render)AsApp.render();
  setTimeout(()=>window.AsInput&&AsInput.refresh&&AsInput.refresh(),60);
 },
 back(){
  if(this.history.length){const prev=this.history.pop();this.nav(prev,{fromBack:true,replace:true});return true;}
  if(this.state.screen!=='Главная'){this.nav('Главная',{replace:true});return true;}
  const now=Date.now();
  const msg='Press Back again to exit';
  if(now-this.lastBackAt<1800){
    const b=window.AsgardBridge;
    if(b&&b.exitApp)return b.exitApp();
    if(b&&b.showToast)b.showToast(msg);else this.toast(msg);
    return true;
  }
  this.lastBackAt=now;
  const b=window.AsgardBridge;if(b&&b.showToast)b.showToast(msg);else this.toast(msg);
  return true;
 },
 toast(t){const n=document.createElement('div');n.className='toast';n.textContent=t;document.body.appendChild(n);setTimeout(()=>n.remove(),1800)},
 hero(t,d){return '<section class="hero"><h1>'+this.escape(t)+'</h1><p class="muted">'+this.escape(d)+'</p></section>'},
 card(t,d,b,actions){return '<div tabindex="0" class="card focusable"><div class="poster"></div><h3>'+this.escape(t)+'</h3><p class="muted">'+this.escape(d)+'</p>'+(b?'<span class="badge">'+this.escape(b)+'</span>':'')+(actions||'')+'</div>'}
};
window.asgardBack=function(){return AsUI.back()};
