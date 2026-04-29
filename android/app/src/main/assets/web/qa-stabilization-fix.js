(function(){
  function esc(v){return AsUI.escape(v)}
  function chip(v){return '<span class="chip">'+esc(v)+'</span>'}
  function btn(label,action,cls){return '<button class="btn focusable '+(cls||'')+'" onclick="'+action+'">'+label+'</button>'}
  window.AsQaFix={sourceResults:[],show(i){const r=this.sourceResults[i];if(!r)return;alert(JSON.stringify({title:r.title,source:r.sourceName,type:r.type,classification:r.classification,url:r.url||'',seeders:r.seeders,peers:r.peers},null,2))},play(i){const r=this.sourceResults[i];if(!r||!r.url)return;if(window.AsgardBridge&&AsgardBridge.openPlayer)AsgardBridge.openPlayer(r.url,r.title||'Source video',0);else window.open(r.url,'_blank')}};
  function patch(){
    if(!window.AsApp||!window.AsSources||!window.AsStore){setTimeout(patch,100);return;}
    AsApp.doSearch=async function(){
      const q=(document.getElementById('q')&&document.getElementById('q').value||'').toLowerCase();
      const demo=(AsApp.openCatalogData||[]).filter(x=>!q||String((x.t||x.title||'')+' '+(x.g||'')+' '+(x.s||'')).toLowerCase().includes(q));
      const out=document.getElementById('results');out.innerHTML='<div class="panel"><h2>Ищу...</h2><p class="muted">Demo catalog + user sources</p></div>';
      let report={results:[],reports:[]};
      try{report=await AsSources.searchContent(q)}catch(e){report={results:[],reports:[{ok:false,source:'AsSources',status:'exception',error:e.message}]}}
      AsQaFix.sourceResults=report.results||[];
      const demoCards=demo.map(x=>'<article tabindex="0" class="card focusable" onclick="AsApp.details(\''+esc(x.id)+'\')"><div class="poster"><span>Demo</span></div><div class="card-body"><h3>'+esc(x.t||x.title)+'</h3><p class="muted">'+esc((x.y||'')+' · '+(x.g||''))+'</p>'+chip('Demo catalog')+'</div></article>').join('');
      const sourceCards=AsQaFix.sourceResults.map((r,i)=>{const canPlay=AsSources.isDirectPlayable(r.type,r.url);return '<div tabindex="0" class="source-row focusable"><h3>'+esc(r.title||r.sourceName)+'</h3><p>'+chip(r.classification||r.type||'source')+chip(r.sourceName||'source')+(r.seeders!==undefined?chip('S '+r.seeders):'')+(r.peers!==undefined?chip('P '+r.peers):'')+'</p><p class="muted">'+esc(r.url||'')+'</p>'+(canPlay?btn('▶ Смотреть','AsQaFix.play('+i+')'):btn('Diagnostics','AsQaFix.show('+i+')','secondary'))+btn('Diagnostics','AsQaFix.show('+i+')','secondary')+'</div>'}).join('');
      const errors=(report.reports||[]).filter(r=>!r.ok).map(r=>({source:r.source,status:r.status,error:r.error}));
      out.innerHTML='<div class="panel"><h2>Summary</h2><p>'+chip('demo '+demo.length)+chip('source results '+AsQaFix.sourceResults.length)+chip('source errors '+errors.length)+'</p>'+(errors.length?'<pre>'+esc(JSON.stringify(errors,null,2))+'</pre>':'')+'</div>'+(demo.length?'<section class="shelf"><h2>Demo catalog</h2><div class="cards">'+demoCards+'</div></section>':'')+(sourceCards?'<section class="shelf"><h2>User sources</h2>'+sourceCards+'</section>':'');
      AsInput&&AsInput.refresh();
    };
  }
  patch();
})();
