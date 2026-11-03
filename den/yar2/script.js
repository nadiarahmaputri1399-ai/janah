const PENGATURAN = {
  smartlinkUtama: "https://encouragementglutton.com/bx8zyrvhpj?key=34b25eed44013a716a44ac9a2016c9e9",

  smartlinkPlay: "https://encouragementglutton.com/bx8zyrvhpj?key=34b25eed44013a716a44ac9a2016c9e9",
  jumlahKlikPlay: 1,

  jedaIklanDetik: 15,

  bukaTabBaru: false,

  episode: [
    {
      video: "../../video/Bahan_crott_video_no_watermark.mp4",
      poster: "",
      smartlink: "https://encouragementglutton.com/bx8zyrvhpj?key=34b25eed44013a716a44ac9a2016c9e9"
    }
  ]
};

(function () {
  const P = PENGATURAN;
  const $ = (id) => document.getElementById(id);
  const layar = document.querySelector(".layar");
  const video = $("video");
  const tombolPlay = $("tombolPlay");
  const tombolSuara = $("tombolSuara");

  function bacaHash() {
    const m = location.hash.match(/^#(ep|putar)-(\d+)(?:-(\d+))?$/);
    return m ? { jenis: m[1], ep: Number(m[2]), detik: Number(m[3] || 0) } : null;
  }
  function tulisHash(h) {
    try { history.replaceState(null, "", h ? "#" + h : location.pathname + location.search); } catch (e) {}
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

  document.addEventListener("click", (e) => {
    if (!ambil("smartlinkSudah")) return;
    if (ambil("tombolSudah")) return;
    if (!e.target.closest(".rail, .atas, .lencana")) return;
    e.preventDefault();
    e.stopPropagation();
    tandai("tombolSudah");
    if (layar.classList.contains("main")) {
      video.pause();
      tulisHash("putar-" + ep + "-" + Math.floor(video.currentTime));
    }
    buka(linkIklan());
  }, true);

  const awal = bacaHash();
  let ep = (awal && P.episode[awal.ep]) ? awal.ep : 0;

  function tampilkanEpisode(i) {
    const d = P.episode[i];
    ep = i;

    hentikanVideo();
    if (d.poster) {
      layar.style.backgroundImage = "url('" + d.poster + "')";
      layar.classList.add("ada-poster");
      video.poster = d.poster;
    } else {
      layar.style.backgroundImage = "";
      layar.classList.remove("ada-poster");
      video.removeAttribute("poster");

      video.muted = true;
      video.preload = "auto";
      video.src = d.video + "#t=0.1";
      video.style.display = "block";
      video.style.opacity = "1";
      video.style.visibility = "visible";

      video.addEventListener("loadeddata", () => {
        if (layar.classList.contains("main")) return;
        video.play().then(() => {
          if (!layar.classList.contains("main")) video.pause();
        }).catch(() => {});
      }, { once: true });
    }
  }

  function hentikanVideo() {
    video.pause();
    video.removeAttribute("src");
    video.load();
    video.controls = false;
    layar.classList.remove("main");
    tombolSuara.hidden = true;
  }

  function putarVideo(mulai) {
    const d = P.episode[ep];
    if (video.getAttribute("src") !== d.video) video.src = d.video;

    if (mulai > 0) {
      const lompat = () => { try { video.currentTime = mulai; } catch (e) {} };
      if (video.readyState >= 1) lompat();
      else video.addEventListener("loadedmetadata", lompat, { once: true });
    }
    detikTonton = 0;
    waktuTerakhir = mulai || 0;
    layar.classList.add("main");
    video.controls = true;
    video.muted = false;
    video.play().catch(() => {
      video.muted = true;
      tombolSuara.hidden = false;
      video.play().catch(() => {
        layar.classList.remove("main");
        video.controls = false;
      });
    });
  }

  let detikTonton = 0;
  let waktuTerakhir = 0;
  video.addEventListener("timeupdate", () => {
    if (!layar.classList.contains("main")) return;
    const t = video.currentTime;
    const selisih = t - waktuTerakhir;
    waktuTerakhir = t;
    if (selisih > 0 && selisih < 2) detikTonton += selisih;
    const jeda = Number(P.jedaIklanDetik) || 0;
    if (jeda > 0 && detikTonton >= jeda) {
      detikTonton = 0;
      video.pause();
      tulisHash("putar-" + ep + "-" + Math.floor(t));
      tandai("smartlinkSudah");
      buka(linkIklan());
    }
  });

  tombolSuara.addEventListener("click", () => {
    video.muted = false;
    tombolSuara.hidden = true;
    video.play().catch(() => {});
  });

  tombolPlay.addEventListener("click", () => {
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
  });

  function cekKembali() {
    const h = bacaHash();
    if (h && h.jenis === "putar" && h.ep === ep) {
      tulisHash("ep-" + ep);
      putarVideo(h.detik);
    }
  }

  function ikutiRiwayat() {
    const h = bacaHash();
    if (h && h.jenis === "putar") { cekKembali(); return; }
    const i = (h && P.episode[h.ep]) ? h.ep : 0;
    if (i !== ep) tampilkanEpisode(i);
  }
  window.addEventListener("popstate", ikutiRiwayat);

  window.addEventListener("pageshow", cekKembali);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") cekKembali();
  });

  $("tombolSuka").addEventListener("click", (e) => e.currentTarget.classList.toggle("aktif"));
  $("tombolBagikan").addEventListener("click", () => {
    const data = { title: document.title, url: location.href };
    if (navigator.share) navigator.share(data).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(() => alert("Link disalin"));
  });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((list) => {
      list.forEach((x) => x.target.classList.toggle("diam", !x.isIntersecting));
    });
    document.querySelectorAll(".bingkai, .atas").forEach((el) => io.observe(el));
  }

  tampilkanEpisode(ep);
  cekKembali();
})();
