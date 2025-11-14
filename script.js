// TITIK 3 MENU
function toggleMenu() {
    document.getElementById("menuPopup").classList.toggle("show");
}

// Scroll ke bagian Tentang
function goToTentang() {
    document.getElementById("tentang").scrollIntoView({ behavior: "smooth" });
}

// Chat Admin WhatsApp
const nomorAdmin = "6282228266317";

function chatAdmin() {
    const pesan = "Halo Admin, saya ingin bertanya tentang PC CARE E-VOLT.";
    const url = `https://wa.me/${nomorAdmin}?text=${encodeURIComponent(pesan)}`;
    window.open(url, "_blank");
}
