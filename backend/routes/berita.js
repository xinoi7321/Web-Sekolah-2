const express = require('express');
const pool = require('../db/pool');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

// Helper to attach gallery to berita items
async function attachGaleri(items) {
  const ids = items.map((i) => i.id);
  if (ids.length === 0) return items;
  const { rows: galeri } = await pool.query(
    'SELECT * FROM berita_galeri WHERE berita_id = ANY($1::int[]) ORDER BY urutan ASC, id ASC',
    [ids]
  );
  const grouped = {};
  galeri.forEach((g) => {
    if (!grouped[g.berita_id]) grouped[g.berita_id] = [];
    grouped[g.berita_id].push(g);
  });
  return items.map((i) => ({ ...i, galeri: grouped[i.id] || [] }));
}

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM berita ORDER BY urutan ASC, id DESC');
  const items = await attachGaleri(rows);
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM berita WHERE id=$1', [req.params.id]);
  if (!rows[0]) return res.status(404).json({ error: 'Data tidak ditemukan.' });
  const items = await attachGaleri([rows[0]]);
  res.json(items[0]);
});

router.post('/', requireAuth, async (req, res) => {
  const { judul, deskripsi, foto, urutan, galeri } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO berita (judul, deskripsi, foto, urutan) VALUES ($1,$2,$3,$4) RETURNING *',
    [judul, deskripsi || '', foto || '', urutan || 0]
  );
  const berita = rows[0];
  // Insert gallery if provided
  if (galeri && Array.isArray(galeri) && galeri.length > 0) {
    for (let i = 0; i < galeri.length; i++) {
      await pool.query(
        'INSERT INTO berita_galeri (berita_id, url, caption, urutan) VALUES ($1,$2,$3,$4)',
        [berita.id, galeri[i].url, galeri[i].caption || '', i]
      );
    }
  }
  const items = await attachGaleri([berita]);
  res.status(201).json(items[0]);
});

router.put('/:id', requireAuth, async (req, res) => {
  const { judul, deskripsi, foto, urutan, galeri } = req.body;
  const { rows } = await pool.query(
    'UPDATE berita SET judul=$1, deskripsi=$2, foto=$3, urutan=$4 WHERE id=$5 RETURNING *',
    [judul, deskripsi || '', foto || '', urutan || 0, req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Data tidak ditemukan.' });
  const berita = rows[0];
  // Update gallery: delete old, insert new
  if (galeri && Array.isArray(galeri)) {
    await pool.query('DELETE FROM berita_galeri WHERE berita_id=$1', [berita.id]);
    for (let i = 0; i < galeri.length; i++) {
      await pool.query(
        'INSERT INTO berita_galeri (berita_id, url, caption, urutan) VALUES ($1,$2,$3,$4)',
        [berita.id, galeri[i].url, galeri[i].caption || '', i]
      );
    }
  }
  const items = await attachGaleri([berita]);
  res.json(items[0]);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM berita WHERE id=$1', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
