import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, fileUrl } from '../api/client';
import PageHeader from '../components/PageHeader';

export default function Fasilitas() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/fasilitas').then(setItems).catch(() => {});
  }, []);

  return (
    <div className="page-content">
      <PageHeader title="Fasilitas" subtitle="Sarana dan prasarana penunjang belajar" />
      <div className="container">
        <p className="page-lead">Klik salah satu fasilitas untuk melihat foto-fotonya.</p>
        <div className="card-grid">
          {items.map((f) => (
            <Link to={`/fasilitas/${f.id}`} className="clickable-card" key={f.id}>
              {f.thumbnail ? (
                <img src={fileUrl(f.thumbnail)} alt={f.nama} />
              ) : (
                <div className="photo-placeholder">{f.nama}</div>
              )}
              <h3>{f.nama}</h3>
            </Link>
          ))}
          {items.length === 0 && <p>Belum ada data fasilitas.</p>}
        </div>
      </div>
    </div>
  );
}
