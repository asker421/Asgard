(function(){
  function focusMeaningful(){
    const preferred=document.querySelector('.hero-cta .btn.focusable,.premium-hero .btn.focusable,.hero .btn.focusable,.spotlight .btn.focusable,.search-box input.focusable,.panel .btn.focusable,.card.focusable,.nav-item.active');
    const list=window.AsInput&&AsInput.items&&AsInput.items.length?AsInput.items:Array.from(document.querySelectorAll('.focusable,.btn,input,textarea,select,button,[tabindex]'));
    const target=preferred||list.find(function(el){const r=el.getBoundingClientRect();return r.width>0&&r.height>0;});
    if(target){target.focus({preventScroll:true});target.scrollIntoView({block:'nearest',inline:'nearest',behavior:'smooth'});}
  }
  window.AsNav={
    back:function(){return window.AsUI&&AsUI.back?AsUI.back():false},
    push:function(screen){return window.AsUI&&AsUI.nav?AsUI.nav(screen):false},
    replace:function(screen){return window.AsUI&&AsUI.nav?AsUI.nav(screen,{replace:true}):false},
    focus:focusMeaningful,
    renderMenu:function(){return window.AsUI&&AsUI.renderMenu?AsUI.renderMenu():false},
    stack:function(){return window.AsUI&&AsUI.history?AsUI.history.slice():[]},
    menu:function(){return window.AsUI&&AsUI.menu?AsUI.menu.slice():[]}
  };
  window.asgardBack=function(){return window.AsUI&&AsUI.back?AsUI.back():false};
  function boot(){
    if(window.AsUI&&AsUI.renderMenu){AsUI.renderMenu();setTimeout(focusMeaningful,100);return;}
    setTimeout(boot,100);
  }
  boot();
})();
