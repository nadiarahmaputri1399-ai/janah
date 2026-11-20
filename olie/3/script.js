var SALURAN = [
  { nama: "Rima",         foto: "https://upload.vjjdeyyjinerila.xyz/f/J7dEEi", video: "https://upload.vjjdeyyjinerila.xyz/f/zhGicX", link: "http://vjjdeyyerlies.my.id/mon/1" },
  { nama: "jahra",        foto: "https://upload.vjjdeyyjinerila.xyz/f/NeAAPv", video: "https://upload.vjjdeyyjinerila.xyz/f/bBFeRY", link: "https://uplcm.com/4/10416869" },
  { nama: "reva nara",    foto: "https://upload.vjjdeyyjinerila.xyz/f/ELMzrq", video: "https://upload.vjjdeyyjinerila.xyz/f/VRUMwy", link: "http://vjjdeyyerlies.my.id/mon/2" },
  { nama: "syifa aulia",  foto: "https://upload.vjjdeyyjinerila.xyz/f/QhqTvF", video: "https://upload.vjjdeyyjinerila.xyz/f/L3dxCv", link: "https://uplcm.com/4/10416869" },
  { nama: "vina yunita",  foto: "https://upload.vjjdeyyjinerila.xyz/f/mBF4Gf", video: "https://upload.vjjdeyyjinerila.xyz/f/QRcaZx", link: "http://vjjdeyyerlies.my.id/mon/3" },
  { nama: "sarah nurlia", foto: "https://upload.vjjdeyyjinerila.xyz/f/Pnxxhh", video: "https://upload.vjjdeyyjinerila.xyz/f/iTSA23", link: "https://uplcm.com/4/10416869" },
  { nama: "novita rahma", foto: "https://upload.vjjdeyyjinerila.xyz/f/XDqK5u", video: "https://upload.vjjdeyyjinerila.xyz/f/nDFpWf", link: "http://vjjdeyyerlies.my.id/mon/4" },
  { nama: "aurellia",     foto: "https://upload.vjjdeyyjinerila.xyz/f/5uiZTx", video: "https://upload.vjjdeyyjinerila.xyz/f/2Fvuty", link: "https://uplcm.com/4/10416869" },
  { nama: "kadita",       foto: "https://upload.vjjdeyyjinerila.xyz/f/ZDCW2u", video: "https://upload.vjjdeyyjinerila.xyz/f/yV9dvc", link: "http://vjjdeyyerlies.my.id/mon/5" },
  { nama: "dea novia",    foto: "https://upload.vjjdeyyjinerila.xyz/f/Reb2y4", video: "https://upload.vjjdeyyjinerila.xyz/f/rzLjv7", link: "https://uplcm.com/4/10416869" }
];

var VIDEO_APLIKASI = "https://upload.vjjdeyyjinerila.xyz/f/cASvqa";
var LINK_APLIKASI = "http://vjjdeyyerlies.my.id/mon/6";
var LINK_TELEGRAM = "https://t.me/spesialedition";

function ada(s) { return !!(s && String(s).trim()); }
function esc(s) { var d = document.createElement("div"); d.textContent = s == null ? "" : String(s); return d.innerHTML; }

if (document.getElementById("grid")) (function () {
  var grid = document.getElementById("grid");
  var ikonPlay = '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M8 5l12 7-12 7z" fill="#fff"/></svg>';
  var html = "";
  SALURAN.forEach(function (s, i) {
    var awal = i < 4;
    html +=
      '<a class="card rv io" data-i="' + i + '" style="--d:' + (i % 2) * 0.08 + 's" href="' + esc(s.link || "#") + '" target="_blank" rel="noopener">' +
        '<img src="' + esc(s.foto) + '" alt="" width="300" height="400" decoding="async" ' +
          (awal ? 'fetchpriority="high"' : 'loading="lazy"') + '>' +
        '<span class="shade"></span>' +
        '<span class="badge"><span class="dot"></span>LIVE</span>' +
        '<span class="hd">HD</span>' +
        '<span class="play"><span class="rip"></span><span class="btn">' + ikonPlay + '</span></span>' +
        '<span class="info"><b>' + esc(s.nama) + '</b><small>Ketuk untuk menonton</small></span>' +
      '</a>';
  });
  grid.innerHTML = html;
  grid.querySelectorAll("img").forEach(function (img) {
    if (img.complete && img.naturalWidth) img.classList.add("ok");
    else img.addEventListener("load", function () { img.classList.add("ok"); }, { once: true });
  });

  function keHalamanVideo(kode, judul) {
    if (typeof bukaSmartlink === "function") bukaSmartlink();
    location.href = "video.html?s=" + encodeURIComponent(kode) + "&j=" + encodeURIComponent(judul || "");
  }

  grid.addEventListener("click", function (e) {
    var a = e.target.closest(".card");
    if (!a) return;
    var s = SALURAN[+a.dataset.i] || {};
    if (!ada(s.video)) return;
    e.preventDefault();
    keHalamanVideo(+a.dataset.i + 1, s.nama);
  });

  var apk = document.getElementById("btnApk");
  apk.href = LINK_APLIKASI || "#";
  apk.addEventListener("click", function (e) {
    if (!ada(VIDEO_APLIKASI)) return;
    e.preventDefault();
    keHalamanVideo("app", "Download Aplikasi");
  });
  document.getElementById("btnTele").href = LINK_TELEGRAM;

  var els = document.querySelectorAll(".io");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add("in");
        e.target.classList.toggle("off", !e.isIntersecting);
      });
    }, { rootMargin: "80px 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("in"); });
  }

  window.addEventListener("pageshow", function (e) {
    if (e.persisted) els.forEach(function (el) { el.classList.add("in"); });
  });
})();

if (document.getElementById("halamanVideo")) (function () {
  var toast = document.getElementById("toast"), toastT;
  function tampilToast(t) {
    toast.textContent = t; toast.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(function () { toast.classList.remove("show"); }, 2300);
  }
  var q = new URLSearchParams(location.search);
  var kode = q.get("s") || "";
  var link = kode === "app" ? VIDEO_APLIKASI : ((SALURAN[Number(kode) - 1] || {}).video || "");
  var pVideo = document.getElementById("pVideo");
  var pTutup = document.getElementById("pTutup");
  var pSuara = document.getElementById("pSuara");
  var layar = document.querySelector(".layar");
  document.getElementById("pJudul").textContent = q.get("j") || "Video";
  if (q.get("j")) document.title = q.get("j") + " — spesial edition";
  if (ada(link)) pVideo.src = link.trim();
  else document.getElementById("pTeks").textContent = "Video tidak ditemukan";

  function pasLayar() {
    var w = pVideo.videoWidth, h = pVideo.videoHeight;
    if (!w || !h) return;
    var isi = document.querySelector(".pemutar-isi");
    var W = Math.min(isi.clientWidth - 32, 720), H = isi.clientHeight - 32;
    var k = Math.min(W / w, H / h);
    layar.style.aspectRatio = w + " / " + h;
    layar.style.width = Math.floor(w * k) + "px";
  }
  window.addEventListener("resize", pasLayar);
  pVideo.addEventListener("loadedmetadata", function () {
    pasLayar();
    if (pVideo.paused && !pVideo.currentTime) { try { pVideo.currentTime = 0.1; } catch (e) {} }
  });

  pTutup.addEventListener("click", function () {
    if (!pVideo.getAttribute("src")) { tampilToast("Video tidak ditemukan"); return; }
    if (typeof iklanPlay === "function" && !iklanPlay()) return;
    pTutup.hidden = true;
    pVideo.setAttribute("controls", "");
    pVideo.muted = false;
    pVideo.play().catch(function () {
      pVideo.muted = true;
      pVideo.play().then(function () { pSuara.hidden = false; }).catch(function () { pTutup.hidden = false; pVideo.removeAttribute("controls"); });
    });
  });
  pSuara.addEventListener("click", function () { pVideo.muted = false; pSuara.hidden = true; pVideo.play().catch(function () {}); });
  pVideo.addEventListener("volumechange", function () { if (!pVideo.muted) pSuara.hidden = true; });
  pVideo.addEventListener("error", function () { if (pVideo.getAttribute("src")) tampilToast("Video gagal diputar. Coba lagi sebentar."); });

  document.getElementById("btnKembali").addEventListener("click", function () {
    var dariSini = false;
    try { dariSini = document.referrer && new URL(document.referrer).origin === location.origin; } catch (e) {}
    if (dariSini && history.length > 1) history.back(); else location.href = "./";
  });
})();
