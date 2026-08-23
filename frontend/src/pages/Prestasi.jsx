import { useEffect, useState } from 'react';
import { api, fileUrl } from '../api/client';
import PageHeader from '../components/PageHeader';

export default function Prestasi() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/prestasi').then(setItems).catch(() => {});
  }, []);

  return (
    <div className="page-content">
      <PageHeader title="Prestasi" subtitle="Beragam prestasi yang diraih siswa" />
      <div className="container">
        <p className="page-lead">Dokumentasi foto pencapaian peserta didik dan sekolah.</p>
        <div className="gallery-grid">
          {items.map((p) => (
            <div className="gallery-card" key={p.id}>
              {p.foto ? (
                <img src={fileUrl(p.foto)} alt={p.judul} />
              ) : (
                <div className="photo-placeholder">Tidak ada foto</div>
              )}
              <div className="gallery-card-body">
                <h3>{p.judul}</h3>
                <p className="meta">{p.tingkat} {p.tingkat && p.tahun ? '·' : ''} {p.tahun}</p>
                <p>{p.deskripsi}</p>
              </div>
            </div>
          ))}
          {items.length === 0 && <p>Belum ada data prestasi.</p>}
        </div>
      </div>
    </div>
  );
}
