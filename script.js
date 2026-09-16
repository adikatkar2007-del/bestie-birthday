// ===============================
// CHANGE THIS TO HER REAL BIRTHDAY
// Format: DDMM, e.g. 23 May = "2305"
// ===============================
const BIRTHDATE_PASSWORD = "1709";

const screens = [...document.querySelectorAll(".screen")];
let current = "screen1";
// Defensive startup: never show the final page until its button is clicked.
screens.forEach(s => s.classList.toggle("active", s.id === "screen1"));

function go(id){
  screens.forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  current=id;
  if(id==="screen3") startLetter();
  if(id==="screen5") startHeart();
}
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));

const inputs=[...document.querySelectorAll("#digits input")];
inputs.forEach((el,i)=>{
  el.addEventListener("input",()=>{
    el.value=el.value.replace(/\D/g,"").slice(0,1);
    if(el.value && inputs[i+1]) inputs[i+1].focus();
  });
  el.addEventListener("keydown",e=>{
    if(e.key==="Backspace"&&!el.value&&inputs[i-1]) inputs[i-1].focus();
    if(e.key==="Enter") unlock();
  });
});
document.getElementById("unlock").addEventListener("click",unlock);

function unlock(){
  const val=inputs.map(x=>x.value).join("");
  const box=document.querySelector(".lock-content");
  const err=document.getElementById("error");
  if(val===BIRTHDATE_PASSWORD){
    err.textContent="";
    box.animate([{transform:"scale(1)"},{transform:"scale(1.03)",filter:"brightness(1.5)"},{transform:"scale(1)"}],{duration:500});
    setTimeout(()=>go("screen2"),520);
  }else{
    err.textContent="Not quite 💛 Try your birthday in DDMM.";
    box.classList.remove("shake"); void box.offsetWidth; box.classList.add("shake");
    inputs.forEach(x=>x.style.borderColor="#ff7768");
    setTimeout(()=>inputs.forEach(x=>x.style.borderColor=""),650);
  }
}

// Continuous floating + blooming hearts on every screen.
const heartLayer=document.getElementById("heartLayer");
function addHeart(){
  const h=document.createElement("span");
  h.className="float-heart";
  h.textContent=Math.random()<.18?"♡":"♥";
  h.style.left=Math.random()*100+"vw";
  h.style.setProperty("--x",((Math.random()-.5)*170)+"px");
  h.style.animationDuration=(6+Math.random()*7)+"s";
  h.style.fontSize=(8+Math.random()*10)+"px";
  heartLayer.appendChild(h);
  setTimeout(()=>h.remove(),14500);
}
for(let i=0;i<14;i++) setTimeout(addHeart,i*150);
setInterval(addHeart,420);

// Letter — the complete message is rendered immediately.
// The letter panel itself is scrollable, so no part of the message is clipped.
const letterText=`To my beautiful bestie, ❤️

Happiest Birthday to my favorite, cute, beautiful, intelligent, bestieee! 🥹✨

Hya letter madhe ky lihu samjat nhiye karan jevdha lihen tevdha kamich ahe, tu mazhi ashi bestie ahes jichya sathi mi khi hi karu shakto, karan you are so special for me tuzha pratek word, pratek sentence mi seriously gheto,
and you are the one and only bestfriend in my life, not only bestfriend my jigar ka tukda 😅

Tu jevha sobat astes tevha khup masta vatta time kadhi jato tuzhya sobat samjat nhiii
aata paryant mazhya mule tu hurt pn khup zhali ahes pn te mala kadhich karaycha nasta tu hurt zhalis, kiva dukhi aslis tr tuzhya peksha jasta vait mala vatta.
mi sohatala khup lucky samajto ki mala tuzhya sarkhi bestfrd ahe jichya sobat mi sagla share karu shakto jichya varti mala khup trust ahe,

I am so lucky to have you in my life, and I am so grateful for all the memories we have shared together. 
I can't imagine my life without you in it.
Never forget how amazing, precious, and lovable you are. Don't ever let a bad day make you forget how much light you bring into the lives of people around you. 🌻

Happy Birthday once again, bestie! 🎂✨
May your heart always be happy, your dreams always be big, and your life always be filled with people who genuinely love and appreciate you.

ThankYou for being my bestie Riyuuu 💕🤗
With lots of love, hugs & endless memories,
Your forever annoying bestie ❤️`;

let letterDone=false;
function startLetter(){
  const el=document.getElementById("typed");
  if(!el) return;
  el.textContent=letterText;
  letterDone=true;
}

// Gallery: fixed viewport, one memory at a time — no scrolling.
const gallery=[
  ["assets/photo1.jpeg","Some people make every room brighter. You are one of them. 💛"],
  ["assets/photo2.jpeg","Proof that the best memories are the ones we get to share. ✨"],
  ["assets/photo3.jpeg","Never forget how effortlessly lovely you are. Stay exactly you. ♡"],
  ["assets/photo4.jpeg","May your smile always find a reason to stay. 🌻"],
  ["assets/photo5.jpeg","You deserve soft days, loud laughs and all the happiness. 💫"],
  ["assets/photo6.jpeg","Another year of being the amazing person you are. 🫶"],
  ["assets/photo7.jpeg","Please keep this smile forever. Happiest Birthday! 💛"]
];
let gi=0;
const img=document.getElementById("galleryImg"), msg=document.getElementById("galleryMessage"), count=document.getElementById("count"), dots=document.getElementById("dots");
gallery.forEach((_,i)=>{
  const d=document.createElement("span"); d.className="dot"+(i===0?" active":""); d.addEventListener("click",()=>setGallery(i)); dots.appendChild(d);
});
function setGallery(i){
  gi=(i+gallery.length)%gallery.length;
  img.style.opacity=0;
  setTimeout(()=>{
    img.src=gallery[gi][0]; msg.textContent=gallery[gi][1]; count.textContent=String(gi+1).padStart(2,"0"); img.style.opacity=1;
    [...dots.children].forEach((d,n)=>d.classList.toggle("active",n===gi));
  },130);
}
document.getElementById("prev").addEventListener("click",()=>setGallery(gi-1));
document.getElementById("next").addEventListener("click",()=>setGallery(gi+1));

// Final particle heart.
let heartStarted=false;
function startHeart(){
  if(heartStarted)return; heartStarted=true;
  const c=document.getElementById("heartCanvas"),ctx=c.getContext("2d");
  let W,H,pts=[];
  function resize(){
    W=innerWidth;H=innerHeight;c.width=W*devicePixelRatio;c.height=H*devicePixelRatio;
    c.style.width=W+"px";c.style.height=H+"px";ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
    const scale=Math.min(W,H)/31,cx=W/2,cy=H/2-25;pts=[];
    for(let i=0;i<2100;i++){
      const t=Math.random()*Math.PI*2;
      const x=16*Math.sin(t)**3;
      const y=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));
      const edge=Math.random()<.5?1:.86+Math.random()*.14;
      pts.push({tx:cx+x*scale*edge,ty:cy+y*scale*edge,x:Math.random()*W,y:Math.random()*H,s:.5+Math.random()*1.4,a:.25+Math.random()*.75,v:.012+Math.random()*.022});
    }
  }
  resize();addEventListener("resize",resize);
  const start=performance.now();
  function draw(now){
    ctx.fillStyle="rgba(0,0,0,.16)";ctx.fillRect(0,0,W,H);
    const pulse=1+Math.sin(now*.003)*.035;
    for(const p of pts){
      p.x+=(p.tx-p.x)*p.v;p.y+=(p.ty-p.y)*p.v;
      const x=W/2+(p.x-W/2)*pulse,y=H/2-25+(p.y-(H/2-25))*pulse;
      ctx.beginPath();ctx.fillStyle=`rgba(245,233,77,${p.a})`;ctx.arc(x,y,p.s,0,Math.PI*2);ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}


