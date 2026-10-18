var NP_ITEMS=[{"s": "bau-turbo", "t": "Bau-Turbo (§ 246e BauGB)", "c": "Anträge & Genehmigung", "n": 1}, {"s": "ladeinfrastruktur-pflicht", "t": "E-Ladestellen-Pflicht (GEIG)", "c": "Anträge & Genehmigung", "n": 1}, {"s": "gebaeudemodernisierungsgesetz", "t": "Neues Heizungsgesetz (GModG)", "c": "Sanierung & Energie", "n": 1}, {"s": "pv-pflicht-baden-wuerttemberg", "t": "PV-Pflicht in Baden-Württemberg", "c": "Sanierung & Energie", "n": 1}, {"s": "heizung-gebaeudeenergiegesetz", "t": "Heizungstausch richtig planen", "c": "Sanierung & Energie", "n": 0}, {"s": "foerderung-sanierung", "t": "Förderung für Sanierung", "c": "Sanierung & Energie", "n": 0}, {"s": "energetische-sanierung", "t": "Energetische Sanierung", "c": "Sanierung & Energie", "n": 0}, {"s": "aufstockung", "t": "Aufstockung", "c": "Mehr Wohnraum", "n": 0}, {"s": "dachboden-ausbauen", "t": "Dachboden ausbauen", "c": "Mehr Wohnraum", "n": 0}, {"s": "nutzungsaenderung", "t": "Nutzungsänderung", "c": "Anträge & Genehmigung", "n": 0}];
(function(){
  if(typeof NP_ITEMS==='undefined'||document.querySelector('.np'))return;
  var KEY='np-state',here=location.pathname.replace(/\/?$/,'/'),isHome=here==='/';
  function get(){try{return localStorage.getItem(KEY)}catch(e){return null}}
  function put(v){try{localStorage.setItem(KEY,v)}catch(e){}}
  var st=get(); var open=st==='open'?true:st==='closed'?false:(isHome&&innerHeight>=480);
  var AR='<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
  var root=document.createElement('aside'); root.className='np'+(open?'':' is-closed'); root.setAttribute('aria-label','Neu im Baulexikon');
  var lis=NP_ITEMS.map(function(i){var cur=here==='/baulexikon/'+i.s+'/';
    return '<li class="np-item'+(cur?' is-here':'')+'"><a href="/baulexikon/'+i.s+'/"'+(cur?' aria-current="page"':'')+'><small>'+i.c+(i.n?'<em>Neu</em>':'')+'</small><strong>'+i.t+'</strong><span class="np-go">'+AR+'</span></a></li>'}).join('');
  root.innerHTML='<div class="np-panel" id="npPanel"><div class="np-head"><span class="np-title"><i class="np-dot" aria-hidden="true"></i>Neu im Baulexikon</span><button class="np-x" type="button" aria-label="Ausblenden"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>'
   +'<div class="np-view"><ul class="np-list" tabindex="0" aria-label="Aktuelle Themen, nach oben und unten scrollen">'+lis+'</ul></div>'
   +'<div class="np-foot"><span class="np-count"><b id="npNow">1</b> / '+NP_ITEMS.length+'</span><a href="/fragen-bauen-stuttgart/">Alle Themen</a></div></div>'
   +'<button class="np-chip" type="button" aria-controls="npPanel" aria-label="Neue Themen im Baulexikon einblenden"><i class="np-dot" aria-hidden="true"></i>Neu im Lexikon</button>';
  document.body.appendChild(root);
  var panel=root.querySelector('.np-panel'),chip=root.querySelector('.np-chip'),list=root.querySelector('.np-list'),now=root.querySelector('#npNow');
  panel.setAttribute('aria-hidden',open?'false':'true'); if(!open)panel.setAttribute('inert','');
  // Haptik: Android per Vibration; iOS Safari kennt kein navigator.vibrate -> Schalter-Trick (spürbarer Tick bei Tipp)
  var sw=document.createElement('input');sw.type='checkbox';sw.setAttribute('switch','');sw.id='npSw';sw.tabIndex=-1;sw.setAttribute('aria-hidden','true');
  sw.style.cssText='position:fixed;left:0;top:0;width:1px;height:1px;opacity:.01;pointer-events:none';
  var lab=document.createElement('label');lab.htmlFor='npSw';lab.setAttribute('aria-hidden','true');lab.style.cssText='position:fixed;left:0;top:0;width:1px;height:1px;opacity:.01;pointer-events:none';
  root.appendChild(sw);root.appendChild(lab);
  function tick(){try{if(navigator.vibrate){navigator.vibrate(8);return}}catch(e){} try{lab.click()}catch(e){}}
  function setOpen(v){open=v;root.classList.toggle('is-closed',!v);panel.setAttribute('aria-hidden',v?'false':'true');if(v)panel.removeAttribute('inert');else panel.setAttribute('inert','');put(v?'open':'closed');tick();(v?list:chip).focus&&setTimeout(function(){try{(v?root.querySelector('.np-x'):chip).focus({preventScroll:true})}catch(e){}},50)}
  root.querySelector('.np-x').addEventListener('click',function(){setOpen(false)});
  chip.addEventListener('click',function(){setOpen(true)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&open&&root.contains(document.activeElement))setOpen(false)});
  var idx=0,raf=0,items=[].slice.call(list.children);
  function upd(){raf=0;var top=list.scrollTop,best=0,bd=1e9;items.forEach(function(it,i){var d=Math.abs(it.offsetTop-list.offsetTop-6-top);if(d<bd){bd=d;best=i}});
    if(list.scrollHeight-list.clientHeight-top<3)best=items.length-1;
    if(best!==idx){idx=best;now.textContent=idx+1;tick()}}
  list.addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(upd)},{passive:true});
  // Seiten-Scroll nicht mitnehmen: an Anfang/Ende der Liste die Geste schlucken (Browser-Leisten bleiben stehen)
  var ty=0;
  list.addEventListener('touchstart',function(e){ty=e.touches[0].clientY},{passive:true});
  list.addEventListener('touchmove',function(e){var y=e.touches[0].clientY,dy=y-ty,max=list.scrollHeight-list.clientHeight;
    if((list.scrollTop<=0&&dy>0)||(list.scrollTop>=max-1&&dy<0)){if(e.cancelable)e.preventDefault()} ty=y;upd()},{passive:false});
  list.addEventListener('click',function(e){if(e.target.closest('a'))tick()});
  // Maus: Mausrad vertikal ok; Pfeiltasten
  list.addEventListener('keydown',function(e){var h=items[0].offsetHeight+8;if(e.key==='ArrowDown'){list.scrollBy({top:h,behavior:'smooth'});e.preventDefault()}if(e.key==='ArrowUp'){list.scrollBy({top:-h,behavior:'smooth'});e.preventDefault()}});
})();
