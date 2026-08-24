import { useEffect, useState } from 'react';
import { api, fileUrl } from '../api/client';
import PageHeader from '../components/PageHeader';

export default function LogoResmi() {
  const [profil, setProfil] = useState(null);

  useEffect(() => {
    api.get('/profil-sekolah').then(setProfil).catch(() => {});
  }, []);

  return (
    <div className="page-content">
      <PageHeader title="Logo Resmi" subtitle="Logo resmi sekolah" />
      <div className="container">
        {profil?.logo ? (
          <div className="flex justify-center">
            <img
              src={fileUrl(profil.logo)}
              alt="Logo Resmi Sekolah"
              className="max-w-full h-auto"
              style={{ maxHeight: '500px', objectFit: 'contain' }}
            />
          </div>
        ) : (
          <p className="text-slate-500 text-center">Belum ada logo.</p>
        )}
      </div>
    </div>
  );
}
