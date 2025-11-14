// =========================
// HAMBURGER MENU
// =========================

const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuBtn.classList.toggle("open");
});

// =========================
// CHAT ADMIN (WhatsApp API)
// =========================

// GANTI NOMOR ADMIN DI SINI
const nomorAdmin = "6282228266317"; // gunakan format internasional

function chatAdmin() {
    const pesan = "Halo Admin, saya ingin bertanya tentang layanan PC CARE E-VOLT.";
    const url = `https://wa.me/${nomorAdmin}?text=${encodeURIComponent(pesan)}`;

    window.open(url, "_blank");
}

