require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/profil-sekolah', require('./routes/profilSekolah'));
app.use('/api/sambutan', require('./routes/sambutan'));
app.use('/api/akreditasi', require('./routes/akreditasi'));
app.use('/api/sosial-media', require('./routes/sosialMedia'));
app.use('/api/statistik', require('./routes/statistik'));
app.use('/api/misi', require('./routes/misi'));
app.use('/api/struktur-organisasi', require('./routes/strukturOrganisasi'));
app.use('/api/guru-tendik', require('./routes/guruTendik'));
app.use('/api/prestasi', require('./routes/prestasi'));
app.use('/api/ekstrakurikuler', require('./routes/ekstrakurikuler'));
app.use('/api/fasilitas', require('./routes/fasilitas'));
app.use('/api/tata-tertib', require('./routes/tataTertib'));
app.use('/api/program-unggulan', require('./routes/programUnggulan'));
app.use('/api/komite', require('./routes/komite'));
app.use('/api/logo-resmi', require('./routes/logoResmi'));
app.use('/api/berita', require('./routes/berita'));
app.use('/api/section-dividers', require('./routes/sectionDividers'));

app.get('/api/health', (req, res) => res.json({ ok: true }));

// Error handler (termasuk error dari multer, mis. file terlalu besar/format salah)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Terjadi kesalahan server.' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend jalan di http://localhost:${PORT}`));
