(function(){
  function install(){
    window.AsMediaTask=window.AsMediaTask||{};
    if(!AsMediaTask.loadMetadata){
      AsMediaTask.loadMetadata=function(taskId){
        if(window.AsMetadataFilesV2&&AsMetadataFilesV2.load)return AsMetadataFilesV2.load(taskId);
        return Promise.resolve({ok:false,status:'metadata_loader_missing',error:'Metadata loader is not ready'});
      };
    }
    if(!AsMediaTask.openStream){
      AsMediaTask.openStream=function(taskId){
        if(window.AsMetadataFilesV2&&AsMediaTask.loadMetadata)return AsMediaTask.loadMetadata(taskId);
        return Promise.resolve({ok:false,status:'stream_loader_missing',error:'Stream loader is not ready'});
      };
    }
  }
  install();
  setTimeout(install,300);
  setTimeout(install,1000);
})();
