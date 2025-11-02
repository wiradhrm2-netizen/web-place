const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

//
// ===============================
// KONFIGURASI WA CLOUD API
// ===============================
//
const TOKEN = "MASUKKAN_ACCESS_TOKEN_ANDA_DISINI";
const PHONE_NUMBER_ID = "MASUKKAN_PHONE_NUMBER_ID_ANDA_DISINI";
const NOMOR_GURU = "6282228266317"; // nomor tujuan

//
// ===============================
// ROUTE UNTUK KIRIM ABSEN KE WA
// ===============================
//
app.post("/kirim-absen", async (req, res) => {
    const { nis, nama, kelas, status, keterangan } = req.body;

    const pesan =
`ABSENSI SISWA
------------------------
NIS : ${nis}
Nama : ${nama}
Kelas : ${kelas}
Status : ${status}
Keterangan : ${keterangan || "-"}
------------------------
Dikirim otomatis oleh server absensi.`;

    try {
        const response = await fetch(
            `https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    messaging_product: "whatsapp",
                    to: NOMOR_GURU,
                    type: "text",
                    text: { body: pesan }
                })
            }
        );

        const data = await response.json();
        console.log("WA Response:", data);

        if (data.messages) {
            return res.json({ success: true });
        }

        return res.json({ success: false, data });

    } catch (err) {
        console.error(err);
        return res.json({ success: false, error: err });
    }
});

//
// ===============================
// RUN SERVER
// ===============================
//
app.listen(3000, () => {
    console.log("✅ Server berjalan di http://localhost:3000");
});
