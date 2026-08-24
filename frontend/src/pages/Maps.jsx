import { useEffect, useState } from 'react';
import { api } from '../api/client';
import PageHeader from '../components/PageHeader';

export default function Maps() {
  const [profil, setProfil] = useState(null);

  useEffect(() => {
    api.get('/profil-sekolah').then(setProfil).catch(() => {});
  }, []);

  return (
    <div className="page-content">
      <PageHeader title="Lokasi Sekolah" subtitle="Peta lokasi sekolah" />
      <div className="container">
        {profil?.maps ? (
          <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200">
            <iframe
              src={profil.maps}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Lokasi Sekolah"
            />
          </div>
        ) : (
          <p className="text-slate-500">Belum ada data lokasi.</p>
        )}
      </div>
    </div>
  );
}
