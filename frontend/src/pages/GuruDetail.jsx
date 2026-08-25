import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api, fileUrl } from '../api/client';
import PageHeader from '../components/PageHeader';

export default function GuruDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/guru-tendik/${id}`).then(setData).catch(() => {});
  }, [id]);

  if (!data) return <div className="container">Memuat...</div>;

  return (
    <div className="page-content">
      <PageHeader title={data.nama} subtitle={data.jabatan} />
      <div className="container">
        <Link to="/guru-tendik" className="back-link">← Kembali ke Guru & Tendik</Link>
        <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-56 flex-shrink-0">
              {data.foto ? (
                <img src={fileUrl(data.foto)} alt={data.nama} className="w-full rounded-2xl object-cover aspect-[3/4] shadow-sm" />
              ) : (
                <div className="photo-placeholder avatar w-40 h-40 mx-auto md:mx-0 text-4xl">{data.nama?.[0]}</div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-display font-extrabold text-slate-800 mb-1">{data.nama}</h2>
              <p className="text-lg text-brand font-semibold mb-4">{data.jabatan}</p>
              {data.nip && <p className="text-slate-600 mb-2"><strong>NIP:</strong> {data.nip}</p>}
              {data.motto && (
                <div className="mt-4 p-4 bg-amber-50/50 border border-slate-200 rounded-xl">
                  <p className="text-slate-700 italic leading-relaxed">"{data.motto}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
