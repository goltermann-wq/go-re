(function(){
function normal(s){return s.toLowerCase().replace(/ä|ae/g,'a').replace(/ö|oe/g,'o').replace(/ü|ue/g,'u').replace(/ß/g,'ss').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim()}
const stop=new Set(['was','wie','viel','kostet','ein','eine','einen','einem','einer','der','die','das','ich','mein','meine','meinen','kann','brauche','fur','in','im','bei','und','ist','stuttgart']);
function tokens(q){return normal(q).split(' ').filter(w=>w&&!stop.has(w)).map(w=>w.length>5?w.replace(/(en|er|es)$/,''):w)}
function matches(text,query){const clean=normal(text);let words=tokens(query);if(/kostet/.test(normal(query))&&!words.includes('kost'))words.push('kost');return words.every(w=>clean.includes(w))}
if(typeof module!=='undefined')module.exports={normal,matches};
if(typeof document==='undefined')return;
const input=document.querySelector('#lex-query'),cards=[...document.querySelectorAll('.lex-card')],form=document.querySelector('#lex-search'),count=document.querySelector('#result-count'),reset=document.querySelector('#lex-reset'),empty=document.querySelector('#lex-empty'),filters=[...document.querySelectorAll('.lex-filters button')];
let category='Alle Themen';
function update(){let n=0;cards.forEach(card=>{const shown=(category==='Alle Themen'||card.dataset.category===category)&&matches(card.dataset.search,input.value);card.hidden=!shown;if(shown)n++});count.textContent=n+' '+(n===1?'Thema':'Themen')+(input.value?' für „'+input.value+'“':' von A bis Z');empty.hidden=n!==0;reset.hidden=!input.value&&category==='Alle Themen';filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category===category)))}
form.addEventListener('submit',e=>{e.preventDefault();update();document.querySelector('.resultbar').scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})});input.addEventListener('input',()=>{if(input.value&&category!=='Alle Themen')category='Alle Themen';update()});
filters.forEach(b=>b.addEventListener('click',()=>{category=b.dataset.category;input.value='';update()}));
document.querySelectorAll('[data-suggestion]').forEach(b=>b.addEventListener('click',()=>{input.value=b.dataset.suggestion;category='Alle Themen';update();input.focus()}));
reset.addEventListener('click',()=>{input.value='';category='Alle Themen';update();input.focus()});update();
})();
