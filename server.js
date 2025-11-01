import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

// ========== WhatsApp Cloud API (isi data kamu) ========== //
const TOKEN = "ISI_TOKEN_WHATSAPP_KAMU";
const PHONE_NUMBER_ID = "ISI_PHONE_NUMBER_ID";
const NOMOR_GURU = "62822228266317"; // 082228266317
// ======================================================== //

app.post("/kirim-absen", async (req, res) => {
    const { nis, nama, kelas, status, keterangan } = req.body;

    const pesan =
`📚 *ABSENSI SISWA*
NIS: ${nis}
Nama: ${nama}
Kelas: ${kelas}
Status: ${status}
Keterangan: ${keterangan || "-"}
Waktu: ${new Date().toLocaleString()}`;

    try {
        await axios.post(
            `https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to: NOMOR_GURU,
                type: "text",
                text: { body: pesan }
            },
            {
                headers: { Authorization: `Bearer ${TOKEN}` }
            }
        );

        res.json({ success: true });

    } catch (err) {
        res.json({ success: false, error: err.response?.data });
    }
});

app.listen(3000, () => {
    console.log("✅ Server berjalan di http://localhost:3000");
});
