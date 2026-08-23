import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, fileUrl } from '../api/client';
import PageHeader from '../components/PageHeader';

export default function Ekstrakurikuler() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/ekstrakurikuler').then(setItems).catch(() => {});
  }, []);

  return (
    <div className="page-content">
      <PageHeader title="Ekstrakurikuler" subtitle="Kegiatan pengembangan bakat siswa" />
      <div className="container">
        <p className="page-lead">Klik salah satu kegiatan untuk melihat deskripsi dan foto-foto kegiatannya.</p>
        <div className="card-grid">
          {items.map((e) => (
            <Link to={`/ekstrakurikuler/${e.id}`} className="clickable-card" key={e.id}>
              {e.thumbnail ? (
                <img src={fileUrl(e.thumbnail)} alt={e.nama} />
              ) : (
                <div className="photo-placeholder">{e.nama}</div>
              )}
              <h3>{e.nama}</h3>
            </Link>
          ))}
          {items.length === 0 && <p>Belum ada data ekstrakurikuler.</p>}
        </div>
      </div>
    </div>
  );
}
