const PENGATURAN = {
  smartlinkUtama: "https://uplcm.com/4/11563571",

  smartlinkPlay: "https://uplcm.com/4/11563571",
  jumlahKlikPlay: 1,

  jedaIklanDetik: 10,

  bukaTabBaru: false,

  episode: [
    {
      video: "https://cdn2.videy.co/8sIfkoTo1.mp4",
      poster: "",
      smartlink: "https://vjjdeyyrulina.com/als/1",
      caption: ""
    }
  ]
};
(function () {
  const P = PENGATURAN;
  const $ = (id) => document.getElementById(id);
  const feed = $("feed");
  const toast = $("toast");
  const tpl = $("tplSlide");
  const total = P.episode.length;

  function bacaHash() {
    const m = location.hash.match(/^#(ep|putar)-(\d+)(?:-(\d+))?$/);
    return m ? { jenis: m[1], ep: Number(m[2]), detik: Number(m[3] || 0) } : null;
  }
  function tulisHash(h) {
    try { history.replaceState(null, "", h ? "#" + h : location.pathname + location.search); } catch (e) {}
  }
  function dorongHash(h) {
    try { history.pushState(null, "", "#" + h); } catch (e) {}
  }

  const klik = {};

  let klikPopunder = false;
  try { klikPopunder = !sessionStorage.getItem("popunderSudah"); } catch (e) {}
  document.addEventListener("click", () => { klikPopunder = false; }, { once: true });

  function ambil(kunci) {
    try { return sessionStorage.getItem(kunci) === "1"; } catch (e) { return false; }
  }
  function tandai(kunci) {
    try { sessionStorage.setItem(kunci, "1"); } catch (e) {}
  }

  const link = (u) => (u && u.trim()) ? u.trim() : P.smartlinkUtama;
  const linkIklan = () => link(P.episode[ep].smartlink || P.smartlinkPlay);

  function buka(url) {
    if (!url) return;
    if (P.bukaTabBaru) {
      const w = window.open(url, "_blank");
      if (!w) location.href = url;
    } else {
      location.href = url;
    }
  }

  // ===== BUAT SLIDE VIDEO =====
  const frag = document.createDocumentFragment();
  const slides = P.episode.map((d, i) => {
    const s = tpl.content.firstElementChild.cloneNode(true);
    s.dataset.i = i;
    if (d.caption) s.querySelector(".cap span").textContent = d.caption;
    if (d.poster) {
      s.style.backgroundImage = "url('" + d.poster + "')";
      s.classList.add("ada-poster");
      s.querySelector("video").poster = d.poster;
    }
    frag.appendChild(s);
    return s;
  });
  feed.appendChild(frag);
  const videos = slides.map((s) => s.querySelector("video"));
  const bars = slides.map((s) => s.querySelector(".progress i"));
  const suaras = slides.map((s) => s.querySelector(".suara"));

  const awal = bacaHash();
  let ep = (awal && P.episode[awal.ep]) ? awal.ep : 0;
  let tujuan = -1;
  document.addEventListener("click", (e) => {
    if (!ambil("smartlinkSudah")) return;
    if (ambil("tombolSudah")) return;
    if (!e.target.closest(".rail, .atas, .lencana")) return;
    e.preventDefault();
    e.stopPropagation();
    tandai("tombolSudah");
    if (slides[ep].classList.contains("main")) {
      videos[ep].pause();
      tulisHash("putar-" + ep + "-" + Math.floor(videos[ep].currentTime));
    }
    buka(linkIklan());
  }, true);

  function muat(i) {
    const v = videos[i], d = P.episode[i];
    if (v.getAttribute("src") || d.poster) return;
    v.muted = true;
    v.preload = "auto";
    v.src = d.video + "#t=0.1";
    v.addEventListener("loadeddata", () => {
      if (slides[i].classList.contains("main")) return;
      v.play().then(() => {
        if (!slides[i].classList.contains("main")) v.pause();
      }).catch(() => {});
    }, { once: true });
  }

  function berhenti(i) {
    videos[i].pause();
    videos[i].controls = false;
    slides[i].classList.remove("main");
    suaras[i].hidden = true;
  }

  function lepas(i) {
    if (!videos[i].getAttribute("src")) return;
    berhenti(i);
    videos[i].removeAttribute("src");
    videos[i].load();
    bars[i].style.transform = "";
  }

  function aktifkan(i) {
    if (ep !== i && slides[ep]) {
      berhenti(ep);
      slides[ep].classList.remove("aktif");
    }
    ep = i;
    slides[i].classList.add("aktif");
    for (let k = 0; k < total; k++) {
      if (Math.abs(k - i) <= 1) muat(k); else lepas(k);
    }
  }

  function scrollKe(i, halus) {
    feed.scrollTo({ top: slides[i].offsetTop, behavior: halus ? "smooth" : "auto" });
  }

  let detikTonton = 0;
  let waktuTerakhir = 0;

  function putarVideo(mulai) {
    const i = ep, s = slides[i], v = videos[i], d = P.episode[i];
    if (!v.getAttribute("src")) v.src = d.video;

    if (mulai > 0) {
      const lompat = () => { try { v.currentTime = mulai; } catch (e) {} };
      if (v.readyState >= 1) lompat();
      else v.addEventListener("loadedmetadata", lompat, { once: true });
    }
    detikTonton = 0;
    waktuTerakhir = mulai || 0;
    s.classList.add("main");
    v.controls = true;
    v.muted = false;
    v.play().catch(() => {
      v.muted = true;
      suaras[i].hidden = false;
      v.play().catch(() => {
        s.classList.remove("main");
        v.controls = false;
      });
    });
  }
  feed.addEventListener("timeupdate", (e) => {
    const v = e.target;
    if (v !== videos[ep]) return;
    if (v.duration) bars[ep].style.transform = "scaleX(" + v.currentTime / v.duration + ")";
    if (!slides[ep].classList.contains("main")) return;
    const t = v.currentTime;
    const selisih = t - waktuTerakhir;
    waktuTerakhir = t;
    if (selisih > 0 && selisih < 2) detikTonton += selisih;
    const jeda = Number(P.jedaIklanDetik) || 0;
    if (jeda > 0 && detikTonton >= jeda) {
      detikTonton = 0;
      v.pause();
      tulisHash("putar-" + ep + "-" + Math.floor(t));
      tandai("smartlinkSudah");
      buka(linkIklan());
    }
  }, true);

  function tekanPlay() {
    if (klikPopunder) { klikPopunder = false; return; }
    const sudah = klik[ep] || 0;
    const target = Math.max(0, Number(P.jumlahKlikPlay) || 0);
    if (sudah < target) {
      klik[ep] = sudah + 1;
      if (sudah + 1 >= target) tulisHash("putar-" + ep);
      tandai("smartlinkSudah");
      buka(linkIklan());
      return;
    }
    putarVideo();
  }

  function tampil(pesan) {
    toast.textContent = pesan; toast.hidden = false;
    clearTimeout(tampil.t);
    tampil.t = setTimeout(() => { toast.hidden = true; }, 1800);
  }

  function hujanHati(s, b) {
    const r = b.getBoundingClientRect(), k = s.getBoundingClientRect();
    for (let n = 0; n < 4; n++) {
      const h = document.createElement("span");
      h.className = "hati"; h.textContent = "❤";
      h.style.left = r.left - k.left + 6 + "px";
      h.style.top = r.top - k.top + "px";
      h.style.setProperty("--x", Math.random() * 60 - 40 + "px");
      h.style.animationDelay = n * 0.08 + "s";
      s.appendChild(h);
      setTimeout(() => h.remove(), 1300);
    }
  }

  feed.addEventListener("click", (e) => {
    const s = e.target.closest(".layar");
    const b = e.target.closest("button");
    if (!s || !b) return;
    const i = Number(s.dataset.i);
    if (b.classList.contains("tap")) { tekanPlay(); return; }
    if (b.classList.contains("suara")) {
      videos[i].muted = false; b.hidden = true;
      videos[i].play().catch(() => {});
      return;
    }
    if (b.classList.contains("btn-suka")) {
      if (b.classList.toggle("aktif")) hujanHati(s, b);
      return;
    }
    if (b.classList.contains("btn-simpan")) {
      tampil(b.classList.toggle("simpan") ? "Disimpan" : "Batal disimpan");
      return;
    }
    if (b.classList.contains("btn-bagikan")) {
      const data = { title: document.title, url: location.href };
      if (navigator.share) navigator.share(data).catch(() => {});
      else if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(() => alert("Link disalin"));
    }
  });

  function cekKembali() {
    const h = bacaHash();
    if (!h || h.jenis !== "putar" || !P.episode[h.ep]) return;
    tulisHash("ep-" + h.ep);
    if (h.ep !== ep) { tujuan = h.ep; scrollKe(h.ep, false); aktifkan(h.ep); }
    putarVideo(h.detik);
  }

  window.addEventListener("popstate", () => {
    const h = bacaHash();
    if (h && h.jenis === "putar") { cekKembali(); return; }
    const i = (h && P.episode[h.ep]) ? h.ep : 0;
    if (i !== ep) { tujuan = i; scrollKe(i, true); }
  });
  window.addEventListener("pageshow", cekKembali);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") cekKembali();
  });

  const io = new IntersectionObserver((list) => {
    list.forEach((x) => {
      if (!x.isIntersecting) return;
      const i = Number(x.target.dataset.i);
      const sudahAktif = i === ep && x.target.classList.contains("aktif");
      if (!sudahAktif) aktifkan(i);
      if (tujuan >= 0) { if (i === tujuan) tujuan = -1; return; }
      if (sudahAktif) return;
      const h = bacaHash();
      if (!h || h.ep !== i) dorongHash("ep-" + i);
    });
  }, { root: feed, threshold: 0.6 });

  aktifkan(ep);
  scrollKe(ep, false);
  if (!awal || awal.jenis !== "putar") tulisHash("ep-" + ep);
  slides.forEach((s) => io.observe(s));
  cekKembali();
})();
