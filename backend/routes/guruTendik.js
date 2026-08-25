const express = require('express');
const pool = require('../db/pool');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

// GET publik: dipakai halaman "Guru & Tendik" untuk menampilkan foto semua staf
router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM guru_tendik ORDER BY kategori ASC, urutan ASC, id ASC');
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM guru_tendik WHERE id=$1', [req.params.id]);
  if (!rows[0]) return res.status(404).json({ error: 'Data tidak ditemukan.' });
  res.json(rows[0]);
});

router.post('/', requireAuth, async (req, res) => {
  const { nama, nip, jabatan, kategori, foto, motto, urutan } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO guru_tendik (nama, nip, jabatan, kategori, foto, motto, urutan) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
    [nama, nip || '', jabatan || '', kategori || 'guru', foto || '', motto || '', urutan || 0]
  );
  res.status(201).json(rows[0]);
});

router.put('/:id', requireAuth, async (req, res) => {
  const { nama, nip, jabatan, kategori, foto, motto, urutan } = req.body;
  const { rows } = await pool.query(
    'UPDATE guru_tendik SET nama=$1, nip=$2, jabatan=$3, kategori=$4, foto=$5, motto=$6, urutan=$7 WHERE id=$8 RETURNING *',
    [nama, nip || '', jabatan || '', kategori || 'guru', foto || '', motto || '', urutan || 0, req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Data tidak ditemukan.' });
  res.json(rows[0]);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM guru_tendik WHERE id=$1', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
