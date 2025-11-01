const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // supaya bisa buka HTML

app.post("/kirim-absen", (req, res) => {
    const { nis, nama, kelas, status, keterangan } = req.body;

    const pesan =
`ABSENSI SISWA
====================
NIS : ${nis}
Nama : ${nama}
Kelas : ${kelas}
Status : ${status}
Keterangan : ${keterangan || "-"}
====================`;

    // Encode pesan ke URL
    const url = `https://wa.me/6282228266317?text=${encodeURIComponent(pesan)}`;

    console.log("WA terkirim:", url);

    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log("Server berjalan di http://localhost:" + PORT);
});
