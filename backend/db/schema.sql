-- Skema database sekolah (PostgreSQL)
-- Jalankan: psql -U postgres -d sekolah_db -f db/schema.sql

CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Data identitas sekolah + profil (baris tunggal, id selalu 1)
CREATE TABLE IF NOT EXISTS profil_sekolah (
  id SMALLINT PRIMARY KEY DEFAULT 1,
  nama_sekolah TEXT NOT NULL DEFAULT '',
  singkatan TEXT DEFAULT '',
  alamat TEXT DEFAULT '',
  npsn TEXT DEFAULT '',
  telepon TEXT DEFAULT '',
  email TEXT DEFAULT '',
  logo TEXT DEFAULT '',
  visi TEXT DEFAULT '',
  sejarah TEXT DEFAULT '',
  CONSTRAINT single_row CHECK (id = 1)
);

CREATE TABLE IF NOT EXISTS misi (
  id SERIAL PRIMARY KEY,
  teks TEXT NOT NULL,
  urutan INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS struktur_organisasi (
  id SERIAL PRIMARY KEY,
  jabatan TEXT NOT NULL,
  nama TEXT NOT NULL,
  urutan INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS sambutan (
  id SMALLINT PRIMARY KEY DEFAULT 1,
  aktif BOOLEAN DEFAULT TRUE,
  nama_kepala_sekolah TEXT DEFAULT '',
  jabatan TEXT DEFAULT 'Kepala Sekolah',
  foto TEXT DEFAULT '',
  teks TEXT DEFAULT '',
  CONSTRAINT single_row_sambutan CHECK (id = 1)
);

CREATE TABLE IF NOT EXISTS statistik (
  id SERIAL PRIMARY KEY,
  label TEXT NOT NULL,
  nilai TEXT NOT NULL,
  satuan TEXT DEFAULT '',
  urutan INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS akreditasi (
  id SMALLINT PRIMARY KEY DEFAULT 1,
  peringkat TEXT DEFAULT '',
  skor TEXT DEFAULT '',
  nomor_sk TEXT DEFAULT '',
  tanggal TEXT DEFAULT '',
  lembaga TEXT DEFAULT '',
  CONSTRAINT single_row_akreditasi CHECK (id = 1)
);

-- Prestasi: setiap item punya satu foto utama (galeri prestasi = daftar item)
CREATE TABLE IF NOT EXISTS prestasi (
  id SERIAL PRIMARY KEY,
  judul TEXT NOT NULL,
  deskripsi TEXT DEFAULT '',
  tingkat TEXT DEFAULT '',
  tahun TEXT DEFAULT '',
  foto TEXT DEFAULT '',
  urutan INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Ekstrakurikuler: item diklik -> menuju halaman detail berisi deskripsi + galeri foto kegiatan
CREATE TABLE IF NOT EXISTS ekstrakurikuler (
  id SERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  deskripsi TEXT DEFAULT '',
  thumbnail TEXT DEFAULT '',
  urutan INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS ekstrakurikuler_galeri (
  id SERIAL PRIMARY KEY,
  ekstrakurikuler_id INT NOT NULL REFERENCES ekstrakurikuler(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT DEFAULT '',
  urutan INT DEFAULT 0
);

-- Fasilitas: item diklik -> menuju halaman detail berisi galeri foto fasilitas
CREATE TABLE IF NOT EXISTS fasilitas (
  id SERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  deskripsi TEXT DEFAULT '',
  thumbnail TEXT DEFAULT '',
  urutan INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS fasilitas_galeri (
  id SERIAL PRIMARY KEY,
  fasilitas_id INT NOT NULL REFERENCES fasilitas(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT DEFAULT '',
  urutan INT DEFAULT 0
);

-- Guru & tenaga kependidikan, masing-masing punya foto
CREATE TABLE IF NOT EXISTS guru_tendik (
  id SERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  jabatan TEXT DEFAULT '',
  kategori TEXT DEFAULT 'guru', -- 'guru' atau 'tendik'
  foto TEXT DEFAULT '',
  urutan INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS sosial_media (
  id SMALLINT PRIMARY KEY DEFAULT 1,
  instagram TEXT DEFAULT '',
  facebook TEXT DEFAULT '',
  youtube TEXT DEFAULT '',
  tiktok TEXT DEFAULT '',
  whatsapp TEXT DEFAULT '',
  CONSTRAINT single_row_sosmed CHECK (id = 1)
);

-- Baris default untuk tabel singleton supaya GET pertama tidak error
INSERT INTO profil_sekolah (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
INSERT INTO sambutan (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
INSERT INTO akreditasi (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
INSERT INTO sosial_media (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
