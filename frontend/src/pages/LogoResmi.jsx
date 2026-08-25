import { useEffect, useState } from 'react';
import { api, fileUrl } from '../api/client';
import PageHeader from '../components/PageHeader';

export default function LogoResmi() {
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    api.get('/logo-resmi').then(setLogo).catch(() => {});
  }, []);

  return (
    <div className="page-content">
      <PageHeader title="Logo Resmi" subtitle="Logo resmi sekolah" />
      <div className="container">
        {logo?.foto ? (
          <div className="flex flex-col items-center">
            <img
              src={fileUrl(logo.foto)}
              alt="Logo Resmi Sekolah"
              className="max-w-full h-auto"
              style={{ maxHeight: '500px', objectFit: 'contain' }}
            />
            {logo.keterangan && <p className="mt-4 text-slate-600">{logo.keterangan}</p>}
          </div>
        ) : (
          <p className="text-slate-500 text-center">Belum ada logo.</p>
        )}
      </div>
    </div>
  );
}
