const express = require('express');
const pool = require('../db/pool');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM akreditasi WHERE id = 1');
  res.json(rows[0]);
});

router.put('/', requireAuth, async (req, res) => {
  const { peringkat, skor, nomor_sk, tanggal, lembaga } = req.body;
  const { rows } = await pool.query(
    `UPDATE akreditasi SET peringkat=$1, skor=$2, nomor_sk=$3, tanggal=$4, lembaga=$5
     WHERE id = 1 RETURNING *`,
    [peringkat, skor, nomor_sk, tanggal, lembaga]
  );
  res.json(rows[0]);
});

module.exports = router;
