(function(){
  const OPEN_CATALOG=[
    {id:'north',t:'Big Buck Bunny',title:'Big Buck Bunny',kind:'movie',y:'2008',r:'7.8',g:'Animation · Comedy · Open Movie',ep:'10 min',tag:'Open Demo',source:'Blender Foundation',rights:'Open movie / public demo stream',url:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',s:'Короткометражный open movie от Blender Foundation. Хороший тест для проверки плавности воспроизведения, перемотки и качества картинки.',w:'Подходит для быстрой проверки player flow: карточка → детали → смотреть → ExoPlayer.'},
    {id:'horizon',t:'Sintel',title:'Sintel',kind:'movie',y:'2010',r:'7.4',g:'Animation · Fantasy · Open Movie',ep:'15 min',tag:'Open Demo',source:'Blender Foundation',rights:'Open movie / public demo stream',url:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',s:'Open movie fantasy short. Используется как легальный sample stream для тестирования Asgard TV.',w:'Хороший тест для длиннее демо-сессии и перехода из карточки в плеер.'},
    {id:'empire',t:'Tears of Steel',title:'Tears of Steel',kind:'movie',y:'2012',r:'7.0',g:'Sci‑Fi · Short · Open Movie',ep:'12 min',tag:'Open Demo',source:'Blender Foundation',rights:'Open movie / public demo stream',url:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',s:'Open sci‑fi short movie. Подходит для проверки player controls на Android TV.',w:'Показывает, что приложение может открывать реальный прямой video stream.'},
    {id:'echo',t:'Elephants Dream',title:'Elephants Dream',kind:'movie',y:'2006',r:'6.5',g:'Animation · Experimental · Open Movie',ep:'11 min',tag:'Open Demo',source:'Blender Foundation',rights:'Open movie / public demo stream',url:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',s:'Первый Blender open movie. Используется как стабильный test video для проверки воспроизведения.',w:'Подходит для проверки открытия деталей, Watch CTA и возврата назад.'},
    {id:'shadow',t:'For Bigger Blazes',title:'For Bigger Blazes',kind:'movie',y:'2015',r:'Demo',g:'Sample · Action · Demo Stream',ep:'15 sec',tag:'Sample',source:'Google sample bucket',rights:'Public sample stream',url:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',s:'Короткий публичный sample stream для быстрой проверки запуска плеера.',w:'Самый быстрый тест: нажал Смотреть — сразу должен открыться ExoPlayer.'},
    {id:'aurora',t:'For Bigger Escapes',title:'For Bigger Escapes',kind:'movie',y:'2015',r:'Demo',g:'Sample · Demo Stream',ep:'15 sec',tag:'Sample',source:'Google sample bucket',rights:'Public sample stream',url:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',s:'Ещё один короткий публичный sample stream для smoke-теста плеера.',w:'Удобен для проверки, что разные карточки открывают разные URL.'}
  ];
  function esc(v){return window.AsUI&&AsUI.escape?AsUI.escape(v):String(v||'')}
  function toast(msg){const b=window.AsgardBridge;if(b&&b.showToast)b.showToast(msg);else console.log(msg)}
  function attachCatalog(){
    if(!window.AsApp)return false;
    AsApp.catalog=OPEN_CATALOG.map(function(x){return Object.assign({},x,{demo:true,open:true});});
    return true;
  }
  function button(label,action,cls){return '<button class="btn focusable '+(cls||'')+'" onclick="'+action+'">'+label+'</button>'}
  function poster(m){return '<div class="poster art1"><span>'+esc(m.tag||'Open Demo')+'</span></div>'}
  function patch(){
    if(!window.AsApp||!window.AsUI){setTimeout(patch,100);return;}
    attachCatalog();
    AsApp.openContent=function(id){
      attachCatalog();
      const item=(AsApp.catalog||[]).find(function(x){return x.id===id})||AsApp.catalog[0];
      if(!item){toast('Контент не найден');return;}
      AsApp.details(item.id);
    };
    AsApp.play=function(itemOrId){
      attachCatalog();
      const item=typeof itemOrId==='string'?(AsApp.catalog||[]).find(function(x){return x.id===itemOrId}):itemOrId;
      const media=item||AsApp.catalog[0];
      if(!media||!media.url){toast('Нет ссылки для открытия');return;}
      if(window.AsgardBridge&&AsgardBridge.openPlayer){
        AsgardBridge.openPlayer(media.url,media.t||media.title||'Asgard open demo',0);
      }else{
        AsApp.shell('Open demo URL','Реальный ExoPlayer запускается только внутри Android APK. В браузере можно открыть прямую demo-ссылку.','<div class="panel"><h2>'+esc(media.t||media.title)+'</h2><p>'+esc(media.rights||'Open demo stream')+'</p><p class="muted">'+esc(media.url)+'</p>'+button('Открыть demo URL','window.open(\''+media.url+'\',\'_blank\')')+'</div>');
      }
    };
    AsApp.details=function(id){
      attachCatalog();
      const m=(AsApp.catalog||[]).find(function(x){return x.id===id})||AsApp.catalog[0];
      if(!m){toast('Контент не найден');return;}
      AsApp.shell('Карточка контента','Open Demo Catalog · прямой легальный sample stream для проверки Android TV player flow.','<div class="detail">'+poster(m)+'<div><p class="eyebrow">'+esc((m.y||'')+' · '+(m.g||'')+' · '+(m.r||''))+'</p><h2>'+esc(m.t||m.title)+'</h2><p>'+esc(m.s||'Описание open demo контента.')+'</p><p class="muted">Почему в каталоге: '+esc(m.w||'Проверка player flow.')+'</p>'+button('▶ Смотреть','AsApp.play(\''+esc(m.id)+'\')')+button('Назад','asgardBack()','secondary')+'<h3>Источник</h3><p>'+esc(m.source||'Open demo source')+'</p><h3>Права</h3><p>'+esc(m.rights||'Open/Public sample stream')+'</p><h3>URL</h3><p class="muted">'+esc(m.url)+'</p></div></div>');
      setTimeout(function(){if(window.AsInput&&AsInput.refresh)AsInput.refresh();},50);
    };
    AsApp.home=function(){
      attachCatalog();
      const m=AsApp.catalog[0];
      const cards=AsApp.catalog.map(function(x){return '<article tabindex="0" class="card focusable" onclick="AsApp.openContent(\''+esc(x.id)+'\')">'+poster(x)+'<div class="card-body"><h3>'+esc(x.t)+'</h3><p class="muted">'+esc(x.y+' · '+x.g+' · '+x.ep)+'</p><span class="chip">'+esc(x.tag)+'</span></div></article>'}).join('');
      AsApp.shell('Asgard TV','Open Demo Catalog. Здесь реальные прямые sample video links, чтобы проверить путь карточка → детали → ExoPlayer.','<div class="layout2"><div class="spotlight">'+poster(m)+'<div><p class="eyebrow">Open/Public demo stream</p><h2>'+esc(m.t)+'</h2><p>'+esc(m.s)+'</p>'+button('▶ Смотреть','AsApp.play(\''+m.id+'\')')+button('Подробнее','AsApp.details(\''+m.id+'\')','secondary')+'</div></div><div class="panel"><h2>Статус build</h2><p>Prototype / Demo catalog. Реальные пользовательские источники подключаются отдельно через Sources.</p><p class="muted">Torrent, AI, QR пока Experimental.</p></div></div><section class="shelf"><div class="shelf-head"><h2>Open Demo Catalog</h2><span>'+AsApp.catalog.length+' видео</span></div><div class="cards">'+cards+'</div></section>');
      setTimeout(function(){if(window.AsInput&&AsInput.refresh)AsInput.refresh();},50);
    };
    AsApp.catalog=function(){
      attachCatalog();
      const cards=AsApp.catalog.map(function(x){return '<article tabindex="0" class="card focusable" onclick="AsApp.openContent(\''+esc(x.id)+'\')">'+poster(x)+'<div class="card-body"><h3>'+esc(x.t)+'</h3><p class="muted">'+esc(x.source+' · '+x.ep)+'</p><span class="chip">'+esc(x.rights)+'</span></div></article>'}).join('');
      AsApp.shell('Каталог','Реальные open/public sample streams. Для smoke-теста плеера выберите карточку и нажмите Смотреть.','<section class="shelf"><div class="shelf-head"><h2>Open Demo Catalog</h2><span>'+AsApp.catalog.length+' видео</span></div><div class="cards">'+cards+'</div></section>');
      setTimeout(function(){if(window.AsInput&&AsInput.refresh)AsInput.refresh();},50);
    };
    document.addEventListener('click',function(e){
      const card=e.target.closest&&e.target.closest('.card');
      if(!card)return;
      const onclick=card.getAttribute('onclick')||'';
      const m=onclick.match(/(?:details|openContent)\('([^']+)'\)/);
      if(m){e.preventDefault();e.stopPropagation();AsApp.openContent(m[1]);}
    },true);
    if(AsUI.state.screen==='Главная')AsApp.home();
  }
  patch();
})();
