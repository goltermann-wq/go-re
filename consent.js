(function(){
  var ID='AW-18520200851',KEY='goreConsent';
  function get(){try{return localStorage.getItem(KEY)}catch(e){return null}}
  function set(v){try{localStorage.setItem(KEY,v)}catch(e){}}
  function load(){
    if(window.__goreTag)return;window.__goreTag=1;
    var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+ID;document.head.appendChild(s);
    window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};
    gtag('js',new Date());gtag('config',ID);
  }
  function css(){
    var st=document.createElement('style');
    st.textContent='#gore-consent{position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#f8f8f4;color:#3e3d35;border-top:1px solid #3e3d35;font:14px/1.5 "Helvetica Neue",Arial,sans-serif;padding:18px 20px}'+
    '#gore-consent .gc-in{max-width:1100px;margin:0 auto;display:flex;gap:20px;align-items:center;justify-content:space-between;flex-wrap:wrap}'+
    '#gore-consent p{margin:0;flex:1 1 420px;max-width:680px}#gore-consent a{color:#3e3d35;text-decoration:underline}'+
    '#gore-consent .gc-b{display:flex;gap:10px;flex:0 0 auto}'+
    '#gore-consent button{font:inherit;cursor:pointer;padding:11px 22px;border:1px solid #3e3d35;background:#f8f8f4;color:#3e3d35;border-radius:0;letter-spacing:.02em}'+
    '#gore-consent button:hover,#gore-consent button:focus-visible{background:#3e3d35;color:#f8f8f4;outline:none}'+
    '@media(max-width:600px){#gore-consent .gc-b{width:100%}#gore-consent button{flex:1}}';
    document.head.appendChild(st);
  }
  function close(){var b=document.getElementById('gore-consent');if(b)b.remove()}
  function show(){
    if(document.getElementById('gore-consent'))return;
    css();
    var d=document.createElement('div');d.id='gore-consent';d.setAttribute('role','dialog');d.setAttribute('aria-label','Einwilligung');
    d.innerHTML='<div class="gc-in"><p>Wir möchten mit Google Ads messen, welche Anzeigen zu Anfragen führen. Dafür wird nur mit Ihrer Einwilligung ein Google-Tag geladen, der Cookies setzt und Daten an Google übermittelt. Sie können jederzeit widerrufen. Mehr in der <a href="/datenschutz/">Datenschutzerklärung</a>.</p><div class="gc-b"><button type="button" id="gc-no">Ablehnen</button><button type="button" id="gc-yes">Akzeptieren</button></div></div>';
    document.body.appendChild(d);
    document.getElementById('gc-yes').onclick=function(){set('granted');close();load()};
    document.getElementById('gc-no').onclick=function(){set('denied');close()};
  }
  function init(){
    var c=get();
    if(c==='granted')load();else if(c!=='denied')show();
    document.addEventListener('click',function(e){
      var t=e.target.closest&&e.target.closest('[data-consent-reset]');
      if(t){e.preventDefault();try{localStorage.removeItem(KEY)}catch(x){}show()}
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
