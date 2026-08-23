// Mengisi data awal (admin default + contoh data dari data.json lama, opsional)
const bcrypt = require('bcryptjs');
const pool = require('./pool');
require('dotenv').config();

async function seed() {
  const username = process.env.ADMIN_DEFAULT_USERNAME || 'admin';
  const password = process.env.ADMIN_DEFAULT_PASSWORD || 'admin123';
  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO admin_users (username, password_hash)
     VALUES ($1, $2)
     ON CONFLICT (username) DO NOTHING`,
    [username, hash]
  );

  await pool.query(
    `UPDATE profil_sekolah SET
      nama_sekolah = COALESCE(NULLIF(nama_sekolah, ''), 'SMA Negeri 1 Harapan Bangsa'),
      singkatan = COALESCE(NULLIF(singkatan, ''), 'SMAN 1 Harapan Bangsa'),
      alamat = COALESCE(NULLIF(alamat, ''), 'Jl. Pendidikan No. 17, Kecamatan Sukamaju'),
      visi = COALESCE(NULLIF(visi, ''), 'Menjadi lembaga pendidikan yang unggul dalam prestasi.')
     WHERE id = 1`
  );

  await pool.query(
    `UPDATE sambutan SET
      nama_kepala_sekolah = COALESCE(NULLIF(nama_kepala_sekolah, ''), 'Dr. H. Ahmad Fauzi Nugroho, M.Pd.'),
      teks = COALESCE(NULLIF(teks, ''), 'Selamat datang di laman resmi sekolah kami.')
     WHERE id = 1`
  );

  console.log(`Seed selesai. Login admin -> username: "${username}", password: "${password}"`);
  await pool.end();
}

seed().catch((err) => {
  console.error('Seed gagal:', err.message);
  process.exit(1);
});
