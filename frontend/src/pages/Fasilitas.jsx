import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, fileUrl } from '../api/client';

export default function Fasilitas() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/fasilitas').then(setItems).catch(() => {});
  }, []);

  return (
    <div className="container">
      <h1>Fasilitas Sekolah</h1>
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
  );
}
