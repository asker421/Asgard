(function(){
  function esc(v){return AsUI.escape(v)}
  function chip(v){return '<span class="chip">'+esc(v)+'</span>'}
  function btn(label,action,cls){return '<button class="btn focusable '+(cls||'')+'" onclick="'+action+'">'+label+'</button>'}
  function sizeLabel(n){n=Number(n||0);if(n>1048576)return (n/1048576).toFixed(1)+' MB';if(n>1024)return (n/1024).toFixed(1)+' KB';return n+' B'}
  window.AsUpdatesUI={
    render(){const cur=AsUpdates.current();AsApp.shell('Обновления','Проверка GitHub Releases, release notes и APK asset. In-app install будет включён после добавления FileProvider paths в native build.','<div class="panel"><h2>Current version</h2><p>'+chip(cur.versionName||'unknown')+chip('code '+(cur.versionCode||0))+chip(cur.packageName||'com.asgard.tv')+'</p>'+btn('Check for updates','AsUpdatesUI.check()')+btn('Open Releases','AsUpdates.open(\'https://github.com/asker421/Asgard/releases\')','secondary')+'<pre id="updateOut">No check yet</pre><div id="updateCard"></div></div>');setTimeout(()=>AsInput&&AsInput.refresh(),50)},
    async check(){const out=document.getElementById('updateOut');const card=document.getElementById('updateCard');out.textContent='Checking GitHub Releases...';const r=await AsUpdates.check();out.textContent=JSON.stringify({state:r.state,message:r.message,current:r.current,latest:r.release?{tag:r.release.tag,versionName:r.release.versionName,versionCode:r.release.versionCode,apkAsset:r.release.apkAsset&&r.release.apkAsset.name}:null},null,2);if(!r.ok){card.innerHTML='<div class="warn">'+esc(r.message)+'</div>';return;}if(!r.updateAvailable){card.innerHTML='<div class="panel"><h2>You are up to date</h2><p>'+esc(r.message)+'</p></div>';return;}const apk=r.apk||{};card.innerHTML='<div class="panel"><h2>New version available</h2><p>'+chip(r.release.versionName||r.release.tag)+chip(apk.name||'no apk')+chip(sizeLabel(apk.size))+'</p><p class="muted">'+esc((r.release.body||'').slice(0,1200))+'</p>'+btn('Download update','AsUpdatesUI.download()')+btn('Open release page','AsUpdates.open(\''+esc(r.release.url)+'\')','secondary')+btn('Later','AsApp.toast(\'Later\')','secondary')+'</div>';AsInput&&AsInput.refresh();},
    download(){const res=AsUpdates.download();const out=document.getElementById('updateOut');if(out)out.textContent=typeof res==='string'?res:JSON.stringify(res,null,2)}
  };
  function patch(){if(!window.AsApp||!window.AsUI){setTimeout(patch,100);return;}AsApp.updates=function(){AsUpdatesUI.render()};if(AsUI.state.screen==='Обновления')AsApp.updates();}
  patch();
})();
