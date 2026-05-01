(function(){
  function esc(v){return AsUI.escape(v)}
  function chip(v){return '<span class="chip">'+esc(v)+'</span>'}
  function btn(label, action, cls){return '<button class="btn focusable '+(cls||'')+'" onclick="'+action+'">'+label+'</button>'}
  function streamBox(task){
    const stream=task.stream||{};
    if(!stream.status){return '<p class="muted">Streaming не начат. Для magnet/torrent используйте TorrServer → ExoPlayer, либо загрузите metadata для локальной диагностики.</p>'}
    const buffer=Number(stream.bufferPercent||0);
    const downloaded=Number(stream.downloadedPercent||0);
    return '<div class="stream-box"><h3>Streaming state: '+esc(stream.status)+'</h3><p>'+chip('buffer '+buffer+'%')+chip('download '+downloaded+'%')+chip('peers '+Number(stream.peers||0))+chip('seeds '+Number(stream.seeds||0))+chip(Number(stream.speedKbps||0)+' kbps')+'</p><div class="timeline"><i style="width:'+buffer+'%"></i></div><p class="muted">'+esc(stream.limitation||'')+'</p></div>';
  }
  function fileRows(task){
    const files=task.files||[];
    if(!files.length){return '<p class="muted">Metadata ещё не загружена. Нажмите Load metadata или TorrServer → ExoPlayer для реального configured-server flow.</p>'}
    return '<div class="file-list">'+files.map(function(file){
      const selected=Number(task.selectedFileIndex)===Number(file.index);
      return '<div tabindex="0" class="file-row focusable '+(selected?'selected':'')+'"><div><b>'+esc(file.path||file.name)+'</b><p>'+chip(file.extension||'file')+chip(file.sizeLabel||AsTorrent.formatBytes(file.sizeBytes))+(file.isVideo?chip('video'):chip('not video'))+'</p></div>'+btn(selected?'Выбрано':'Выбрать','AsApp.selectTorrentFile(\''+esc(task.id)+'\','+Number(file.index)+')',file.isVideo?'secondary':'danger')+'</div>';
    }).join('')+'</div>';
  }
  function renderTask(task){
    return '<div class="torrent-row"><b>'+esc(task.name||task.id)+'</b> '+chip(task.type||'media')+' '+chip(task.status||'metadata_pending')+'<p class="muted">'+esc(task.infoHash||task.uri||'metadata pending')+'</p><p>'+esc(task.rightsStatus||'User Source / Unknown Rights')+'</p><p class="muted">'+esc(task.lastError||'')+'</p>'+btn('Load metadata','AsApp.loadTorrentMetadata(\''+esc(task.id)+'\')','secondary')+btn('TorrServer → ExoPlayer','AsApp.playTorrentViaTorrServer(\''+esc(task.id)+'\')')+btn('Start buffer','AsApp.startTorrentStream(\''+esc(task.id)+'\')','secondary')+btn('Advance buffer','AsApp.advanceTorrentStream(\''+esc(task.id)+'\')','secondary')+btn('Pause','AsApp.pauseTorrentStream(\''+esc(task.id)+'\')','secondary')+btn('No peers test','AsApp.noPeers(\''+esc(task.id)+'\')','secondary')+btn('Cancel','AsApp.cancelTorrentStream(\''+esc(task.id)+'\')','danger')+btn('Удалить','AsApp.removeMagnet(\''+esc(task.id)+'\')','danger')+streamBox(task)+fileRows(task)+'</div>';
  }
  function taskToTorrServerResult(task){
    if(!task)return null;
    const result={title:task.name||task.id,rightsStatus:task.rightsStatus||'User Source / Unknown Rights'};
    if(task.type==='magnet'&&task.raw){result.magnetUrl=task.raw;result.url=task.raw;result.infoHash=task.infoHash||task.id;result.hash=task.infoHash||task.id;}
    if(task.type==='torrent_url'&&task.url){result.torrentUrl=task.url;result.url=task.url;result.id=task.id;}
    if(task.type==='torrent_file'&&task.uri){result.torrentUrl=task.uri;result.url=task.uri;result.id=task.id;}
    return result;
  }
  function patch(){
    if(!window.AsApp||!window.AsTorrent||!window.AsStore){setTimeout(patch,100);return;}
    AsApp.media=function(){
      const tasks=AsStore.torrentTasks?AsStore.torrentTasks().sort(function(a,b){return (b.updatedAt||0)-(a.updatedAt||0)}):[];
      this.shell('User media / TorrServer playback','User-provided magnet/torrent задачи. APK не содержит P2P engine; реальное воспроизведение идёт через user-configured TorrServer → native ExoPlayer.','<div class="warn"><b>Важно:</b> добавляйте только контент, на использование которого у вас есть право. Встроенных каталогов, зеркал, cookies, логинов и обхода защит нет.</div><div class="layout2"><div class="panel"><h2>Magnet link</h2><textarea class="focusable" id="magnetInput" rows="5" placeholder="magnet:?xt=urn:btih:...&dn=..."></textarea>'+btn('Проверить magnet','AsApp.validateMagnet()')+btn('Добавить magnet','AsApp.addMagnetTask()','secondary')+'<pre id="magnetOut"></pre></div><div class="panel"><h2>.torrent файл / TorrServer</h2><p>Настройте TorrServer URL в Settings → Parser & TorrServer. Затем используйте TorrServer → ExoPlayer.</p>'+btn('Выбрать .torrent файл','AsApp.pickTorrentFile()')+btn('Показать выбранный файл','AsApp.previewTorrentFile()','secondary')+btn('Добавить .torrent задачу','AsApp.addTorrentFileTask()','secondary')+'<pre id="torrentFileOut"></pre></div></div><section class="shelf"><div class="shelf-head"><h2>User media задачи</h2><span>'+tasks.length+' задач</span></div>'+tasks.map(renderTask).join('')+'</section>');
    };
    AsApp.playTorrentViaTorrServer=async function(id){
      const task=AsStore.torrentTasks().find(x=>x.id===id);
      if(!task)return;
      const ok=confirm('I confirm I have rights to access this content.');
      if(!ok)return;
      const result=taskToTorrServerResult(task);
      if(!result){alert(JSON.stringify({ok:false,status:'unsupported_task_for_torrserver',task:task},null,2));return;}
      const out=await AsTorrServerAdapter.preparePlayableFromResult(result);
      if(out.ok&&out.streamUrl){
        const updated=Object.assign({},task,{status:'stream_ready',stream:Object.assign({},task.stream||{},{status:'stream_ready',localStreamUrl:out.streamUrl,canOpenPlayer:true,selectedFile:out.selectedFile,selectedFileIndex:out.selectedFile&&out.selectedFile.index}),lastError:'TorrServer stream ready: '+out.streamUrl,updatedAt:Date.now()});
        AsStore.updateTorrentTask(updated);
        if(window.AsgardBridge&&AsgardBridge.openPlayer)AsgardBridge.openPlayer(out.streamUrl,task.name||'TorrServer stream',0);else window.open(out.streamUrl,'_blank');
        return;
      }
      alert(JSON.stringify(out,null,2));
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
