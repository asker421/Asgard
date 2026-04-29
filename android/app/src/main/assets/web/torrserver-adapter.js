(function(){
  function joinUrl(base,path){base=String(base||'').trim().replace(/\/+$/,'');path=String(path||'').trim().replace(/^\/+/, '');return base+'/'+path}
  window.AsTorrServerAdapter={
    id:'torrserver',name:'TorrServer Adapter',
    base(){return String(AsStore.parserSettings().torrServerUrl||'').replace(/\/+$/,'')},
    async request(path,body){
      const base=this.base();
      if(!base)throw new Error('TorrServer URL is empty');
      const opts=body?{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json,text/plain,*/*'},body:JSON.stringify(body)}:{method:'GET',headers:{'Accept':'application/json,text/plain,*/*'}};
      const res=await fetch(joinUrl(base,path),opts);
      const text=await res.text();
      let data=text;try{data=JSON.parse(text)}catch(e){}
      return {ok:res.ok,status:res.status,data,text};
    },
    async testConnection(){const started=Date.now();try{let r=await this.request('echo');if(!r.ok)r=await this.request('version');return {ok:r.ok,status:r.ok?'ok':'http_error',httpStatus:r.status,version:typeof r.data==='string'?r.data:(r.data.version||r.data.Version||''),elapsedMs:Date.now()-started}}catch(e){return {ok:false,status:e.name==='AbortError'?'Timeout':e.message,error:e.message,elapsedMs:Date.now()-started}}},
    async addMagnet(magnetUrl){return this.request('torrents',{action:'add',link:magnetUrl})},
    async addTorrentUrl(torrentUrl){return this.request('torrents',{action:'add',link:torrentUrl})},
    async getTorrentList(){return this.request('torrents',{action:'list'})},
    async getTorrentMetadata(taskId){return this.request('torrents',{action:'get',hash:taskId})},
    async getFiles(taskId){const r=await this.getTorrentMetadata(taskId);const d=r.data||{};return d.files||d.Files||d.file_stats||[]},
    selectLargestVideoFile(files){const exts=['mp4','mkv','avi','mov','m4v','webm'];const videos=(files||[]).map((f,i)=>Object.assign({index:i},f)).filter(f=>exts.includes(String(f.name||f.path||'').split('.').pop().toLowerCase()));return videos.sort((a,b)=>Number(b.length||b.size||0)-Number(a.length||a.size||0))[0]||null},
    getStreamUrl(taskId,fileIndex){return joinUrl(this.base(),'stream/'+encodeURIComponent(taskId)+'/'+encodeURIComponent(fileIndex))},
    async removeTask(taskId){return this.request('torrents',{action:'rem',hash:taskId})}
  };
})();
