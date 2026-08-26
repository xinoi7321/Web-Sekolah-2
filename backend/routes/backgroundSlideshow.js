const express = require('express');
const pool = require('../db/pool');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM background_slideshow ORDER BY id ASC');
  res.json(rows);
});

router.post('/', requireAuth, async (req, res) => {
  const { url, caption } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO background_slideshow (url, caption) VALUES ($1, $2) RETURNING *',
    [url, caption || '']
  );
  res.json(rows[0]);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM background_slideshow WHERE id = $1', [id]);
  res.json({ ok: true });
});

module.exports = router;
