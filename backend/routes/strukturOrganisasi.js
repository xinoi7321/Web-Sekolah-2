const express = require('express');
const pool = require('../db/pool');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM struktur_organisasi ORDER BY urutan ASC, id ASC');
  res.json(rows);
});

router.post('/', requireAuth, async (req, res) => {
  const { jabatan, nama, urutan } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO struktur_organisasi (jabatan, nama, urutan) VALUES ($1,$2,$3) RETURNING *',
    [jabatan, nama, urutan || 0]
  );
  res.status(201).json(rows[0]);
});

router.put('/:id', requireAuth, async (req, res) => {
  const { jabatan, nama, urutan } = req.body;
  const { rows } = await pool.query(
    'UPDATE struktur_organisasi SET jabatan=$1, nama=$2, urutan=$3 WHERE id=$4 RETURNING *',
    [jabatan, nama, urutan || 0, req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Data tidak ditemukan.' });
  res.json(rows[0]);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM struktur_organisasi WHERE id=$1', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
