(function(){
  function esc(v){return window.AsUI&&AsUI.escape?AsUI.escape(v):String(v||'')}
  function chip(v){return '<span class="chip">'+esc(v)+'</span>'}
  function btn(label,action,cls){return '<button class="btn focusable '+(cls||'')+'" onclick="'+action+'">'+esc(label)+'</button>'}
  function resultUrl(r){return r&&String(r.magnetUrl||r.torrentUrl||r.streamUrl||r.url||r.link||'')||''}
  function kind(r){return String(r.kind||r.classification||r.type||'link').toLowerCase()}
  function meaning(r){const k=kind(r);if(k==='playable')return 'Можно сразу смотреть';if(k==='magnet'||k==='torrent')return 'Нужен TorrServer';return 'Обычная ссылка'}
  function card(r,i){return '<div tabindex="0" class="source-row focusable"><h3>'+esc(r.title||'Media result')+'</h3><p>'+chip(kind(r))+chip(meaning(r))+chip(r.sourceName||'source')+(r.quality?chip(r.quality):'')+(r.seeders!==undefined?chip('S '+r.seeders):'')+(r.peers!==undefined?chip('P '+r.peers):'')+'</p><p class="muted">'+esc(r.description||resultUrl(r))+'</p><p class="muted">'+esc(resultUrl(r))+'</p><div class="source-actions">'+actions(r,i)+'</div></div>'}
  function actions(r,i){let a='';const k=kind(r);if(k==='playable')a+=btn('▶ Смотреть','AsMediaSearch.play('+i+')');if(k==='torrent'||k==='magnet'||r.magnetUrl||r.torrentUrl)a+=btn('Create media task','AsMediaSearch.createTask('+i+')')+btn('Prepare stream','AsMediaSearch.playViaService('+i+')','secondary');if(resultUrl(r)&&!a)a+=btn('Open link','AsMediaSearch.open('+i+')','secondary');return a+btn('Diagnostics','AsMediaSearch.diag('+i+')','secondary')}
  function section(title,items,all){if(!items.length)return '';return '<section class="shelf"><div class="shelf-head"><h2>'+esc(title)+'</h2><span>'+items.length+'</span></div>'+items.map(function(x){return card(x,all.indexOf(x))}).join('')+'</section>'}
  function group(list){const g={playable:[],torrent:[],magnet:[],link:[],unknown:[]};(list||[]).forEach(function(r){const k=kind(r);if(g[k])g[k].push(r);else if(r.magnetUrl)g.magnet.push(r);else if(r.torrentUrl)g.torrent.push(r);else g.link.push(r)});return g}
  function mergeReports(primary,secondary){
    primary=primary||{results:[],reports:[],sourceCount:0,reportsOk:0};secondary=secondary||{results:[],reports:[],sourceCount:0,reportsOk:0};
    const seen={};const results=[];
    [...(primary.results||[]),...(secondary.results||[])].forEach(function(r){const key=String(resultUrl(r)||r.title||'').toLowerCase();if(!key||seen[key])return;seen[key]=true;results.push(r)});
    return {ok:true,native:true,results:results,reports:[...(primary.reports||[]),...(secondary.reports||[])],sourceCount:Number(primary.sourceCount||0)+Number(secondary.sourceCount||0),reportsOk:Number(primary.reportsOk||0)+Number(secondary.reportsOk||0),summary:window.AsSources&&AsSources.summarize?AsSources.summarize(results):{total:results.length}};
  }
  async function searchParser(query){
    if(!window.AsParserManager||!window.AsJacRedAdapter)return null;
    const parser=await AsParserManager.selectBestParser();
    if(!parser)return {ok:false,results:[],reports:[{source:'parser',ok:false,status:'parser_missing',error:'No parser candidate available'}],sourceCount:0,reportsOk:0};
    const source={name:parser.name||'Default parser',type:parser.type||'jacred',url:parser.url,enabled:true,ok:true,row:0,notes:'auto selected parser'};
    const report=await AsJacRedAdapter.search(source,query,{settings:{jacredBaseUrl:parser.url,jacredApiKey:parser.apiKey||''}});
    if(report&&Array.isArray(report.results))report.results=report.results.map(function(r){return Object.assign({parserName:parser.name,parserUrl:parser.url,sourceName:parser.name||r.sourceName},r)});
    return {ok:!!(report&&report.ok),results:report&&report.results||[],reports:[Object.assign({autoParser:true,parserName:parser.name,parserUrl:parser.url},report||{})],sourceCount:1,reportsOk:report&&report.ok?1:0,summary:window.AsSources&&AsSources.summarize?AsSources.summarize(report&&report.results||[]):{total:(report&&report.results||[]).length}};
  }
  function patchSources(){
    if(!window.AsSources||AsSources.__parserRuntimeV4)return false;
    AsSources.__parserRuntimeV4=true;
    const previous=AsSources.searchContent.bind(AsSources);
    AsSources.searchContent=async function(query){
      let parserReport=null;let sourceReport=null;
      try{parserReport=await searchParser(query)}catch(e){parserReport={ok:false,results:[],reports:[{source:'parser',ok:false,status:'parser_exception',error:e.message||String(e)}],sourceCount:0,reportsOk:0}}
      try{sourceReport=await previous(query)}catch(e){sourceReport={ok:false,results:[],reports:[{source:'sources',ok:false,status:'source_exception',error:e.message||String(e)}],sourceCount:0,reportsOk:0}}
      return mergeReports(parserReport,sourceReport);
    };
    return true;
  }
  function renderResults(out,query,report){const results=window.AsSearchNormalize&&AsSearchNormalize.normalizeList?AsSearchNormalize.normalizeList(report.results||[],query):(report.results||[]);const g=group(results);window.AsMediaSearch.items=results;window.AsMediaSearch.last={query:query,results:results,groups:g,reports:report.reports||[],summary:report.summary||{}};const errors=(report.reports||[]).filter(function(x){return !x.ok});if(!results.length){out.innerHTML=(window.AsState&&AsState.empty?AsState.empty('No media results','Parser/source returned no results. Open diagnostics to see parser status.',[{label:'Retry',action:'AsMediaSearch.search()'},{label:'Parser & service',action:'AsParserSettings.render()'}]):'<div class="panel"><h2>No media results</h2></div>')+'<details class="panel"><summary>Diagnostics</summary><pre>'+esc(JSON.stringify(report.reports||[],null,2))+'</pre></details>';return;}out.innerHTML='<div class="panel"><h2>Результаты поиска</h2><p>'+chip('total '+results.length)+chip('playable '+g.playable.length)+chip('torrent '+g.torrent.length)+chip('magnet '+g.magnet.length)+chip('errors '+errors.length)+'</p></div>'+section('1. Сразу смотреть',g.playable,results)+section('2. Torrent files',g.torrent,results)+section('3. Magnet links',g.magnet,results)+section('4. Other links',g.link,results)+'<details class="panel"><summary>Diagnostics '+chip('sources '+(report.sourceCount||0))+'</summary><pre>'+esc(JSON.stringify(report.reports||[],null,2))+'</pre></details>';}
  function patchSearchUi(){
    if(!window.AsTitleMediaSearch||AsTitleMediaSearch.__parserRuntimeV4)return false;
    AsTitleMediaSearch.__parserRuntimeV4=true;
    AsTitleMediaSearch.search=async function(){const input=document.getElementById('mediaSearchQuery');const query=String(input&&input.value||'').trim();const out=document.getElementById('mediaSearchResults');if(!out)return;if(!query){AsState.setEmpty(out,'Введите название','Search by movie or series title.',[]);return;}AsState.setLoading(out,'Searching','Testing default/active parser and enabled sources.');try{const report=await AsSources.searchContent(query);renderResults(out,query,report)}catch(e){AsState.setError(out,'Search failed',e.message||String(e),[{label:'Retry',action:'AsMediaSearch.search()'},{label:'Parser & service',action:'AsParserSettings.render()'}])}if(window.AsInput&&AsInput.refresh)AsInput.refresh()};
    const oldRender=AsTitleMediaSearch.render&&AsTitleMediaSearch.render.bind(AsTitleMediaSearch);
    AsTitleMediaSearch.render=function(){if(oldRender)oldRender();setTimeout(function(){const box=document.querySelector('.search-box');if(box&&!document.getElementById('parserRuntimeV4Hint'))box.insertAdjacentHTML('afterend','<div id="parserRuntimeV4Hint" class="panel"><p>'+chip('auto parser')+chip('auto metadata')+' <span class="muted">Default parser/service will be tested automatically. Results appear below.</span></p></div>');if(window.AsInput&&AsInput.refresh)AsInput.refresh()},80)};
    return true;
  }
  function install(){const ok1=patchSources();const ok2=patchSearchUi();if(!ok1||!ok2)setTimeout(install,100)}
  install();
})();
