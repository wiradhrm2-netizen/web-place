const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const TOKEN = "ISI_TOKEN_FONNTE_KAMU"; // ganti dengan token Fonnte kamu

app.post("/kirim", async (req, res) => {
    const { nis, nama, kelas, status, keterangan } = req.body;

    const pesan =
`ABSENSI SISWA
----------------------
NIS: ${nis}
Nama: ${nama}
Kelas: ${kelas}
Status: ${status}
Keterangan: ${keterangan}`;

    const fetch = (await import("node-fetch")).default;

    await fetch("https://api.fonnte.com/send", {
        method: "POST",
        headers: { "Authorization": TOKEN },
        body: new URLSearchParams({
            target: "082228266317",
            message: pesan
        })
    });

    res.json({ message: "Absensi berhasil dikirim ke WhatsApp!" });
});

app.listen(3000, () =>
    console.log("Server berjalan di http://localhost:3000")
);
