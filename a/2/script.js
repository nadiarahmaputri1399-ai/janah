var SALURAN = [
  { nama: "",    foto: "", link: "" },
  { nama: "",    foto: "", link: "" },
  { nama: "",    foto: "", link: "" },
  { nama: "",    foto: "", link: "" },
  { nama: "",    foto: "", link: "" },
  { nama: "",    foto: "", link: "" },
  { nama: "",    foto: "", link: "" },
  { nama: "",    foto: "", link: "" },
  { nama: "",    foto: "", link: "" },
  { nama: "",    foto: "", link: "" }
];

var LINK_SMARTLINK = "";

var LINK_APLIKASI = "";
var LINK_TELEGRAM = "";

function ada(s) { return !!(s && String(s).trim()); }
function esc(s) { var d = document.createElement("div"); d.textContent = s == null ? "" : String(s); return d.innerHTML; }

if (document.getElementById("grid")) (function () {
  var grid = document.getElementById("grid");
  var ikonPlay = '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M8 5l12 7-12 7z" fill="#fff"/></svg>';
  var html = "";
  SALURAN.forEach(function (s, i) {
    var awal = i < 4;
    html +=
      '<a class="card rv io" data-i="' + i + '" style="--d:' + (i % 2) * 0.08 + 's" href="' + esc(s.link || "#") + '">' +
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

  function keSitus(link) {
    if (ada(LINK_SMARTLINK)) window.open(LINK_SMARTLINK.trim(), "_blank", "noopener");
    location.href = link.trim();
  }

  grid.addEventListener("click", function (e) {
    var a = e.target.closest(".card");
    if (!a) return;
    e.preventDefault();
    var s = SALURAN[+a.dataset.i] || {};
    if (ada(s.link)) keSitus(s.link);
  });

  var apk = document.getElementById("btnApk");
  apk.addEventListener("click", function (e) {
    e.preventDefault();
    if (ada(LINK_APLIKASI)) keSitus(LINK_APLIKASI);
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
