import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, fileUrl } from '../api/client';
import PageHeader from '../components/PageHeader';

export default function Berita() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/berita').then(setItems).catch(() => {});
  }, []);

  return (
    <div className="page-content">
      <PageHeader title="Berita" subtitle="Berita terbaru dari sekolah" />
      <div className="container">
        <div className="gallery-grid">
          {items.map((b) => (
            <Link to={`/berita/${b.id}`} className="clickable-card" key={b.id}>
              {b.foto ? (
                <img src={fileUrl(b.foto)} alt={b.judul} />
              ) : (
                <div className="photo-placeholder">{b.judul}</div>
              )}
              <div className="p-4">
                <h3 className="text-base mb-1">{b.judul}</h3>
                <p className="text-sm text-slate-500 line-clamp-3">{b.deskripsi}</p>
              </div>
            </Link>
          ))}
        </div>
        {items.length === 0 && <p className="text-slate-500">Belum ada berita.</p>}
      </div>
    </div>
  );
}
