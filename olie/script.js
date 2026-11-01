document.querySelectorAll(".smartlink").forEach(element => {
  element.addEventListener("click", function(e) {
    e.preventDefault();
    const url = this.dataset.smartlink;
    if (!url || url.includes("YOUR-SMARTLINK")) {
      alert("Smartlink belum diisi.");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  });
});
(function(){
  const count = 18;
  for(let i=0;i<count;i++){
    const s=document.createElement("span");
    s.className="spark";
    s.style.left=(Math.random()*100)+"%";
    s.style.animationDuration=(5+Math.random()*8)+"s";
    s.style.animationDelay=(-Math.random()*10)+"s";
    s.style.opacity=(.25+Math.random()*.65);
    s.style.transform="scale("+(0.5+Math.random()*1.2)+")";
    document.body.appendChild(s);
  }
})();
