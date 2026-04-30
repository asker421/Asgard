(function(){
  function joinUrl(base,path){base=String(base||'').trim().replace(/\/+$/,'');path=String(path||'').trim().replace(/^\/+/, '');return base+'/'+path}
  function asArray(v){return Array.isArray(v)?v:[]}
  function first(){for(let i=0;i<arguments.length;i++){const v=arguments[i];if(v!==undefined&&v!==null&&v!=='')return v}return ''}
  function extOf(v){const s=String(v||'').split('?')[0].split('#')[0];const p=s.split('.');return p.length>1?p.pop().toLowerCase():''}
  function isVideoName(v){return ['mp4','mkv','avi','mov','m4v','webm','ts','m2ts'].includes(extOf(v))}
  function normalizeFile(f,i){
    f=f||{};
    const name=String(first(f.name,f.Name,f.path,f.Path,f.filename,f.FileName,f.title,f.Title,'file-'+i));
    const path=String(first(f.path,f.Path,f.fullPath,f.FullPath,f.name,f.Name,name));
    const size=Number(first(f.length,f.Length,f.size,f.Size,f.sizeBytes,f.SizeBytes,f.bytes,f.Bytes,0));
    const indexRaw=first(f.id,f.index,f.Id,f.Index,f.fileIndex,f.FileIndex,i);
    const index=Number(indexRaw);
    const extension=extOf(path||name);
    return {index:isNaN(index)?i:index,name:name,path:path,sizeBytes:size,length:size,extension:extension,isVideo:isVideoName(path||name)};
  }
  function extractHash(data,result){
    const d=data||{};const r=result||{};
    return String(first(r.infoHash,r.hash,r.id,r.btih,d.hash,d.Hash,d.infoHash,d.InfoHash,d.torrentHash,d.TorrentHash,d.id,d.Id,d.key,d.Key,d.Torrent&&d.Torrent.Hash,d.torrent&&d.torrent.hash,''));
  }
  function extractFiles(data){
    const d=data||{};
    if(Array.isArray(d))return d.map(normalizeFile);
    const candidates=[d.files,d.Files,d.file_stats,d.FileStats,d.torrent_files,d.TorrentFiles,d.items,d.Items,d.list,d.List];
    for(const c of candidates){if(Array.isArray(c))return c.map(normalizeFile)}
    if(d.Torrent&&Array.isArray(d.Torrent.Files))return d.Torrent.Files.map(normalizeFile);
    if(d.torrent&&Array.isArray(d.torrent.files))return d.torrent.files.map(normalizeFile);
    if(d.data&&Array.isArray(d.data.files))return d.data.files.map(normalizeFile);
    if(d.Data&&Array.isArray(d.Data.Files))return d.Data.Files.map(normalizeFile);
    return [];
  }
  function normalizeFiles(files){return (files||[]).map(normalizeFile).map(f=>Object.assign({},f,{videoRank:f.isVideo?1:0}))}
  window.AsTorrServerAdapter={
    id:'torrserver',name:'TorrServer Adapter',
    base(){return String(AsStore.parserSettings().torrServerUrl||'').replace(/\/+$/,'')},
    configured(){return !!this.base()},
    async request(path,body){
      const base=this.base();
      if(!base)throw new Error('Configured service URL is empty');
      const opts=body?{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json,text/plain,*/*'},body:JSON.stringify(body)}:{method:'GET',headers:{'Accept':'application/json,text/plain,*/*'}};
      const fetcher=window.AsgardBridge&&AsgardBridge.nativeFetch;
      if(fetcher){
        const url=joinUrl(base,path);
        if(body){
          // Native bridge currently supports GET-style fetch only; POST requests still use browser fetch.
        }else{
          const raw=AsgardBridge.nativeFetch(url);
          const parsed=JSON.parse(raw||'{}');
          let data=parsed.body||'';try{data=JSON.parse(data)}catch(e){}
          return {ok:!!parsed.ok,status:parsed.status||0,data:data,text:parsed.body||'',url:parsed.url||url,contentType:parsed.contentType||'',error:parsed.error||''};
        }
      }
      const res=await fetch(joinUrl(base,path),opts);
      const text=await res.text();
      let data=text;try{data=JSON.parse(text)}catch(e){}
      return {ok:res.ok,status:res.status,data,text};
    },
    async testConnection(){const started=Date.now();try{let r=await this.request('echo');if(!r.ok)r=await this.request('version');return {ok:r.ok,status:r.ok?'ok':'http_error',httpStatus:r.status,version:typeof r.data==='string'?r.data:(r.data.version||r.data.Version||''),elapsedMs:Date.now()-started,error:r.error||''}}catch(e){return {ok:false,status:e.name==='AbortError'?'Timeout':e.message,error:e.message,elapsedMs:Date.now()-started}}},
    async addMagnet(magnetUrl){return this.request('torrents',{action:'add',link:magnetUrl})},
    async addTorrentUrl(torrentUrl){return this.request('torrents',{action:'add',link:torrentUrl})},
    async getTorrentList(){return this.request('torrents',{action:'list'})},
    async getTorrentMetadata(taskId){return this.request('torrents',{action:'get',hash:taskId})},
    async getFiles(taskId){const r=await this.getTorrentMetadata(taskId);return {ok:r.ok,status:r.status,error:r.error||'',data:r.data,files:normalizeFiles(extractFiles(r.data))}},
    selectLargestVideoFile(files){const videos=normalizeFiles(files).filter(f=>f.isVideo);return videos.sort((a,b)=>Number(b.length||b.sizeBytes||0)-Number(a.length||a.sizeBytes||0))[0]||null},
    getStreamUrl(taskId,fileIndex){return joinUrl(this.base(),'stream/'+encodeURIComponent(taskId)+'/'+encodeURIComponent(fileIndex))},
    async removeTask(taskId){return this.request('torrents',{action:'rem',hash:taskId})},
    async preparePlayableFromResult(result){
      const started=Date.now();
      try{
        if(!this.configured())return {ok:false,status:'service_not_configured',error:'Configured service URL is empty. Open Settings → Parser & service and set URL.'};
        const magnet=result&&result.magnetUrl||(String(result&&result.url||'').startsWith('magnet:?')?result.url:'');
        const torrentUrl=result&&result.torrentUrl||(!magnet?result&&result.url:'');
        if(!magnet&&!torrentUrl)return {ok:false,status:'missing_media_link',error:'No media link found in selected result.'};
        const add=magnet?await this.addMagnet(magnet):await this.addTorrentUrl(torrentUrl);
        if(!add.ok)return {ok:false,status:'service_add_failed',addResult:add,error:add.error||('HTTP '+add.status)};
        const taskId=extractHash(add.data,result);
        if(!taskId)return {ok:false,status:'missing_task_hash',addResult:add,error:'Service accepted the item, but no task/hash id was returned.'};
        const filesResult=await this.getFiles(taskId);
        const files=normalizeFiles(filesResult.files||[]);
        const selected=this.selectLargestVideoFile(files);
        if(!files.length)return {ok:false,status:'no_files_returned',taskId,addResult:add,filesResult,error:'Service returned no files for this item yet.'};
        if(!selected)return {ok:false,status:'no_playable_video_file',taskId,addResult:add,filesResult,files,error:'No supported video file found in metadata.'};
        const streamUrl=this.getStreamUrl(taskId,selected.index);
        return {ok:true,status:'stream_ready',taskId:taskId,taskHash:taskId,files,selectedFile:selected,selectedFileIndex:selected.index,streamUrl:streamUrl,addResult:add,filesResult:filesResult,elapsedMs:Date.now()-started};
      }catch(e){return {ok:false,status:'exception',error:e.message||String(e),elapsedMs:Date.now()-started}}
    }
  };
})();
