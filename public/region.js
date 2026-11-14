/* Muzayyan · prices by country.
 * Test any region with ?cur=pkr|usd|gbp|eur|myr (remembered on that device); ?cur=auto goes back to the real country.
 */
(function(){
const REGIONS={
 pkr:{code:"PKR",sym:"Rs ",price:{signature:4500,premium:6300,atelier:7800},was:{signature:7500,premium:9900,atelier:12500}},
 usd:{code:"USD",sym:"$",price:{signature:99,premium:149,atelier:199},was:{signature:149,premium:219,atelier:299}},
 gbp:{code:"GBP",sym:"£",price:{signature:99,premium:149,atelier:199},was:{signature:149,premium:219,atelier:299}},
 eur:{code:"EUR",sym:"€",price:{signature:99,premium:149,atelier:199},was:{signature:149,premium:219,atelier:299}},
 myr:{code:"MYR",sym:"RM ",price:{signature:199,premium:299,atelier:399},was:{signature:299,premium:449,atelier:599}}
};
Object.values(REGIONS).forEach(r=>r.f=r.price.signature/4500);
const EU="AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE".split(" ");
function fromCountry(c){c=String(c||"").toUpperCase();if(!c||c==="PK"||c==="XX"||c==="T1")return "pkr";if(c==="MY")return "myr";if(c==="GB")return "gbp";if(EU.includes(c))return "eur";return "usd"}
function fmt(cur,n){const r=REGIONS[cur]||REGIONS.pkr;return r.sym+Math.round(n).toLocaleString("en-US")}
let forced="";try{const q=new URLSearchParams(location.search).get("cur");if(q==="auto"){localStorage.removeItem("bw-force")}else if(q&&REGIONS[q]){forced=q;localStorage.setItem("bw-force",q)}else forced=localStorage.getItem("bw-force")||""}catch(_){}
let cur=forced;if(!cur){try{cur=localStorage.getItem("bw-reg")||""}catch(_){}}if(!REGIONS[cur])cur="pkr";
const subs=[];
window.BW_REGION={REGIONS,get cur(){return cur},fmt:(n,c)=>fmt(c||cur,n),
 price:(t,c)=>fmt(c||cur,(REGIONS[c||cur]||REGIONS.pkr).price[t]),was:(t,c)=>fmt(c||cur,(REGIONS[c||cur]||REGIONS.pkr).was[t]),
 num:(t,c)=>(REGIONS[c||cur]||REGIONS.pkr).price[t],code:c=>(REGIONS[c||cur]||REGIONS.pkr).code,
 fromPkr:(n,c)=>fmt(c||cur,n*(REGIONS[c||cur]||REGIONS.pkr).f),
 onChange:fn=>subs.push(fn)};
if(!forced){fetch("/cdn-cgi/trace",{cache:"no-store"}).then(r=>r.text()).then(t=>{const m=t.match(/^loc=(\w+)/m);const c=fromCountry(m&&m[1]);try{localStorage.setItem("bw-reg",c)}catch(_){}
  if(c!==cur){cur=c;subs.forEach(fn=>{try{fn(c)}catch(e){}})}}).catch(()=>{})}
})();
