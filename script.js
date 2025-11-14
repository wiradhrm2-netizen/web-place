// Tampilkan Menu Titik 3
function toggleMenu() {
    document.getElementById("menuPopup").classList.toggle("show");
}

// WhatsApp Admin
const nomorAdmin = "6282228266317";

function chatAdmin() {
    const pesan = "Halo Admin, saya ingin bertanya tentang PC CARE.";
    const url = `https://wa.me/${nomorAdmin}?text=${encodeURIComponent(pesan)}`;
    window.open(url, "_blank");
}
