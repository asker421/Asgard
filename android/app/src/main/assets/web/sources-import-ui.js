(function(){
  function esc(value){
    return window.AsUI && AsUI.escape ? AsUI.escape(value == null ? '' : String(value)) : String(value == null ? '' : value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]});
  }

  function summarize(items){
    var rows = Array.isArray(items) ? items : [];
    var valid = rows.filter(function(x){return x.ok});
    var invalid = rows.filter(function(x){return !x.ok});
    var enabled = valid.filter(function(x){return x.enabled});
    var disabled = valid.filter(function(x){return !x.enabled});
    var names = {};
    var duplicates = [];
    valid.forEach(function(x){
      var key = (x.name || '').trim().toLowerCase();
      if (!key) return;
      if (names[key]) duplicates.push(x);
      names[key] = true;
    });
    return {
      total: rows.length,
      added: valid.length,
      enabled: enabled.length,
      skipped: disabled.length,
      invalid: invalid.length,
      duplicates: duplicates.length,
      valid: valid,
      invalidRows: invalid
    };
  }

  function currentText(){
    var textarea = document.getElementById('sourceTxtInput');
    return textarea ? textarea.value : '';
  }

  function renderSummary(text){
    var parsed = AsSources.parse(text || '');
    var summary = summarize(parsed);
    var invalidHtml = summary.invalidRows.length ? '<h3>Invalid rows</h3><div class="source-errors">' + summary.invalidRows.map(function(x){
      return '<div class="source-error"><b>Line '+esc(x.row)+'</b><span>'+esc(x.error || 'Invalid row')+'</span><code>'+esc(x.line || '')+'</code></div>';
    }).join('') + '</div>' : '<p class="muted">No invalid rows.</p>';
    var validHtml = summary.valid.length ? '<h3>Valid sources</h3><div class="source-list">' + summary.valid.map(function(x){
      return '<div class="source-card"><b>'+esc(x.name || 'Unnamed source')+'</b><span>'+esc(x.type)+' · '+esc(x.language || 'unknown')+' · '+(x.enabled ? 'enabled' : 'disabled')+'</span><small>'+esc(x.url)+'</small></div>';
    }).join('') + '</div>' : '<p class="muted">No valid sources yet.</p>';
    return '<div class="import-summary">'
      + '<div class="summary-grid">'
      + '<div><b>'+summary.total+'</b><span>rows</span></div>'
      + '<div><b>'+summary.added+'</b><span>valid</span></div>'
      + '<div><b>'+summary.enabled+'</b><span>enabled</span></div>'
      + '<div><b>'+summary.skipped+'</b><span>disabled/skipped</span></div>'
      + '<div><b>'+summary.invalid+'</b><span>invalid</span></div>'
      + '</div>'
      + (summary.duplicates ? '<p class="warn-text">Warning: '+summary.duplicates+' duplicate source name(s) detected.</p>' : '')
      + invalidHtml
      + validHtml
      + '</div>';
  }

  function setPreview(){
    var out = document.getElementById('sourcePreviewOut');
    if (!out) return;
    out.innerHTML = renderSummary(currentText());
    if (window.AsInput && AsInput.refresh) AsInput.refresh();
  }

  function saveImport(){
    var text = currentText();
    var parsed = AsSources.parse(text);
    var summary = summarize(parsed);
    var out = document.getElementById('sourcePreviewOut');
    if (!summary.added) {
      if (out) out.innerHTML = '<div class="empty"><h2>No valid sources</h2><p>Fix invalid rows before saving.</p></div>' + renderSummary(text);
      if (window.AsInput && AsInput.refresh) AsInput.refresh();
      return;
    }
    AsStore.saveSources(AsSources.serialize(summary.valid));
    if (out) out.innerHTML = '<div class="success"><h2>Import saved</h2><p>'+summary.added+' valid source(s) saved. '+summary.invalid+' invalid row(s) were not saved.</p></div>' + renderSummary(AsStore.readSources());
    if (window.AsApp && AsApp.toast) AsApp.toast('TXT sources saved');
    if (window.AsInput && AsInput.refresh) AsInput.refresh();
  }

  function resetImport(){
    AsStore.resetSources();
    var textarea = document.getElementById('sourceTxtInput');
    if (textarea) textarea.value = '';
    var out = document.getElementById('sourcePreviewOut');
    if (out) out.innerHTML = '<div class="empty"><h2>Sources reset</h2><p>No TXT sources are saved.</p></div>';
    if (window.AsInput && AsInput.refresh) AsInput.refresh();
  }

  function exampleText(){
    return '# name | type | url_or_template | language | enabled | priority | auth_required | notes\n'
      + 'Example Search | search_template | https://example.invalid/search?q={query} | en | false | 10 | false | placeholder only\n'
      + 'Example API | api | https://example.invalid/api/search?q={query} | en | false | 20 | false | placeholder only\n'
      + '# Invalid example below is intentionally shown during preview\n'
      + 'Broken Row | api | https://example.invalid';
  }

  function loadExample(){
    var textarea = document.getElementById('sourceTxtInput');
    if (textarea) textarea.value = exampleText();
    setPreview();
  }

  function patchSourcesScreen(){
    if (!window.AsApp || !window.AsSources || !window.AsStore) return false;
    AsApp.sources = function(){
      var saved = AsStore.readSources() || '';
      var initialText = saved || exampleText();
      var body = '<div class="layout2">'
        + '<div class="panel"><h2>TXT source import</h2>'
        + '<p class="muted">One source per line. Lines starting with # are ignored. Invalid rows are reported and are not saved.</p>'
        + '<textarea class="focusable" id="sourceTxtInput" rows="10" placeholder="# name | type | url_or_template | language | enabled | priority | auth_required | notes">'+esc(initialText)+'</textarea>'
        + '<button class="btn focusable" onclick="AsSourceImportUI.preview()">Preview import</button>'
        + '<button class="btn focusable secondary" onclick="AsSourceImportUI.save()">Save valid sources</button>'
        + '<button class="btn focusable secondary" onclick="AsSourceImportUI.loadExample()">Load example</button>'
        + '<button class="btn focusable danger" onclick="AsSourceImportUI.reset()">Reset sources</button>'
        + '</div>'
        + '<div class="panel"><h2>Import summary</h2><div id="sourcePreviewOut">'+renderSummary(initialText)+'</div></div>'
        + '</div>';
      this.shell('Источники','ASG-031: простой TXT импорт без JSON, validation, import summary и сохранение после рестарта.',body);
    };
    window.AsSourceImportUI = {preview:setPreview,save:saveImport,reset:resetImport,loadExample:loadExample,summary:summarize};
    if (window.AsUI && AsUI.state && AsUI.state.screen === 'Источники' && window.AsApp.render) AsApp.render();
    return true;
  }

  if (!patchSourcesScreen()) {
    setTimeout(patchSourcesScreen, 0);
    setTimeout(patchSourcesScreen, 100);
  }
})();
