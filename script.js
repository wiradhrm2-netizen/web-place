<!DOCTYPE html>
<html>
<head>
    <title>Absensi QR + WA Otomatis</title>
    <script src="https://unpkg.com/html5-qrcode"></script>
</head>

<body>
    <h2>ABSENSI SISWA</h2>

    <div id="reader" style="width:250px;"></div>

    <br>

    <label>NIS:</label>
    <input type="text" id="nis" readonly><br><br>

    <label>Nama:</label>
    <input type="text" id="nama" readonly><br><br>

    <label>Kelas:</label>
    <input type="text" id="kelas" readonly><br><br>

    <label>Status:</label>
    <select id="status">
        <option>Hadir</option>
        <option>Izin</option>
        <option>Sakit</option>
    </select>

    <div id="keteranganBox" style="display:none;">
        <label>Keterangan:</label>
        <input type="text" id="keterangan"><br><br>
    </div>

    <button id="manualBtn">Mode Manual</button>
    <button id="kirimWA">Kirim Absensi</button>

<script>
// =========================
//      DATABASE SISWA
// =========================
const dataSiswa = {
    "12345": { nama: "Budi Santoso", kelas: "8A" },
    "67890": { nama: "Siti Aminah", kelas: "9B" },
    "11223": { nama: "Rudi Hartono", kelas: "7C" }
};

// =========================
//   TAMPILKAN KETERANGAN
// =========================
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
//    MODE INPUT MANUAL
// =========================
document.getElementById("manualBtn").addEventListener("click", () => {
    if (scannerAktif) scanner.stop();
    scannerAktif = false;

    alert("Mode Isi Manual diaktifkan!");

    document.getElementById("nis").removeAttribute("readonly");
    document.getElementById("nama").removeAttribute("readonly");
    document.getElementById("kelas").removeAttribute("readonly");
});

// =========================
//  KIRIM DATA KE SERVER WA
// =========================

document.getElementById("kirimWA").addEventListener("click", () => {
    const nis = document.getElementById("nis").value.trim();
    const nama = document.getElementById("nama").value.trim();
    const kelas = document.getElementById("kelas").value.trim();
    const status = document.getElementById("status").value;
    const ket = document.getElementById("keterangan").value.trim();

    if (!nis || !nama || !kelas) {
        alert("NIS, Nama, dan Kelas harus diisi!");
        return;
    }

    fetch("https://domain-kamu.com/kirim-absen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nis, nama, kelas, status, keterangan: ket
        })
    })
    .then(res
