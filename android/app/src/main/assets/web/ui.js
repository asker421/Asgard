window.AsUI={
 menu:['Главная','Каталог','Поиск','AI подбор','Детали','Player Pro','Библиотека','Серии','Источники','Torrent','Torrent Diagnostics','QR импорт','Диагностика','Обновления','Настройки'],
 state:{screen:'Главная'},
 renderMenu(){const m=document.getElementById('menu');m.innerHTML='<div class="brand">Asgard</div>'+this.menu.map(x=>'<div tabindex="0" class="nav-item focusable '+(x===this.state.screen?'active':'')+'" onclick="AsUI.nav(\''+x+'\')">'+x+'</div>').join('')},
 nav(x){this.state.screen=x;this.renderMenu();AsApp.render();setTimeout(()=>window.AsInput&&AsInput.refresh&&AsInput.refresh(),0)},
 escape(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;').replace(/'/g,'&#39;')}
};
