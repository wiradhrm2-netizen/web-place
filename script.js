// =========================
// DATABASE SISWA
// =========================
const dataSiswa = {
    "12345": { nama: "Budi Santoso", kelas: "8A" },
    "67890": { nama: "Siti Aminah", kelas: "9B" },
    "11223": { nama: "Rudi Hartono", kelas: "7C" }
};

// =========================
// PILIHAN MENU
// =========================
document.getElementById("btnScan").onclick = () => {
    document.getElementById("scanSection").classList.remove("hidden");
    document.getElementById("formSection").classList.remove("hidden");
};

document.getElementById("btnManual").onclick = () => {
    document.getElementById("scanSection").classList.add("hidden");
    document.getElementById("formSection").classList.remove("hidden");
};

// =========================
// STATUS KETERANGAN
// =========================
document.getElementById("status").addEventListener("change", function() {
    document.getElementById("keteranganBox").classList.toggle(
        "hidden",
        this.value === "Hadir"
    );
});

// =========================
// QR SCANNER
// =========================
const scanner = new Html5Qrcode("reader");

Html5Qrcode.getCameras().then(cameras => {
    if (cameras.length > 0) {
        scanner.start(
            cameras[0].id,
            { fps: 10, qrbox: 200 },
            hasil => {
                document.getElementById("nis").value = hasil;

                if (dataSiswa[hasil]) {
                    document.getElementById("nama").value = dataSiswa[hasil].nama;
                    document.getElementById("kelas").value = dataSiswa[hasil].kelas;
                }
            }
        );
    }
});

// =========================
// KIRIM ABSENSI LANGSUNG KE WA (TANPA SERVER)
// =========================
document.getElementById("kirimWA").addEventListener("click", () => {

    const nis = document.getElementById("nis").value.trim();
    const nama = document.getElementById("nama").value.trim();
    const kelas = document.getElementById("kelas").value.trim();
    const status = document.getElementById("status").value;
    const ket = document.getElementById("keterangan").value.trim();

    if (!nis || !nama || !kelas) {
        alert("NIS, Nama, dan Kelas wajib diisi!");
        return;
    }

    const pesan =
`ABSENSI SISWA
=================
NIS : ${nis}
Nama : ${nama}
Kelas : ${kelas}
Status : ${status}
Keterangan : ${ket || "-"}
=================`;

    // Kirim ke WA guru
    const noGuru = "6282228266317";

    const url = `https://wa.me/${noGuru}?text=${encodeURIComponent(pesan)}`;

    // ✅ langsung buka WhatsApp (HP / WA Web)
    window.open(url, "_blank");
});
