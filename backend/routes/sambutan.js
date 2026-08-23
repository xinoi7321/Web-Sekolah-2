const express = require('express');
const pool = require('../db/pool');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM sambutan WHERE id = 1');
  res.json(rows[0]);
});

router.put('/', requireAuth, async (req, res) => {
  const { aktif, nama_kepala_sekolah, jabatan, foto, teks } = req.body;
  const { rows } = await pool.query(
    `UPDATE sambutan SET aktif=$1, nama_kepala_sekolah=$2, jabatan=$3, foto=$4, teks=$5
     WHERE id = 1 RETURNING *`,
    [aktif, nama_kepala_sekolah, jabatan, foto, teks]
  );
  res.json(rows[0]);
});

module.exports = router;
