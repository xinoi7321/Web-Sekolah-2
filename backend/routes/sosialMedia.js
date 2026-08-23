const express = require('express');
const pool = require('../db/pool');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM sosial_media WHERE id = 1');
  res.json(rows[0]);
});

router.put('/', requireAuth, async (req, res) => {
  const { instagram, facebook, youtube, tiktok, whatsapp } = req.body;
  const { rows } = await pool.query(
    `UPDATE sosial_media SET instagram=$1, facebook=$2, youtube=$3, tiktok=$4, whatsapp=$5
     WHERE id = 1 RETURNING *`,
    [instagram, facebook, youtube, tiktok, whatsapp]
  );
  res.json(rows[0]);
});

module.exports = router;
