(function(){
  const CORE_MENU=['Главная','Поиск','Каталог','Библиотека','Источники','Настройки'];
  const SETTINGS_MENU=['QR импорт','Диагностика','Обновления','Torrent','Torrent Diagnostics','AI подбор','Player Pro','Серии'];
  const stack=[];
  let patched=false;
  function items(){return Array.from(document.querySelectorAll('.focusable,.btn,input,textarea,select')).filter(function(el){const r=el.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(el).visibility!=='hidden'&&getComputedStyle(el).display!=='none';});}
  function center(r){return {x:r.left+r.width/2,y:r.top+r.height/2};}
  function focusMeaningful(){const preferred=document.querySelector('.hero .btn.focusable,.spotlight .btn.focusable,.search-box input.focusable,.panel .btn.focusable,.card.focusable,.nav-item.active');const target=preferred||items()[0];if(target){target.focus();target.scrollIntoView({block:'nearest',inline:'nearest'});}}
  function spatial(dir){const active=document.activeElement;const list=items();if(!list.length)return; if(!active||!list.includes(active)){focusMeaningful();return;}const ar=active.getBoundingClientRect();const ac=center(ar);let best=null;let bestScore=Infinity;list.forEach(function(el){if(el===active)return;const r=el.getBoundingClientRect();const c=center(r);const dx=c.x-ac.x;const dy=c.y-ac.y;let primary=0;let secondary=0;if(dir==='right'){if(dx<=8)return;primary=dx;secondary=Math.abs(dy);}if(dir==='left'){if(dx>=-8)return;primary=-dx;secondary=Math.abs(dy);}if(dir==='down'){if(dy<=8)return;primary=dy;secondary=Math.abs(dx);}if(dir==='up'){if(dy>=-8)return;primary=-dy;secondary=Math.abs(dx);}const score=primary*primary+secondary*secondary*2;if(score<bestScore){bestScore=score;best=el;}});if(best){best.focus();best.scrollIntoView({block:'nearest',inline:'nearest'});}}
  function renderMenu(){const m=document.getElementById('menu');if(!m)return;const s=AsUI.state.screen;const top=CORE_MENU.map(function(x){return '<div tabindex="0" class="nav-item focusable '+(x===s?'active':'')+'" onclick="AsUI.nav(\''+x+'\')">'+x+'</div>';}).join('');const more=SETTINGS_MENU.map(function(x){return '<div tabindex="0" class="nav-item focusable nav-sub '+(x===s?'active':'')+'" onclick="AsUI.nav(\''+x+'\')">'+x+'</div>';}).join('');m.innerHTML='<div class="brand">Asgard</div>'+top+'<div class="nav-group-title">More / Experimental</div>'+more+'<div class="nav-note">Demo build · Experimental user media</div>';
  }
  function rememberCurrent(nextScreen){if(window.AsUI&&AsUI.state&&AsUI.state.screen&&AsUI.state.screen!==nextScreen){stack.push(AsUI.state.screen);if(stack.length>30)stack.shift();}}
  function setScreen(screenName){if(!window.AsUI||!AsUI.state)return;AsUI.state.screen=screenName;renderMenu();setTimeout(focusMeaningful,60);}
  function pushTransient(screenName){rememberCurrent(screenName);setScreen(screenName);}
  function replaceScreen(screenName){setScreen(screenName);}
  function patchUI(){if(!window.AsUI||patched)return false;patched=true;AsUI.nav=function(x,opts){opts=opts||{};if(!opts.replace)rememberCurrent(x);this.state.screen=x;renderMenu();AsApp.render();setTimeout(focusMeaningful,60);};AsUI.renderMenu=renderMenu;renderMenu();return true;}
  function back(){if(stack.length){const prev=stack.pop();AsUI.state.screen=prev;renderMenu();AsApp.render();setTimeout(focusMeaningful,60);return true;}if(AsUI.state.screen!=='Главная'){AsUI.nav('Главная',{replace:true});return true;}const b=window.AsgardBridge;if(b&&b.showToast)b.showToast('Нажмите Home на пульте для выхода');return true;}
  document.addEventListener('keydown',function(e){if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){spatial(e.key.replace('Arrow','').toLowerCase());e.preventDefault();e.stopPropagation();}else if(e.key==='Backspace'||e.key==='Escape'){back();e.preventDefault();e.stopPropagation();}else if(e.key==='Enter'){const el=document.activeElement;const tag=(el&&el.tagName||'').toUpperCase();if(el&&typeof el.click==='function'&&!['INPUT','TEXTAREA','SELECT'].includes(tag)){el.click();e.preventDefault();e.stopPropagation();}}},true);
  window.asgardBack=back;
  window.AsNav={back:back,push:pushTransient,replace:replaceScreen,focus:focusMeaningful,renderMenu:renderMenu,stack:function(){return stack.slice();}};
  function boot(){if(!patchUI()){setTimeout(boot,100);return;}setTimeout(focusMeaningful,100);}boot();
})();
