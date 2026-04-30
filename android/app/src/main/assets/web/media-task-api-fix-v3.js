(function(){
  function esc(v){return window.AsUI&&AsUI.escape?AsUI.escape(v):String(v||'')}
  function chip(v){return '<span class="chip">'+esc(v)+'</span>'}
  function btn(label,action,cls){return '<button class="btn focusable '+(cls||'')+'" onclick="'+action+'">'+esc(label)+'</button>'}
  function targetOf(r){return String(r&&(r.streamUrl||r.magnetUrl||r.torrentUrl||r.url||r.link||'')||'').trim()}
  function kindOf(r){
    const t=targetOf(r);const k=String(r&&(r.kind||r.classification||r.type)||'').toLowerCase();
    if(/^magnet:\?/i.test(t)||r&&r.magnetUrl||k==='magnet')return 'magnet';
    if(/\.torrent($|\?)/i.test(t)||r&&r.torrentUrl||k==='torrent'||k==='torrent_url')return 'torrent_url';
    if(k==='playable'||k==='direct_video'||k==='hls'||k==='direct_stream'||/\.(mp4|m3u8|webm|mkv)(\?|$)/i.test(t))return 'direct_video';
    return t?'link':'unknown';
  }
  function taskId(){return 'media_task_'+Date.now()+'_'+Math.floor(Math.random()*10000)}
  function normalize(r){
    r=r||{};const inputType=kindOf(r);const target=targetOf(r);const isDirect=inputType==='direct_video';
    return {raw:r,inputType,target,isDirect,title:String(r.title||r.name||'Media result'),sourceName:String(r.sourceName||r.source||r.parserName||'User source'),quality:r.quality||'',sizeBytes:Number(r.sizeBytes||r.size||0),sizeLabel:r.sizeLabel||'',seeders:r.seeders,peers:r.peers,rightsStatus:r.rightsStatus||'User Source / Unknown Rights',requiresUserConfirmation:inputType==='magnet'||inputType==='torrent_url'||!!r.requiresUserConfirmation,description:r.description||''};
  }
  function saveTask(task){
    if(window.AsStore&&AsStore.updateTorrentTask)return AsStore.updateTorrentTask(task);
    const all=JSON.parse(localStorage.getItem('torrent_tasks')||'[]').filter(function(x){return x.id!==task.id});
    all.push(task);localStorage.setItem('torrent_tasks',JSON.stringify(all));return true;
  }
  function explain(n){
    if(n.inputType==='direct_video')return {ok:true,title:'Direct playable result',message:'Это прямой video/stream URL. Можно сразу открыть плеер.'};
    if(n.inputType==='magnet')return {ok:true,title:'Magnet result',message:'Это magnet result. Asgard автоматически отправит его в TorrServer, подтянет metadata/files и попробует подготовить stream URL.'};
    if(n.inputType==='torrent_url')return {ok:true,title:'Torrent result',message:'Это torrent URL. Asgard автоматически отправит его в TorrServer, подтянет metadata/files и попробует подготовить stream URL.'};
    if(n.inputType==='link')return {ok:false,title:'This is only a web link',message:'Это обычная веб-ссылка, не media task. Выберите direct video / magnet / torrent result или откройте ссылку.'};
    return {ok:false,title:'Unsupported result',message:'У результата нет stream URL, magnet или torrent URL.'};
  }
  function createTask(n){
    const now=Date.now();
    const task={id:taskId(),type:'media_search_result',inputType:n.inputType,title:n.title,name:n.title,target:n.target,sourceName:n.sourceName,quality:n.quality,sizeBytes:n.sizeBytes,size:n.sizeBytes,sizeLabel:n.sizeLabel,seeders:n.seeders,peers:n.peers,rightsStatus:n.rightsStatus,rightsConfirmed:!n.requiresUserConfirmation,requiresUserConfirmation:n.requiresUserConfirmation,status:n.isDirect?'stream_ready':'metadata_pending',streamStatus:n.isDirect?'stream_ready':'metadata_pending',lastError:n.isDirect?'Direct playable URL is ready.':'Auto metadata loading will start now.',createdAt:now,updatedAt:now,createdFrom:'search_task_fix_v3_auto_metadata',rawResult:n.raw,files:[],selectedFileIndex:-1,selectedFile:null,streamUrl:n.isDirect?n.target:'',autoMetadata:true,creation:{ok:true,path:n.isDirect?'direct_stream_ready':'auto_metadata_pending'}};
    saveTask(task);return task;
  }
  function startAutoMetadata(task,n){
    if(!task||n.isDirect)return;
    setTimeout(async function(){
      try{
        if(window.AsMediaTask&&AsMediaTask.loadMetadata){
          await AsMediaTask.loadMetadata(task.id);
          const latest=(window.AsStore&&AsStore.torrentTasks?AsStore.torrentTasks():[]).find(function(x){return x.id===task.id})||task;
          if(latest.streamUrl&&window.AsMediaTask&&AsMediaTask.openStream){
            // Keep user in task screen; do not auto-start playback without explicit action.
          }
          return;
        }
      }catch(e){
        try{task.status='metadata_error';task.lastError=e.message||String(e);task.updatedAt=Date.now();saveTask(task);if(window.AsMediaTask&&AsMediaTask.render)AsMediaTask.render(task.id)}catch(_e){}
      }
    },600);
  }
  function renderCreated(task,n){
    const auto=n.isDirect?'':'<p>'+esc('Metadata/files loading starts automatically. If the service is slow, wait a few seconds or open Diagnostics. Вручную нажимать Load metadata больше не нужно.')+'</p>';
    const body='<div class="panel"><h2>Media task created</h2><p>'+chip(task.status)+chip(task.inputType)+chip(task.sourceName)+(task.quality?chip(task.quality):'')+(task.seeders!==undefined?chip('S '+task.seeders):'')+'</p><p class="muted">'+esc(task.streamUrl||task.target)+'</p><p>'+esc(explain(n).message)+'</p>'+auto+'<div class="source-actions">'+btn('Open task','AsMediaTask.render(\''+task.id+'\')')+(task.streamUrl?btn('Open stream','AsMediaTask.openStream(\''+task.id+'\')','secondary'):btn('Refresh metadata','AsMediaTask.loadMetadata(\''+task.id+'\')','secondary'))+btn('Back to Search','AsUI.nav(\'Поиск\')','secondary')+'</div></div>';
    if(window.AsApp&&AsApp.shell)AsApp.shell('Media task','Search result converted into persistent media task.',body);else alert(JSON.stringify({ok:true,task},null,2));
    setTimeout(function(){if(window.AsMediaTask&&AsMediaTask.render)AsMediaTask.render(task.id);if(window.AsInput&&AsInput.refresh)AsInput.refresh();startAutoMetadata(task,n)},250);
  }
  function renderError(info,n){
    const body=(window.AsState&&AsState.error?AsState.error(info.title,info.message,[{label:'Back to Search',action:"AsUI.nav('Поиск')"},{label:'Open link',action:'AsSearchTaskFixV3.openCurrentLink()'},{label:'Diagnostics',action:'AsSearchTaskFixV3.inspectCurrent()'}]):'<div class="panel"><h2>'+esc(info.title)+'</h2><p>'+esc(info.message)+'</p></div>')+'<pre>'+esc(JSON.stringify({normalized:n,raw:n.raw},null,2))+'</pre>';
    if(window.AsApp&&AsApp.shell)AsApp.shell('Cannot create media task','Selected result is not directly convertible into a media task.',body);else alert(JSON.stringify({ok:false,info,n},null,2));
    setTimeout(function(){if(window.AsInput&&AsInput.refresh)AsInput.refresh()},50);
  }
  window.AsSearchTaskFixV3={
    current:null,
    createFromResult:function(r){const n=normalize(r);this.current=n;const info=explain(n);if(!info.ok){renderError(info,n);return null;}if(n.requiresUserConfirmation){const ok=confirm('I confirm I have rights to access this content.');if(!ok)return null;n.raw.rightsConfirmed=true;}const task=createTask(n);renderCreated(task,n);return task;},
    createByIndex:function(i){const r=window.AsMediaSearch&&AsMediaSearch.items?AsMediaSearch.items[i]:null;if(!r){alert(JSON.stringify({ok:false,status:'result_missing',index:i},null,2));return null;}return this.createFromResult(r);},
    inspectCurrent:function(){alert(JSON.stringify(this.current||{},null,2));},
    openCurrentLink:function(){const n=this.current;if(!n||!n.target)return;if(window.AsgardBridge&&AsgardBridge.openExternalUrl)AsgardBridge.openExternalUrl(n.target);else window.open(n.target,'_blank');}
  };
  function patch(){if(!window.AsMediaSearch){setTimeout(patch,100);return;}AsMediaSearch.createTask=function(i){return AsSearchTaskFixV3.createByIndex(i)};AsMediaSearch.diag=function(i){const r=this.items&&this.items[i];if(!r){alert(JSON.stringify({ok:false,status:'result_missing',index:i},null,2));return;}const n=normalize(r);alert(JSON.stringify({normalized:n,explain:explain(n),raw:r.raw||r},null,2));};AsMediaSearch.__taskApiFixV3=true;}
  patch();
})();
