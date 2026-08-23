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

  return (
    <div className="container">
      <section className="home-hero">
        {profil?.logo && <img src={fileUrl(profil.logo)} alt="Logo sekolah" className="home-hero-logo" />}
        <h1>{profil?.nama_sekolah || 'Nama Sekolah'}</h1>
        <p>{profil?.alamat}</p>
        <div className="home-hero-actions">
          <Link to="/profil" className="btn">Pelajari Profil</Link>
          <Link to="/admin/login" className="btn btn-outline">Login Admin</Link>
        </div>
      </section>

      {statistik.length > 0 && (
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
          <span className="quick-icon">🏆</span>
          Prestasi
        </Link>
        <Link to="/ekstrakurikuler" className="quick-card">
          <span className="quick-icon">🎯</span>
          Ekstrakurikuler
        </Link>
        <Link to="/fasilitas" className="quick-card">
          <span className="quick-icon">🏫</span>
          Fasilitas
        </Link>
        <Link to="/guru-tendik" className="quick-card">
          <span className="quick-icon">👩‍🏫</span>
          Guru & Tendik
        </Link>
      </section>
    </div>
  );
}
