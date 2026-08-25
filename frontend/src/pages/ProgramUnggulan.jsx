import { useEffect, useState } from 'react';
import { api, fileUrl } from '../api/client';
import PageHeader from '../components/PageHeader';

export default function ProgramUnggulan() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/program-unggulan').then(setItems).catch(() => {});
  }, []);

  return (
    <div className="page-content">
      <PageHeader title="Program Unggulan" subtitle="Program-program unggulan sekolah" />
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((p) => (
            <div key={p.id} className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:-translate-y-1 transition duration-300">
              {p.foto && (
                <img src={fileUrl(p.foto)} alt={p.nama} className="w-full h-48 object-cover rounded-xl mb-4" />
              )}
              <h3 className="text-lg font-display font-bold text-slate-800 mb-2">{p.nama}</h3>
              <p className="text-slate-600 leading-relaxed">{p.deskripsi}</p>
            </div>
          ))}
        </div>
        {items.length === 0 && <p>Belum ada data program unggulan.</p>}
      </div>
    </div>
  );
}
