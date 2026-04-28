(function(){
  function esc(v){return AsUI.escape(v)}
  function chip(v){return '<span class="chip">'+esc(v)+'</span>'}
  function btn(label, action, cls){return '<button class="btn focusable '+(cls||'')+'" onclick="'+action+'">'+label+'</button>'}
  function streamBox(task){
    const stream=task.stream||{};
    if(!stream.status){return '<p class="muted">Streaming не начат. Загрузите metadata, выберите видеофайл и нажмите Start buffer.</p>'}
    const buffer=Number(stream.bufferPercent||0);
    const downloaded=Number(stream.downloadedPercent||0);
    return '<div class="stream-box"><h3>Streaming state: '+esc(stream.status)+'</h3><p>'+chip('buffer '+buffer+'%')+chip('download '+downloaded+'%')+chip('peers '+Number(stream.peers||0))+chip('seeds '+Number(stream.seeds||0))+chip(Number(stream.speedKbps||0)+' kbps')+'</p><div class="timeline"><i style="width:'+buffer+'%"></i></div><p class="muted">'+esc(stream.limitation||'')+'</p></div>';
  }
  function fileRows(task){
    const files=task.files||[];
    if(!files.length){return '<p class="muted">Metadata ещё не загружена. Нажмите Load metadata.</p>'}
    return '<div class="file-list">'+files.map(function(file){
      const selected=Number(task.selectedFileIndex)===Number(file.index);
      return '<div tabindex="0" class="file-row focusable '+(selected?'selected':'')+'"><div><b>'+esc(file.path||file.name)+'</b><p>'+chip(file.extension||'file')+chip(file.sizeLabel||AsTorrent.formatBytes(file.sizeBytes))+(file.isVideo?chip('video'):chip('not video'))+'</p></div>'+btn(selected?'Выбрано':'Выбрать','AsApp.selectTorrentFile(\''+esc(task.id)+'\','+Number(file.index)+')',file.isVideo?'secondary':'danger')+'</div>';
    }).join('')+'</div>';
  }
  function renderTask(task){
    return '<div class="torrent-row"><b>'+esc(task.name||task.id)+'</b> '+chip(task.type||'media')+' '+chip(task.status||'metadata_pending')+'<p class="muted">'+esc(task.infoHash||task.uri||'metadata pending')+'</p><p>'+esc(task.rightsStatus||'User Source / Unknown Rights')+'</p><p class="muted">'+esc(task.lastError||'')+'</p>'+btn('Load metadata','AsApp.loadTorrentMetadata(\''+esc(task.id)+'\')','secondary')+btn('Start buffer','AsApp.startTorrentStream(\''+esc(task.id)+'\')','secondary')+btn('Advance buffer','AsApp.advanceTorrentStream(\''+esc(task.id)+'\')','secondary')+btn('Pause','AsApp.pauseTorrentStream(\''+esc(task.id)+'\')','secondary')+btn('No peers test','AsApp.noPeers(\''+esc(task.id)+'\')','secondary')+btn('Cancel','AsApp.cancelTorrentStream(\''+esc(task.id)+'\')','danger')+btn('Удалить','AsApp.removeMagnet(\''+esc(task.id)+'\')','danger')+streamBox(task)+fileRows(task)+'</div>';
  }
  function patch(){
    if(!window.AsApp||!window.AsTorrent||!window.AsStore){setTimeout(patch,100);return;}
    AsApp.media=function(){
      const tasks=AsStore.torrentTasks?AsStore.torrentTasks().sort(function(a,b){return (b.updatedAt||0)-(a.updatedAt||0)}):[];
      this.shell('Streaming-first playback foundation','ASG-TOR-004: sequential/buffer-first состояние, buffer progress, ready/cancel/pause/no-peers states и безопасная блокировка ExoPlayer до реального P2P engine.','<div class="warn"><b>Важно:</b> добавляйте только контент, на использование которого у вас есть право. Все magnet/torrent задачи имеют статус User Source / Unknown Rights. Встроенных каталогов, зеркал и обхода защит нет.</div><div class="layout2"><div class="panel"><h2>Magnet link</h2><textarea class="focusable" id="magnetInput" rows="5" placeholder="magnet:?xt=urn:btih:...&dn=..."></textarea>'+btn('Проверить magnet','AsApp.validateMagnet()')+btn('Добавить magnet','AsApp.addMagnetTask()','secondary')+'<pre id="magnetOut"></pre></div><div class="panel"><h2>.torrent файл</h2><p>Выберите user-provided .torrent файл через Android file picker или откройте .torrent из файлового менеджера.</p>'+btn('Выбрать .torrent файл','AsApp.pickTorrentFile()')+btn('Показать выбранный файл','AsApp.previewTorrentFile()','secondary')+btn('Добавить .torrent задачу','AsApp.addTorrentFileTask()','secondary')+'<pre id="torrentFileOut"></pre></div></div><section class="shelf"><div class="shelf-head"><h2>User media задачи</h2><span>'+tasks.length+' задач</span></div>'+tasks.map(renderTask).join('')+'</section>');
    };
    AsApp.startTorrentStream=function(id){const t=AsStore.torrentTasks().find(x=>x.id===id);if(!t)return;AsStore.updateTorrentTask(AsTorrent.startStream(t));this.media();};
    AsApp.advanceTorrentStream=function(id){const t=AsStore.torrentTasks().find(x=>x.id===id);if(!t)return;AsStore.updateTorrentTask(AsTorrent.advanceStream(t));this.media();};
    AsApp.pauseTorrentStream=function(id){const t=AsStore.torrentTasks().find(x=>x.id===id);if(!t)return;AsStore.updateTorrentTask(AsTorrent.pauseStream(t));this.media();};
    AsApp.cancelTorrentStream=function(id){const t=AsStore.torrentTasks().find(x=>x.id===id);if(!t)return;AsStore.updateTorrentTask(AsTorrent.cancelStream(t));this.media();};
    AsApp.noPeers=function(id){const t=AsStore.torrentTasks().find(x=>x.id===id);if(!t)return;AsStore.updateTorrentTask(AsTorrent.simulateNoPeers(t));this.media();};
    AsApp.torrentDiagnostics=function(){const rows=AsTorrent.diagnostics(AsStore.torrentTasks?AsStore.torrentTasks():[]);this.shell('Torrent Diagnostics','Диагностика user media задач: validation, metadata, file selection, stream state, buffer, no peers и rights status.','<pre>'+esc(JSON.stringify(rows,null,2))+'</pre>');};
    if(AsUI.state.screen==='Torrent'){AsApp.media();}
  }
  patch();
})();
