(function(){
  const FIXED_MENU=['Главная','Каталог','Поиск','AI подбор','Детали','Player Pro','Библиотека','Серии','Источники','Torrent','QR импорт','Диагностика','Обновления','Настройки'];
  const stack=[];
  let patched=false;
  function esc(v){return String(v||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;').replace(/'/g,'&#39;')}
  function iconPath(name){return {
    'Главная':'M3 11.5 12 4l9 7.5V21a1 1 0 0 1-1 1h-6v-6H8v6H4a1 1 0 0 1-1-1v-9.5Z',
    'Каталог':'M4 5h7v7H4V5Zm9 0h7v7h-7V5ZM4 14h7v6H4v-6Zm9 0h7v6h-7v-6Z',
    'Поиск':'M10.5 18a7.5 7.5 0 1 1 5.3-12.8A7.5 7.5 0 0 1 10.5 18Zm5.1-2.4L21 21',
    'AI подбор':'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Zm6 11l.9 2.6L21 17.5l-2.1.9L18 21l-.9-2.6-2.1-.9 2.1-.9L18 14Z',
    'Детали':'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-10v6m0-9h.01',
    'Player Pro':'M6 4l14 8-14 8V4Z',
    'Библиотека':'M6 4h10a2 2 0 0 1 2 2v15l-6-3-6 3V6a2 2 0 0 1 2-2Z',
    'Серии':'M7 3v4M17 3v4M4 8h16M5 5h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm3 7h3v3H8v-3Zm5 0h3v3h-3v-3Z',
    'Источники':'M12 5v14M5 8h14M5 16h14M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z',
    'Torrent':'M4 12a8 8 0 0 1 14.9-4M20 12a8 8 0 0 1-14.9 4M8 8h5v5M16 16h-5v-5',
    'QR импорт':'M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm11 1h2v2h-2v-2Zm3 3h2v2h-2v-2Zm-4 0h2v2h-2v-2Zm4-4h2v2h-2v-2Z',
    'Диагностика':'M4 13h4l2-7 4 14 2-7h4M4 21h16',
    'Обновления':'M12 3v12m0 0 5-5m-5 5-5-5M5 19h14',
    'Настройки':'M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0-5v3m0 12v3M4.9 4.9 7 7m10 10 2.1 2.1M3 12h3m12 0h3M4.9 19.1 7 17m10-10 2.1-2.1'
  }[name]||'M4 6h16M4 12h16M4 18h16'}
  function icon(name){return '<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="'+iconPath(name)+'"/></svg>'}
  function items(){return Array.from(document.querySelectorAll('.focusable,.btn,input,textarea,select')).filter(function(el){const r=el.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(el).visibility!=='hidden'&&getComputedStyle(el).display!=='none';});}
  function center(r){return {x:r.left+r.width/2,y:r.top+r.height/2};}
  function focusMeaningful(){const preferred=document.querySelector('.hero-cta .btn.focusable,.premium-hero .btn.focusable,.hero .btn.focusable,.spotlight .btn.focusable,.search-box input.focusable,.panel .btn.focusable,.card.focusable,.nav-item.active');const target=preferred||items()[0];if(target){target.focus();target.scrollIntoView({block:'nearest',inline:'nearest'});}}
  function spatial(dir){const active=document.activeElement;const list=items();if(!list.length)return; if(!active||!list.includes(active)){focusMeaningful();return;}const ar=active.getBoundingClientRect();const ac=center(ar);let best=null;let bestScore=Infinity;list.forEach(function(el){if(el===active)return;const r=el.getBoundingClientRect();const c=center(r);const dx=c.x-ac.x;const dy=c.y-ac.y;let primary=0;let secondary=0;if(dir==='right'){if(dx<=8)return;primary=dx;secondary=Math.abs(dy);}if(dir==='left'){if(dx>=-8)return;primary=-dx;secondary=Math.abs(dy);}if(dir==='down'){if(dy<=8)return;primary=dy;secondary=Math.abs(dx);}if(dir==='up'){if(dy>=-8)return;primary=-dy;secondary=Math.abs(dx);}const score=primary*primary+secondary*secondary*2;if(score<bestScore){bestScore=score;best=el;}});if(best){best.focus();best.scrollIntoView({block:'nearest',inline:'nearest'});}}
  function renderMenu(){const m=document.getElementById('menu');if(!m||!window.AsUI)return;const s=AsUI.state.screen;const menu=(window.AsUI&&Array.isArray(AsUI.menu)&&AsUI.menu.length?AsUI.menu:FIXED_MENU);m.innerHTML='<div class="brand"><span class="brand-mark">A</span><span>Asgard</span></div><nav class="nav-list">'+menu.map(function(x){return '<div tabindex="0" class="nav-item focusable '+(x===s?'active':'')+'" onclick="AsUI.nav(\''+x+'\')">'+icon(x)+'<span>'+esc(x)+'</span></div>';}).join('')+'</nav><div class="nav-note">User-controlled sources · Android TV build</div>';
  }
  function rememberCurrent(nextScreen){if(window.AsUI&&AsUI.state&&AsUI.state.screen&&AsUI.state.screen!==nextScreen){stack.push(AsUI.state.screen);if(stack.length>30)stack.shift();}}
  function setScreen(screenName){if(!window.AsUI||!AsUI.state)return;AsUI.state.screen=screenName;renderMenu();setTimeout(focusMeaningful,60);}
  function pushTransient(screenName){rememberCurrent(screenName);setScreen(screenName);}
  function replaceScreen(screenName){setScreen(screenName);}
  function patchUI(){if(!window.AsUI||patched)return false;patched=true;AsUI.menu=FIXED_MENU.slice();AsUI.nav=function(x,opts){opts=opts||{};if(!opts.replace)rememberCurrent(x);this.state.screen=x;renderMenu();AsApp.render();setTimeout(focusMeaningful,60);};AsUI.renderMenu=renderMenu;renderMenu();return true;}
  function back(){if(stack.length){const prev=stack.pop();AsUI.state.screen=prev;renderMenu();AsApp.render();setTimeout(focusMeaningful,60);return true;}if(AsUI.state.screen!=='Главная'){AsUI.nav('Главная',{replace:true});return true;}const b=window.AsgardBridge;if(b&&b.showToast)b.showToast('Нажмите Home на пульте для выхода');return true;}
  document.addEventListener('keydown',function(e){if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){spatial(e.key.replace('Arrow','').toLowerCase());e.preventDefault();e.stopPropagation();}else if(e.key==='Backspace'||e.key==='Escape'){back();e.preventDefault();e.stopPropagation();}else if(e.key==='Enter'){const el=document.activeElement;const tag=(el&&el.tagName||'').toUpperCase();if(el&&typeof el.click==='function'&&!['INPUT','TEXTAREA','SELECT'].includes(tag)){el.click();e.preventDefault();e.stopPropagation();}}},true);
  window.asgardBack=back;
  window.AsNav={back:back,push:pushTransient,replace:replaceScreen,focus:focusMeaningful,renderMenu:renderMenu,stack:function(){return stack.slice();},menu:FIXED_MENU.slice()};
  function boot(){if(!patchUI()){setTimeout(boot,100);return;}setTimeout(focusMeaningful,100);}boot();
})();
