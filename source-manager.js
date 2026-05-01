(function(){
  function esc(v){return AsUI.escape(v)}
  function chip(v){return '<span class="chip">'+esc(v)+'</span>'}
  function btn(label,action,cls){return '<button class="btn focusable '+(cls||'')+'" onclick="'+action+'">'+label+'</button>'}
  function read(){return AsSources.parse(AsStore.readSources()||'')}
  function save(list){AsStore.saveSources(AsSources.serialize(list.filter(function(x){return x.ok||x.name||x.url}))) }
  function summary(list){return {total:list.length,valid:list.filter(x=>x.ok).length,invalid:list.filter(x=>!x.ok).length,enabled:list.filter(x=>x.ok&&x.enabled).length,disabled:list.filter(x=>x.ok&&!x.enabled).length}}
  function rowStatus(x){if(!x.ok)return 'invalid';return x.enabled?'enabled':'disabled'}
  function sourceCard(x,i){
    const status=rowStatus(x);
    const actions=[
      btn(x.enabled?'Disable':'Enable','AsSourceManager.toggle('+i+')','secondary'),
      btn('Priority −','AsSourceManager.priority('+i+',-1)','secondary'),
      btn('Priority +','AsSourceManager.priority('+i+',1)','secondary'),
      btn('Edit','AsSourceManager.edit('+i+')','secondary'),
      btn('Test','AsSourceManager.test('+i+')','secondary'),
      btn('Delete','AsSourceManager.remove('+i+')','danger')
    ].join('');
    return '<div tabindex="0" class="source-row focusable source-card '+status+'"><div class="source-card-head"><div><h3>'+esc(x.name||('Row '+x.row))+'</h3><p>'+chip(status)+chip(x.type||'unknown')+chip('priority '+Number(x.priority||0))+chip(x.language||'multi')+chip(x.rightsStatus||'User Source / Unknown Rights')+'</p></div><div class="source-status '+status+'">'+esc(status)+'</div></div><p class="muted">'+esc(x.url||'no url')+'</p><p class="muted">'+esc(x.notes||x.error||'')+'</p><div class="source-actions">'+actions+'</div></div>';
  }
  window.AsSourceManager={
    lastReport:null,
    render(){
      const list=read();
      const s=summary(list);
      const valid=list.filter(x=>x.ok).sort((a,b)=>Number(a.priority||0)-Number(b.priority||0));
      const invalid=list.filter(x=>!x.ok);
      const cards=valid.map(sourceCard).join('')+(invalid.length?'<section class="shelf"><div class="shelf-head"><h2>Invalid rows</h2><span>'+invalid.length+'</span></div>'+invalid.map(sourceCard).join('')+'</section>':'');
      AsApp.shell('Источники','Full source manager: enable/disable, priority, add/edit/delete, validation and per-source diagnostics. User-controlled sources only.','<div class="warn"><b>Legal-safe mode:</b> Asgard TV does not bundle prohibited catalogs. Add only sources you have the right to use.</div><div class="states"><div class="panel"><h2>'+s.total+'</h2><p>Total rows</p></div><div class="panel"><h2>'+s.enabled+'</h2><p>Enabled</p></div><div class="panel"><h2>'+s.invalid+'</h2><p>Invalid</p></div></div><div class="source-toolbar">'+btn('Add source','AsSourceManager.add()')+btn('Test enabled','AsSourceManager.testAll()','secondary')+btn('Raw TXT editor','AsSourceManager.raw()','secondary')+btn('Reset bundled','AsSourceManager.reset()','danger')+'</div><section class="shelf"><div class="shelf-head"><h2>Configured sources</h2><span>'+valid.length+' valid</span></div>'+(cards||'<div class="empty"><h2>No sources</h2><p>Add a source or reset bundled placeholders.</p></div>')+'</section><div id="sourceManagerOut"></div>');
      setTimeout(()=>AsInput&&AsInput.refresh(),50);
    },
    persist(list){save(list);this.render();AsApp.toast('Sources updated')},
    toggle(i){const list=read();if(!list[i])return;list[i].enabled=!list[i].enabled;this.persist(list)},
    priority(i,delta){const list=read();if(!list[i])return;list[i].priority=Math.max(0,Number(list[i].priority||0)+delta);this.persist(list)},
    remove(i){const list=read();if(!list[i])return;if(!confirm('Delete source: '+(list[i].name||('row '+list[i].row))+'?'))return;list.splice(i,1);this.persist(list)},
    add(){this.form({name:'New Direct Demo',type:'direct_video',url:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',language:'multi',enabled:false,priority:10,auth:false,notes:'legal demo direct video'},-1)},
    edit(i){const list=read();if(!list[i])return;this.form(list[i],i)},
    form(source,index){
      const x=source||{};
      AsApp.shell(index>=0?'Edit source':'Add source','Edit one source without touching the raw TXT manually. Save validates the row before writing.','<div class="layout2"><div class="panel"><h2>Source fields</h2><label>Name</label><input class="focusable" id="smName" value="'+esc(x.name||'')+'"><label>Type</label><select class="focusable" id="smType">'+AsSources.types.map(t=>'<option '+(t===x.type?'selected':'')+'>'+esc(t)+'</option>').join('')+'</select><label>URL / template</label><textarea class="focusable" id="smUrl" rows="4">'+esc(x.url||'')+'</textarea><label>Language</label><input class="focusable" id="smLang" value="'+esc(x.language||'multi')+'"><label>Priority</label><input class="focusable" id="smPriority" type="number" value="'+Number(x.priority||10)+'"><label>Enabled</label><select class="focusable" id="smEnabled"><option value="true" '+(x.enabled?'selected':'')+'>true</option><option value="false" '+(!x.enabled?'selected':'')+'>false</option></select><label>Auth required</label><select class="focusable" id="smAuth"><option value="false" '+(!x.auth?'selected':'')+'>false</option><option value="true" '+(x.auth?'selected':'')+'>true</option></select><label>Notes</label><textarea class="focusable" id="smNotes" rows="3">'+esc(x.notes||'')+'</textarea>'+btn('Save source','AsSourceManager.saveForm('+index+')')+btn('Cancel','AsSourceManager.render()','secondary')+'</div><div class="panel"><h2>Validation</h2><pre id="smPreview">Press Save source to validate and save.</pre></div></div>');
      setTimeout(()=>AsInput&&AsInput.refresh(),50);
    },
    saveForm(index){
      const item={name:document.getElementById('smName').value.trim(),type:document.getElementById('smType').value.trim(),url:document.getElementById('smUrl').value.trim(),language:document.getElementById('smLang').value.trim()||'multi',enabled:document.getElementById('smEnabled').value==='true',priority:Number(document.getElementById('smPriority').value||10),auth:document.getElementById('smAuth').value==='true',notes:document.getElementById('smNotes').value.trim(),ok:true};
      const line=[item.name,item.type,item.url,item.language,item.enabled?'true':'false',item.priority,item.auth?'true':'false',item.notes||'user source'].join(' | ');
      const parsed=AsSources.parse(line)[0];
      if(!parsed||!parsed.ok){document.getElementById('smPreview').textContent=JSON.stringify({saved:false,error:parsed&&parsed.error,row:parsed},null,2);return;}
      const list=read();
      if(index>=0&&list[index])list[index]=parsed;else list.push(parsed);
      this.persist(list);
    },
    raw(){
      const text=AsStore.readSources()||'';
      AsApp.shell('Raw sources.txt','Advanced editor. Invalid rows are not saved. Manager actions may rewrite rows in normalized TXT format.','<div class="layout2"><div class="panel"><h2>sources.txt</h2><textarea class="focusable" id="sourcesText" rows="16">'+esc(text)+'</textarea>'+btn('Preview','AsSourceManager.previewRaw()')+btn('Save valid TXT','AsSourceManager.saveRaw()','secondary')+btn('Back to manager','AsSourceManager.render()','secondary')+'</div><div class="panel"><h2>Preview / Summary</h2><pre id="sourcesOut">Press Preview</pre></div></div>');
      setTimeout(()=>AsInput&&AsInput.refresh(),50);
    },
    previewRaw(){const text=document.getElementById('sourcesText').value||'';const list=AsSources.parse(text);document.getElementById('sourcesOut').textContent=JSON.stringify({summary:summary(list),rows:list.map(x=>({row:x.row,name:x.name,type:x.type,enabled:x.enabled,priority:x.priority,ok:x.ok,error:x.error}))},null,2)},
    saveRaw(){const text=document.getElementById('sourcesText').value||'';const list=AsSources.parse(text);const invalid=list.filter(x=>!x.ok);const out=document.getElementById('sourcesOut');if(invalid.length){out.textContent=JSON.stringify({saved:false,summary:summary(list),errors:invalid.map(x=>({row:x.row,error:x.error,line:x.line||x.name}))},null,2);return;}AsStore.saveSources(text);out.textContent=JSON.stringify({saved:true,summary:summary(list)},null,2);AsApp.toast('Sources saved')},
    reset(){if(!confirm('Reset sources to bundled/default text?'))return;AsStore.resetSources();this.render()},
    async test(i){const list=read();const s=list[i];if(!s)return;const out=document.getElementById('sourceManagerOut');if(out)out.innerHTML='<div class="panel"><h2>Testing '+esc(s.name)+'</h2><p class="muted">Query: test</p></div>';const r=await AsSources.querySource(s,'test');this.lastReport=r;if(out)out.innerHTML='<div class="panel"><h2>Test result: '+esc(s.name)+'</h2><pre>'+esc(JSON.stringify({ok:r.ok,status:r.status,summary:r.summary,error:r.error||'',elapsedMs:r.elapsedMs},null,2))+'</pre></div>';AsInput&&AsInput.refresh()},
    async testAll(){const out=document.getElementById('sourceManagerOut');if(out)out.innerHTML='<div class="panel"><h2>Testing enabled sources...</h2></div>';const r=await AsSources.searchContent('test');this.lastReport=r;if(out)out.innerHTML='<div class="panel"><h2>Enabled source test</h2><p>'+chip('sources '+r.sourceCount)+chip('ok '+r.reportsOk)+chip('results '+(r.results||[]).length)+chip('errors '+((r.reports||[]).filter(x=>!x.ok).length))+'</p><pre>'+esc(JSON.stringify((r.reports||[]).map(x=>({source:x.source,type:x.type,ok:x.ok,status:x.status,results:(x.results||[]).length,error:x.error||''})),null,2))+'</pre></div>';AsInput&&AsInput.refresh()}
  };
  function patch(){if(!window.AsApp||!window.AsSources||!window.AsStore){setTimeout(patch,100);return;}AsApp.sources=function(){AsSourceManager.render()};if(AsUI.state.screen==='Источники')AsSourceManager.render();}
  patch();
})();
