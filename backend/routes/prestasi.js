const express = require('express');
const pool = require('../db/pool');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

// GET publik: dipakai halaman "Prestasi" untuk galeri foto-foto prestasi
router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM prestasi ORDER BY urutan ASC, id DESC');
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM prestasi WHERE id=$1', [req.params.id]);
  if (!rows[0]) return res.status(404).json({ error: 'Data tidak ditemukan.' });
  res.json(rows[0]);
});

router.post('/', requireAuth, async (req, res) => {
  const { judul, deskripsi, tingkat, tahun, foto, urutan } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO prestasi (judul, deskripsi, tingkat, tahun, foto, urutan)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [judul, deskripsi || '', tingkat || '', tahun || '', foto || '', urutan || 0]
  );
  res.status(201).json(rows[0]);
});

router.put('/:id', requireAuth, async (req, res) => {
  const { judul, deskripsi, tingkat, tahun, foto, urutan } = req.body;
  const { rows } = await pool.query(
    `UPDATE prestasi SET judul=$1, deskripsi=$2, tingkat=$3, tahun=$4, foto=$5, urutan=$6
     WHERE id=$7 RETURNING *`,
    [judul, deskripsi || '', tingkat || '', tahun || '', foto || '', urutan || 0, req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Data tidak ditemukan.' });
  res.json(rows[0]);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM prestasi WHERE id=$1', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
