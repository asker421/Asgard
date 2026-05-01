(function(){
  function hasBridge(){return !!(window.AsgardBridge&&AsgardBridge.openPlayer)}
  function serviceReady(){return !!(window.AsTorrServerAdapter&&AsTorrServerAdapter.configured&&AsTorrServerAdapter.configured())}
  function readTasks(){try{return AsStore.torrentTasks?AsStore.torrentTasks():[]}catch(e){return []}}
  function saveTask(t){try{if(AsStore.updateTorrentTask)return AsStore.updateTorrentTask(t)}catch(e){}return false}
  function findTask(id){return readTasks().find(x=>x.id===id)||null}
  function streamUrl(task){return task&&(task.streamUrl||(task.inputType==='direct_video'?task.target:''))||''}
  function needsExternalPreparation(task){return task&&task.inputType!=='direct_video'&&task.inputType!=='link'}
  function openNative(url,title,itemId,startPosition){
    if(!url)return {ok:false,status:'missing_stream_url'};
    if(!/^https?:\/\//i.test(url)&&!/^file:\/\//i.test(url)&&!/^content:\/\//i.test(url))return {ok:false,status:'unsupported_url_scheme'};
    if(hasBridge()){
      try{AsgardBridge.openPlayer(url,title||url,Number(startPosition||0),itemId||title||url);return {ok:true,status:'opened_native'}}
      catch(e){try{AsgardBridge.openPlayer(url,title||url,Number(startPosition||0));return {ok:true,status:'opened_native_legacy'}}catch(e2){return {ok:false,status:'bridge_open_failed',error:e2.message||String(e2)}}}
    }
    window.open(url,'_blank');return {ok:true,status:'opened_browser_fallback'};
  }
  function statePanel(task){
    const url=streamUrl(task);const ready=!!url;const ext=needsExternalPreparation(task);const configured=serviceReady();const status=task.streamStatus||task.status||'unknown';
    let msg='Stream is not ready yet. Prepare stream or load metadata.';
    if(ready)msg='Stream URL is ready for player handoff.';
    else if(ext&&!configured)msg='Configured media service URL is missing. Open Parser & service settings.';
    else if(task.status==='no_files_returned')msg='Metadata was loaded but no files are available yet.';
    else if(task.status==='no_playable_video_file')msg='Metadata was loaded but no supported video file was found.';
    return '<div class="panel"><h2>Streaming readiness</h2><p><span class="chip">'+AsUI.escape(status)+'</span><span class="chip">'+(ready?'ready':'not ready')+'</span><span class="chip">'+(hasBridge()?'native bridge':'browser fallback')+'</span>'+(ext?'<span class="chip">'+(configured?'service configured':'service missing')+'</span>':'')+'</p><p class="muted">'+AsUI.escape(msg)+'</p><div class="source-actions"><button class="btn focusable" onclick="AsStreamReady.prepare(\''+task.id+'\')">Prepare stream</button><button class="btn secondary focusable" onclick="AsStreamReady.open(\''+task.id+'\')">Open stream</button><button class="btn secondary focusable" onclick="AsStreamReady.cancel(\''+task.id+'\')">Cancel</button>'+(ext?'<button class="btn secondary focusable" onclick="AsParserSettings.render()">Parser & service</button>':'')+'</div></div>';
  }
  window.AsStreamReady={
    install(){if(!window.AsMediaTask||!window.AsApp||AsMediaTask.__streamReadyPatch)return false;AsMediaTask.__streamReadyPatch=true;const oldRender=AsMediaTask.render.bind(AsMediaTask);AsMediaTask.render=function(taskId){oldRender(taskId);const task=findTask(taskId);const out=document.getElementById('mediaTaskOut');if(task&&out&&!document.getElementById('streamingReadyPanel'))out.insertAdjacentHTML('beforebegin','<div id="streamingReadyPanel">'+statePanel(task)+'</div>');setTimeout(()=>AsInput&&AsInput.refresh&&AsInput.refresh(),30)};AsMediaTask.prepareStream=AsStreamReady.prepare;AsMediaTask.openPreparedStream=AsStreamReady.open;return true},
    async prepare(taskId){const task=findTask(taskId);const out=document.getElementById('mediaTaskOut');if(!task)return;if(out)AsState.setLoading(out,'Preparing stream','Checking configuration, metadata and stream URL readiness.');if(streamUrl(task)){task.streamStatus='stream_ready';task.lastError='Stream URL is ready.';task.updatedAt=Date.now();saveTask(task);if(out)AsState.setSuccess(out,'Stream ready','You can open the player now.');AsMediaTask.render(taskId);return {ok:true,status:'stream_ready',url:streamUrl(task)}}if(needsExternalPreparation(task)&&!serviceReady()){task.streamStatus='service_not_configured';task.lastError='Configured media service URL is missing.';task.updatedAt=Date.now();saveTask(task);if(out)AsState.setError(out,'Service not configured','Open Parser & service settings and set the service URL.',[{label:'Parser & service',action:'AsParserSettings.render()'}]);AsMediaTask.render(taskId);return {ok:false,status:'service_not_configured'}}task.streamStatus='stream_preparing';task.updatedAt=Date.now();saveTask(task);if(AsMediaTask.loadMetadata)await AsMediaTask.loadMetadata(taskId);const updated=findTask(taskId);if(updated&&streamUrl(updated)){updated.streamStatus='stream_ready';updated.lastError='Stream URL is ready.';updated.updatedAt=Date.now();saveTask(updated);return {ok:true,status:'stream_ready',url:streamUrl(updated)}}if(updated){updated.streamStatus=updated.status==='no_files_returned'||updated.status==='no_playable_video_file'?updated.status:'stream_failed';updated.updatedAt=Date.now();saveTask(updated);return {ok:false,status:updated.streamStatus,error:updated.lastError||'Stream is not ready'}}return {ok:false,status:'task_missing'}},
    async open(taskId,startPosition){const out=document.getElementById('mediaTaskOut');if(out)AsState.setLoading(out,'Opening player','Preparing stream URL and player handoff.');let task=findTask(taskId);let url=streamUrl(task);if(!url){const prepared=await this.prepare(taskId);if(!prepared.ok){if(out)AsState.setError(out,'Cannot open stream',prepared.error||prepared.status,[{label:'Prepare stream',action:"AsStreamReady.prepare('"+taskId+"')"},{label:'Diagnostics',action:"AsMediaTask.diag('"+taskId+"')"}]);return;}task=findTask(taskId);url=streamUrl(task)}const result=openNative(url,task.title||task.name,task.id,Number(startPosition||0));task.lastPlayerOpen=result;task.streamStatus=result.ok?'opened':'stream_failed';task.updatedAt=Date.now();saveTask(task);if(!result.ok){if(out)AsState.setError(out,'Player handoff failed',result.error||result.status,[{label:'Diagnostics',action:"AsMediaTask.diag('"+taskId+"')"}]);return;}if(out)AsState.setSuccess(out,'Player opened',result.status||'opened_native')},
    cancel(taskId){const task=findTask(taskId);if(!task)return;task.streamStatus='cancelled';task.lastError='Stream preparation cancelled by user.';task.updatedAt=Date.now();saveTask(task);AsMediaTask.render(taskId)}
  };
  function boot(){if(!AsStreamReady.install())setTimeout(boot,100)}
  boot();
})();
