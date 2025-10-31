// DATABASE SISWA
const dataSiswa = {
    "12345": { nama: "Budi Santoso", kelas: "8A" },
    "67890": { nama: "Siti Aminah", kelas: "9B" },
    "11223": { nama: "Rudi Hartono", kelas: "7C" }
};

// TAMPILKAN KETERANGAN Izin/Sakit
document.getElementById("status").addEventListener("change", function () {
    const val = this.value;
    const box = document.getElementById("keteranganBox");
    box.style.display = (val === "Hadir") ? "none" : "block";
});

// QR SCANNER (html5-qrcode)
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
                } else {
                    document.getElementById("nama").value = "Tidak ditemukan";
                    document.getElementById("kelas").value = "-";
                }

                scanner.stop();
            },
            err => {}
        );
    }
});


// KIRIM WA
document.getElementById("kirimWA").addEventListener("click", () => {
    const nis = document.getElementById("nis").value;
    const nama = document.getElementById("nama").value;
    const kelas = document.getElementById("kelas").value;
    const status = document.getElementById("status").value;
    const ket = document.getElementById("keterangan").value;

    if (nis === "") {
        alert("Scan QR terlebih dahulu!");
        return;
    }

    const noGuru = "6281234567890"; // Ganti nomor guru
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
