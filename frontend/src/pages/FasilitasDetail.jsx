import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api, fileUrl } from '../api/client';

export default function FasilitasDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/fasilitas/${id}`).then(setData).catch(() => {});
  }, [id]);

  if (!data) return <div className="container">Memuat...</div>;

  return (
    <div className="container">
      <Link to="/fasilitas" className="back-link">&larr; Kembali ke daftar fasilitas</Link>
      <h1>{data.nama}</h1>
      <p className="page-lead">{data.deskripsi}</p>
      <div className="gallery-grid">
        {data.galeri.map((g) => (
          <div className="gallery-card" key={g.id}>
            <img src={fileUrl(g.url)} alt={g.caption || data.nama} />
            {g.caption && <div className="gallery-card-body"><p>{g.caption}</p></div>}
          </div>
        ))}
        {data.galeri.length === 0 && <p>Belum ada foto fasilitas.</p>}
      </div>
    </div>
  );
}
