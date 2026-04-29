(function(){
  function joinUrl(base,path){base=String(base||'').trim().replace(/\/+$/,'');path=String(path||'').trim();if(!path)return base;if(path.startsWith('http'))return path;return base+'/'+path.replace(/^\/+/, '')}
  function appendParams(url,params){const u=new URL(url);Object.keys(params).forEach(k=>{const v=params[k];if(v!==undefined&&v!==null&&String(v)!=='')u.searchParams.set(k,v)});return u.toString()}
  function textOf(el,sel){const x=sel?el.querySelector(sel):el;return x?(x.textContent||'').trim():''}
  function attrOf(el,name){return el?el.getAttribute(name)||'':''}
  async function httpText(url){
    const b=window.AsgardBridge;
    if(b&&b.nativeFetch){
      const raw=b.nativeFetch(url);
      const obj=JSON.parse(raw||'{}');
      return {ok:!!obj.ok,status:Number(obj.status||0),contentType:obj.contentType||'',text:obj.body||'',url:obj.url||url,native:true,error:obj.error||''};
    }
    const c=new AbortController();const timer=setTimeout(()=>c.abort(),9000);
    try{const res=await fetch(url,{signal:c.signal,headers:{Accept:'application/xml,text/xml,application/rss+xml,application/json,text/plain,*/*'}});const text=await res.text();return {ok:res.ok,status:res.status,contentType:res.headers.get('content-type')||'',text,url,native:false}}finally{clearTimeout(timer)}
  }
  window.AsTorznabAdapter={
    buildSearchUrl(baseUrl,apiKey,query){return appendParams(baseUrl,{apikey:apiKey||'',t:'search',q:query||''})},
    parse(xmlText,source){
      const doc=new DOMParser().parseFromString(String(xmlText||''),'application/xml');
      if(doc.querySelector('parsererror'))throw new Error('XML parse error');
      return Array.from(doc.querySelectorAll('item')).map((item,i)=>{
        const attrs=Array.from(item.getElementsByTagName('*')).filter(n=>n.localName==='attr');
        const findAttr=(name)=>{const x=attrs.find(a=>a.getAttribute('name')===name);return x?x.getAttribute('value')||'':''};
        const enclosure=item.querySelector('enclosure');
        const link=textOf(item,'link');
        const torrentUrl=attrOf(enclosure,'url')||link;
        const magnetUrl=findAttr('magneturl')||findAttr('magnetUrl')||findAttr('magnet');
        return {id:textOf(item,'guid')||source.name+'_'+i,title:textOf(item,'title')||source.name,sourceName:source.name||'JacRed',sourceType:'jacred',url:magnetUrl||torrentUrl,magnetUrl:magnetUrl,torrentUrl:torrentUrl,classification:'torrent',size:Number(textOf(item,'size')||attrOf(enclosure,'length')||findAttr('size')||0),seeders:Number(findAttr('seeders')||0),peers:Number(findAttr('peers')||0),pubDate:textOf(item,'pubDate'),category:findAttr('category'),quality:findAttr('quality')||'',rightsStatus:'user_configured_parser',requiresUserConfirmation:true,raw:{link,torrentUrl,magnetPresent:!!magnetUrl}};
      });
    }
  };
  window.AsJacRedAdapter={
    id:'jacred',name:'JacRed Parser Adapter',
    supports(source){return source&&source.type==='jacred'},
    endpoints(baseUrl){return [baseUrl,joinUrl(baseUrl,'api/v2.0/indexers/all/results/torznab/api'),joinUrl(baseUrl,'api'),joinUrl(baseUrl,'torznab'),joinUrl(baseUrl,'api/torznab')]},
    async fetchText(url){return httpText(url)},
    classify(r){const ct=(r.contentType||'').toLowerCase();const t=String(r.text||'').trim().toLowerCase();if(ct.includes('json')||t.startsWith('{')||t.startsWith('['))return 'json';if(ct.includes('xml')||t.startsWith('<?xml')||t.includes('<rss')||t.includes('<item'))return 'torznab_xml';if(t.includes('<html')||t.includes('<!doctype html'))return 'html_ui';return 'unknown'},
    normalizeJson(raw,source){const arr=Array.isArray(raw)?raw:(raw.results||raw.items||raw.data||raw.torrents||[]);if(!Array.isArray(arr))return [];return arr.map((x,i)=>({id:x.id||x.guid||source.name+'_'+i,title:x.title||x.name||source.name,sourceName:source.name||'JacRed',sourceType:'jacred',url:x.magnetUrl||x.magnet||x.torrentUrl||x.link||x.url,magnetUrl:x.magnetUrl||x.magnet||'',torrentUrl:x.torrentUrl||x.link||x.url||'',classification:'torrent',size:x.size||0,seeders:Number(x.seeders||x.seed||0),peers:Number(x.peers||0),pubDate:x.pubDate||x.date||'',category:x.category||'',quality:x.quality||'',rightsStatus:'user_configured_parser',requiresUserConfirmation:true,raw:x}))},
    async discover(settings){const base=settings.jacredBaseUrl;const apiKey=settings.jacredApiKey;const started=Date.now();if(!base)return {ok:false,status:'missing_base_url',error:'JacRed Base URL is empty',elapsedMs:0};for(const endpoint of this.endpoints(base)){try{const url=AsTorznabAdapter.buildSearchUrl(endpoint,apiKey,'test');const r=await this.fetchText(url);const kind=this.classify(r);if(kind==='html_ui')return {ok:false,status:'html_ui_detected',endpoint:r.url,httpStatus:r.status,error:'HTML UI detected; API endpoint required',elapsedMs:Date.now()-started,apiKeyPresent:!!apiKey};if(r.ok&&(kind==='torznab_xml'||kind==='json'))return {ok:true,status:'api_detected',kind,endpoint,detectedUrl:r.url,httpStatus:r.status,elapsedMs:Date.now()-started,apiKeyPresent:!!apiKey,native:!!r.native};}catch(e){}}
      return {ok:false,status:'api_not_detected',error:'No JacRed/Torznab API endpoint detected',elapsedMs:Date.now()-started,apiKeyPresent:!!apiKey};
    },
    async search(source,query,context){const settings=context&&context.settings?context.settings:AsStore.parserSettings();const started=Date.now();const d=await this.discover(settings);if(!d.ok)return {source:source.name,ok:false,status:d.status,error:d.error,diagnostics:d,results:[]};try{const url=AsTorznabAdapter.buildSearchUrl(d.endpoint,settings.jacredApiKey,query);const r=await this.fetchText(url);if(!r.ok)return {source:source.name,ok:false,status:'http_error',error:r.error||('HTTP '+r.status),diagnostics:d,results:[]};let results=[];if(d.kind==='torznab_xml')results=AsTorznabAdapter.parse(r.text,source);else results=this.normalizeJson(JSON.parse(r.text),source);return {source:source.name,ok:true,status:'ok',adapter:'jacred',endpoint:d.endpoint,elapsedMs:Date.now()-started,resultCount:results.length,results};}catch(e){return {source:source.name,ok:false,status:'parse_or_network_error',error:e.name==='AbortError'?'Timeout':e.message,diagnostics:d,results:[]}}
    },
    diagnostics(source){return this.discover(AsStore.parserSettings())}
  };
})();
