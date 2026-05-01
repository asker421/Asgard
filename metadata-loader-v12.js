(function(){
  function tasks(){try{return AsStore&&AsStore.torrentTasks?AsStore.torrentTasks():JSON.parse(localStorage.getItem('torrent_tasks')||'[]')}catch(e){return []}}
  function save(t){try{if(AsStore&&AsStore.updateTorrentTask)return AsStore.updateTorrentTask(t);const a=tasks().filter(x=>x.id!==t.id);a.push(t);localStorage.setItem('torrent_tasks',JSON.stringify(a));return true}catch(e){return false}}
  function find(id){return tasks().find(x=>String(x.id)===String(id))||null}
  function sleep(ms){return new Promise(r=>setTimeout(r,ms))}
  function btih(v){const m=String(v||'').match(/btih:([a-zA-Z0-9]+)/i)||String(v||'').match(/[?&]xt=urn:btih:([^&]+)/i);return m?decodeURIComponent(m[1]).toLowerCase():''}
  function target(t){return String(t.magnetUrl||t.torrentUrl||t.target||t.url||t.rawResult&&t.rawResult.magnetUrl||t.rawResult&&t.rawResult.torrentUrl||t.rawResult&&t.rawResult.url||'')}
  function ext(s){const p=String(s||'').split('?')[0].split('#')[0].split('.');return p.length>1?p.pop().toLowerCase():''}
  function isVideo(s){return ['mp4','mkv','avi','mov','m4v','webm','ts','m2ts'].includes(ext(s))}
  function normFile(f,i){f=f||{};const name=String(f.name||f.Name||f.path||f.Path||f.filename||f.FileName||('file '+i));const path=String(f.path||f.Path||f.fullPath||f.FullPath||name);const size=Number(f.sizeBytes||f.length||f.Length||f.size||f.Size||f.bytes||f.Bytes||0);const idx=Number(f.index!==undefined?f.index:(f.id!==undefined?f.id:(f.fileIndex!==undefined?f.fileIndex:i)));return {index:isNaN(idx)?i:idx,name:name,path:path,sizeBytes:size,length:size,extension:ext(path||name),isVideo:!!(f.isVideo||isVideo(path||name)),raw:f}}
  function filesFrom(d){if(!d)return [];if(Array.isArray(d))return d.map(normFile);const c=[d.files,d.Files,d.file_stats,d.FileStats,d.torrent_files,d.TorrentFiles,d.items,d.Items,d.list,d.List,d.data&&d.data.files,d.Data&&d.Data.Files,d.torrent&&d.torrent.files,d.Torrent&&d.Torrent.Files];for(const x of c){if(Array.isArray(x))return x.map(normFile)}return []}
  function best(files){return (files||[]).filter(f=>f.isVideo).sort((a,b)=>Number(b.sizeBytes||0)-Number(a.sizeBytes||0))[0]||null}
  function hashFromAny(x,task){const d=x&&x.data||x||{};return String(task.taskHash||task.taskId||btih(target(task))||d.hash||d.Hash||d.infoHash||d.InfoHash||d.torrentHash||d.TorrentHash||d.id||d.Id||d.key||d.Key||d.torrent&&d.torrent.hash||d.Torrent&&d.Torrent.Hash||'').toLowerCase()}
  async function callAdapter(task){
    if(!window.AsTorrServerAdapter)return {ok:false,status:'adapter_missing',error:'TorrServer adapter missing'};
    if(!AsTorrServerAdapter.configured||!AsTorrServerAdapter.configured())return {ok:false,status:'service_not_configured',error:'TorrServer URL is empty'};
    const link=target(task);if(!link)return {ok:false,status:'target_missing',error:'No magnet/torrent target in task'};
    const input=String(task.inputType||'');
    let add=null;try{add=input==='torrent'||/\.torrent($|\?)/i.test(link)?await AsTorrServerAdapter.addTorrentUrl(link):await AsTorrServerAdapter.addMagnet(link)}catch(e){return {ok:false,status:'add_exception',error:e.message||String(e)}}
    let hash=hashFromAny(add,task);
    if(!hash){try{const list=await AsTorrServerAdapter.getTorrentList();hash=hashFromAny(list,task)}catch(e){}}
    if(!hash)return {ok:false,status:'hash_pending',add:add,error:'Service did not return torrent hash yet'};
    let last=null;
    for(let i=0;i<6;i++){
      try{last=await AsTorrServerAdapter.getFiles(hash);const files=filesFrom(last.files&&last.files.length?last.files:last.data);const selected=best(files);if(selected){const streamUrl=AsTorrServerAdapter.getStreamUrl(hash,selected.index);return {ok:true,status:'stream_ready',taskHash:hash,files:files,selectedFile:selected,selectedFileIndex:selected.index,streamUrl:streamUrl,filesResult:last,addResult:add,attempt:i+1}}}catch(e){last={ok:false,error:e.message||String(e)}}
      await sleep(1200);
    }
    const files=filesFrom(last&&last.files&&last.files.length?last.files:last&&last.data);return {ok:false,status:files.length?'no_playable_video_file':'metadata_pending',taskHash:hash,files:files,filesResult:last,addResult:add,error:files.length?'Files loaded, but no supported video found':'Metadata/files not ready yet'};
  }
  async function load(taskId){let task=find(taskId);if(!task)return {ok:false,status:'task_missing'};task.status='metadata_loading';task.lastError='Loading metadata/files from TorrServer';task.updatedAt=Date.now();save(task);const res=await callAdapter(task);task=find(taskId)||task;if(res.ok){task.taskHash=res.taskHash;task.files=res.files||[];task.selectedFile=res.selectedFile||null;task.selectedFileIndex=res.selectedFileIndex;task.streamUrl=res.streamUrl||'';task.status='stream_ready';task.lastError='Stream URL is ready';task.service=res}else{task.taskHash=res.taskHash||task.taskHash||'';task.files=res.files||task.files||[];task.status=res.status||'metadata_error';task.lastError=res.error||res.status||'Metadata loading failed';task.serviceError=res}task.updatedAt=Date.now();save(task);if(window.AsMediaTask&&AsMediaTask.render)AsMediaTask.render(task.id);return {ok:!!res.ok,status:task.status,task:task,error:task.lastError,result:res}}
  function install(){window.AsMediaTask=window.AsMediaTask||{};AsMediaTask.loadMetadata=load;window.AsMetadataLoaderV12={load:load};}
  install();setTimeout(install,500);setTimeout(install,1600);
})();
