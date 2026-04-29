(function(){
  function esc(v){return AsUI.escape(v)}
  function btn(label,action,cls){return '<button class="btn focusable '+(cls||'')+'" onclick="'+action+'">'+label+'</button>'}
  function chip(v){return '<span class="chip">'+esc(v)+'</span>'}
  let lastResults=[];
  function resultCard(r,i){
    const playable=AsSources.isDirectPlayable(r.type,r.url);
    const magnet=AsSources.isMagnet(r.type,r.url);
    const torrent=AsSources.isTorrent(r.type,r.url);
    const action=playable?btn('▶ Смотреть','AsSourceSearch.play('+i+')'):magnet?btn('+ Magnet task','AsSourceSearch.addMagnet('+i+')','secondary'):torrent?btn('+ Torrent task','AsSourceSearch.addTorrent('+i+')','secondary'):btn('Открыть ссылку','AsSourceSearch.open('+i+')','secondary');
    return '<div tabindex="0" class="source-row focusable"><h3>'+esc(r.title||r.sourceName)+'</h3><p>'+chip(r.type||'source')+chip(r.sourceName||'source')+chip(r.rightsStatus||'User Source / Unknown Rights')+(r.quality?chip(r.quality):'')+(r.size?chip(r.size):'')+'</p><p class="muted">'+esc(r.description||r.url||'')+'</p><p class="muted">'+esc(r.url||'')+'</p>'+action+'</div>';
  }
  window.AsSourceSearch={
    async search(){
      const q=(document.getElementById('realSourceQuery')&&document.getElementById('realSourceQuery').value)||'';
      const out=document.getElementById('realSourceResults');
      if(!out)return;
      out.innerHTML='<div class="panel"><h2>Ищу...</h2><p class="muted">Проверяю включённые user sources. Один источник не должен ломать общий поиск.</p></div>';
      if(window.AsInput&&AsInput.refresh)AsInput.refresh();
      const report=await AsSources.searchContent(q);
      lastResults=report.results||[];
      const errors=(report.reports||[]).filter(r=>!r.ok);
      out.innerHTML='<div class="panel"><h2>Результаты</h2><p>'+chip('sources '+report.sourceCount)+chip('ok '+report.reportsOk)+chip('results '+lastResults.length)+'</p>'+(errors.length?'<pre>'+esc(JSON.stringify(errors.map(e=>({source:e.source,error:e.error,elapsedMs:e.elapsedMs})),null,2))+'</pre>':'')+'</div>'+(lastResults.length?lastResults.map(resultCard).join(''):'<div class="empty"><h2>Ничего не найдено</h2><p>Проверь, что sources включены: enabled=true. Для прямых ссылок используй тип direct_video / hls / magnet / torrent_url.</p></div>');
      if(window.AsInput&&AsInput.refresh)AsInput.refresh();
    },
    play(i){const r=lastResults[i];if(!r)return;if(window.AsgardBridge&&AsgardBridge.openPlayer){AsgardBridge.openPlayer(r.url,r.title||r.sourceName||'User source',0)}else{window.open(r.url,'_blank')}},
    addMagnet(i){const r=lastResults[i];if(!r)return;const parsed=AsTorrent.parseMagnet(r.url);if(!parsed.ok){alert(parsed.error);return;}const task=AsTorrent.makeTask(parsed);task.name=r.title||task.name;task.sourceName=r.sourceName;AsStore.addTorrentTask(task);alert('Magnet task added')},
    addTorrent(i){const r=lastResults[i];if(!r)return;const task={id:'torrent_url_'+Date.now(),name:r.title||r.sourceName||'torrent',type:'torrent_url',uri:r.url,url:r.url,status:'metadata_pending',rightsStatus:'User Source / Unknown Rights',files:[],selectedFileIndex:-1,createdAt:Date.now(),updatedAt:Date.now(),sourceName:r.sourceName};AsStore.addTorrentTask(task);alert('Torrent task added')},
    open(i){const r=lastResults[i];if(!r)return;if(window.AsgardBridge&&AsgardBridge.openExternalUrl)AsgardBridge.openExternalUrl(r.url);else window.open(r.url,'_blank')}
  };
  function patch(){
    if(!window.AsApp||!window.AsUI){setTimeout(patch,100);return;}
    AsApp.search=function(){
      const srcCount=AsSources.parse(AsStore.readSources()).filter(s=>s.ok&&s.enabled).length;
      AsApp.shell('Поиск в источниках','Ищет по включённым user sources из sources.txt/config. Direct/HLS открываются в плеере; magnet/.torrent добавляются как user media tasks.','<div class="warn"><b>User Source / Unknown Rights:</b> приложение не проверяет юридический статус ваших источников. Используйте только источники, на которые у вас есть право.</div><div class="search-box"><input class="focusable" id="realSourceQuery" placeholder="Название фильма / сериала / ключевое слово"><button class="btn focusable" onclick="AsSourceSearch.search()">Искать</button><button class="btn secondary focusable" onclick="AsUI.nav(\'Источники\')">Источники</button></div><div class="panel"><h2>Активные источники: '+srcCount+'</h2><p class="muted">Поддерживаются direct_video, hls, magnet, torrent_url, json/api, rss/xml, search_template, magnet_list.</p></div><div id="realSourceResults"></div>');
      setTimeout(function(){if(window.AsInput&&AsInput.refresh)AsInput.refresh();},50);
    };
    if(AsUI.state.screen==='Поиск')AsApp.search();
  }
  patch();
})();
