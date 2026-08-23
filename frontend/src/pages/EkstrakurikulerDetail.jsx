import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api, fileUrl } from '../api/client';
import PageHeader from '../components/PageHeader';

export default function EkstrakurikulerDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/ekstrakurikuler/${id}`).then(setData).catch(() => {});
  }, [id]);

  if (!data) return <div className="container">Memuat...</div>;

  return (
    <div className="page-content">
      <PageHeader title="Detail Ekstrakurikuler" subtitle="Galeri dan deskripsi kegiatan" />
      <div className="container">
        <Link to="/ekstrakurikuler" className="back-link">&larr; Kembali ke daftar ekstrakurikuler</Link>
        <h1>{data.nama}</h1>
        <p className="page-lead">{data.deskripsi}</p>
        <div className="gallery-grid">
          {data.galeri.map((g) => (
            <div className="gallery-card" key={g.id}>
              <img src={fileUrl(g.url)} alt={g.caption || data.nama} />
              {g.caption && <div className="gallery-card-body"><p>{g.caption}</p></div>}
            </div>
          ))}
          {data.galeri.length === 0 && <p>Belum ada foto kegiatan.</p>}
        </div>
      </div>
    </div>
  );
}
