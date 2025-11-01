// Tombol menu
const btnScan = document.getElementById("btnScan");
const btnManual = document.getElementById("btnManual");

const scanSection = document.getElementById("scanSection");
const formSection = document.getElementById("formSection");

// Tombol SCAN
btnScan.onclick = () => {
    formSection.classList.add("hidden");
    scanSection.classList.remove("hidden");

    const scanner = new Html5Qrcode("reader");
    scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 200 },
        (qrData) => {
            try {
                const data = JSON.parse(qrData);
                document.getElementById("nis").value = data.nis;
                document.getElementById("nama").value = data.nama;
                document.getElementById("kelas").value = data.kelas;

                alert("QR berhasil dipindai!");

                formSection.classList.remove("hidden");
                scanSection.classList.add("hidden");
                scanner.stop(); // stop scanner setelah sukses
            } catch {
                alert("QR tidak valid!");
            }
        }
    );
};

// Tombol isi manual
btnManual.onclick = () => {
    scanSection.classList.add("hidden");
    formSection.classList.remove("hidden");
};

// Status Izin / Sakit → tampilkan keterangan
document.getElementById("status").addEventListener("change", function () {
    if (this.value === "Izin" || this.value === "Sakit") {
        keteranganBox.classList.remove("hidden");
    } else {
        keteranganBox.classList.add("hidden");
    }
});

// Kirim Absensi ke server
document.getElementById("kirimWA").onclick = async () => {
    const data = {
        nis: document.getElementById("nis").value,
        nama: document.getElementById("nama").value,
        kelas: document.getElementById("kelas").value,
        status: document.getElementById("status").value,
        keterangan: document.getElementById("keterangan").value,
    };

    const res = await fetch("http://localhost:3000/kirim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);
};
