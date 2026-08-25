import { useEffect, useState } from 'react';
import { api, fileUrl } from '../api/client';
import PageHeader from '../components/PageHeader';

export default function Profil() {
  const [profil, setProfil] = useState(null);
  const [misi, setMisi] = useState([]);

  useEffect(() => {
    api.get('/profil-sekolah').then(setProfil).catch(() => {});
    api.get('/misi').then(setMisi).catch(() => {});
  }, []);

  if (!profil) return <div className="container">Memuat...</div>;

  return (
    <div className="page-content">
      <PageHeader title="Profil Sekolah" subtitle="Identitas, visi, misi, dan sejarah sekolah" />
      <div className="container">
        <section className="mb-10">
          <h2 className="text-3xl font-display font-extrabold text-slate-800 mb-4 tracking-tight">Visi</h2>
          <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
            <p className="text-lg font-semibold text-slate-700 leading-relaxed">{profil?.visi}</p>
          </div>
        </section>
        <section className="mb-10">
          <h2 className="text-3xl font-display font-extrabold text-slate-800 mb-4 tracking-tight">Misi</h2>
          <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
            <ul className="space-y-3">
              {misi.map((m) => (
                <li key={m.id} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-2 w-2 h-2 rounded-full bg-brand flex-shrink-0" />
                  <span className="font-semibold leading-relaxed">{m.teks}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="mb-10">
          <h2 className="text-3xl font-display font-extrabold text-slate-800 mb-4 tracking-tight">Sejarah</h2>
          <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
            <p className="text-slate-600 leading-relaxed">{profil?.sejarah}</p>
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-display font-extrabold text-slate-800 mb-4 tracking-tight">Kontak</h2>
          <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
            <ul className="space-y-2 list-none p-0">
              {profil?.alamat && <li className="flex items-start gap-2"><strong>Alamat:</strong> <span>{profil.alamat}</span></li>}
              {profil?.telepon && <li className="flex items-start gap-2"><strong>Telepon:</strong> <span>{profil.telepon}</span></li>}
              {profil?.email && <li className="flex items-start gap-2"><strong>Email:</strong> <span>{profil.email}</span></li>}
              {profil?.jam_operasional && <li className="flex items-start gap-2"><strong>Jam Operasional:</strong> <span>{profil.jam_operasional}</span></li>}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
