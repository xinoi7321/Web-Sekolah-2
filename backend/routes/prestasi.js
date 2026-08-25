const express = require('express');
const pool = require('../db/pool');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

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
  const { judul, nama_siswa, deskripsi, tingkat, tahun, bulan, foto, urutan } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO prestasi (judul, nama_siswa, deskripsi, tingkat, tahun, bulan, foto, urutan)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [judul || '', nama_siswa || '', deskripsi || '', tingkat || '', tahun || '', bulan || '', foto || '', urutan || 0]
  );
  res.status(201).json(rows[0]);
});

router.put('/:id', requireAuth, async (req, res) => {
  const { judul, nama_siswa, deskripsi, tingkat, tahun, bulan, foto, urutan } = req.body;
  const { rows } = await pool.query(
    `UPDATE prestasi SET judul=$1, nama_siswa=$2, deskripsi=$3, tingkat=$4, tahun=$5, bulan=$6, foto=$7, urutan=$8
     WHERE id=$9 RETURNING *`,
    [judul || '', nama_siswa || '', deskripsi || '', tingkat || '', tahun || '', bulan || '', foto || '', urutan || 0, req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Data tidak ditemukan.' });
  res.json(rows[0]);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM prestasi WHERE id=$1', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
