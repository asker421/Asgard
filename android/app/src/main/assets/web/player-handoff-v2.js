(function(){
  function esc(v){return AsUI.escape(v)}
  function readTasks(){try{return AsStore.torrentTasks?AsStore.torrentTasks():[]}catch(e){return []}}
  function findTask(id){return readTasks().find(x=>String(x.id)===String(id))||null}
  function progressFor(id){try{return (AsStore.progress?AsStore.progress():[]).find(x=>String(x.itemId)===String(id))||null}catch(e){return null}}
  function playableUrl(task){if(!task)return '';if(task.streamUrl)return task.streamUrl;if(task.inputType==='direct_video'&&task.target)return task.target;return ''}
  function supportedUrl(url){return /^https?:\/\//i.test(url)||/^file:\/\//i.test(url)||/^content:\/\//i.test(url)}
  function bridgeOpen(url,title,startPosition,itemId){
    if(!url)return {ok:false,status:'missing_stream_url'};
    if(!supportedUrl(url))return {ok:false,status:'unsupported_url_scheme',url:url};
    if(window.AsgardBridge){
      try{
        if(AsgardBridge.openPlayerWithItem){AsgardBridge.openPlayerWithItem(url,title||url,Number(startPosition||0),itemId||title||url);return {ok:true,status:'opened_native_with_item_id',itemId:itemId||title||url}}
      }catch(e){return {ok:false,status:'openPlayerWithItem_failed',error:e.message||String(e)}}
      try{AsgardBridge.openPlayer(url,title||url,Number(startPosition||0));return {ok:true,status:'opened_native_legacy',itemId:title||url,warning:'legacy bridge stores progress by title'}}catch(e2){return {ok:false,status:'openPlayer_failed',error:e2.message||String(e2)}}
    }
    try{window.open(url,'_blank');return {ok:true,status:'opened_browser_fallback'}}catch(e3){return {ok:false,status:'browser_open_failed',error:e3.message||String(e3)}}
  }
  function setOut(type,title,msg,actions){const out=document.getElementById('mediaTaskOut');if(!out)return;const list=(actions||[]).map(a=>'<button class="btn focusable '+(a.cls||'')+'" onclick="'+a.action+'">'+esc(a.label)+'</button>').join('');out.innerHTML='<div class="state-card '+type+'"><h2>'+esc(title)+'</h2><p>'+esc(msg||'')+'</p><div class="source-actions">'+list+'</div></div>';setTimeout(()=>AsInput&&AsInput.refresh&&AsInput.refresh(),30)}
  window.AsPlayerHandoffV2={
    openTask(taskId,startPosition){const task=findTask(taskId);if(!task){setOut('error','Task not found','The media task is missing.',[{label:'Back to Search',action:"AsUI.nav('Поиск')"}]);return {ok:false,status:'task_missing'}}const url=playableUrl(task);if(!url){setOut('error','Stream URL missing','Load metadata or prepare stream before opening player.',[{label:'Prepare stream',action:"AsStreamReady.prepare('"+taskId+"')"},{label:'Load metadata',action:"AsMediaTask.loadMetadata('"+taskId+"')"},{label:'Diagnostics',action:"AsMediaTask.diag('"+taskId+"')"}]);return {ok:false,status:'missing_stream_url',taskId:taskId}}setOut('loading','Opening player','Sending stream URL to native ExoPlayer with stable task id.');const result=bridgeOpen(url,task.title||task.name||'Media task',Number(startPosition||0),task.id);task.lastPlayerOpen=Object.assign({at:new Date().toISOString()},result);task.updatedAt=Date.now();try{AsStore.updateTorrentTask&&AsStore.updateTorrentTask(task)}catch(e){}if(!result.ok){setOut('error','Player handoff failed',result.error||result.status,[{label:'Diagnostics',action:"AsMediaTask.diag('"+taskId+"')"},{label:'Retry',action:"AsPlayerHandoffV2.openTask('"+taskId+"',"+Number(startPosition||0)+")"}]);return result}setOut('success','Player opened',result.status||'opened');return result},
    resume(taskId){const p=progressFor(taskId);return this.openTask(taskId,p?Number(p.position||0):0)},
    startOver(taskId){return this.openTask(taskId,0)},
    diagnostics(taskId){const task=findTask(taskId);const p=progressFor(taskId);return {taskId:taskId,taskFound:!!task,hasStreamUrl:!!playableUrl(task),urlScheme:playableUrl(task).split(':')[0]||'',progress:p||null,bridge:{present:!!window.AsgardBridge,openPlayer:!!(window.AsgardBridge&&AsgardBridge.openPlayer),openPlayerWithItem:!!(window.AsgardBridge&&AsgardBridge.openPlayerWithItem)},lastPlayerOpen:task&&task.lastPlayerOpen||null}}
  };
  function patch(){if(!window.AsMediaTask||!window.AsStore){setTimeout(patch,100);return;}if(AsMediaTask.__playerHandoffV2)return;AsMediaTask.__playerHandoffV2=true;const oldDiag=AsMediaTask.diag&&AsMediaTask.diag.bind(AsMediaTask);AsMediaTask.openStream=function(taskId,startPosition){return AsPlayerHandoffV2.openTask(taskId,startPosition||0)};AsMediaTask.resume=function(taskId){return AsPlayerHandoffV2.resume(taskId)};AsMediaTask.startOver=function(taskId){return AsPlayerHandoffV2.startOver(taskId)};AsMediaTask.diag=function(taskId){const base=AsPlayerHandoffV2.diagnostics(taskId);alert(JSON.stringify(base,null,2))};}
  patch();
})();
