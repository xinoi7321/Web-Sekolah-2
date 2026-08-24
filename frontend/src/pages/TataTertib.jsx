import { useEffect, useState } from 'react';
import { api } from '../api/client';
import PageHeader from '../components/PageHeader';

export default function TataTertib() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/tata-tertib').then(setItems).catch(() => {});
  }, []);

  return (
    <div className="page-content">
      <PageHeader title="Tata Tertib Siswa" subtitle="Peraturan dan tata tertib yang berlaku di sekolah" />
      <div className="container">
        <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
          <ol className="list-decimal pl-6 space-y-3">
            {items.map((t) => (
              <li key={t.id} className="text-slate-700 leading-relaxed">{t.teks}</li>
            ))}
          </ol>
          {items.length === 0 && <p>Belum ada data tata tertib.</p>}
        </div>
      </div>
    </div>
  );
}
