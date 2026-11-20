const LINK_APLIKASI='https://upload.vjjdeyyjinerila.xyz/f/mf2asr';
const LINK_TELEGRAM='https://t.me/spesialedition';
const LINK_SMARTLINK='https://uplcm.com/4/12287945';
const ZONA_POPUNDER='12287942';
const DATA_SALURAN=[
  {foto:'https://upload.vjjdeyyjinerila.xyz/f/fbYLEg', video:'https://upload.vjjdeyyjinerila.xyz/f/cASvqa'}, 
  {foto:'https://upload.vjjdeyyjinerila.xyz/f/DbFyNV', video:'https://upload.vjjdeyyjinerila.xyz/f/Wmmp5k'},   
  {foto:'https://upload.vjjdeyyjinerila.xyz/f/iHckhH', video:'https://upload.vjjdeyyjinerila.xyz/f/2TTTWv'},   
  {foto:'https://upload.vjjdeyyjinerila.xyz/f/F3jNNe', video:'https://upload.vjjdeyyjinerila.xyz/f/8eCjyJ'},  
  {foto:'https://upload.vjjdeyyjinerila.xyz/f/cKAwfC', video:'https://upload.vjjdeyyjinerila.xyz/f/8eCjyJ'},   
  {foto:'https://upload.vjjdeyyjinerila.xyz/f/3qcZMd', video:'https://upload.vjjdeyyjinerila.xyz/f/2Fvuty'},   
  {foto:'https://upload.vjjdeyyjinerila.xyz/f/y7rgcx', video:'https://upload.vjjdeyyjinerila.xyz/f/yV9dvc'},  
  {foto:'https://upload.vjjdeyyjinerila.xyz/f/YzPd3f', video:'https://upload.vjjdeyyjinerila.xyz/f/rzLjv7'}, 
];

const toast=document.getElementById('toast');
let toastTimer;
function showToast(message){
  toast.textContent=message;toast.classList.add('show');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2300);
}
const searchWrap=document.getElementById('searchWrap');
const searchInput=document.getElementById('searchInput');
document.getElementById('searchToggle').addEventListener('click',()=>{
  searchWrap.classList.toggle('open');
  if(searchWrap.classList.contains('open'))searchInput.focus();
  else{searchInput.value='';filterChannels('');}
});
function filterChannels(value){
  const cards=[...document.querySelectorAll('.channel')];let shown=0;
  cards.forEach(card=>{
    const match=card.dataset.name.toLowerCase().includes(value.trim().toLowerCase());
    card.style.display=match?'grid':'none';if(match)shown++;
  });
  document.getElementById('count').textContent=String(shown).padStart(2,'0')+' SALURAN';
  document.getElementById('empty').style.display=shown?'none':'block';
}
searchInput.addEventListener('input',e=>filterChannels(e.target.value));
const overlay=document.getElementById('overlay');
function openModal(title,message,action='Mengerti'){
  document.getElementById('modalTitle').textContent=title;
  document.getElementById('modalText').textContent=message;
  document.getElementById('modalAction').textContent=action;
  overlay.classList.add('show');
}
function closeModal(){overlay.classList.remove('show')}
document.getElementById('closeModal').addEventListener('click',closeModal);
document.getElementById('modalAction').addEventListener('click',closeModal);
overlay.addEventListener('click',e=>{if(e.target===overlay)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();tutupPemutar(false);}});
document.querySelectorAll('.channel').forEach((card,i)=>{
  const rb=document.createElement('span');
  rb.className='rb';
  card.prepend(rb);
  const d=DATA_SALURAN[i]||{};
  if(d.foto&&d.foto.trim()){
    const thumb=card.querySelector('.thumb');
    const img=new Image();
    img.alt='';
    img.width=108;img.height=108;
    img.decoding='async';
    if(i<3)img.fetchPriority='high';
    img.src=d.foto.trim();
    thumb.textContent='';
    thumb.appendChild(img);
    thumb.style.animation='none';
  }
});
const pemutar=document.getElementById('pemutar');
const pVideo=document.getElementById('pVideo');
const pTutup=document.getElementById('pTutup');
const pTeks=document.getElementById('pTeks');
const pSuara=document.getElementById('pSuara');
let popunderDimuat=false;
function muatPopunder(){
  if(popunderDimuat||!ZONA_POPUNDER)return;
  popunderDimuat=true;
  const s=document.createElement('script');
  s.src='https://al5sm.com/tag.min.js';s.async=true;s.dataset.zone=ZONA_POPUNDER;
  document.body.appendChild(s);
}
function bukaPemutar(i,catat){
  const d=DATA_SALURAN[i]||{};
  const kartu=document.querySelectorAll('.channel')[i];
  document.getElementById('pJudul').textContent=kartu?kartu.querySelector('h3').textContent.trim():'Video';
  document.getElementById('pKet').textContent=kartu?kartu.querySelector('p').textContent.trim():'';
  pVideo.removeAttribute('controls');
  pVideo.preload='metadata';
  pVideo.src=(d.video||'').trim();
  pTutup.hidden=false;pSuara.hidden=true;pTeks.textContent='Ketuk untuk memutar';
  pemutar.classList.add('buka');document.body.classList.add('nonton');
  if(catat)history.pushState({saluran:i},'','#saluran-'+(i+1));
  muatPopunder();
}
function tutupPemutar(dariKembali){
  if(!pemutar.classList.contains('buka'))return;
  pVideo.pause();pVideo.removeAttribute('src');pVideo.load();   
  pemutar.classList.remove('buka');document.body.classList.remove('nonton');
  if(!dariKembali&&history.state&&history.state.saluran!==undefined)history.back();
}
pTutup.addEventListener('click',()=>{
  if(!pVideo.getAttribute('src')){showToast('Link video belum diisi');return;}
  pTutup.hidden=true;pVideo.setAttribute('controls','');
  pVideo.muted=false;
  pVideo.play().catch(()=>{
    pVideo.muted=true;
    pVideo.play().then(()=>{pSuara.hidden=false;}).catch(()=>{pTutup.hidden=false;pVideo.removeAttribute('controls');});
  });
});
pSuara.addEventListener('click',()=>{pVideo.muted=false;pSuara.hidden=true;pVideo.play().catch(()=>{});});
pVideo.addEventListener('volumechange',()=>{if(!pVideo.muted)pSuara.hidden=true;});
document.getElementById('btnKembali').addEventListener('click',()=>tutupPemutar(false));
window.addEventListener('popstate',e=>{
  const st=e.state||{};
  if(st.saluran===undefined)tutupPemutar(true);else bukaPemutar(st.saluran,false);
});
history.replaceState(null,'',location.pathname+location.search);

document.querySelectorAll('.play').forEach((button,i)=>{
  button.addEventListener('click',()=>{
    const d=DATA_SALURAN[i]||{};
    if(!(d.video&&d.video.trim())){
      openModal(button.dataset.channel,'Link video saluran ini belum diisi.','Mengerti');
      return;
    }
    bukaPemutar(i,true);                                   
    if(LINK_SMARTLINK)window.open(LINK_SMARTLINK,'_blank','noopener');
  });
});
document.getElementById('menuToggle').addEventListener('click',()=>{
  openModal('Menu Special Edition','Gunakan pencarian untuk menemukan saluran. Tombol navigasi di bawah dapat Anda kembangkan sesuai kebutuhan.','Tutup');
});
document.querySelectorAll('.nav-item').forEach(button=>{
  button.addEventListener('click',()=>{
    document.querySelectorAll('.nav-item').forEach(item=>item.classList.remove('active'));
    button.classList.add('active');
    const label=button.dataset.nav;
    if(label==='Jelajahi'){searchWrap.classList.add('open');searchInput.focus();showToast('Cari saluran yang ingin Anda jelajahi');}
    else if(label==='Beranda'){searchWrap.classList.remove('open');searchInput.value='';filterChannels('');window.scrollTo({top:0,behavior:'smooth'});}
    else openModal(label,label==='Langganan'?'Bagian langganan siap disesuaikan dengan sistem Anda.':'Bagian profil siap disesuaikan dengan informasi pengguna.','Mengerti');
  });
});
function pasangLink(id,url,nama){
  const btn=document.getElementById(id);
  if(url&&url.trim()){btn.href=url.trim();}
  else{btn.addEventListener('click',e=>{e.preventDefault();showToast('Link '+nama+' belum diisi');});}
}
pasangLink('installBtn',LINK_APLIKASI,'aplikasi');
pasangLink('telegramBtn',LINK_TELEGRAM,'Telegram');
if('IntersectionObserver' in window){
  const pengamat=new IntersectionObserver(entri=>{
    entri.forEach(e=>e.target.classList.toggle('diam',!e.isIntersecting));
  },{rootMargin:'100px 0px'});
  document.querySelectorAll('.intro, .channel, .app-actions').forEach(el=>pengamat.observe(el));
}
