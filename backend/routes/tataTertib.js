const express = require('express');
const pool = require('../db/pool');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM tata_tertib ORDER BY urutan ASC, id ASC');
  res.json(rows);
});

router.post('/', requireAuth, async (req, res) => {
  const { teks, urutan } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO tata_tertib (teks, urutan) VALUES ($1,$2) RETURNING *',
    [teks, urutan || 0]
  );
  res.status(201).json(rows[0]);
});

router.put('/:id', requireAuth, async (req, res) => {
  const { teks, urutan } = req.body;
  const { rows } = await pool.query(
    'UPDATE tata_tertib SET teks=$1, urutan=$2 WHERE id=$3 RETURNING *',
    [teks, urutan || 0, req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Data tidak ditemukan.' });
  res.json(rows[0]);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM tata_tertib WHERE id=$1', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
