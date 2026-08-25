const express = require('express');
const pool = require('../db/pool');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT position_key, image_url FROM section_dividers ORDER BY urutan, id');
  const map = {};
  rows.forEach((r) => { map[r.position_key] = r.image_url; });
  res.json(map);
});

router.put('/:key', requireAuth, async (req, res) => {
  const { key } = req.params;
  const { image_url } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO section_dividers (position_key, image_url) VALUES ($1, $2)
     ON CONFLICT (position_key) DO UPDATE SET image_url = EXCLUDED.image_url
     RETURNING position_key, image_url`,
    [key, image_url || '']
  );
  res.json(rows[0]);
});

router.delete('/:key', requireAuth, async (req, res) => {
  const { key } = req.params;
  await pool.query('UPDATE section_dividers SET image_url = "" WHERE position_key = $1', [key]);
  res.json({ ok: true });
});

module.exports = router;
