(function(){
  function esc(v){return window.AsUI&&AsUI.escape?AsUI.escape(v):String(v||'')}
  function btn(label,action,cls){return '<button class="btn focusable '+(cls||'')+'" onclick="'+action+'">'+esc(label)+'</button>'}
  const ICONS={loading:'⟳',empty:'∅',error:'!',success:'✓',offline:'↯',locked:'⌁'};
  window.AsState={
    render(type,title,message,actions){
      const list=(actions||[]).map(a=>btn(a.label,a.action,a.cls||'secondary')).join('');
      return '<div tabindex="0" class="state-card focusable state-'+esc(type||'empty')+'"><div class="state-icon">'+esc(ICONS[type]||'•')+'</div><div><h2>'+esc(title||'State')+'</h2><p>'+esc(message||'')+'</p><div class="state-actions">'+list+'</div></div></div>';
    },
    loading(title,message){return this.render('loading',title||'Загрузка...',message||'Пожалуйста, подождите.',[])},
    empty(title,message,actions){return this.render('empty',title||'Пусто',message||'Здесь пока нет данных.',actions||[])},
    error(title,message,actions){return this.render('error',title||'Ошибка',message||'Действие не выполнено.',actions||[])},
    success(title,message,actions){return this.render('success',title||'Готово',message||'Операция выполнена.',actions||[])},
    set(target,html){const el=typeof target==='string'?document.getElementById(target):target;if(el)el.innerHTML=html;setTimeout(()=>window.AsInput&&AsInput.refresh&&AsInput.refresh(),30)},
    setLoading(target,title,message){this.set(target,this.loading(title,message))},
    setEmpty(target,title,message,actions){this.set(target,this.empty(title,message,actions))},
    setError(target,title,message,actions){this.set(target,this.error(title,message,actions))},
    setSuccess(target,title,message,actions){this.set(target,this.success(title,message,actions))},
    safeAsync(target,promiseFactory,options){
      const o=options||{};this.setLoading(target,o.loadingTitle||'Загрузка...',o.loadingMessage||'Выполняю действие.');
      return Promise.resolve().then(promiseFactory).then(result=>{if(o.onSuccess)return o.onSuccess(result);this.setSuccess(target,o.successTitle||'Готово',o.successMessage||'Действие выполнено.');return result}).catch(err=>{this.setError(target,o.errorTitle||'Ошибка',err&&err.message?err.message:String(err),o.retryAction?[{label:'Повторить',action:o.retryAction}]:[]);return null});
    },
    patchApp(){
      if(!window.AsApp||AsApp.__statePatch)return;AsApp.__statePatch=true;
      const oldDoSearch=AsApp.doSearch&&AsApp.doSearch.bind(AsApp);
      if(oldDoSearch){AsApp.doSearch=async function(){const out=document.getElementById('results');if(out)AsState.setLoading(out,'Ищу контент','Проверяю demo catalog и enabled sources.');try{await oldDoSearch();const el=document.getElementById('results');if(el&&/Ничего не найдено/.test(el.textContent||'')){AsState.setEmpty(el,'Ничего не найдено','Попробуйте другой запрос или добавьте enabled source.',[{label:'Открыть Sources',action:"AsUI.nav('Источники')"}]);}}catch(e){if(out)AsState.setError(out,'Поиск не выполнен',e.message||String(e),[{label:'Повторить',action:'AsApp.doSearch()'},{label:'Sources',action:"AsUI.nav('Источники')"}]);}}}
      const oldCheckUpdates=AsApp.checkUpdates&&AsApp.checkUpdates.bind(AsApp);
      if(oldCheckUpdates){AsApp.checkUpdates=async function(){const out=document.getElementById('updateOut');if(out)AsState.setLoading(out,'Проверяю обновления','GitHub Releases latest.');try{await oldCheckUpdates();}catch(e){if(out)AsState.setError(out,'Не удалось проверить обновления',e.message||String(e),[{label:'Повторить',action:'AsApp.checkUpdates()'}]);}}}
      const oldSources=AsApp.sources&&AsApp.sources.bind(AsApp);
      if(oldSources){AsApp.sources=function(){oldSources();const out=document.getElementById('sourceManagerOut')||document.getElementById('sourcesOut');if(out&&!(out.textContent||'').trim())AsState.setEmpty(out,'Диагностика источников пуста','Выберите Preview, Test или добавьте source.',[]);}}
    }
  };
  function patch(){if(!window.AsApp||!window.AsUI){setTimeout(patch,100);return;}AsState.patchApp();}
  patch();
})();
