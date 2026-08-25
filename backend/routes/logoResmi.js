const express = require('express');
const pool = require('../db/pool');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM logo_resmi WHERE id = 1');
  res.json(rows[0]);
});

router.put('/', requireAuth, async (req, res) => {
  const { foto, keterangan } = req.body;
  const { rows } = await pool.query(
    'UPDATE logo_resmi SET foto=$1, keterangan=$2 WHERE id = 1 RETURNING *',
    [foto || '', keterangan || '']
  );
  res.json(rows[0]);
});

module.exports = router;
