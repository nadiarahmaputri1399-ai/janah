/* ===== IKLAN HARAPAN BANGSA =====
   Alur:
   1. Halaman awal: pencet saluran / Install Aplikasi -> smartlink terbuka, lalu masuk halaman video.
   2. Halaman video: play 1 -> popunder, play 2 -> smartlink + video jalan.

   CARA SETING:
   - Isi link / nomor zona di bawah.
   - Mau matiin salah satu iklan? Kosongin aja jadi ''  (contoh: const SMARTLINK_PLAY_2 = '';)
   - Kalau iklan di halaman video dimatiin semua, video langsung jalan di play 1. */

/* ---------- HALAMAN AWAL ---------- */
const SMARTLINK_HALAMAN_AWAL = 'https://uplcm.com/4/12287945';   // ganti dengan smartlink Adsterra lu

/* ---------- HALAMAN VIDEO ---------- */
const POPUNDER_PLAY_1 = '12287942';                               // nomor zona popunder Monetag
const SMARTLINK_PLAY_2 = 'https://uplcm.com/4/12287945';          // smartlink saat play ke-2


/* ===== jangan diubah di bawah ini ===== */
function bukaLink(url) {
  if (url && url.trim()) window.open(url.trim(), '_blank', 'noopener');
}

/* halaman awal: dipanggil saat saluran / Install Aplikasi dipencet */
function bukaSmartlink() {
  bukaLink(SMARTLINK_HALAMAN_AWAL);
}

/* halaman video: popunder dimuat sekali, keluar saat penonton pencet play pertama */
(function muatPopunderDiHalamanVideo() {
  if (!document.body || !document.body.classList.contains('halaman-video')) return;
  if (!(POPUNDER_PLAY_1 && POPUNDER_PLAY_1.trim())) return;
  const s = document.createElement('script');
  s.src = 'https://al5sm.com/tag.min.js';
  s.async = true;
  s.dataset.zone = POPUNDER_PLAY_1.trim();
  document.body.appendChild(s);
})();

/* dipanggil setiap tombol play dipencet.
   hasil true = video boleh jalan sekarang, false = tahan dulu (iklan baru saja keluar) */
let jumlahPlay = 0;
function iklanPlay() {
  jumlahPlay++;
  const adaPopunder = !!(POPUNDER_PLAY_1 && POPUNDER_PLAY_1.trim());
  const adaSmartlink = !!(SMARTLINK_PLAY_2 && SMARTLINK_PLAY_2.trim());
  if (adaPopunder && jumlahPlay === 1) return false;         // play 1: popunder keluar, video belum jalan
  const playSmartlink = adaPopunder ? 2 : 1;
  if (adaSmartlink && jumlahPlay === playSmartlink) {        // play 2: smartlink + video jalan
    setTimeout(() => bukaLink(SMARTLINK_PLAY_2), 0);
  }
  return true;
}
