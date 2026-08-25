import { useEffect, useState } from 'react';
import { api, fileUrl } from '../api/client';
import PageHeader from '../components/PageHeader';

export default function Komite() {
  const [items, setItems] = useState([]);
  const [periodeAktif, setPeriodeAktif] = useState('');

  useEffect(() => {
    api.get('/komite').then((data) => {
      setItems(data);
      if (data.length > 0 && data[0].periode) {
        setPeriodeAktif(data[0].periode);
      }
    }).catch(() => {});
  }, []);

  return (
    <div className="page-content">
      <PageHeader title="Komite" subtitle={periodeAktif ? `Anggota komite sekolah periode ${periodeAktif}` : 'Anggota komite sekolah'} />
      <div className="container">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6">
          {items.map((k) => (
            <div key={k.id} className="staff-card">
              {k.foto ? (
                <img src={fileUrl(k.foto)} alt={k.nama} />
              ) : (
                <div className="photo-placeholder avatar">{k.nama?.[0]}</div>
              )}
              <h4>{k.nama}</h4>
              <p>{k.jabatan}</p>
              {k.periode && <p className="meta">Periode: {k.periode}</p>}
            </div>
          ))}
        </div>
        {items.length === 0 && <p>Belum ada data komite.</p>}
      </div>
    </div>
  );
}
