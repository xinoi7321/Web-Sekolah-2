const express = require('express');
const upload = require('../middleware/upload');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// Endpoint upload generik dipakai semua form admin (foto kepsek, prestasi,
// galeri ekstrakurikuler/fasilitas, foto guru & tendik, dll).
// Mengembalikan {url} lalu URL itu disimpan sebagai field 'foto'/'url' di tabel terkait.
router.post('/', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'File tidak ditemukan.' });
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

module.exports = router;
