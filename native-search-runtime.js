(function(){
  function nativeSearchAvailable(){return !!(window.AsgardNativeSearch&&AsgardNativeSearch.searchSources)}
  function validNativeReport(report){return report&&report.native===true&&report.ok===true&&Array.isArray(report.results)}
  function normalizeReport(report,query){
    report.query=query||'';
    report.results=(report.results||[]).map(function(r,i){
      r.id=r.id||('native_'+i+'_'+String(r.url||r.link||'').length);
      r.url=r.url||r.link||'';
      r.link=r.link||r.url||'';
      r.sourceName=r.sourceName||'Native source';
      r.sourceType=r.sourceType||r.type||'source';
      r.rightsStatus=r.rightsStatus||'User Source / Unknown Rights';
      return r;
    });
    report.reports=report.reports||[];
    report.summary=report.summary||(window.AsSources&&AsSources.summarize?AsSources.summarize(report.results):{total:report.results.length});
    return report;
  }
  function install(){
    if(!window.AsSources){setTimeout(install,100);return;}
    if(AsSources.__nativeSearchInstalled)return;
    AsSources.__nativeSearchInstalled=true;
    const previous=AsSources.searchContent.bind(AsSources);
    AsSources.searchContent=async function(query){
      if(nativeSearchAvailable()){
        try{
          const raw=AsgardNativeSearch.searchSources(String(query||''));
          const report=JSON.parse(raw||'{}');
          if(validNativeReport(report)){
            const normalized=normalizeReport(report,query);
            if(normalized.results.length||normalized.sourceCount>0)return normalized;
          }
        }catch(e){
          console.log('Native search fallback:',e&&e.message?e.message:e);
        }
      }
      return previous(query);
    };
  }
  install();
})();
