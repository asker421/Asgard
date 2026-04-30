(function(){
  function esc(v){return String(v||'')}
  function keyOf(r){return esc(r.url||r.magnetUrl||r.torrentUrl||r.title||r.id).toLowerCase().trim()}
  function safeUrl(href,base){try{return new URL(href,base).toString()}catch(e){return ''}}
  function containsQuery(r,q){q=esc(q).toLowerCase();if(!q)return true;return esc((r.title||'')+' '+(r.description||'')+' '+(r.url||'')+' '+(r.sourceName||'')).toLowerCase().includes(q)}
  function rank(r,query){let score=0;const q=esc(query).toLowerCase();const title=esc(r.title).toLowerCase();if(r.classification==='playable')score+=60;if(r.classification==='torrent')score+=45;if(r.classification==='magnet')score+=42;if(r.classification==='link')score+=15;if(q&&title===q)score+=50;else if(q&&title.includes(q))score+=28;if(r.quality)score+=4;if(r.size)score+=3;if(Number(r.seeders||0)>0)score+=Math.min(20,Math.log2(Number(r.seeders)+1)*4);score-=Number(r.sourcePriority||0)/100;return Math.round(score*100)/100}
  function dedupe(results,query){const seen={};return (results||[]).map(function(r,i){const x=Object.assign({},r);x.rank=rank(x,query);x.order=i;return x}).filter(function(r){const k=keyOf(r);if(!k)return false;if(seen[k])return false;seen[k]=true;return true}).sort(function(a,b){return (b.rank-a.rank)||(a.order-b.order)}).slice(0,120)}
  function group(results){const g={playable:[],torrent:[],magnet:[],link:[],not_playable:[]};(results||[]).forEach(function(r){const k=r.classification||'not_playable';(g[k]||(g[k]=[])).push(r)});return g}
  function summary(results,reports){const s=window.AsSources.summarize(results||[]);s.errors=(reports||[]).filter(function(r){return !r.ok}).length;s.empty=(reports||[]).filter(function(r){return r.ok&&!(r.results||[]).length}).length;s.sources=(reports||[]).length;return s}
  function patch(){
    if(!window.AsSources||AsSources.__hardSearchPatched){return;}
    AsSources.__hardSearchPatched=true;
    const oldParseHtmlLinks=AsSources.parseHtmlLinks.bind(AsSources);
    const oldQuerySource=AsSources.querySource.bind(AsSources);
    AsSources.parseHtmlLinks=function(source,html,query){
      try{
        const doc=new DOMParser().parseFromString(String(html||''),'text/html');
        const q=String(query||'').toLowerCase();
        const raw=[];
        Array.from(doc.querySelectorAll('a[href]')).forEach(function(a){const u=safeUrl(a.getAttribute('href'),source.url);if(u)raw.push({title:(a.textContent||a.getAttribute('title')||source.name).trim(),url:u});});
        Array.from(doc.querySelectorAll('video[src],source[src]')).forEach(function(v){const u=safeUrl(v.getAttribute('src'),source.url);if(u)raw.push({title:v.getAttribute('title')||source.name,url:u});});
        return raw.slice(0,180).map((x,i)=>this.normalizeResult(source,x,i)).filter(r=>containsQuery(r,q)||['playable','magnet','torrent'].includes(r.classification)).slice(0,80);
      }catch(e){
        try{return oldParseHtmlLinks(source,html,query)}catch(_){return []}
      }
    };
    AsSources.querySource=async function(source,query){
      const started=Date.now();
      try{
        const r=await oldQuerySource(source,query);
        const results=(r.results||[]).map(function(x){return Object.assign({sourcePriority:source.priority||0},x,{sourcePriority:source.priority||0})});
        return Object.assign({},r,{results:dedupe(results,query),elapsedMs:r.elapsedMs||Date.now()-started});
      }catch(e){
        return {source:source.name,type:source.type,ok:false,status:'exception',error:e.message||String(e),elapsedMs:Date.now()-started,results:[],summary:this.summarize([])};
      }
    };
    AsSources.searchContent=async function(query){
      const parsed=this.parse(AsStore.readSources());
      const sources=parsed.filter(function(s){return s.ok&&s.enabled}).sort(function(a,b){return (a.priority||0)-(b.priority||0)});
      const reports=[];
      for(const s of sources){
        reports.push(await this.querySource(s,query));
      }
      const raw=reports.flatMap(function(r){return r.results||[]});
      const results=dedupe(raw,query);
      return {query:query,sourceCount:sources.length,parsedCount:parsed.length,reports:reports,reportsOk:reports.filter(function(r){return r.ok}).length,summary:summary(results,reports),groups:group(results),results:results};
    };
  }
  patch();
})();
