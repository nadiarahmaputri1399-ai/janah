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
