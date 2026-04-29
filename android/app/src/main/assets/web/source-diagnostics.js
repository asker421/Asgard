(function(){
  function esc(v){return AsUI.escape(v)}
  function chip(v){return '<span class="chip">'+esc(v)+'</span>'}
  function btn(label,action,cls){return '<button class="btn focusable '+(cls||'')+'" onclick="'+action+'">'+label+'</button>'}
  function sourceReport(r){
    const s=r.summary||{};
    return '<div tabindex="0" class="source-row focusable"><h3>'+esc(r.source||'source')+'</h3><p>'+chip(r.type||'type')+chip(r.status||'status')+chip((r.elapsedMs||0)+' ms')+chip('results '+(s.total||0))+chip('playable '+(s.playable||0))+chip('magnet '+(s.magnet||0))+chip('torrent '+(s.torrent||0))+chip('links '+(s.link||0))+'</p>'+(r.error?'<p class="muted">Error: '+esc(r.error)+'</p>':'')+(r.parser?'<p class="muted">Parser: '+esc(r.parser)+' · '+esc(r.contentType||'unknown content-type')+'</p>':'')+'<pre>'+esc(JSON.stringify((r.results||[]).slice(0,8).map(x=>({title:x.title,type:x.type,classification:x.classification,url:x.url})),null,2))+'</pre></div>';
  }
  window.AsSourceDiagnostics={
    async run(){
      const q=(document.getElementById('diagQuery')&&document.getElementById('diagQuery').value)||'';
      const out=document.getElementById('sourceDiagOut');
      if(!out)return;
      out.innerHTML='<div class="panel"><h2>Проверяю источники...</h2><p class="muted">Смотрю формат, доступность, parser status и найденные ссылки.</p></div>';
      if(window.AsInput&&AsInput.refresh)AsInput.refresh();
      const diag=await AsSources.diagnoseAll(q);
      const parsed=diag.parsed||[];
      const reports=diag.reports||[];
      out.innerHTML='<div class="panel"><h2>Итог диагностики</h2><p>'+chip('sources '+parsed.length)+chip('checked '+reports.length)+chip('playable '+(diag.summary.playable||0))+chip('magnet '+(diag.summary.magnet||0))+chip('torrent '+(diag.summary.torrent||0))+chip('links '+(diag.summary.link||0))+'</p></div><section class="shelf"><h2>Формат sources.txt</h2><pre>'+esc(JSON.stringify(parsed,null,2))+'</pre></section><section class="shelf"><h2>Проверка источников</h2>'+reports.map(sourceReport).join('')+'</section>';
      if(window.AsInput&&AsInput.refresh)AsInput.refresh();
    }
  };
  function patch(){
    if(!window.AsApp||!window.AsUI){setTimeout(patch,100);return;}
    const oldDiagnostics=AsApp.diagnostics&&AsApp.diagnostics.bind(AsApp);
    AsApp.diagnostics=function(){
      const sources=AsSources.parse(AsStore.readSources());
      AsApp.shell('Диагностика источников','Проверяет sources.txt/config: формат, enabled, доступность, parser status, найденные playable/HLS/magnet/torrent ссылки и ошибки.','<div class="search-box"><input class="focusable" id="diagQuery" placeholder="Тестовый запрос, например matrix или пусто"><button class="btn focusable" onclick="AsSourceDiagnostics.run()">Проверить источники</button><button class="btn secondary focusable" onclick="AsUI.nav(\'Поиск\')">Поиск</button></div><div class="panel"><h2>Источников в конфиге: '+sources.length+'</h2><p class="muted">Если видишь CORS/Network blocked — этот источник не отдаёт данные напрямую в WebView. Для него нужен отдельный backend/native adapter.</p></div><div id="sourceDiagOut"></div>');
      setTimeout(function(){if(window.AsInput&&AsInput.refresh)AsInput.refresh();},50);
    };
    if(AsUI.state.screen==='Диагностика')AsApp.diagnostics();
  }
  patch();
})();
