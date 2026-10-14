// --- Navigasi Bawah ---
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault(); // Mencegah reload halaman untuk contoh ini

        // Hapus kelas active dari semua item
        navItems.forEach(i => i.classList.remove('active'));

        // Tambahkan kelas active ke item yang diklik
        this.classList.add('active');
    });
});
