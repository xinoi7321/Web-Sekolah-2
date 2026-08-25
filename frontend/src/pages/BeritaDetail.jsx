import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api, fileUrl } from '../api/client';
import PageHeader from '../components/PageHeader';

export default function BeritaDetail() {
  const { id } = useParams();
  const [berita, setBerita] = useState(null);
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    api.get(`/berita/${id}`).then(setBerita).catch(() => {});
  }, [id]);

  if (!berita) return <div className="container">Memuat...</div>;

  const allPhotos = [berita.foto, ...(berita.galeri || []).map((g) => g.url)].filter(Boolean);

  return (
    <div className="page-content">
      <PageHeader title={berita.judul} subtitle="Berita Sekolah" />
      <div className="container">
        <Link to="/" className="back-link">← Kembali ke Beranda</Link>

        {allPhotos.length > 0 && (
          <div className="mb-6">
            <img
              src={fileUrl(allPhotos[activePhoto])}
              alt={berita.judul}
              className="w-full max-h-[500px] object-contain rounded-2xl bg-slate-100"
            />
            {allPhotos.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                {allPhotos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhoto(i)}
                    className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition ${
                      i === activePhoto ? 'border-brand' : 'border-transparent'
                    }`}
                  >
                    <img src={fileUrl(photo)} alt="" className="w-20 h-16 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{berita.deskripsi}</p>
        </div>
      </div>
    </div>
  );
}
