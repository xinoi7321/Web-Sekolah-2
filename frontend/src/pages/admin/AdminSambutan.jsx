import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import ImageUploadField from '../../components/ImageUploadField';

const empty = { aktif: true, nama_kepala_sekolah: '', jabatan: 'Kepala Sekolah', foto: '', teks: '' };

export default function AdminSambutan() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState('');

  useEffect(() => {
    api.get('/sambutan').then((d) => setForm({ ...empty, ...d })).catch(() => {});
  }, []);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('Menyimpan...');
    try {
      await api.put('/sambutan', form);
      setStatus('Tersimpan.');
    } catch (err) {
      setStatus(err.message);
    }
  }

  return (
    <div>
      <h1>Sambutan Kepala Sekolah</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="field checkbox-field">
          <label>
            <input type="checkbox" checked={form.aktif} onChange={(e) => set('aktif', e.target.checked)} />
            Tampilkan sambutan di beranda
          </label>
        </div>
        <div className="field"><label>Nama Kepala Sekolah</label>
          <input value={form.nama_kepala_sekolah} onChange={(e) => set('nama_kepala_sekolah', e.target.value)} /></div>
        <div className="field"><label>Jabatan</label>
          <input value={form.jabatan} onChange={(e) => set('jabatan', e.target.value)} /></div>
        <ImageUploadField label="Foto Kepala Sekolah" value={form.foto} onChange={(url) => set('foto', url)} />
        <div className="field"><label>Teks Sambutan</label>
          <textarea rows={8} value={form.teks} onChange={(e) => set('teks', e.target.value)} /></div>
        <button type="submit" className="btn">Simpan</button>
        {status && <p className="hint">{status}</p>}
      </form>
    </div>
  );
}
