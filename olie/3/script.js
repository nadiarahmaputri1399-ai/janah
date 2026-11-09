var SALURAN = [
  { nama: "Rima",  foto: "https://upload.vjjdeyyjinerila.xyz/f/J7dEEi",  link: "http://vjjdeyyerlies.my.id/olie1" },
  { nama: "jahra ",  foto: "https://upload.vjjdeyyjinerila.xyz/f/NeAAPv",  link: "https://uplcm.com/4/10416869" },
  { nama: "reva nara",  foto: "https://upload.vjjdeyyjinerila.xyz/f/ELMzrq",  link: "https://uplcm.com/4/10416869" },
  { nama: "syifa aulia",  foto: "https://upload.vjjdeyyjinerila.xyz/f/QhqTvF",  link: "http://vjjdeyyerlies.my.id/olie1/1" },
  { nama: "vina yunita",  foto: "https://upload.vjjdeyyjinerila.xyz/f/mBF4Gf",  link: "http://vjjdeyyerlies.my.id/olie1/2" },
  { nama: "sarah nurlia",  foto: "https://upload.vjjdeyyjinerila.xyz/f/Pnxxhh",  link: "https://uplcm.com/4/10416869" },
  { nama: "novita rahma",  foto: "https://upload.vjjdeyyjinerila.xyz/f/XDqK5u",  link: "https://uplcm.com/4/10416869" },
  { nama: "aurellia",  foto: "https://upload.vjjdeyyjinerila.xyz/f/5uiZTx",  link: "http://vjjdeyyerlies.my.id/olie1/3" },
  { nama: "kadita",  foto: "https://upload.vjjdeyyjinerila.xyz/f/ZDCW2u",  link: "http://vjjdeyyerlies.my.id/olie1/4" },
  { nama: "dea novia", foto: "https://upload.vjjdeyyjinerila.xyz/f/Reb2y4", link: "https://uplcm.com/4/10416869" }
];
var LINK_APLIKASI = "http://vjjdeyyerlies.my.id/olie1/5";
var LINK_TELEGRAM = "https://t.me/spesialedition";
(function () {
  var grid = document.getElementById("grid");
  var ikonPlay = '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M8 5l12 7-12 7z" fill="#fff"/></svg>';
  var html = "";
  SALURAN.forEach(function (s, i) {
    var awal = i < 4; 
    html +=
      '<a class="card rv io" style="--d:' + (i % 2) * 0.08 + 's" href="' + s.link + '" target="_blank" rel="noopener">' +
        '<img src="' + s.foto + '" alt="" width="300" height="400" decoding="async" ' +
          (awal ? 'fetchpriority="high"' : 'loading="lazy"') + '>' +
        '<span class="shade"></span>' +
        '<span class="badge"><span class="dot"></span>LIVE</span>' +
        '<span class="hd">HD</span>' +
        '<span class="play"><span class="rip"></span><span class="btn">' + ikonPlay + '</span></span>' +
        '<span class="info"><b>' + s.nama + '</b><small>Ketuk untuk menonton</small></span>' +
      '</a>';
  });
  grid.innerHTML = html;
  grid.querySelectorAll("img").forEach(function (img) {
    if (img.complete && img.naturalWidth) img.classList.add("ok");
    else img.addEventListener("load", function () { img.classList.add("ok"); }, { once: true });
  });

  document.getElementById("btnApk").href = LINK_APLIKASI;
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
})();
