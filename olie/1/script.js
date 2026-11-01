// ===== ISI LINK DI SINI =====
const LINK_APLIKASI='https://link-aplikasi-kamu.com';
const LINK_TELEGRAM='https://t.me/username_kamu';

// Smartlink untuk SEMUA tombol play saluran
const SMARTLINK_SEMUA='https://smartlink-kamu.com';

// (Opsional) foto & link khusus per saluran.
// Kalau video dikosongkan, otomatis pakai SMARTLINK_SEMUA.
const DATA_SALURAN=[
  {foto:'', video:''}, // 1. Vlog Gaya Hidup Heni
  {foto:'', video:''}, // 2. Dibalik Layar Bersama Sinta
  {foto:'', video:''}, // 3. Tips Kesehatan Chika
  {foto:'', video:''}, // 4. Pertunjukan Bakat Fanny
  {foto:'', video:''}, // 5. Update Karya Dek Laura
  {foto:'', video:''}, // 6. Dapur Seru Rina
  {foto:'', video:''}, // 7. Gaming Zone Dimas
  {foto:'', video:''}  // 8. Komedi Harian Andi
];
// ============================
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
  const d=DATA_SALURAN[i]||{};
  if(d.foto&&d.foto.trim()){
    const thumb=card.querySelector('.thumb');
    thumb.innerHTML='<img src="'+d.foto.trim()+'" alt="" style="width:100%;height:100%;object-fit:cover;display:block">';
    thumb.style.animation='none';
  }
});
document.querySelectorAll('.play').forEach((button,i)=>{
  button.addEventListener('click',()=>{
    const d=DATA_SALURAN[i]||{};
    const link=(d.video&&d.video.trim())||(SMARTLINK_SEMUA&&SMARTLINK_SEMUA.trim());
    if(link){window.open(link,'_blank');return;}
    const name=button.dataset.channel;
    openModal(name,'Tombol saluran sudah aktif. Hubungkan saluran ini ke URL atau halaman video milik Anda agar tombol dapat membuka konten.','Siap');
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
