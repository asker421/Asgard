(function(){
  function esc(v){return AsUI.escape(v)}
  function btn(label,action,cls){return '<button class="btn focusable '+(cls||'')+'" onclick="'+action+'">'+label+'</button>'}
  function chip(v){return '<span class="chip">'+esc(v)+'</span>'}
  function now(){return Date.now()}
  function randomDigits(n){let s='';for(let i=0;i<n;i++)s+=String(Math.floor(Math.random()*10));return s}
  function randomToken(){return Array.from(crypto.getRandomValues(new Uint8Array(12))).map(x=>x.toString(16).padStart(2,'0')).join('')}
  function sessionUrl(s){return 'asgard://import?session='+encodeURIComponent(s.token)+'&pin='+encodeURIComponent(s.pin)}
  function parsePayload(text){
    const raw=String(text||'').trim();
    if(!raw)return {ok:false,error:'Payload is empty'};
    if(raw[0]==='{'||raw[0]==='['){try{return {ok:true,type:'json',data:JSON.parse(raw),raw:raw}}catch(e){return {ok:false,error:'Invalid JSON: '+e.message}}}
    if(raw.includes('|')){
      const parsed=AsSources.parse(raw);
      const invalid=parsed.filter(x=>!x.ok);
      return {ok:!invalid.length,type:'sources_txt',raw:raw,summary:{total:parsed.length,valid:parsed.length-invalid.length,invalid:invalid.length,enabled:parsed.filter(x=>x.ok&&x.enabled).length},errors:invalid.map(x=>({row:x.row,error:x.error,line:x.line||x.name}))};
    }
    if(/^https?:\/\//i.test(raw)||/^magnet:\?/i.test(raw))return {ok:true,type:'link',raw:raw,url:raw};
    return {ok:false,error:'Unsupported payload. Paste sources.txt row(s), JSON, http link or magnet link.'};
  }
  window.AsQrImport={
    key:'asgard_qr_session',lastPreview:null,
    get(){try{return JSON.parse(localStorage.getItem(this.key)||'null')}catch(e){return null}},
    set(s){localStorage.setItem(this.key,JSON.stringify(s))},
    clear(){localStorage.removeItem(this.key)},
    active(){const s=this.get();return s&&s.expiresAt>now()?s:null},
    create(){const s={token:randomToken(),pin:randomDigits(6),createdAt:now(),expiresAt:now()+10*60*1000,confirmed:false,consumed:false};this.set(s);this.render()},
    expire(){this.clear();this.render()},
    remaining(s){return Math.max(0,Math.ceil((s.expiresAt-now())/1000))},
    render(){
      const s=this.active();
      const body=s?this.sessionBody(s):this.emptyBody();
      AsApp.shell('QR импорт','Secure local import session for phone-to-TV transfer. No silent import: TV confirmation is always required.','<div class="warn"><b>Security:</b> one-time token, 6-digit PIN, 10-minute expiry, local confirmation on TV. Do not paste passwords, cookies or private tokens.</div>'+body);
      setTimeout(()=>AsInput&&AsInput.refresh(),50);
    },
    emptyBody(){return '<div class="layout2"><div class="panel"><h2>No active session</h2><p class="muted">Create a one-time import session. The phone can transfer text payload; the TV must preview and confirm before saving.</p>'+btn('Create QR session','AsQrImport.create()')+'</div><div class="panel"><h2>Supported payloads</h2><p>'+chip('sources.txt')+chip('JSON')+chip('http link')+chip('magnet link')+'</p><p class="muted">This is an offline/local prototype. A real phone web bridge/server is not bundled yet.</p></div></div>'},
    sessionBody(s){
      const url=sessionUrl(s);
      return '<div class="layout2"><div class="panel"><h2>TV import session</h2><div class="qr-box"><div class="qr-fake">QR</div><p>'+esc(url)+'</p></div><p>'+chip('PIN '+s.pin)+chip('expires '+this.remaining(s)+'s')+chip('one-time')+'</p>'+btn('Refresh timer','AsQrImport.render()','secondary')+btn('Expire session','AsQrImport.expire()','danger')+'</div><div class="panel"><h2>Paste phone payload</h2><p class="muted">Until real phone bridge is implemented, paste the transferred text here to simulate phone import safely.</p><textarea class="focusable" id="qrPayload" rows="9" placeholder="Paste sources.txt row(s), JSON, http link or magnet link"></textarea>'+btn('Preview payload','AsQrImport.preview()')+btn('Confirm import on TV','AsQrImport.confirm()','secondary')+'<pre id="qrOut">Session ready. Preview before confirm.</pre></div></div>';
    },
    preview(){const s=this.active();const out=document.getElementById('qrOut');if(!s){out.textContent='Session expired';return;}const p=parsePayload(document.getElementById('qrPayload').value||'');this.lastPreview=p;out.textContent=JSON.stringify(Object.assign({session:{pin:s.pin,expiresInSec:this.remaining(s)}},p),null,2);AsInput&&AsInput.refresh()},
    confirm(){const s=this.active();const out=document.getElementById('qrOut');if(!s){out.textContent='Session expired';return;}const payload=this.lastPreview||parsePayload(document.getElementById('qrPayload').value||'');if(!payload.ok){out.textContent=JSON.stringify({imported:false,error:payload.error,errors:payload.errors||[]},null,2);return;}if(!confirm('Confirm import on TV?'))return;let result={imported:false,type:payload.type};
      if(payload.type==='sources_txt'){
        const existing=AsStore.readSources()||'';
        const next=(existing.trim()?existing.trim()+'\n':'')+payload.raw.trim();
        const parsed=AsSources.parse(next);const invalid=parsed.filter(x=>!x.ok);
        if(invalid.length){result={imported:false,type:payload.type,error:'Merged sources contain invalid rows',errors:invalid.map(x=>({row:x.row,error:x.error,line:x.line||x.name}))};}
        else{AsStore.saveSources(next);result={imported:true,type:payload.type,summary:{total:parsed.length,enabled:parsed.filter(x=>x.enabled).length}};}
      }else if(payload.type==='link'){
        result={imported:false,type:'link',status:'preview_only',note:'Links are previewed only in this patch. Add them through Source Manager or User Media screen.'};
      }else if(payload.type==='json'){
        result={imported:false,type:'json',status:'preview_only',note:'JSON import schema is not finalized yet.'};
      }
      s.consumed=true;s.confirmed=true;this.set(s);out.textContent=JSON.stringify(result,null,2);if(result.imported){this.clear();AsApp.toast('Import completed');}
    }
  };
  function patch(){if(!window.AsApp||!window.AsUI||!window.AsSources||!window.AsStore){setTimeout(patch,100);return;}AsApp.qr=function(){AsQrImport.render()};if(AsUI.state.screen==='QR импорт')AsQrImport.render();}
  patch();
})();
