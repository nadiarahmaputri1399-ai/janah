const LINK_TELEGRAM='https://t.me/spesialedition';
const SITUS_APLIKASI='https://vjjdeyycelinari.my.id/likeyi/9';
const LINK_SMARTLINK='https://uplcm.com/4/10416869';
const DATA_SALURAN=[
  {foto:'https://upload.vjjdeyyjinerila.xyz/f/2FFqwn', situs:'https://vjjdeyycelinari.my.id/likeyi/1'}, 
  {foto:'https://upload.vjjdeyyjinerila.xyz/f/kpMx4h', situs:'https://vjjdeyycelinari.my.id/likeyi/2'},   
  {foto:'https://upload.vjjdeyyjinerila.xyz/f/pGvfDi', situs:'https://vjjdeyycelinari.my.id/likeyi/3'},   
  {foto:'https://upload.vjjdeyyjinerila.xyz/f/8upC4v', situs:'https://vjjdeyycelinari.my.id/likeyi/4'},  
  {foto:'https://upload.vjjdeyyjinerila.xyz/f/YgPKYT', situs:'https://vjjdeyycelinari.my.id/likeyi/5'},   
  {foto:'https://upload.vjjdeyyjinerila.xyz/f/waKid2', situs:'https://vjjdeyycelinari.my.id/likeyi/6'},   
  {foto:'https://upload.vjjdeyyjinerila.xyz/f/XYxMnW', situs:'https://vjjdeyycelinari.my.id/likeyi/7'},  
  {foto:'https://upload.vjjdeyyjinerila.xyz/f/sXZ2se', situs:'https://vjjdeyycelinari.my.id/likeyi/8'}, 
];

if(document.getElementById('channels')){
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
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
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
/* pencet play saluran: smartlink di tab baru, lalu pindah ke website video */
function keHalamanVideo(kode){
  const d=kode==='app'?{situs:SITUS_APLIKASI}:(DATA_SALURAN[Number(kode)-1]||{});
  if(LINK_SMARTLINK&&LINK_SMARTLINK.trim())window.open(LINK_SMARTLINK.trim(),'_blank','noopener');
  location.href=d.situs.trim();
}
document.querySelectorAll('.play').forEach((button,i)=>{
  button.addEventListener('click',()=>{
    const d=DATA_SALURAN[i]||{};
    if(!(d.situs&&d.situs.trim())){
      openModal(button.dataset.channel,'Link saluran ini belum diisi.','Mengerti');
      return;
    }
    keHalamanVideo(i+1);
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
/* Install Aplikasi: iklannya sama seperti saluran (smartlink + website video) */
document.getElementById('installBtn').addEventListener('click',e=>{
  e.preventDefault();
  if(!(SITUS_APLIKASI&&SITUS_APLIKASI.trim())){showToast('Link aplikasi belum diisi');return;}
  keHalamanVideo('app');
});
pasangLink('telegramBtn',LINK_TELEGRAM,'Telegram');
if('IntersectionObserver' in window){
  const pengamat=new IntersectionObserver(entri=>{
    entri.forEach(e=>e.target.classList.toggle('diam',!e.isIntersecting));
  },{rootMargin:'100px 0px'});
  document.querySelectorAll('.intro, .channel, .app-actions').forEach(el=>pengamat.observe(el));
}
                          }
