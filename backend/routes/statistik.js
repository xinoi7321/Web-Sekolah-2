const express = require('express');
const pool = require('../db/pool');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM statistik ORDER BY urutan ASC, id ASC');
  res.json(rows);
});

router.post('/', requireAuth, async (req, res) => {
  const { label, nilai, satuan, urutan } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO statistik (label, nilai, satuan, urutan) VALUES ($1,$2,$3,$4) RETURNING *',
    [label, nilai, satuan || '', urutan || 0]
  );
  res.status(201).json(rows[0]);
});

router.put('/:id', requireAuth, async (req, res) => {
  const { label, nilai, satuan, urutan } = req.body;
  const { rows } = await pool.query(
    'UPDATE statistik SET label=$1, nilai=$2, satuan=$3, urutan=$4 WHERE id=$5 RETURNING *',
    [label, nilai, satuan || '', urutan || 0, req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Data tidak ditemukan.' });
  res.json(rows[0]);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM statistik WHERE id=$1', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
