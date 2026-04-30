window.AsUI={
 menu:['Главная','Поиск','Каталог','Библиотека','Источники','Настройки'],
 history:[],
 state:{screen:'Главная'},
 lastBackAt:0,
 icons:{
  'Главная':'M3 11.5 12 4l9 7.5V21a1 1 0 0 1-1 1h-6v-6H8v6H4a1 1 0 0 1-1-1v-9.5Z',
  'Поиск':'M10.5 18a7.5 7.5 0 1 1 5.3-12.8A7.5 7.5 0 0 1 10.5 18Zm5.1-2.4L21 21',
  'Каталог':'M4 5h7v7H4V5Zm9 0h7v7h-7V5ZM4 14h7v6H4v-6Zm9 0h7v6h-7v-6Z',
  'Библиотека':'M6 4h10a2 2 0 0 1 2 2v15l-6-3-6 3V6a2 2 0 0 1 2-2Z',
  'Источники':'M12 5v14M5 8h14M5 16h14M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z',
  'Настройки':'M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0-5v3m0 12v3M4.9 4.9 7 7m10 10 2.1 2.1M3 12h3m12 0h3M4.9 19.1 7 17m10-10 2.1-2.1'
 },
 escape(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;').replace(/'/g,'&#39;')},
 icon(name){const p=this.icons[name]||'M4 6h16M4 12h16M4 18h16';return '<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="'+p+'"/></svg>'},
 renderMenu(){
  const m=document.getElementById('menu');if(!m)return;
  m.innerHTML='<div class="brand"><span class="brand-mark">A</span><span>Asgard</span></div><nav class="nav-list">'+this.menu.map(x=>'<div tabindex="0" class="nav-item focusable '+(x===this.state.screen?'active':'')+'" onclick="AsUI.nav(\''+x+'\')">'+this.icon(x)+'<span>'+this.escape(x)+'</span></div>').join('')+'</nav><div class="nav-note">Experimental screens moved to Settings · Legal user sources only</div>';
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
  if(now-this.lastBackAt<1800){const b=window.AsgardBridge;if(b&&b.showToast)b.showToast(msg);else this.toast(msg);return true;}
  this.lastBackAt=now;
  const b=window.AsgardBridge;if(b&&b.showToast)b.showToast(msg);else this.toast(msg);
  return true;
 },
 toast(t){const n=document.createElement('div');n.className='toast';n.textContent=t;document.body.appendChild(n);setTimeout(()=>n.remove(),1800)},
 hero(t,d){return '<section class="hero"><h1>'+this.escape(t)+'</h1><p class="muted">'+this.escape(d)+'</p></section>'},
 card(t,d,b,actions){return '<div tabindex="0" class="card focusable"><div class="poster"></div><h3>'+this.escape(t)+'</h3><p class="muted">'+this.escape(d)+'</p>'+(b?'<span class="badge">'+this.escape(b)+'</span>':'')+(actions||'')+'</div>'}
};
window.asgardBack=function(){return AsUI.back()};
