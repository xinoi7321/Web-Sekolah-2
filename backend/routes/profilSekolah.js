const express = require('express');
const pool = require('../db/pool');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM profil_sekolah WHERE id = 1');
  res.json(rows[0]);
});

router.put('/', requireAuth, async (req, res) => {
  const { nama_sekolah, singkatan, alamat, npsn, telepon, email, logo, visi, sejarah, maps, background, jam_operasional } = req.body;
  const { rows } = await pool.query(
    `UPDATE profil_sekolah SET
      nama_sekolah=$1, singkatan=$2, alamat=$3, npsn=$4, telepon=$5,
      email=$6, logo=$7, visi=$8, sejarah=$9, maps=$10, background=$11, jam_operasional=$12
     WHERE id = 1 RETURNING *`,
    [nama_sekolah, singkatan, alamat, npsn, telepon, email, logo, visi, sejarah, maps, background, jam_operasional]
  );
  res.json(rows[0]);
});

module.exports = router;
