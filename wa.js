(function(){
var URL='https://wa.me/49160964925?text='+encodeURIComponent('Hallo, ich habe eine Anfrage zu meinem Vorhaben.');
var ICON='<svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4.5C9.65 4.5 4.5 9.6 4.5 15.9c0 2.1.58 4.05 1.6 5.73L4.6 27.4l5.95-1.5a11.5 11.5 0 0 0 5.45 1.37c6.35 0 11.5-5.1 11.5-11.4S22.35 4.5 16 4.5z"/><path d="M12.2 10.9c.3-.5.7-.5 1-.5l.7 0c.25.02.5.05.7.6l.9 2.1c.1.25.05.5-.1.7l-.7.9c-.15.2-.2.4-.05.65.8 1.4 2 2.5 3.5 3.2.25.12.5.1.65-.1l.85-1.05c.2-.25.45-.3.7-.2l2 .95c.3.15.4.3.35.65-.1.9-.9 1.9-2 2.15-.9.2-2.4 0-4.4-1.1-2.4-1.35-4.1-3.5-4.7-5.2-.45-1.3-.1-2.7.6-3.75z" fill="currentColor" stroke="none"/></svg>';
function init(){
if(document.querySelector('.wa-fab'))return;
var st=document.createElement('style');
st.textContent='.wa-fab{position:fixed;right:16px;bottom:84px;z-index:5;width:56px;height:56px;border-radius:50%;background:#3e3d35;color:#f8f8f4;border:1px solid #f8f8f4;display:grid;place-items:center;box-shadow:0 8px 22px rgba(40,36,28,.28);transition:background .2s,bottom .3s}'+
'.wa-fab:hover,.wa-fab:focus-visible{background:#7e6f63;outline:none}'+
'body:has(.np:not(.is-closed)) .wa-fab{bottom:330px}'+
'body:has(#gore-consent) .wa-fab{display:none}'+
'.wa-line svg{width:1.3em;height:1.3em;vertical-align:-.28em;margin-right:.4em}'+
'@media(max-width:700px){footer{padding-bottom:100px!important}}';
document.head.appendChild(st);
var a=document.createElement('a');a.className='wa-fab';a.href=URL;a.target='_blank';a.rel='noopener';a.setAttribute('aria-label','Per WhatsApp anfragen');a.innerHTML=ICON;
document.body.appendChild(a);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
