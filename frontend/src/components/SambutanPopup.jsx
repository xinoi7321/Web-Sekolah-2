import { useEffect, useState } from 'react';
import { api, fileUrl } from '../api/client';

export default function SambutanPopup() {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    api.get('/sambutan').then((d) => {
      setData(d);
      if (d?.aktif && !localStorage.getItem('sambutan_seen')) {
        setOpen(true);
      }
    }).catch(() => {});
  }, []);

  function close() {
    setOpen(false);
    localStorage.setItem('sambutan_seen', '1');
  }

  if (!open || !data) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={close}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-xl border-0 cursor-pointer transition"
          aria-label="Tutup"
        >
          ✕
        </button>
        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-48 flex-shrink-0">
              {data.foto ? (
                <img src={fileUrl(data.foto)} alt={data.nama_kepala_sekolah} className="w-full rounded-2xl object-cover aspect-[3/4] shadow-sm" />
              ) : (
                <div className="photo-placeholder avatar w-32 h-32 mx-auto md:mx-0">Foto</div>
              )}
              <h3 className="text-center md:text-left mt-2 font-bold text-lg">{data.nama_kepala_sekolah}</h3>
              <p className="text-center md:text-left text-sm text-slate-500">{data.jabatan}</p>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-display font-bold text-slate-800 mb-3">Sambutan Kepala Sekolah</h2>
              <div className="text-slate-600 leading-relaxed whitespace-pre-line">
                {data.teks}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
