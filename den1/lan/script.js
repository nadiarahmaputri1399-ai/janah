const CONFIG = {
  namaSitus: "HARAPAN BANGSA",

  
  linkUtama: "https://vjjdeyyerlies.my.id/den/yar",

  
  linkCadangan: [
    "https://vjjdeyyerlies.my.id/den/yar",
    "https://vjjdeyycelinari.my.id/den/1",
    "https://vjjdeyyerlies.my.id/den/yar",
    "https://vjjdeyycelinari.my.id/den/1",
    "https://vjjdeyyerlies.my.id/den/yar",
    "https://vjjdeyycelinari.my.id/den/1",
    "https://vjjdeyyerlies.my.id/den/yar",
    "https://vjjdeyycelinari.my.id/den/1"
  ],


  telegram: "https://t.me/harapanbangsaterbaru",

  
  aplikasi: "https://vjjdeyycelinari.my.id/den/1",

  
  tabBaru: true
};


const WARNA = [
  ["#FF5EDF", "#9B4DFF"],
  ["#FFB547", "#FF3B5C"],
  ["#4BF2C8", "#1E9BFF"],
  ["#5C8CFF", "#9B4DFF"],
  ["#FF3B5C", "#FF5EDF"],
  ["#B6F24B", "#18D6C4"],
  ["#FFD23F", "#FF7A2F"],
  ["#00E1FF", "#5C8CFF"]
];

function pasangLink(el, url) {
  if (!el) return;
  el.href = url;
  if (CONFIG.tabBaru) {
    el.target = "_blank";
    el.rel = "noopener";
  }
}

function buatKartu(url, i) {
  const [a, b] = WARNA[i % WARNA.length];
  const grad = `linear-gradient(135deg,${a},${b})`;
  const kartu = document.createElement("a");
  kartu.className = "card lift";
  kartu.style.boxShadow = `0 12px 28px ${a}40`;
  kartu.innerHTML = `
    <div class="card-spin" style="background:conic-gradient(${a},${b},#120B26,${a})"></div>
    <div class="card-in">
      <div class="thumb" style="background:${grad}">
        <span class="tag l">HD</span>
        <span class="tag r"><span class="dot blink"></span>ON</span>
        <div class="play-sm">
          <span class="ring pulse"></span>
          <div class="play-sm-core">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${b}"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
      </div>
      <div class="card-foot">
        <div>
          <span class="card-name">Server ${i + 1}</span>
          <span class="card-sub">Ketuk untuk putar</span>
        </div>
        <div class="card-arrow" style="background:${grad}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>
        </div>
      </div>
    </div>`;
  pasangLink(kartu, url);
  return kartu;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("namaSitus").textContent = CONFIG.namaSitus;
  document.getElementById("namaFooter").textContent = CONFIG.namaSitus;
  document.getElementById("tahun").textContent = new Date().getFullYear();
  document.title = CONFIG.namaSitus;

  pasangLink(document.getElementById("linkUtama"), CONFIG.linkUtama);
  pasangLink(document.getElementById("linkTelegram"), CONFIG.telegram);
  pasangLink(document.getElementById("linkAplikasi"), CONFIG.aplikasi);

  const grid = document.getElementById("gridServer");
  CONFIG.linkCadangan.forEach((url, i) => grid.appendChild(buatKartu(url, i)));
});
