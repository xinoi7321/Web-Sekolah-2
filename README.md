# Website Sekolah — React + Express + PostgreSQL

Struktur baru menggantikan versi HTML/JS native, sesuai permintaan:
- **FE:** React (Vite) + React Router
- **BE:** Express (Node.js)
- **DB:** PostgreSQL

Semua konten di bawah ini **bisa diedit lewat panel admin** (`/admin`), termasuk foto:
- Sambutan kepala sekolah (teks + foto kepala sekolah)
- Prestasi (galeri foto prestasi)
- Ekstrakurikuler (list bisa diklik → halaman detail berisi deskripsi + galeri foto kegiatan)
- Fasilitas sekolah (list bisa diklik → halaman detail berisi galeri foto fasilitas)
- Guru & tenaga kependidikan (masing-masing dengan foto)
- Identitas sekolah, visi/misi, sejarah, struktur organisasi, statistik, sosial media

## Kenapa dipecah FE/BE/DB (bukan HTML native lagi)

Ini menjawab poin yang kamu sebutkan:
1. **Struktur komponen React** membuat penambahan fitur baru (misalnya menu baru dari klien) tinggal menambah 1 halaman + 1 route + 1 endpoint API — tidak perlu mengubek-ubek file HTML besar yang sudah menumpuk.
2. **Express + PostgreSQL** menggantikan penyimpanan `data.json` di versi lama — semua CRUD (create/read/update/delete) lewat REST API yang rapi, jadi maintenance & scaling jauh lebih mudah dibanding utak-atik DOM manual dengan JS native.

## Struktur folder

```
sekolah-website-react/
├── backend/            # Express API + koneksi PostgreSQL
│   ├── db/
│   │   ├── schema.sql      # struktur tabel
│   │   ├── migrate.js      # menjalankan schema.sql
│   │   ├── seed.js         # membuat akun admin awal
│   │   └── pool.js
│   ├── middleware/
│   │   ├── auth.js         # verifikasi JWT admin
│   │   └── upload.js       # multer, upload foto ke /uploads
│   ├── routes/              # satu file per entitas (prestasi, fasilitas, dst)
│   ├── uploads/              # foto yang diupload tersimpan di sini
│   └── server.js
└── frontend/            # React (Vite)
    └── src/
        ├── api/client.js    # semua pemanggilan API lewat sini
        ├── context/AuthContext.jsx
        ├── components/       # Navbar, Footer, ImageUploadField, ProtectedRoute
        ├── pages/            # halaman publik (Home, Prestasi, Ekstrakurikuler, dst)
        └── pages/admin/      # panel admin (CRUD tiap entitas)
```

## Menjalankan secara lokal

### 1. Siapkan database
```bash
createdb sekolah_db
cd backend
cp .env.example .env      # sesuaikan DATABASE_URL, JWT_SECRET, dsb.
npm install
npm run db:migrate        # membuat tabel
npm run db:seed           # membuat akun admin default (lihat .env: ADMIN_DEFAULT_USERNAME/PASSWORD)
npm run dev                # jalan di http://localhost:4000
```

### 2. Jalankan frontend
```bash
cd frontend
cp .env.example .env      # VITE_API_URL=http://localhost:4000
npm install
npm run dev                # jalan di http://localhost:5173
```

Buka `http://localhost:5173` untuk website publik, dan `http://localhost:5173/admin/login` untuk login admin (default: `admin` / `admin123` — **segera ganti** lewat `.env` sebelum deploy, atau update langsung di tabel `admin_users`).

## Cara kerja upload foto

Semua form admin yang butuh foto (foto kepsek, foto prestasi, thumbnail & galeri ekstrakurikuler/fasilitas, foto guru/tendik, logo) memakai satu komponen `ImageUploadField` yang otomatis:
1. Mengirim file ke `POST /api/upload` (butuh login admin, disimpan lewat `multer`).
2. File disimpan ke folder `backend/uploads/` dan URL-nya (`/uploads/xxxx.jpg`) langsung disisipkan ke field form (`foto`, `thumbnail`, atau `url` galeri).
3. Saat form disimpan, hanya URL string itu yang tersimpan ke PostgreSQL — jadi tabelnya ringan, filenya di filesystem (bisa diganti ke S3/Cloud Storage nanti tanpa mengubah struktur API secara drastis, cukup ubah `middleware/upload.js`).

## Menambah fitur/menu baru di kemudian hari

Karena arsitekturnya sudah dipisah jadi lapisan React (routing per halaman) dan Express (routing per entitas), pola untuk menambah menu baru selalu sama:
1. Tambah tabel baru di `schema.sql` (jika perlu).
2. Buat 1 file route baru di `backend/routes/`, daftarkan di `server.js`.
3. Buat 1 halaman publik + (opsional) 1 halaman admin di `frontend/src/pages/`.
4. Daftarkan route-nya di `App.jsx` dan link menu di `Navbar.jsx` / `AdminLayout.jsx`.

Tidak perlu menyentuh halaman-halaman lama, jadi risiko "codingan lama jadi berantakan" saat klien minta tambahan mendadak jauh lebih kecil dibanding versi HTML native sebelumnya.

## Migrasi data lama

Data contoh dari `sekolah-website/data/data.json` versi lama (nama sekolah, sambutan, ekstrakurikuler, fasilitas, dll.) bisa dimasukkan manual lewat panel admin, atau kamu bisa tulis skrip tambahan di `backend/db/seed.js` untuk mem-parsing ulang `data.json` itu dan melakukan `INSERT` massal — strukturnya sudah kompatibel dengan skema tabel yang baru.
