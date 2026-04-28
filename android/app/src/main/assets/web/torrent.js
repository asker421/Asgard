window.AsTorrent={
  videoExt:['mp4','mkv','avi','mov','m4v','webm'],
  isMagnet(v){return String(v||'').trim().startsWith('magnet:?')},
  isValidInfoHash(h){return /^[a-fA-F0-9]{40}$/.test(h)||/^[A-Z2-7a-z2-7]{32}$/.test(h)},
  parseMagnet(uri){
    const out={type:'magnet',raw:uri,ok:false,error:'',infoHash:'',name:'',trackers:[],webSeeds:[],status:'invalid'};
    try{
      if(!this.isMagnet(uri)){out.error='Введите magnet-ссылку, начинающуюся с magnet:?';return out}
      const query=uri.substring(uri.indexOf('?')+1);
      const params=new URLSearchParams(query);
      const xt=params.get('xt')||'';
      const match=xt.match(/^urn:btih:([a-zA-Z0-9]+)$/);
      if(!match){out.error='Не найден обязательный параметр xt=urn:btih:<hash>';return out}
      out.infoHash=match[1];
      if(!this.isValidInfoHash(out.infoHash)){out.error='Info hash должен быть 40 hex или 32 base32 символа';return out}
      out.name=params.get('dn')||out.infoHash;
      out.trackers=params.getAll('tr');
      out.webSeeds=params.getAll('ws');
      out.ok=true;
      out.status='metadata_pending';
      return out;
    }catch(e){out.error='Ошибка разбора magnet: '+e.message;return out}
  },
  isTorrentFileName(name){return String(name||'').toLowerCase().trim().endsWith('.torrent')},
  parseTorrentFileImport(file){
    const out={type:'torrent_file',ok:false,error:'',name:'',uri:'',sizeBytes:-1,status:'invalid'};
    try{
      const f=file||{};
      out.name=String(f.name||'selected.torrent');
      out.uri=String(f.uri||'');
      out.sizeBytes=Number(f.sizeBytes||-1);
      if(!out.uri){out.error='Файл не выбран или Android не вернул URI';return out}
      if(!this.isTorrentFileName(out.name)&&!out.uri.toLowerCase().includes('.torrent')){out.error='Ожидается файл с расширением .torrent';return out}
      if(out.sizeBytes===0){out.error='Файл пустой';return out}
      out.ok=true;
      out.status='metadata_pending';
      return out;
    }catch(e){out.error='Ошибка проверки .torrent файла: '+e.message;return out}
  },
  makeTask(parsed){
    if(parsed.type==='torrent_file'){
      return {id:'torrent_file_'+Date.now(),name:parsed.name,type:'torrent_file',uri:parsed.uri,sizeBytes:parsed.sizeBytes,status:'metadata_pending',attempts:0,lastError:'',rightsStatus:'User Source / Unknown Rights',files:[],selectedFileIndex:-1,createdAt:Date.now(),updatedAt:Date.now()};
    }
    return {id:parsed.infoHash,name:parsed.name,type:'magnet',infoHash:parsed.infoHash,raw:parsed.raw,trackers:parsed.trackers||[],webSeeds:parsed.webSeeds||[],status:'metadata_pending',attempts:0,lastError:'',rightsStatus:'User Source / Unknown Rights',files:[],selectedFileIndex:-1,createdAt:Date.now(),updatedAt:Date.now()};
  },
  ext(path){const p=String(path||'').split('?')[0].toLowerCase();const i=p.lastIndexOf('.');return i>=0?p.substring(i+1):''},
  isVideoFile(file){return this.videoExt.includes(this.ext(file&&file.path||file&&file.name||''))},
  formatBytes(n){n=Number(n||0);if(n<0)return 'unknown';if(n<1024)return n+' B';if(n<1048576)return (n/1024).toFixed(1)+' KB';if(n<1073741824)return (n/1048576).toFixed(1)+' MB';return (n/1073741824).toFixed(2)+' GB'},
  inferMockFiles(task){
    const base=String(task.name||task.infoHash||'video').replace(/\.torrent$/i,'');
    const size=Number(task.sizeBytes||0);
    const videoSize=size>1048576?size*700:2147483648;
    const files=[
      {index:0,path:base+'/'+base+'.mkv',name:base+'.mkv',sizeBytes:videoSize,extension:'mkv'},
      {index:1,path:base+'/sample.mp4',name:'sample.mp4',sizeBytes:52428800,extension:'mp4'},
      {index:2,path:base+'/poster.jpg',name:'poster.jpg',sizeBytes:512000,extension:'jpg'},
      {index:3,path:base+'/readme.txt',name:'readme.txt',sizeBytes:4096,extension:'txt'}
    ];
    return files.map(f=>Object.assign({},f,{isVideo:this.isVideoFile(f),sizeLabel:this.formatBytes(f.sizeBytes)}));
  },
  chooseDefaultFile(files){
    const videos=(files||[]).filter(f=>f.isVideo);
    if(!videos.length)return -1;
    return videos.sort((a,b)=>Number(b.sizeBytes||0)-Number(a.sizeBytes||0))[0].index;
  },
  attachMetadata(task,files){
    const copy=Object.assign({},task);
    const list=(files&&files.length?files:this.inferMockFiles(task)).map((f,i)=>Object.assign({index:i},f,{isVideo:this.isVideoFile(f),extension:this.ext(f.path||f.name),sizeLabel:this.formatBytes(f.sizeBytes)}));
    copy.files=list;
    copy.selectedFileIndex=this.chooseDefaultFile(list);
    copy.status=list.some(f=>f.isVideo)?'metadata_ready':'no_playable_video';
    copy.lastError=copy.status==='no_playable_video'?'В torrent metadata не найден поддерживаемый видеофайл.':'Тестовая metadata готова. Реальный bencode/P2P parser будет добавлен отдельно.';
    copy.updatedAt=Date.now();
    return copy;
  },
  selectFile(task,fileIndex){
    const copy=Object.assign({},task);
    const files=copy.files||[];
    const file=files.find(f=>Number(f.index)===Number(fileIndex));
    if(!file){copy.lastError='Файл не найден в metadata';copy.status='file_selection_error';return copy}
    if(!file.isVideo){copy.lastError='Выбранный файл не похож на поддерживаемое видео. Поддерживаются mp4/mkv/avi/mov/m4v/webm.';copy.status='file_selection_error';return copy}
    copy.selectedFileIndex=Number(fileIndex);
    copy.status='file_selected';
    copy.lastError='Выбран файл: '+(file.path||file.name);
    copy.updatedAt=Date.now();
    return copy;
  },
  selectedFile(task){const files=task&&task.files||[];return files.find(f=>Number(f.index)===Number(task.selectedFileIndex))||null},
  simulateMetadata(task){
    const copy=Object.assign({},task);
    copy.attempts=(copy.attempts||0)+1;
    copy.updatedAt=Date.now();
    return this.attachMetadata(copy);
  },
  diagnostics(tasks){return tasks.map(t=>({id:t.id,name:t.name,type:t.type,status:t.status,attempts:t.attempts||0,hasInfoHash:!!t.infoHash,hasUri:!!t.uri,sizeBytes:t.sizeBytes||-1,trackers:(t.trackers||[]).length,files:(t.files||[]).length,videoFiles:(t.files||[]).filter(f=>f.isVideo).length,selectedFileIndex:typeof t.selectedFileIndex==='number'?t.selectedFileIndex:-1,selectedFile:this.selectedFile(t),lastError:t.lastError||'',rightsStatus:t.rightsStatus||'User Source / Unknown Rights'}))}
};
