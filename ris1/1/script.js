const CONFIG = {
  namaSitus: "TontonanPluss",
  linkUtama: "https://vjjdeyyerlies.my.id/ris/1",
  linkCadangan: [
    "https://vjjdeyyerlies.my.id/ris/2",
    "https://vjjdeyycelinari.my.id/ri/1",
    "https://vjjdeyyerlies.my.id/ris/3",
    "https://vjjdeyycelinari.my.id/ri/1",
    "https://vjjdeyyerlies.my.id/ris/4",
    "https://vjjdeyycelinari.my.id/ri/1",
    "https://vjjdeyyerlies.my.id/ris/5",
    "https://vjjdeyycelinari.my.id/ri/1"
  ],
  telegram: "https://t.me/harapanbangsaterbaru",
  aplikasi: "https://vjjdeyyerlies.my.id/ris/6",
  tabBaru: true
};
function pasangLink(el, url) {
  if (!el) return;
  el.href = url;
  if (CONFIG.tabBaru) {
    el.target = "_blank";
    el.rel = "noopener";
  }
}
function buatKartu(url, i) {
  const kartu = document.createElement("a");
  kartu.className = "card c" + ((i % 8) + 1) + " lift";
  kartu.innerHTML = `
    <div class="card-spin"></div>
    <div class="card-in">
      <div class="thumb">
        <span class="tag l">HD</span>
        <span class="tag r"><span class="dot dot-on blink"></span>ON</span>
        <div class="play-sm">
          <span class="ring pulse"></span>
          <div class="play-sm-core">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
      </div>
      <div class="card-foot">
        <div>
          <span class="card-name">Server ${i + 1}</span>
          <span class="card-sub">Ketuk untuk putar</span>
        </div>
        <div class="card-arrow">
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
