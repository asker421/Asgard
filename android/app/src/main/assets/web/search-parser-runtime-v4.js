(function(){
  function esc(v){return window.AsUI&&AsUI.escape?AsUI.escape(v):String(v||'')}
  function chip(v){return '<span class="chip">'+esc(v)+'</span>'}
  function resultUrl(r){return r&&String(r.magnetUrl||r.torrentUrl||r.streamUrl||r.url||r.link||'')||''}
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
    if(report&&Array.isArray(report.results)){
      report.results=report.results.map(function(r){return Object.assign({parserName:parser.name,parserUrl:parser.url,sourceName:parser.name||r.sourceName},r)});
    }
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
  function patchSearchUi(){
    if(!window.AsTitleMediaSearch||AsTitleMediaSearch.__parserRuntimeV4)return false;
    AsTitleMediaSearch.__parserRuntimeV4=true;
    const oldRender=AsTitleMediaSearch.render&&AsTitleMediaSearch.render.bind(AsTitleMediaSearch);
    AsTitleMediaSearch.render=function(){
      if(oldRender)oldRender();
      setTimeout(function(){
        const results=document.getElementById('mediaSearchResults');
        const box=document.querySelector('.search-box');
        if(box&&!document.getElementById('parserRuntimeV4Hint')){
          box.insertAdjacentHTML('afterend','<div id="parserRuntimeV4Hint" class="panel"><p>'+chip('auto parser')+chip('auto metadata')+' <span class="muted">Default parser/service will be tested automatically. Results appear below.</span></p></div>');
        }
        if(results&&window.AsInput&&AsInput.refresh)AsInput.refresh();
      },80);
    };
    return true;
  }
  function install(){const ok1=patchSources();const ok2=patchSearchUi();if(!ok1||!ok2)setTimeout(install,100)}
  install();
})();
