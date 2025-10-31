// DATABASE SISWA
const dataSiswa = {
    "12345": { nama: "Budi Santoso", kelas: "8A" },
    "67890": { nama: "Siti Aminah", kelas: "9B" },
    "11223": { nama: "Rudi Hartono", kelas: "7C" }
};

// Tampilkan kolom keterangan ketika Izin / Sakit
document.getElementById("status").addEventListener("change", function () {
    document.getElementById("keteranganBox").style.display =
        (this.value === "Hadir") ? "none" : "block";
});

// =========================
//        QR SCANNER
// =========================
const scanner = new Html5Qrcode("reader");
let scannerAktif = true;

function mulaiScanner() {
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
                    } else {
                        document.getElementById("nama").value = "";
                        document.getElementById("kelas").value = "";
                    }

                    scanner.stop();
                    scannerAktif = false;
                },
                err => {}
            );
        }
    });
}

mulaiScanner();

// =========================
//       MODE INPUT MANUAL
// =========================
document.getElementById("manualBtn").addEventListener("click", () => {
    if (scannerAktif) {
        scanner.stop();
    }
    scannerAktif = false;

    alert("Mode Isi Manual diaktifkan!");

    document.getElementById("nis").removeAttribute("readonly");
    document.getElementById("nama").removeAttribute("readonly");
    document.getElementById("kelas").removeAttribute("readonly");
});

// =========================
//     KIRIM WHATSAPP
// =========================
document.getElementById("kirimWA").addEventListener("click", () => {
    const nis = document.getElementById("nis").value.trim();
    const nama = document.getElementById("nama").value.trim();
    const kelas = document.getElementById("kelas").value.trim();
    const status = document.getElementById("status").value;
    const ket = document.getElementById("keterangan").value.trim();

    if (nis === "" || nama === "" || kelas === "") {
        alert("NIS, Nama, dan Kelas harus diisi!");
        return;
    }

    const noGuru = "6281234567890"; // Ganti nomor guru/piket
    let pesan = `📚 *ABSENSI SISWA*\n`;
    pesan += `NIS: ${nis}\n`;
    pesan += `Nama: ${nama}\n`;
    pesan += `Kelas: ${kelas}\n`;
    pesan += `Status: ${status}\n`;
    pesan += `Waktu: ${new Date().toLocaleString()}\n`;

    if (status !== "Hadir") {
        pesan += `Keterangan: ${ket || "-"}\n`;
    }

    const waURL = `https://wa.me/${noGuru}?text=${encodeURIComponent(pesan)}`;
    window.open(waURL, "_blank");
});
