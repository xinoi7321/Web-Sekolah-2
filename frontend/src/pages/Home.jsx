import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, fileUrl } from '../api/client';

export default function Home() {
  const [profil, setProfil] = useState(null);
  const [statistik, setStatistik] = useState([]);
  const [sambutan, setSambutan] = useState(null);

  useEffect(() => {
    api.get('/profil-sekolah').then(setProfil).catch(() => {});
    api.get('/statistik').then(setStatistik).catch(() => {});
    api.get('/sambutan').then(setSambutan).catch(() => {});
  }, []);

  const siswa = statistik.find((s) => /siswa|peserta didik/i.test(s.label));
  const guru = statistik.find((s) => /guru|pendidik|tendik/i.test(s.label));
  const ekskul = statistik.find((s) => /ekstrakurikuler/i.test(s.label));

  return (
    <div className="container">
      <section className="relative overflow-hidden bg-brand-gradient text-white rounded-3xl p-10 sm:p-14 text-center my-6 shadow-soft">
        <div className="absolute bg-white/10 blur-3xl rounded-full w-56 h-56 -top-20 -left-10"></div>
        <div className="absolute bg-white/10 blur-3xl rounded-full w-48 h-48 -bottom-16 -right-10"></div>
        {profil?.logo && (
          <img
            src={fileUrl(profil.logo)}
            alt="Logo sekolah"
            className="relative z-10 w-24 h-24 object-contain bg-white rounded-2xl p-2.5 mb-5 shadow-lg mx-auto"
          />
        )}
        <h1 className="relative z-10 text-white text-4xl sm:text-5xl mb-2 drop-shadow-md font-display">
          {profil?.nama_sekolah || 'Nama Sekolah'}
        </h1>
        <p className="relative z-10 text-white/90 mb-6 text-[1.05rem]">{profil?.alamat}</p>
        <div className="relative z-10 flex gap-3 justify-center flex-wrap">
          <Link to="/profil" className="btn">Pelajari Profil</Link>
        </div>
      </section>
      {(siswa || guru || ekskul) && (
        <section className="stat-grid">
          {siswa && (
            <div className="stat-card">
              <strong>{siswa.nilai}</strong>
              <span>{siswa.label}</span>
              <small>{siswa.satuan}</small>
            </div>
          )}
          {guru && (
            <div className="stat-card">
              <strong>{guru.nilai}</strong>
              <span>{guru.label}</span>
              <small>{guru.satuan}</small>
            </div>
          )}
          {ekskul && (
            <div className="stat-card">
              <strong>{ekskul.nilai}</strong>
              <span>{ekskul.label}</span>
              <small>{ekskul.satuan}</small>
            </div>
          )}
        </section>
      )}

      {statistik.length > 0 && !siswa && !guru && !ekskul && (
        <section className="stat-grid">
          {statistik.map((s) => (
            <div className="stat-card" key={s.id}>
              <strong>{s.nilai}</strong>
              <span>{s.label}</span>
              <small>{s.satuan}</small>
            </div>
          ))}
        </section>
      )}

      {sambutan?.aktif && (
        <section className="section-preview">
          <h2>Sambutan Kepala Sekolah</h2>
          <p>{sambutan.teks?.slice(0, 220)}{sambutan.teks?.length > 220 ? '…' : ''}</p>
          <Link to="/sambutan" className="btn">Baca selengkapnya</Link>
        </section>
      )}

      <section className="quick-links">
        <Link to="/prestasi" className="quick-card">
          <span className="quick-icon bg-accent-gradient">🏆</span>
          Prestasi
        </Link>
        <Link to="/ekstrakurikuler" className="quick-card">
          <span className="quick-icon bg-brand-gradient">🎯</span>
          Ekstrakurikuler
        </Link>
        <Link to="/fasilitas" className="quick-card">
          <span className="quick-icon bg-[linear-gradient(135deg,#0ea5e9,#10b981)]">🏫</span>
          Fasilitas
        </Link>
        <Link to="/guru-tendik" className="quick-card">
          <span className="quick-icon bg-[linear-gradient(135deg,#10b981,#7c3aed)]">👩‍🏫</span>
          Guru & Tendik
        </Link>
        <Link to="/tata-tertib" className="quick-card">
          <span className="quick-icon bg-[linear-gradient(135deg,#f59e0b,#ef4444)]">📋</span>
          Tata Tertib
        </Link>
        <Link to="/program-unggulan" className="quick-card">
          <span className="quick-icon bg-[linear-gradient(135deg,#6366f1,#8b5cf6)]">⭐</span>
          Program Unggulan
        </Link>
        <Link to="/komite" className="quick-card">
          <span className="quick-icon bg-[linear-gradient(135deg,#14b8a6,#0ea5e9)]">🤝</span>
          Komite
        </Link>
      </section>
    </div>
  );
}
