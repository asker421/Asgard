(function(){
  const DEMO_VIDEOS={
    north:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    horizon:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    empire:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    echo:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    shadow:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    aurora:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  };
  function esc(v){return window.AsUI&&AsUI.escape?AsUI.escape(v):String(v||'')}
  function toast(msg){const b=window.AsgardBridge;if(b&&b.showToast)b.showToast(msg);else console.log(msg)}
  function attachUrls(){if(!window.AsApp||!Array.isArray(AsApp.catalog))return false;AsApp.catalog.forEach(function(item){item.url=DEMO_VIDEOS[item.id]||DEMO_VIDEOS.north;item.demo=true;});return true;}
  function button(label,action,cls){return '<button class="btn focusable '+(cls||'')+'" onclick="'+action+'">'+label+'</button>'}
  function patch(){
    if(!window.AsApp||!window.AsUI){setTimeout(patch,100);return;}
    attachUrls();
    AsApp.openContent=function(id){
      const item=(AsApp.catalog||[]).find(function(x){return x.id===id})||AsApp.catalog[0];
      if(!item){toast('Контент не найден');return;}
      AsApp.details(item.id);
    };
    AsApp.play=function(itemOrId){
      attachUrls();
      const item=typeof itemOrId==='string'?(AsApp.catalog||[]).find(function(x){return x.id===itemOrId}):itemOrId;
      const media=item||AsApp.catalog[0];
      if(!media){toast('Нет demo-контента для открытия');return;}
      const url=media.url||DEMO_VIDEOS[media.id]||DEMO_VIDEOS.north;
      if(window.AsgardBridge&&AsgardBridge.openPlayer){
        AsgardBridge.openPlayer(url,media.t||media.title||'Asgard demo',0);
      }else{
        AsApp.shell('Demo player unavailable','Реальный ExoPlayer запускается только внутри Android APK. В браузере показана ссылка demo-видео.','<div class="panel"><h2>'+esc(media.t||media.title)+'</h2><p class="muted">'+esc(url)+'</p>'+button('Открыть demo URL','window.open(\''+url+'\',\'_blank\')')+'</div>');
      }
    };
    AsApp.details=function(id){
      attachUrls();
      const m=(AsApp.catalog||[]).find(function(x){return x.id===id})||AsApp.catalog[0];
      if(!m){toast('Контент не найден');return;}
      AsApp.shell('Карточка контента','Demo catalog · контент открывается через встроенный ExoPlayer. Это тестовый легальный sample stream для проверки плеера.','<div class="detail"><div class="poster art1"><span>Demo catalog</span></div><div><p class="eyebrow">'+esc((m.y||'')+' · '+(m.g||'')+' · '+(m.r||''))+'</p><h2>'+esc(m.t||m.title)+'</h2><p>'+esc(m.s||'Описание demo-контента.')+'</p><p class="muted">Почему может понравиться: '+esc(m.w||'Подходит для проверки player flow.')+'</p>'+button('▶ Смотреть','AsApp.play(\''+esc(m.id)+'\')')+button('Назад','asgardBack()','secondary')+'<h3>Статус</h3><p>'+esc('Demo catalog. Реальные источники ещё не подключены. Player должен открыть sample video в Android APK.')+'</p></div></div>');
      setTimeout(function(){if(window.AsInput&&AsInput.refresh)AsInput.refresh();},50);
    };
    document.addEventListener('click',function(e){
      const card=e.target.closest&&e.target.closest('.card');
      if(!card)return;
      const onclick=card.getAttribute('onclick')||'';
      const m=onclick.match(/details\('([^']+)'\)/);
      if(m){e.preventDefault();e.stopPropagation();AsApp.openContent(m[1]);}
    },true);
  }
  patch();
})();
