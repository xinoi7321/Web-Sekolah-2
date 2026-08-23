const express = require('express');
const pool = require('../db/pool');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

// Daftar ekstrakurikuler (untuk halaman list yang tiap kartunya bisa diklik)
router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM ekstrakurikuler ORDER BY urutan ASC, id ASC');
  res.json(rows);
});

// Detail satu ekstrakurikuler + seluruh foto kegiatannya (halaman tujuan saat kartu diklik)
router.get('/:id', async (req, res) => {
  const item = await pool.query('SELECT * FROM ekstrakurikuler WHERE id=$1', [req.params.id]);
  if (!item.rows[0]) return res.status(404).json({ error: 'Data tidak ditemukan.' });
  const galeri = await pool.query(
    'SELECT * FROM ekstrakurikuler_galeri WHERE ekstrakurikuler_id=$1 ORDER BY urutan ASC, id ASC',
    [req.params.id]
  );
  res.json({ ...item.rows[0], galeri: galeri.rows });
});

router.post('/', requireAuth, async (req, res) => {
  const { nama, deskripsi, thumbnail, urutan } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO ekstrakurikuler (nama, deskripsi, thumbnail, urutan) VALUES ($1,$2,$3,$4) RETURNING *',
    [nama, deskripsi || '', thumbnail || '', urutan || 0]
  );
  res.status(201).json(rows[0]);
});

router.put('/:id', requireAuth, async (req, res) => {
  const { nama, deskripsi, thumbnail, urutan } = req.body;
  const { rows } = await pool.query(
    'UPDATE ekstrakurikuler SET nama=$1, deskripsi=$2, thumbnail=$3, urutan=$4 WHERE id=$5 RETURNING *',
    [nama, deskripsi || '', thumbnail || '', urutan || 0, req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Data tidak ditemukan.' });
  res.json(rows[0]);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM ekstrakurikuler WHERE id=$1', [req.params.id]);
  res.status(204).end();
});

// --- Sub-galeri foto kegiatan ---
router.post('/:id/galeri', requireAuth, async (req, res) => {
  const { url, caption, urutan } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO ekstrakurikuler_galeri (ekstrakurikuler_id, url, caption, urutan) VALUES ($1,$2,$3,$4) RETURNING *',
    [req.params.id, url, caption || '', urutan || 0]
  );
  res.status(201).json(rows[0]);
});

router.delete('/galeri/:galeriId', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM ekstrakurikuler_galeri WHERE id=$1', [req.params.galeriId]);
  res.status(204).end();
});

module.exports = router;
