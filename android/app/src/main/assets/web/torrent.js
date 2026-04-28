window.AsTorrent={
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
  makeTask(parsed){
    return {id:parsed.infoHash,name:parsed.name,type:'magnet',infoHash:parsed.infoHash,raw:parsed.raw,trackers:parsed.trackers||[],webSeeds:parsed.webSeeds||[],status:'metadata_pending',attempts:0,lastError:'',rightsStatus:'User Source / Unknown Rights',createdAt:Date.now(),updatedAt:Date.now()};
  },
  simulateMetadata(task){
    const copy=Object.assign({},task);
    copy.attempts=(copy.attempts||0)+1;
    copy.updatedAt=Date.now();
    copy.status='metadata_timeout';
    copy.lastError='Metadata engine is not implemented yet. This placeholder validates input and saves the task without crashing.';
    return copy;
  },
  diagnostics(tasks){return tasks.map(t=>({id:t.id,name:t.name,status:t.status,attempts:t.attempts||0,hasInfoHash:!!t.infoHash,trackers:(t.trackers||[]).length,lastError:t.lastError||'',rightsStatus:t.rightsStatus||'User Source / Unknown Rights'}))}
};
