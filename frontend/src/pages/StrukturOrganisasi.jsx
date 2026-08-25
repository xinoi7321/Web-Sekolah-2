import { useEffect, useState } from 'react';
import { api, fileUrl } from '../api/client';
import PageHeader from '../components/PageHeader';

export default function StrukturOrganisasi() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/struktur-organisasi').then(setItems).catch(() => {});
  }, []);

  return (
    <div className="page-content">
      <PageHeader title="Struktur Organisasi" subtitle="Struktur organisasi sekolah" />
      <div className="container">
        {items.length > 0 ? (
          <div className="flex flex-col gap-6 items-center">
            {items.map((s) => (
              <img
                key={s.id}
                src={fileUrl(s.foto)}
                alt="Struktur Organisasi"
                className="max-w-full h-auto rounded-2xl shadow-sm"
                style={{ maxHeight: '700px', objectFit: 'contain' }}
              />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center">Belum ada foto struktur organisasi.</p>
        )}
      </div>
    </div>
  );
}
