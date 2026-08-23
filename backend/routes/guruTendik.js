const express = require('express');
const pool = require('../db/pool');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

// GET publik: dipakai halaman "Guru & Tendik" untuk menampilkan foto semua staf
router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM guru_tendik ORDER BY kategori ASC, urutan ASC, id ASC');
  res.json(rows);
});

router.post('/', requireAuth, async (req, res) => {
  const { nama, jabatan, kategori, foto, urutan } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO guru_tendik (nama, jabatan, kategori, foto, urutan) VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [nama, jabatan || '', kategori || 'guru', foto || '', urutan || 0]
  );
  res.status(201).json(rows[0]);
});

router.put('/:id', requireAuth, async (req, res) => {
  const { nama, jabatan, kategori, foto, urutan } = req.body;
  const { rows } = await pool.query(
    'UPDATE guru_tendik SET nama=$1, jabatan=$2, kategori=$3, foto=$4, urutan=$5 WHERE id=$6 RETURNING *',
    [nama, jabatan || '', kategori || 'guru', foto || '', urutan || 0, req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Data tidak ditemukan.' });
  res.json(rows[0]);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM guru_tendik WHERE id=$1', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
