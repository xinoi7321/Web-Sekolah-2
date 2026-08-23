import { useEffect, useState } from 'react';
import { api, fileUrl } from '../api/client';
import PageHeader from '../components/PageHeader';

export default function Sambutan() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/sambutan').then(setData).catch(() => {});
  }, []);

  if (!data) return <div className="container">Memuat...</div>;

  return (
    <div className="page-content">
      <PageHeader title="Sambutan Kepala Sekolah" subtitle="Pesan dan arahan dari kepala sekolah" />
      <div className="container sambutan-page">
        <div className="sambutan-grid">
          <div className="sambutan-photo">
            {data.foto ? (
              <img src={fileUrl(data.foto)} alt={data.nama_kepala_sekolah} />
            ) : (
              <div className="photo-placeholder">Foto Kepala Sekolah</div>
            )}
            <h3>{data.nama_kepala_sekolah}</h3>
            <p>{data.jabatan}</p>
          </div>
          <div className="sambutan-text">
            {data.teks?.split('\n').map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </div>
    </div>
  );
}
