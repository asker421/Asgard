window.AsSources={
  types:['official_youtube','archive','commons','rss','api','json','xml','search_template','magnet_list','torrent_file'],
  policy:'Use only media and sources that you have the right to access. User sources are treated as User Source / Unknown Rights.',
  example:'# name | type | url_or_template | language | enabled | priority | auth_required | notes\nExample Public API | api | https://example.invalid/api/search?q={query} | en | false | 10 | false | placeholder only\nExample Search Template | search_template | https://example.invalid/search?q={query} | en | false | 20 | false | placeholder only\n',
  rows(text){
    return String(text||'').split('\n').map((line,i)=>({raw:line,line:line.trim(),row:i+1}));
  },
  parse(text){
    return this.rows(text).filter(x=>x.line&& !x.line.startsWith('#')).map(x=>{
      const p=x.line.split('|').map(v=>v.trim());
      const item={row:x.row,raw:x.raw,ok:false,name:p[0]||'',type:p[1]||'',url:p[2]||'',language:p[3]||'',enabled:p[4]==='true',priority:Number(p[5]||0),auth:p[6]==='true',notes:p[7]||'',rights:'User Source / Unknown Rights',error:'',warning:''};
      if(p.length!==8)item.error='Line must have 8 columns: name | type | url_or_template | language | enabled | priority | auth_required | notes';
      else if(!item.name)item.error='Source name is required';
      else if(!this.types.includes(item.type))item.error='Unsupported source type: '+item.type;
      else if(!item.url)item.error='URL or template is required';
      else if(item.type==='search_template'&&!item.url.includes('{query}'))item.error='search_template must include {query}';
      else if(!['true','false'].includes(p[4]))item.error='enabled must be true or false';
      else if(!['true','false'].includes(p[6]))item.error='auth_required must be true or false';
      else if(Number.isNaN(item.priority))item.error='priority must be a number';
      else if(/^https?:\/\/example\.invalid/i.test(item.url))item.warning='Placeholder example source; keep disabled unless replaced by your own legal source';
      item.ok=!item.error;
      return item;
    }).sort((a,b)=>(a.priority||999)-(b.priority||999));
  },
  summary(text){
    const rows=this.rows(text);
    const parsed=this.parse(text);
    const nonEmpty=rows.filter(x=>x.line).length;
    const comments=rows.filter(x=>x.line.startsWith('#')).length;
    const valid=parsed.filter(x=>x.ok);
    const invalid=parsed.filter(x=>!x.ok);
    const enabled=valid.filter(x=>x.enabled);
    const disabled=valid.filter(x=>!x.enabled);
    const auth=valid.filter(x=>x.auth);
    const placeholders=valid.filter(x=>/^https?:\/\/example\.invalid/i.test(x.url));
    const byType=valid.reduce((a,x)=>{a[x.type]=(a[x.type]||0)+1;return a},{});
    return {totalRows:rows.length,nonEmptyRows:nonEmpty,commentRows:comments,sourceRows:parsed.length,validRows:valid.length,invalidRows:invalid.length,enabledRows:enabled.length,disabledRows:disabled.length,authRequiredRows:auth.length,placeholderRows:placeholders.length,byType,items:parsed,valid,invalid};
  },
  serialize(list){
    return '# name | type | url_or_template | language | enabled | priority | auth_required | notes\n'+(list||[]).map(x=>[x.name,x.type,x.url,x.language,x.enabled?'true':'false',x.priority||10,x.auth?'true':'false',x.notes||'user source'].join(' | ')).join('\n')+'\n';
  },
  preview(text){
    const s=this.summary(text);
    const header=['Summary: '+s.validRows+' valid, '+s.invalidRows+' invalid, '+s.commentRows+' comments, '+s.enabledRows+' enabled','Policy: '+this.policy];
    const lines=s.items.map(x=>x.ok?'OK '+x.row+': '+x.name+' ('+x.type+', '+(x.enabled?'enabled':'disabled')+')'+(x.warning?' — WARN: '+x.warning:''):'ERROR '+x.row+': '+x.error);
    return header.concat(lines.length?lines:['No source rows found']).join('\n');
  },
  diagnostics(list){
    return (list||[]).map(x=>({name:x.name,type:x.type,status:x.ok?(x.enabled?'enabled':'disabled'):'error',message:x.error||x.warning||'format ok',rights:x.rights||'User Source / Unknown Rights'}));
  },
  search(list,q){
    const query=(q||'').toLowerCase();
    return (list||[]).filter(x=>x.ok&&x.enabled).filter(x=>!query||x.name.toLowerCase().includes(query)||x.type.toLowerCase().includes(query)||x.notes.toLowerCase().includes(query)||x.url.toLowerCase().includes(query));
  }
};
