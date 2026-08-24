import { useEffect, useState } from 'react';
import { api, fileUrl } from '../api/client';
import PageHeader from '../components/PageHeader';

export default function Profil() {
  const [profil, setProfil] = useState(null);
  const [misi, setMisi] = useState([]);
  const [struktur, setStruktur] = useState([]);

  useEffect(() => {
    api.get('/profil-sekolah').then(setProfil).catch(() => {});
    api.get('/misi').then(setMisi).catch(() => {});
    api.get('/struktur-organisasi').then(setStruktur).catch(() => {});
  }, []);

  if (!profil) return <div className="container">Memuat...</div>;

  return (
    <div className="page-content">
      <PageHeader title="Profil Sekolah" subtitle="Identitas, visi, misi, dan sejarah sekolah" />
      <div className="container">
        <section>
          <h2>Visi</h2>
          <p>{profil?.visi}</p>
        </section>
        <section>
          <h2>Misi</h2>
          <ul>{misi.map((m) => <li key={m.id}>{m.teks}</li>)}</ul>
        </section>
        <section>
          <h2>Sejarah</h2>
          <p>{profil?.sejarah}</p>
        </section>
        <section>
          <h2>Kontak</h2>
          <ul className="list-none p-0">
            {profil?.alamat && <li><strong>Alamat:</strong> {profil.alamat}</li>}
            {profil?.telepon && <li><strong>Telepon:</strong> {profil.telepon}</li>}
            {profil?.email && <li><strong>Email:</strong> {profil.email}</li>}
          </ul>
        </section>
        <section>
          <h2>Struktur Organisasi</h2>
          <ul className="struktur-list">
            {struktur.map((s) => (
              <li key={s.id}><strong>{s.jabatan}</strong> — {s.nama}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
