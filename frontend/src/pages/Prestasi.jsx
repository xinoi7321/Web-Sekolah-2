import { useEffect, useState } from 'react';
import { api, fileUrl } from '../api/client';
import PageHeader from '../components/PageHeader';

export default function Prestasi() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/prestasi').then(setItems).catch(() => {});
  }, []);

  const grouped = items.reduce((acc, item) => {
    const year = item.tahun || 'Tidak Diketahui';
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => (b === 'Tidak Diketahui' ? -1 : a === 'Tidak Diketahui' ? 1 : Number(b) - Number(a)));

  return (
    <div className="page-content">
      <PageHeader title="Prestasi" subtitle="Beragam prestasi yang diraih siswa" />
      <div className="container">
        <p className="page-lead">Dokumentasi foto pencapaian peserta didik dan sekolah.</p>
        {items.length === 0 && <p className="text-slate-500">Belum ada data prestasi.</p>}
        {years.map((year) => (
          <section key={year} className="mb-10">
            <h2 className="text-2xl font-display font-bold text-slate-800 mb-4">{year}</h2>
            <div className="flex flex-row gap-6 overflow-x-auto pb-4">
              {grouped[year].map((p) => (
                <div key={p.id} className="gallery-card flex-shrink-0 w-72">
                  {p.foto ? (
                    <img src={fileUrl(p.foto)} alt={p.judul} />
                  ) : (
                    <div className="photo-placeholder">Tidak ada foto</div>
                  )}
                  <div className="gallery-card-body">
                    <h3>{p.judul}</h3>
                    {p.nama_siswa && <p className="meta">Oleh: {p.nama_siswa}</p>}
                    <p className="meta">{p.tingkat} {p.tingkat && p.tahun ? '·' : ''} {p.tahun}</p>
                    <p>{p.deskripsi}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
