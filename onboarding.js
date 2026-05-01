(function(){
  function esc(v){return AsUI.escape(v)}
  function btn(label,action,cls){return '<button class="btn focusable '+(cls||'')+'" onclick="'+action+'">'+label+'</button>'}
  function chip(v){return '<span class="chip">'+esc(v)+'</span>'}
  const KEY='asgard_onboarding_completed_v1';
  const steps=[
    {t:'Добро пожаловать в Asgard TV',d:'Asgard TV — Android TV cinema hub с premium TV-first интерфейсом, native ExoPlayer и user-controlled источниками.',k:['Android TV','D-pad','Native player']},
    {t:'Источники под вашим контролем',d:'Приложение не поставляется с сомнительными каталогами. Источники добавляются вручную через Source Manager или TXT import.',k:['User sources','TXT','Validation']},
    {t:'Смотреть через native ExoPlayer',d:'Demo-контент и ваши разрешённые playable links открываются в Android native player. Прогресс сохраняется для Continue Watching.',k:['ExoPlayer','Progress','Resume']},
    {t:'QR import безопасно',d:'QR import использует локальную сессию с PIN, expiry, preview и подтверждением на TV. Silent import не используется.',k:['PIN','Expiry','TV confirm']},
    {t:'AI и Experimental',d:'AI, QR, Torrent и некоторые Developer экраны могут быть частично prototype. Они помечены как Demo / Not fully implemented.',k:['Demo badges','No false claims','Settings']},
    {t:'Готово',d:'Начните с Home, Search, Sources или Diagnostics. Для стабильности нужен Android TV smoke test.',k:['Home','Search','Diagnostics']}
  ];
  window.AsOnboarding={
    index:0,
    completed(){return localStorage.getItem(KEY)==='true'},
    complete(){localStorage.setItem(KEY,'true');AsUI.nav('Главная',{replace:true})},
    reset(){localStorage.removeItem(KEY);this.index=0;this.render()},
    skip(){localStorage.setItem(KEY,'true');AsUI.nav('Главная',{replace:true})},
    next(){if(this.index<steps.length-1){this.index++;this.render()}else this.complete()},
    prev(){if(this.index>0){this.index--;this.render()}},
    render(){
      const s=steps[this.index];
      const dots=steps.map((_,i)=>'<i class="onboarding-dot '+(i===this.index?'active':'')+'"></i>').join('');
      app.innerHTML='<section class="page onboarding-page"><div class="premium-hero art'+((this.index%6)+1)+' onboarding-hero"><div class="hero-shade"></div><div class="hero-copy"><p class="eyebrow">First launch · Step '+(this.index+1)+' / '+steps.length+'</p><h1>'+esc(s.t)+'</h1><p class="hero-desc">'+esc(s.d)+'</p><p>'+s.k.map(chip).join('')+'</p><div class="hero-cta">'+(this.index?btn('Назад','AsOnboarding.prev()','secondary'):'')+btn(this.index===steps.length-1?'Начать':'Далее','AsOnboarding.next()')+btn('Пропустить','AsOnboarding.skip()','secondary')+'</div><div class="onboarding-dots">'+dots+'</div></div><div class="hero-card-preview"><div class="poster poster-wide art'+((this.index%6)+1)+'"><span>Asgard TV</span></div></div></div></section>';
      setTimeout(()=>AsInput&&AsInput.refresh(),50);
    },
    maybeShow(){if(!this.completed()){this.index=0;this.render();return true;}return false}
  };
  function patch(){
    if(!window.AsApp||!window.AsUI){setTimeout(patch,100);return;}
    const oldRender=AsApp.render&&AsApp.render.bind(AsApp);
    if(!AsApp.__onboardingPatched){
      AsApp.__onboardingPatched=true;
      AsApp.render=function(){if(AsUI.state.screen==='Главная'&&!AsOnboarding.completed()){return AsOnboarding.render();}return oldRender?oldRender():null};
      const oldSettings=AsApp.settings&&AsApp.settings.bind(AsApp);
      AsApp.settings=function(){if(oldSettings)oldSettings();const p=document.querySelector('.page');if(p&&!document.getElementById('onboardingSettingsCard')){p.insertAdjacentHTML('beforeend','<section class="shelf" id="onboardingSettingsCard"><div class="shelf-head"><h2>Onboarding</h2><span>first launch guide</span></div><div class="settings-grid"><div tabindex="0" class="setting-card focusable" onclick="AsOnboarding.reset()"><h3>Reopen onboarding</h3><p class="muted">Show first-launch guide again.</p></div></div></section>');AsInput&&AsInput.refresh();}};
    }
    if(AsUI.state.screen==='Главная'&&!AsOnboarding.completed())AsOnboarding.render();
  }
  patch();
})();
