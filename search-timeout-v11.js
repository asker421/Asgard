(function(){
  function timeoutReport(query,ms){return {ok:false,native:false,timeout:true,results:[],reports:[{source:'search-timeout',sourceName:'search-timeout',ok:false,status:'timeout',error:'Search exceeded '+ms+'ms. Some sources or parser are too slow.',query:query}],sourceCount:0,reportsOk:0,summary:{total:0,timeout:true}}}
  function withTimeout(promise,ms,query){return new Promise(function(resolve){let done=false;const t=setTimeout(function(){if(done)return;done=true;resolve(timeoutReport(query,ms))},ms);Promise.resolve(promise).then(function(v){if(done)return;done=true;clearTimeout(t);resolve(v)}).catch(function(e){if(done)return;done=true;clearTimeout(t);resolve({ok:false,results:[],reports:[{source:'search-error',ok:false,status:'exception',error:e.message||String(e),query:query}],sourceCount:0,reportsOk:0,summary:{total:0,error:true}})})})}
  function install(){
    if(!window.AsSources||AsSources.__timeoutV11){setTimeout(install,100);return;}
    AsSources.__timeoutV11=true;
    const previous=AsSources.searchContent.bind(AsSources);
    AsSources.searchContent=function(query){return withTimeout(previous(query),14000,query)};
  }
  install();
})();
