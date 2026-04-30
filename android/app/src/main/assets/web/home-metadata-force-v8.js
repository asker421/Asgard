(function(){
  function boot(){
    if(!window.AsHomeMetadataV7){setTimeout(boot,150);return;}
    var old=window.AsApp&&AsApp.home;
    if(window.AsApp){
      AsApp.home=function(){return AsHomeMetadataV7.home()};
      AsApp.__metadataHomeV8=true;
    }
    function maybe(){
      try{
        if(window.AsUI&&AsUI.state&&AsUI.state.screen==='Главная')AsHomeMetadataV7.home();
        var app=document.getElementById('app');
        if(app&&/Big Buck Bunny|Sintel|Tears of Steel|Demo/i.test(app.textContent||''))AsHomeMetadataV7.home();
      }catch(e){}
    }
    setTimeout(maybe,100);
    setTimeout(maybe,700);
    setTimeout(maybe,1800);
  }
  boot();
})();
