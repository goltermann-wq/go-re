try{history.scrollRestoration='manual'}catch(e){}if(!location.hash){document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,0);window.addEventListener('load',function(){if(!location.hash)window.scrollTo(0,0)})}
(function(){var d=document.querySelector('.nav-drop');if(!d)return;
document.addEventListener('click',function(e){if(d.open&&!d.contains(e.target))d.open=false});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&d.open){d.open=false;d.querySelector('summary').focus()}});
d.querySelector('summary').addEventListener('click',function(e){if(matchMedia('(hover:hover)').matches){e.preventDefault();d.open=true}});
var t;var w=d.closest('.desktop-nav');
d.addEventListener('mouseenter',function(){if(matchMedia('(hover:hover)').matches){clearTimeout(t);d.open=true}});
d.addEventListener('mouseleave',function(){if(matchMedia('(hover:hover)').matches){t=setTimeout(function(){d.open=false},180)}});
})();

/* Scroll-Animationen & kleine UX-Details (alle Seiten) */
(function(){
try{
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var sel=['main h2','main .tag','main>section>p','.detail section>*','.steps article','.faq details','.faq-teaser>*','.contact-intro>*','.contact-line','.service-row','.image-story>div','.lex-card','.related-questions a','.tile-group','.mini-tile','.mini-steps','.unternehmen-band','.topic','.lex-article>h2','.lex-article>h3','.lex-article>p','.lex-article>ul','.lex-article>ol','.lex-article>.note','.faq-list>*','.crumb'].join(',');
var imgSel='.intro-project,.image-story figure,.detail-image,.wide-img';
function skip(e){if(e.offsetParent===null&&getComputedStyle(e).position!=='fixed')return true;return e.closest('header,footer,.hero,.sx,[data-r],.carousel-viewport,.mobile-menu,.knowledge-layout .topic-nav')||e.hasAttribute('data-r')}
function scrollInit(){
 var q='.section-heading,.services .service-row,.unternehmen-band,.process-head,.steps article,.faq-head,.faq-list2,.faq-teaser,.contact-intro,.contact-methods';
 var st=[].slice.call(document.querySelectorAll(q)).map(function(e){var off=0;if(e.matches('.steps article')){var sib=[].slice.call(e.parentNode.children);var i=sib.indexOf(e);if(i>0&&sib[0].getBoundingClientRect().top===e.getBoundingClientRect().top)off=i*0.32}return {e:e,cur:-1,tg:0,ty:0,off:off}});
 var raf=0;
 function ease(x){return x*x*(3-2*x)}
 function frame(){raf=0;var vh=window.innerHeight,start=vh*0.96,span=vh*0.55,busy=false,rem=document.documentElement.scrollHeight-window.scrollY-vh,endF=Math.max(0,1-rem/120);
  st.forEach(function(o){var base=o.e.getBoundingClientRect().top-o.ty;
   o.tg=Math.max(endF,Math.max(0,Math.min(1,(start-base)/span-o.off)));
   if(o.cur<0)o.cur=o.tg;
   var d=o.tg-o.cur;if(Math.abs(d)>0.002){o.cur+=d*0.14;busy=true}else o.cur=o.tg;
   if(o.cur>=0.999&&o.tg>=1){o.cur=1;if(o.ty!==0||o.e.style.opacity){o.e.style.opacity='';o.e.style.transform=''}o.ty=0;return}
   var e=ease(o.cur);o.ty=(1-e)*44;o.e.style.opacity=e.toFixed(3);o.e.style.transform='translate3d(0,'+o.ty.toFixed(1)+'px,0)'});
  if(busy)raf=requestAnimationFrame(frame)}
 function req(){if(!raf)raf=requestAnimationFrame(frame)}
 st.forEach(function(o){o.e.style.willChange='opacity,transform'});
 addEventListener('scroll',req,{passive:true});addEventListener('resize',req);frame()}
function init(){
 if(reduce)return;
 if(document.querySelector('.hero-copy')){scrollInit();return}
 if(!('IntersectionObserver' in window))return;
 var vh=window.innerHeight,items=[],late=[],isHome=!!document.querySelector('.hero-copy');
 document.querySelectorAll(sel+','+imgSel).forEach(function(e){
  if(skip(e))return;var r=e.getBoundingClientRect();var inView=r.top<vh*0.92&&r.bottom>0;var force=isHome&&e.closest('.services,.process,.faq,.faq-teaser,.contact');if(inView&&!force)return;
  e.classList.add(e.matches(imgSel)?'rv-img':'rv');(inView?late:items).push(e)});
 var batch=0,last=0;var rowIo=new IntersectionObserver(function(es){es.forEach(function(x){if(!x.isIntersecting)return;var t=x.target;rowIo.unobserve(t);t.style.setProperty('--rd','0ms');requestAnimationFrame(function(){t.classList.add('rv-in')});setTimeout(function(){t.classList.remove('rv','rv-in')},1300)})},{threshold:.2,rootMargin:'0px 0px -28% 0px'});
 var io=new IntersectionObserver(function(es){var n=0;es.forEach(function(x){if(!x.isIntersecting)return;var t=x.target;t.style.setProperty('--rd',(t.matches('.service-row')?0:Math.min(n*60,180))+'ms');n++;io.unobserve(t);requestAnimationFrame(function(){t.classList.add('rv-in')});setTimeout(function(){t.classList.remove('rv','rv-img','rv-in');t.style.removeProperty('--rd')},1300)})},{threshold:.1,rootMargin:'0px 0px -6% 0px'});
 items.forEach(function(e){(e.matches('.service-row')?rowIo:io).observe(e)});
 setTimeout(function(){late.forEach(function(e){(e.matches('.service-row')?rowIo:io).observe(e)})},1100);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
/* Lesefortschritt in Baulexikon-Artikeln */
var art=document.querySelector('.lex-article');
if(art&&!reduce){var bar=document.createElement('div');bar.className='read-progress';bar.setAttribute('aria-hidden','true');document.body.appendChild(bar);
 var tick=false;function upd(){var h=document.documentElement.scrollHeight-innerHeight;bar.style.transform='scaleX('+(h>0?Math.min(1,scrollY/h):0)+')';tick=false}
 addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});upd()}
}catch(e){}
})();

/* Kontakt-Links: zuverlässig zum Kontaktbereich scrollen (Desktop-Sandwich, eingebettete Vorschau) */
(function(){
document.addEventListener('click',function(e){
 var a=e.target.closest&&e.target.closest('a[href="#kontakt"]');if(!a)return;
 var t=document.getElementById('kontakt');if(!t)return;
 e.preventDefault();
 var m=a.closest('.mobile-menu');if(m)m.open=false;
 setTimeout(function(){try{t.scrollIntoView({behavior:'smooth',block:'start'})}catch(x){t.scrollIntoView()}
  try{history.replaceState(null,'','#kontakt')}catch(x){}},30);
},true);
})();
