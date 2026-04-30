(function(){
  function joinUrl(base,path){base=String(base||'').trim().replace(/\/+$/,'');path=String(path||'').trim().replace(/^\/+/, '');return base+'/'+path}
  function asArray(v){return Array.isArray(v)?v:[]}
  function normalizeFile(f,i){
    const name=String(f.name||f.Name||f.path||f.Path||f.filename||f.FileName||('file-'+i));
    const path=String(f.path||f.Path||f.name||f.Name||name);
    const size=Number(f.length||f.Length||f.size||f.Size||f.sizeBytes||0);
    const index=Number(f.id!==undefined?f.id:(f.index!==undefined?f.index:(f.Id!==undefined?f.Id:i)));
    return {index:isNaN(index)?i:index,name:name,path:path,sizeBytes:size,length:size};
  }
  function extractFiles(data){
    const d=data||{};
    if(Array.isArray(d))return d.map(normalizeFile);
    const candidates=[d.files,d.Files,d.file_stats,d.FileStats,d.torrent_files,d.TorrentFiles];
    for(const c of candidates){if(Array.isArray(c))return c.map(normalizeFile)}
    if(d.Torrent&&Array.isArray(d.Torrent.Files))return d.Torrent.Files.map(normalizeFile);
    if(d.torrent&&Array.isArray(d.torrent.files))return d.torrent.files.map(normalizeFile);
    return [];
  }
  window.AsTorrServerAdapter={
    id:'torrserver',name:'TorrServer Adapter',
    base(){return String(AsStore.parserSettings().torrServerUrl||'').replace(/\/+$/,'')},
    configured(){return !!this.base()},
    async request(path,body){
      const base=this.base();
      if(!base)throw new Error('TorrServer URL is empty');
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
    async getFiles(taskId){const r=await this.getTorrentMetadata(taskId);return {ok:r.ok,status:r.status,error:r.error||'',data:r.data,files:extractFiles(r.data)}} ,
    selectLargestVideoFile(files){const exts=['mp4','mkv','avi','mov','m4v','webm'];const videos=(files||[]).map(normalizeFile).filter(f=>exts.includes(String(f.name||f.path||'').split('.').pop().toLowerCase()));return videos.sort((a,b)=>Number(b.length||b.sizeBytes||0)-Number(a.length||a.sizeBytes||0))[0]||null},
    getStreamUrl(taskId,fileIndex){return joinUrl(this.base(),'stream/'+encodeURIComponent(taskId)+'/'+encodeURIComponent(fileIndex))},
    async removeTask(taskId){return this.request('torrents',{action:'rem',hash:taskId})},
    async preparePlayableFromResult(result){
      const started=Date.now();
      try{
        if(!this.configured())return {ok:false,status:'torrserver_not_configured',error:'TorrServer URL is empty. Open Settings → Parser & TorrServer and set TorrServer URL.'};
        const magnet=result&&result.magnetUrl||(String(result&&result.url||'').startsWith('magnet:?')?result.url:'');
        const torrentUrl=result&&result.torrentUrl||(!magnet?result&&result.url:'');
        if(!magnet&&!torrentUrl)return {ok:false,status:'missing_torrent_or_magnet',error:'No magnet or torrent URL found.'};
        const add=magnet?await this.addMagnet(magnet):await this.addTorrentUrl(torrentUrl);
        if(!add.ok)return {ok:false,status:'torrserver_add_failed',addResult:add,error:add.error||('HTTP '+add.status)};
        const taskId=result.infoHash||result.hash||result.id||result.btih||'';
        if(!taskId)return {ok:false,status:'missing_task_hash',addResult:add,error:'TorrServer add succeeded, but result has no hash/task id. Try Diagnostics or open TorrServer UI.'};
        const filesResult=await this.getFiles(taskId);
        const selected=this.selectLargestVideoFile(filesResult.files||[]);
        if(!selected)return {ok:false,status:'no_playable_video_file',addResult:add,filesResult:filesResult,error:'No supported video file found in TorrServer metadata.'};
        const streamUrl=this.getStreamUrl(taskId,selected.index);
        return {ok:true,status:'stream_ready',taskId:taskId,selectedFile:selected,streamUrl:streamUrl,addResult:add,filesResult:filesResult,elapsedMs:Date.now()-started};
      }catch(e){return {ok:false,status:'exception',error:e.message||String(e),elapsedMs:Date.now()-started}}
    }
  };
})();
