(function(){
  function esc(v){return AsUI.escape(v)}
  function btn(label,action,cls){return '<button class="btn focusable '+(cls||'')+'" onclick="'+action+'">'+esc(label)+'</button>'}
  function chip(v){return '<span class="chip">'+esc(v)+'</span>'}
  function now(){return Date.now()}
  function randomDigits(n){let s='';for(let i=0;i<n;i++)s+=String(Math.floor(Math.random()*10));return s}
  function randomToken(){return Array.from(crypto.getRandomValues(new Uint8Array(12))).map(x=>x.toString(16).padStart(2,'0')).join('')}
  function sessionUrl(s){return 'asgard://import?session='+encodeURIComponent(s.token)+'&pin='+encodeURIComponent(s.pin)}
  function safeName(v){return String(v||'Imported Link').replace(/[|\n\r]/g,' ').trim().slice(0,64)||'Imported Link'}
  function sourceRowForLink(url){const type=/\.m3u8($|\?)/i.test(url)?'hls':'direct_video';return safeName('QR Imported Link')+' | '+type+' | '+String(url).trim()+' | multi | false | 100 | false | imported by QR; disabled until user verifies rights'}
  function sourceSummary(text){const parsed=AsSources.parse(text||'');const invalid=parsed.filter(x=>!x.ok);return {total:parsed.length,valid:parsed.length-invalid.length,invalid:invalid.length,enabled:parsed.filter(x=>x.ok&&x.enabled).length,errors:invalid.map(x=>({row:x.row,error:x.error,line:x.line||x.name}))}}
  function parsePayload(text){
    const raw=String(text||'').trim();
    if(!raw)return {ok:false,error:'Payload is empty'};
    if(raw[0]==='{'||raw[0]==='['){
      try{
        const data=JSON.parse(raw);
        if(data&&data.type==='sources_txt'&&data.text)return {ok:true,type:'sources_txt',raw:String(data.text),data,summary:sourceSummary(String(data.text))};
        if(data&&data.type==='link'&&data.url)return {ok:true,type:'link',raw:String(data.url),url:String(data.url),data,importMode:'disabled_source'};
        return {ok:true,type:'json',data:data,raw:raw,importMode:'preview_only'};
      }catch(e){return {ok:false,error:'Invalid JSON: '+e.message}}
    }
    if(raw.includes('|')){
      const summary=sourceSummary(raw);
      return {ok:summary.invalid===0,type:'sources_txt',raw:raw,summary:summary,errors:summary.errors};
    }
    if(/^https?:\/\//i.test(raw))return {ok:true,type:'link',raw:raw,url:raw,importMode:'disabled_source'};
    if(/^magnet:\?/i.test(raw))return {ok:true,type:'link',raw:raw,url:raw,importMode:'preview_only',warning:'This link type is preview-only in QR import. Create a media task manually and confirm rights.'};
    return {ok:false,error:'Unsupported payload. Paste sources.txt row(s), JSON, or http(s) link.'};
  }
  function audit(type,status){return {type:type,status:status,at:new Date().toISOString(),source:'qr_import',tvConfirmed:true}}
  window.AsQrImport={
    key:'asgard_qr_session',lastPreview:null,
    get(){try{return JSON.parse(localStorage.getItem(this.key)||'null')}catch(e){return null}},
    set(s){localStorage.setItem(this.key,JSON.stringify(s))},
    clear(){localStorage.removeItem(this.key)},
    active(){const s=this.get();return s&&s.expiresAt>now()&&!s.consumed?s:null},
    create(){const s={token:randomToken(),pin:randomDigits(6),createdAt:now(),expiresAt:now()+10*60*1000,confirmed:false,consumed:false,audit:[]};this.set(s);this.render()},
    expire(){this.clear();this.render()},
    remaining(s){return Math.max(0,Math.ceil((s.expiresAt-now())/1000))},
    render(){
      const s=this.active();
      const body=s?this.sessionBody(s):this.emptyBody();
      AsApp.shell('QR импорт','Safe local phone-to-TV transfer. Import is never silent: TV preview, PIN and confirm are required.','<div class="warn"><b>Security:</b> one-time token, 6-digit PIN, 10-minute expiry, local confirmation on TV. Do not paste passwords, cookies or private tokens.</div>'+body);
      setTimeout(()=>AsInput&&AsInput.refresh(),50);
    },
    emptyBody(){return '<div class="layout2"><div class="panel"><h2>No active session</h2><p class="muted">Create a one-time session. Phone transfer is simulated by pasting text on TV until a real local phone bridge exists.</p>'+btn('Create QR session','AsQrImport.create()')+'</div><div class="panel"><h2>Supported payloads</h2><p>'+chip('sources.txt')+chip('JSON wrapper')+chip('http(s) link')+chip('TV confirmation')+'</p><p class="muted">HTTP links import as disabled user sources. You must review and enable them later in Source Manager.</p></div></div>'},
    sessionBody(s){
      const url=sessionUrl(s);
      return '<div class="layout2"><div class="panel"><h2>TV import session</h2><div class="qr-box"><div class="qr-fake">QR</div><p>'+esc(url)+'</p></div><p>'+chip('PIN '+s.pin)+chip('expires '+this.remaining(s)+'s')+chip('one-time')+'</p>'+btn('Refresh timer','AsQrImport.render()','secondary')+btn('Expire session','AsQrImport.expire()','danger')+'</div><div class="panel"><h2>Paste phone payload</h2><p class="muted">Preview first. Confirm requires entering the TV PIN below.</p><textarea class="focusable" id="qrPayload" rows="8" placeholder="Paste sources.txt row(s), JSON wrapper, or http(s) link"></textarea><input class="focusable" id="qrConfirmPin" placeholder="Enter TV PIN to confirm" inputmode="numeric">'+btn('Preview payload','AsQrImport.preview()')+btn('Confirm import on TV','AsQrImport.confirm()','secondary')+'<pre id="qrOut">Session ready. Preview before confirm.</pre></div></div>';
    },
    preview(){const s=this.active();const out=document.getElementById('qrOut');if(!out)return;if(!s){out.textContent='Session expired';return;}const p=parsePayload(document.getElementById('qrPayload').value||'');this.lastPreview=p;out.textContent=JSON.stringify(Object.assign({session:{pinRequired:true,expiresInSec:this.remaining(s)}},p),null,2);AsInput&&AsInput.refresh()},
    confirm(){const s=this.active();const out=document.getElementById('qrOut');if(!out)return;if(!s){out.textContent='Session expired';return;}const entered=String(document.getElementById('qrConfirmPin')&&document.getElementById('qrConfirmPin').value||'').trim();if(entered!==String(s.pin)){out.textContent=JSON.stringify({imported:false,error:'PIN mismatch. Enter the 6-digit TV PIN before confirming.'},null,2);return;}const payload=this.lastPreview||parsePayload(document.getElementById('qrPayload').value||'');if(!payload.ok){out.textContent=JSON.stringify({imported:false,error:payload.error,errors:payload.errors||[]},null,2);return;}let result={imported:false,type:payload.type};
      if(payload.type==='sources_txt'){
        const summary=sourceSummary(payload.raw);
        if(summary.invalid){result={imported:false,type:payload.type,error:'Payload has invalid source rows',errors:summary.errors};}
        else{const existing=AsStore.readSources()||'';const next=(existing.trim()?existing.trim()+'\n':'')+payload.raw.trim();const merged=sourceSummary(next);if(merged.invalid){result={imported:false,type:payload.type,error:'Merged sources contain invalid rows',errors:merged.errors};}else{AsStore.saveSources(next);result={imported:true,type:payload.type,summary:merged,audit:audit(payload.type,'saved')}}}
      }else if(payload.type==='link'&&payload.importMode==='disabled_source'){
        const row=sourceRowForLink(payload.url);const existing=AsStore.readSources()||'';const next=(existing.trim()?existing.trim()+'\n':'')+row;const merged=sourceSummary(next);if(merged.invalid){result={imported:false,type:'link',error:'Generated disabled source row was invalid',errors:merged.errors,row:row};}else{AsStore.saveSources(next);result={imported:true,type:'link',mode:'disabled_source',row:row,summary:merged,audit:audit('link','saved_disabled')}}
      }else{
        result={imported:false,type:payload.type,status:'preview_only',note:'This payload type is preview-only in this safe QR import patch.'};
      }
      s.consumed=!!result.imported;s.confirmed=!!result.imported;s.audit=(s.audit||[]).concat([audit(payload.type,result.imported?'imported':'not_imported')]);this.set(s);out.textContent=JSON.stringify(result,null,2);if(result.imported){this.clear();AsApp.toast('Import completed. Review imported sources before enabling.');}
    }
  };
  function patch(){if(!window.AsApp||!window.AsUI||!window.AsSources||!window.AsStore){setTimeout(patch,100);return;}AsApp.qr=function(){AsQrImport.render()};if(AsUI.state.screen==='QR импорт')AsQrImport.render();}
  patch();
})();
