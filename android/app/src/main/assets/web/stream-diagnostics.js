(function(){
  function esc(v){return AsUI.escape(v)}
  function chip(v){return '<span class="chip">'+esc(v)+'</span>'}
  function readTasks(){try{return AsStore.torrentTasks?AsStore.torrentTasks():[]}catch(e){return []}}
  function findTask(id){return readTasks().find(x=>x.id===id)||null}
  function progressFor(id){try{return (AsStore.progress?AsStore.progress():[]).find(x=>x.itemId===id)||null}catch(e){return null}}
  function serviceConfigured(){return !!(window.AsTorrServerAdapter&&AsTorrServerAdapter.configured&&AsTorrServerAdapter.configured())}
  function hasBridge(){return !!(window.AsgardBridge&&AsgardBridge.openPlayer)}
  function streamUrl(task){return task&&(task.streamUrl||(task.inputType==='direct_video'?task.target:''))||''}
  function storageInfo(){try{if(window.AsgardBridge&&AsgardBridge.getDeviceStorageInfo)return JSON.parse(AsgardBridge.getDeviceStorageInfo()||'{}')}catch(e){return {ok:false,error:e.message||String(e)}}return {ok:false,status:'bridge_storage_unavailable'}}
  function taskReport(task){const progress=progressFor(task.id);const store=storageInfo();const url=streamUrl(task);return {ok:true,generatedAt:new Date().toISOString(),taskId:task.id,title:task.title||task.name||'',inputType:task.inputType,status:task.status,streamStatus:task.streamStatus||task.status,hasStreamUrl:!!url,streamUrlScheme:url?String(url).split(':')[0]:'',selectedFile:task.selectedFile||null,fileCount:(task.files||[]).length,serviceConfigured:serviceConfigured(),nativeBridge:hasBridge(),progress:progress?{position:progress.position,duration:progress.duration,updatedAt:progress.updatedAt}:null,storage:store,lastError:task.lastError||'',lastPlayerOpen:task.lastPlayerOpen||null,serviceError:task.serviceError||null}}
  function renderReport(r){return '<div class="panel"><h2>Stream diagnostics</h2><p>'+chip(r.streamStatus||'unknown')+chip(r.hasStreamUrl?'url ready':'url missing')+chip(r.nativeBridge?'native bridge':'no native bridge')+chip(r.serviceConfigured?'service configured':'service missing')+chip('files '+r.fileCount)+'</p><p class="muted">'+esc(r.lastError||'No current error.')+'</p><div class="source-actions"><button class="btn secondary focusable" onclick="AsStreamDiagnostics.copy(\''+r.taskId+'\')">Copy JSON</button><button class="btn secondary focusable" onclick="AsStreamDiagnostics.refresh(\''+r.taskId+'\')">Refresh diagnostics</button><button class="btn secondary focusable" onclick="AsStreamDiagnostics.clear(\''+r.taskId+'\')">Clear snapshot</button></div><pre>'+esc(JSON.stringify(r,null,2))+'</pre></div>'}
  window.AsStreamDiagnostics={
    last:{},
    report(taskId){const task=findTask(taskId);if(!task)return {ok:false,status:'task_missing',taskId};const r=taskReport(task);this.last[taskId]=r;return r},
    render(taskId){return renderReport(this.report(taskId))},
    attach(taskId){const out=document.getElementById('mediaTaskOut');if(!out||document.getElementById('streamDiagPanel'))return;out.insertAdjacentHTML('beforebegin','<div id="streamDiagPanel">'+this.render(taskId)+'</div>');setTimeout(()=>AsInput&&AsInput.refresh&&AsInput.refresh(),30)},
    refresh(taskId){const box=document.getElementById('streamDiagPanel');if(box)box.innerHTML=this.render(taskId);else this.attach(taskId)},
    clear(taskId){delete this.last[taskId];const box=document.getElementById('streamDiagPanel');if(box)box.innerHTML='<div class="panel"><h2>Stream diagnostics</h2><p class="muted">Snapshot cleared. Refresh to generate a new one.</p><button class="btn focusable" onclick="AsStreamDiagnostics.refresh(\''+taskId+'\')">Refresh diagnostics</button></div>';setTimeout(()=>AsInput&&AsInput.refresh&&AsInput.refresh(),30)},
    copy(taskId){const r=this.report(taskId);const text=JSON.stringify(r,null,2);if(navigator.clipboard){navigator.clipboard.writeText(text).then(()=>AsUI.toast('Diagnostics copied')).catch(()=>alert(text));}else alert(text)}
  };
  function boot(){if(!window.AsMediaTask||!window.AsApp){setTimeout(boot,100);return;}if(AsMediaTask.__streamDiagPatch)return;AsMediaTask.__streamDiagPatch=true;const oldRender=AsMediaTask.render.bind(AsMediaTask);AsMediaTask.render=function(taskId){oldRender(taskId);AsStreamDiagnostics.attach(taskId)};}
  boot();
})();
