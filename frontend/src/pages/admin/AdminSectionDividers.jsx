import { useEffect, useState } from 'react';
import { api, fileUrl } from '../../api/client';
import ImageUploadField from '../../components/ImageUploadField';

const POSITIONS = [
  { key: 'hero_statistik', label: 'Antara Hero dan Statistik' },
  { key: 'statistik_sambutan', label: 'Antara Statistik dan Sambutan' },
  { key: 'sambutan_berita', label: 'Antara Sambutan dan Berita Terbaru' },
  { key: 'berita_prestasi', label: 'Antara Berita Terbaru dan Prestasi' },
  { key: 'prestasi_ekstrakurikuler', label: 'Antara Prestasi dan Ekstrakurikuler' },
  { key: 'ekstrakurikuler_fasilitas', label: 'Antara Ekstrakurikuler dan Fasilitas' },
  { key: 'fasilitas_guru', label: 'Antara Fasilitas dan Guru & Tendik' },
  { key: 'guru_program', label: 'Antara Guru & Tendik dan Program Unggulan' },
  { key: 'program_komite', label: 'Antara Program Unggulan dan Komite' },
  { key: 'komite_maps', label: 'Antara Komite dan Maps' },
];

export default function AdminSectionDividers() {
  const [dividers, setDividers] = useState({});
  const [status, setStatus] = useState('');

  useEffect(() => {
    api.get('/section-dividers').then(setDividers).catch(() => {});
  }, []);

  function set(key, value) {
    setDividers((d) => ({ ...d, [key]: value }));
  }

  async function save(key) {
    setStatus('Menyimpan...');
    try {
      const res = await api.put(`/section-dividers/${key}`, { image_url: dividers[key] || '' });
      set((s) => ({ ...s, [key]: res.image_url }));
      setStatus('Tersimpan.');
    } catch (err) {
      setStatus(err.message);
    }
  }

  async function remove(key) {
    setStatus('Menghapus...');
    try {
      await api.del(`/section-dividers/${key}`);
      set((s) => ({ ...s, [key]: '' }));
      setStatus('Dihapus.');
    } catch (err) {
      setStatus(err.message);
    }
  }

  return (
    <div>
      <h1>Pembatas Section Beranda</h1>
      <p className="page-lead">Upload gambar pembatas untuk setiap bagian di halaman beranda.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {POSITIONS.map((p) => (
          <div key={p.key} className="admin-form">
            <h3 className="mt-0 mb-3 text-base font-semibold text-slate-700">{p.label}</h3>
            <ImageUploadField
              value={dividers[p.key] || ''}
              onChange={(url) => set(p.key, url)}
            />
            <div className="flex gap-2 mt-3">
              <button type="button" className="btn" onClick={() => save(p.key)}>Simpan</button>
              {dividers[p.key] && (
                <button type="button" className="btn btn-outline" style={{background:'transparent', color:'#dc2626', borderColor:'#dc2626'}} onClick={() => remove(p.key)}>Hapus</button>
              )}
            </div>
          </div>
        ))}
      </div>
      {status && <p className="hint mt-4">{status}</p>}
    </div>
  );
}
