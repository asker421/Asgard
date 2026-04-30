window.AsInput={
  items:[],
  index:0,
  mode:'remote',
  handledKeys:['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Enter','NumpadEnter','Backspace','Escape'],
  isVisible(el){
    if(!el)return false;
    const r=el.getBoundingClientRect();
    const s=getComputedStyle(el);
    return r.width>0&&r.height>0&&s.visibility!=='hidden'&&s.display!=='none'&&!el.disabled&&el.getAttribute('aria-hidden')!=='true';
  },
  refresh(){
    this.items=[...document.querySelectorAll('.focusable,.btn,input,textarea,select,button,[tabindex]')].filter(x=>this.isVisible(x));
    this.items.forEach((x,i)=>{if(!x.hasAttribute('tabindex'))x.setAttribute('tabindex','0');x.dataset.focusIndex=i});
    if(this.items.length&&(!document.activeElement||document.activeElement===document.body||!this.isVisible(document.activeElement))){
      this.focus(this.items[0]);
    }
  },
  focus(el){
    if(!el)return;
    el.focus({preventScroll:true});
    el.scrollIntoView({block:'nearest',inline:'nearest',behavior:'smooth'});
    this.index=this.items.indexOf(el);
  },
  center(rect){return {x:rect.left+rect.width/2,y:rect.top+rect.height/2}},
  move(dir){
    this.refresh();
    const list=this.items;
    if(!list.length)return false;
    const active=document.activeElement;
    if(!active||!list.includes(active)){this.focus(list[0]);return true;}
    const ar=active.getBoundingClientRect();
    const ac=this.center(ar);
    let best=null;
    let bestScore=Infinity;
    list.forEach(el=>{
      if(el===active)return;
      const r=el.getBoundingClientRect();
      const c=this.center(r);
      const dx=c.x-ac.x;
      const dy=c.y-ac.y;
      let primary=0;
      let secondary=0;
      if(dir==='right'){if(dx<=8)return;primary=dx;secondary=Math.abs(dy)}
      if(dir==='left'){if(dx>=-8)return;primary=-dx;secondary=Math.abs(dy)}
      if(dir==='down'){if(dy<=8)return;primary=dy;secondary=Math.abs(dx)}
      if(dir==='up'){if(dy>=-8)return;primary=-dy;secondary=Math.abs(dx)}
      const score=primary*primary+secondary*secondary*2;
      if(score<bestScore){bestScore=score;best=el;}
    });
    if(best){this.focus(best);return true;}
    return false;
  },
  activate(){
    const el=document.activeElement;
    if(!el)return false;
    const tag=(el.tagName||'').toUpperCase();
    if(['INPUT','TEXTAREA','SELECT'].includes(tag))return false;
    if(typeof el.click==='function'){el.click();return true;}
    return false;
  },
  onKey(e){
    let handled=false;
    if(e.key==='ArrowRight')handled=this.move('right');
    else if(e.key==='ArrowLeft')handled=this.move('left');
    else if(e.key==='ArrowDown')handled=this.move('down');
    else if(e.key==='ArrowUp')handled=this.move('up');
    else if(e.key==='Enter'||e.key==='NumpadEnter')handled=this.activate();
    else if(e.key==='Backspace'||e.key==='Escape'){
      if(window.AsUI&&typeof AsUI.back==='function'){AsUI.back();handled=true;}
      else if(window.asgardBack){window.asgardBack();handled=true;}
    }
    if(handled){e.preventDefault();e.stopPropagation();}
  },
  setMode(m){this.mode=m;document.body.classList.toggle('touch-mode',m==='touch');document.body.classList.toggle('remote-mode',m==='remote')},
  init(){
    document.addEventListener('keydown',e=>this.onKey(e),true);
    document.addEventListener('touchstart',()=>this.setMode('touch'),{passive:true});
    document.addEventListener('mousemove',()=>this.setMode('touch'),{passive:true});
    document.addEventListener('focusin',()=>{this.index=this.items.indexOf(document.activeElement)},true);
    this.setMode('remote');
    setTimeout(()=>this.refresh(),200);
  }
};
AsInput.init();
