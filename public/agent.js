/* Muzayyan · Bolu, the website card helper (chat bubble). Talks to /api/chat and /api/upload. */
(function(){
if(window.__bwAgent)return;window.__bwAgent=1;
const LS={get(k){try{return localStorage.getItem(k)}catch(_){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(_){}}};
let cid=LS.get("bw-ai-cid");if(!cid||cid.length<16){const a=new Uint8Array(12);crypto.getRandomValues(a);cid=[...a].map(x=>x.toString(16).padStart(2,"0")).join("");LS.set("bw-ai-cid",cid)}
let log=[];try{log=JSON.parse(LS.get("bw-ai-log")||"[]").slice(-40)}catch(_){log=[]}
const save=()=>LS.set("bw-ai-log",JSON.stringify(log.slice(-40)));

const css=`
.bwai-btn{position:fixed;left:max(16px,env(safe-area-inset-left,0px));bottom:calc(env(safe-area-inset-bottom,0px) + 20px);z-index:87;display:inline-flex;align-items:center;gap:8px;height:46px;padding:0 16px 0 5px;border:0;border-radius:999px;background:#fffaf1;color:#4a2d1f;font:600 14px/1 "Hanken Grotesk",system-ui,sans-serif;letter-spacing:.02em;box-shadow:0 8px 22px rgba(74,45,31,.18),inset 0 0 0 1px rgba(168,132,63,.45);cursor:pointer;-webkit-tap-highlight-color:transparent}
.bwai-btn img{width:36px;height:36px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 1.5px #e6cf8f}.bwai-btn span{display:grid;gap:3px;text-align:left}.bwai-btn small{font:600 10px/1 "Hanken Grotesk",system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#a8843f}
.bwai-btn.hide{display:none}
.bwai{position:fixed;z-index:120;inset:auto max(16px,env(safe-area-inset-right,0px)) calc(env(safe-area-inset-bottom,0px) + 16px) auto;width:380px;height:min(600px,calc(100svh - 32px));display:none;flex-direction:column;background:#fffaf1;border-radius:20px;box-shadow:0 24px 60px rgba(40,24,14,.28),inset 0 0 0 1px rgba(168,132,63,.3);overflow:hidden;font:400 15px/1.5 "Hanken Grotesk",system-ui,sans-serif;color:#3a2a1e}
.bwai.on{display:flex}
@media (max-width:560px){.bwai{inset:0;width:auto;height:100svh;border-radius:0}}
.bwai-h{display:flex;align-items:center;gap:10px;padding:14px 14px 12px 16px;padding-top:calc(14px + env(safe-area-inset-top,0px));border-bottom:1px solid rgba(168,132,63,.22);background:#fbf3e4}
.bwai-h b{font:500 21px/1.1 "Cormorant Garamond",Georgia,serif;color:#4a2d1f;display:block}
.bwai-h small{font-size:12px;color:#8a6a2c;letter-spacing:.04em}
.bwai-h .av{width:42px;height:42px;border-radius:50%;flex:none;object-fit:cover;box-shadow:0 0 0 1.5px #e6cf8f}
.bwai-hero{align-self:center;width:120px;height:auto;margin:0 0 -4px;border-radius:22px}
.bwai-m .ph{align-self:flex-end;max-width:62%;border-radius:16px;border-bottom-right-radius:5px;display:block}
.bwai-f .at{background:#fff;color:#4a2d1f;box-shadow:inset 0 0 0 1px rgba(168,132,63,.45);font-size:20px}
.bwai-x{margin-left:auto;width:40px;height:40px;border:0;border-radius:50%;background:transparent;color:#4a2d1f;font-size:24px;line-height:1;cursor:pointer}
.bwai-m{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:16px 14px 8px;display:flex;flex-direction:column;gap:10px;overscroll-behavior:contain}
.bwai-m .b{max-width:86%;padding:10px 13px;border-radius:16px;white-space:pre-wrap;overflow-wrap:anywhere;font-size:15px}
.bwai-m .u{align-self:flex-end;background:#4a2d1f;color:#fff8ec;border-bottom-right-radius:5px}
.bwai-m .a{align-self:flex-start;background:#fff;border:1px solid rgba(168,132,63,.25);border-bottom-left-radius:5px}
.bwai-m .a a{color:#7a1f2b;font-weight:600}
.bwai-m .card{align-self:flex-start;display:inline-flex;align-items:center;gap:8px;padding:11px 16px;border-radius:999px;background:linear-gradient(140deg,#d9b866,#a8843f);color:#fff;text-decoration:none;font-weight:600}
.bwai-m .fb{align-self:flex-start;display:flex;gap:4px;margin:-6px 0 0 4px}
.bwai-m .fb button{border:0;background:transparent;font-size:14px;line-height:1;padding:4px 5px;border-radius:8px;cursor:pointer;opacity:.45;filter:grayscale(1)}
.bwai-m .fb button:hover{opacity:.9;filter:none}
.bwai-m .fb.done button{cursor:default}.bwai-m .fb.done button:not(.on){display:none}
.bwai-m .fb button.on{opacity:1;filter:none;background:#f3ead8}
.bwai-m .dots{align-self:flex-start;padding:12px 14px;background:#fff;border:1px solid rgba(168,132,63,.25);border-radius:16px}
.bwai-m .dots i{display:inline-block;width:6px;height:6px;margin:0 2px;border-radius:50%;background:#a8843f;animation:bwaid 1s infinite}
.bwai-m .dots i:nth-child(2){animation-delay:.15s}.bwai-m .dots i:nth-child(3){animation-delay:.3s}
@keyframes bwaid{0%,100%{opacity:.25}50%{opacity:1}}
.bwai-q{display:flex;gap:8px;overflow-x:auto;padding:4px 14px 8px;scrollbar-width:none}
.bwai-q::-webkit-scrollbar{display:none}
.bwai-q button{flex:none;border:1px solid rgba(168,132,63,.45);background:#fff;color:#4a2d1f;border-radius:999px;padding:8px 13px;font:500 13px/1 "Hanken Grotesk",system-ui,sans-serif;cursor:pointer}
.bwai-f{display:flex;gap:8px;align-items:flex-end;padding:10px 12px;padding-bottom:calc(10px + env(safe-area-inset-bottom,0px));border-top:1px solid rgba(168,132,63,.22);background:#fbf3e4}
.bwai-f textarea{flex:1;resize:none;border:1px solid rgba(168,132,63,.4);border-radius:14px;padding:10px 12px;font:400 16px/1.4 "Hanken Grotesk",system-ui,sans-serif;color:#3a2a1e;background:#fff;max-height:120px;outline:none}
.bwai-f textarea:focus{border-color:#a8843f}
.bwai-f button{flex:none;width:44px;height:44px;border:0;border-radius:50%;background:#4a2d1f;color:#fff;font-size:18px;cursor:pointer}
.bwai-f button:disabled{opacity:.4}
.bwai-n{font-size:11px;color:#8a7a66;text-align:center;padding:0 16px 6px;background:#fbf3e4}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

const btn=document.createElement("button");btn.className="bwai-btn";btn.type="button";btn.setAttribute("aria-label","Bolu, build your card");btn.innerHTML='<img src="img/bolu-face.webp" alt=""><span><small>Bolu</small>Build your card</span>';
const box=document.createElement("div");box.className="bwai";box.setAttribute("role","dialog");box.setAttribute("aria-label","Bolu, your card helper");
box.innerHTML=`<div class="bwai-h"><img class="av" src="img/bolu-face.webp" alt=""><div><b>Bolu</b><small>Your card helper · Muzayyan</small></div><button class="bwai-x" type="button" aria-label="Close">×</button></div>
<div class="bwai-m" aria-live="polite"></div>
<div class="bwai-q"></div>
<div class="bwai-f"><button type="button" class="at" aria-label="Add a photo or song">+</button><input type="file" accept="image/jpeg,image/png,image/webp,audio/*" hidden><textarea rows="1" maxlength="1200" placeholder="Apna sawal likhein…" aria-label="Message"></textarea><button type="button" aria-label="Send">➤</button></div>
<div class="bwai-n">AI assistant. Chats are saved to help us serve you. Don't share bank or card details.</div>`;
document.body.appendChild(btn);document.body.appendChild(box);
/* sit on the same line as the WhatsApp button (it moves up above bottom bars, e.g. on the order page) */
function place(){const f=document.querySelector(".wafab");if(!f)return;const cs=getComputedStyle(f);if(cs.display==="none")return;const r=f.getBoundingClientRect();btn.style.bottom=Math.max(12,innerHeight-r.bottom+(r.height-46)/2)+"px"}
place();addEventListener("resize",place);setTimeout(place,1200);
const M=box.querySelector(".bwai-m"),Q=box.querySelector(".bwai-q"),T=box.querySelector("textarea"),S=box.querySelector(".bwai-f button:last-of-type"),AT=box.querySelector(".bwai-f .at"),FI=box.querySelector(".bwai-f input");

const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function linkify(t){
  return esc(t).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/(https?:\/\/[^\s<]+[^\s<.,;:!?)])|((?:www\.)?(?:bulawastudio\.com|wa\.me)\/?[^\s<]*[^\s<.,;:!?)]?)/g,m=>{
    const href=/^https?:/.test(m)?m:"https://"+m;let ok=false;try{const h=new URL(href).hostname;ok=/(^|\.)bulawastudio\.com$|^wa\.me$|^api\.whatsapp\.com$/.test(h)}catch(_){}
    return ok?`<a href="${href}" target="_blank" rel="noopener">${m}</a>`:m});
}
function fbRow(e){
  const w=document.createElement("div");w.className="fb";
  [[1,"👍","Helpful"],[-1,"👎","Not helpful"]].forEach(([v,ic,lb])=>{const b=document.createElement("button");b.type="button";b.textContent=ic;b.setAttribute("aria-label",lb);if(e.fb===v)b.className="on";
    b.onclick=()=>{if(e.fb)return;e.fb=v;save();b.className="on";w.classList.add("done");
      fetch("/api/feedback",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({cid,v,text:String(e.t||"").slice(0,300)})}).catch(()=>{})};w.appendChild(b)});
  if(e.fb)w.classList.add("done");return w}
function add(role,text,card,img,entry){
  if(img){const i=document.createElement("img");i.className="ph";i.src=img;i.alt="";M.appendChild(i);M.scrollTop=M.scrollHeight;if(!text)return}
  const d=document.createElement("div");d.className="b "+(role==="user"?"u":"a");
  if(role==="user")d.textContent=text;else d.innerHTML=linkify(text);
  M.appendChild(d);
  if(card){const a=document.createElement("a");a.className="card";a.href=card;a.target="_blank";a.rel="noopener";a.textContent="✦ Open my card";M.appendChild(a)}
  if(role!=="user"&&entry)M.appendChild(fbRow(entry));
  M.scrollTop=M.scrollHeight;
}
/* English for visitors outside Pakistan (country from the site's price region), Roman Urdu in Pakistan. Bolu then follows whatever language they write in. */
const EN=()=>{try{return !!(window.BW_REGION&&BW_REGION.cur&&BW_REGION.cur!=="pkr")}catch(_){return false}};
const TX={en:{hello:"Hello! I'm Bolu 🧸 your card helper at Muzayyan. I can help you pick a design, check prices or make your own card. You can also send your photos and your song with the + button.",
  chips:[["Prices","What are the prices?"],["Wedding designs","Which designs do you have for a wedding?"],["Make my card","I want to make my own card"],["What's inside?","What is inside the card?"]],ph:"Type your question…",err:"Connection problem. Please try again or WhatsApp us: wa.me/9234168867454",
  note:"AI helper. Chats are saved to help us serve you. Don't share bank or card details."},
 ur:{hello:"Assalam o Alaikum! Main Bolu hoon 🧸 Muzayyan ka card helper. Design chunne, prices ya apna card banwane mein madad karta hoon. Apni photos aur apna gaana bhi + se bhej sakte hain.",
  chips:[["Prices kya hain?","Prices kya hain?"],["Baraat ke designs","Baraat ke liye kaunse designs ache hain?"],["Mera card banao","Mujhe apna card banwana hai"],["Card mein kya hota hai?","Card ke andar kya kya hota hai?"]],ph:"Apna sawal likhein…",err:"Maazrat, connection ka masla hai. Dobara try karein ya WhatsApp karein: wa.me/9234168867454",
  note:"AI helper. Chats save hoti hain taake hum behtar madad kar sakein. Bank ya card details na bhejein."}};
const L=()=>TX[EN()?"en":"ur"];

function chips(){Q.innerHTML="";if(log.some(m=>m.r==="user"))return;L().chips.forEach(([l,t])=>{const b=document.createElement("button");b.type="button";b.textContent=l;b.onclick=()=>send(t);Q.appendChild(b)})}
function render(){M.innerHTML='<img class="bwai-hero" src="img/bolu.webp" alt="">';add("assistant",L().hello);T.placeholder=L().ph;box.querySelector(".bwai-n").textContent=L().note;log.forEach(m=>add(m.r,m.t,m.c,m.i,m.r==="assistant"&&m.ok?m:null));chips()}
let busy=false;
async function send(txt,silent){
  txt=String(txt||T.value).trim();if(!txt||busy)return;
  if(!silent){T.value="";T.style.height=""}busy=true;S.disabled=true;AT.disabled=true;
  if(!silent){log.push({r:"user",t:txt});save();add("user",txt)}Q.innerHTML="";
  const dots=document.createElement("div");dots.className="dots";dots.innerHTML="<i></i><i></i><i></i>";M.appendChild(dots);M.scrollTop=M.scrollHeight;
  let reply=L().err,card=null;
  try{
    const ctl=new AbortController(),to=setTimeout(()=>ctl.abort(),60000);
    const r=await fetch("/api/chat",{method:"POST",headers:{"content-type":"application/json"},signal:ctl.signal,
      body:JSON.stringify({cid,text:txt,page:location.pathname+location.hash,cur:(window.BW_REGION&&BW_REGION.cur)||""})});
    clearTimeout(to);
    const j=await r.json();if(j&&j.reply){reply=j.reply;card=j.card&&j.card.preview||null}
  }catch(_){}
  const ent={r:"assistant",t:reply,c:card,ok:reply!==L().err};
  dots.remove();log.push(ent);save();add("assistant",reply,card,null,ent.ok?ent:null);
  busy=false;S.disabled=false;AT.disabled=false;
  if(card&&window.fbq)try{fbq("track","Lead",{content_name:"AI card"})}catch(_){}
}
function open(){box.classList.add("on");btn.classList.add("hide");document.documentElement.classList.add("bwai-open");render();setTimeout(()=>{if(matchMedia("(min-width:561px)").matches)T.focus()},50);history.pushState({bwai:1},"")}
function close(){box.classList.remove("on");btn.classList.remove("hide");document.documentElement.classList.remove("bwai-open")}
btn.onclick=open;box.querySelector(".bwai-x").onclick=()=>{close();if(history.state&&history.state.bwai)history.back()};
addEventListener("popstate",()=>{if(box.classList.contains("on"))close()});
S.onclick=()=>send();
/* photos (made smaller on the phone first) and one song */
AT.onclick=()=>{if(!busy)FI.click()};
function shrink(file,max,q){return new Promise((res,rej)=>{const u=URL.createObjectURL(file),im=new Image();im.onload=()=>{const s=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);c.getContext("2d").drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);c.toBlob(b=>b?res({blob:b,url:c.toDataURL("image/jpeg",.6)}):rej(),"image/jpeg",q)};im.onerror=()=>{URL.revokeObjectURL(u);rej()};im.src=u})}
FI.onchange=async()=>{
  const f=FI.files&&FI.files[0];FI.value="";if(!f||busy)return;
  const isImg=/^image\//.test(f.type),isAud=/^audio\//.test(f.type)||/\.(mp3|m4a|aac|ogg|wav)$/i.test(f.name);
  if(!isImg&&!isAud){add("assistant",EN()?"Please send a photo (JPG, PNG) or a song (MP3, M4A).":"Sirf photo (JPG, PNG) ya gaana (MP3, M4A) bhej sakte hain.");return}
  let body,type,thumb="",label="";
  try{
    if(isImg){const big=await shrink(f,1600,.85),sm=await shrink(f,360,.6);body=big.blob;type="image/jpeg";thumb=sm.url}
    else{if(f.size>12e6){add("assistant",EN()?"The song must be under 12 MB. For a bigger file please WhatsApp us: wa.me/9234168867454":"Gaana 12 MB se chhota hona chahiye. Bara ho to WhatsApp pe bhej dein: wa.me/9234168867454");return}
      body=f;type=f.type&&/^audio\//.test(f.type)?f.type:(/\.m4a$/i.test(f.name)?"audio/mp4":"audio/mpeg");label="🎵 "+f.name.slice(0,60)}
  }catch(_){add("assistant",EN()?"This photo could not be opened, please try another one.":"Ye photo khul nahi saki, koi aur try karein.");return}
  if(thumb){add("user","",null,thumb)}else add("user",label);
  busy=true;S.disabled=true;AT.disabled=true;
  const dots=document.createElement("div");dots.className="dots";dots.innerHTML="<i></i><i></i><i></i>";M.appendChild(dots);M.scrollTop=M.scrollHeight;
  let r=null;try{r=await fetch("/api/upload?cid="+cid,{method:"POST",headers:{"content-type":type},body}).then(x=>x.json())}catch(_){}
  dots.remove();busy=false;S.disabled=false;AT.disabled=false;
  if(!r||!r.ok){add("assistant",(r&&r.error)||(EN()?"Upload failed, please try again.":"Upload nahi ho saka, dobara try karein."));return}
  const txt=EN()?(r.kind==="music"?"🎵 I sent my song ("+f.name.slice(0,40)+")":"📷 I sent photo "+r.n):(r.kind==="music"?"🎵 Maine apna gaana bhej diya hai ("+f.name.slice(0,40)+")":"📷 Maine photo "+r.n+" bhej di hai");
  log.push(thumb?{r:"user",t:"",i:thumb}:{r:"user",t:label});log.push({r:"user",t:txt});save();
  add("user",txt);send(txt,true);
};
T.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey&&!e.isComposing){e.preventDefault();send()}});
T.addEventListener("input",()=>{T.style.height="auto";T.style.height=Math.min(120,T.scrollHeight)+"px"});
const sty=document.createElement("style");sty.textContent="@media (max-width:560px){html.bwai-open,html.bwai-open body{overflow:hidden}}";document.head.appendChild(sty);
window.BW_AI={open,send:t=>{open();send(t)}};
})();
