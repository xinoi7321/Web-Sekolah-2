import { useEffect, useState } from 'react';
import { api, fileUrl } from '../../api/client';
import ImageUploadField from '../../components/ImageUploadField';

const empty = { foto: '', keterangan: '' };

export default function AdminLogoResmi() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState('');

  useEffect(() => {
    api.get('/logo-resmi').then((d) => setForm({ ...empty, ...d })).catch(() => {});
  }, []);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('Menyimpan...');
    try {
      await api.put('/logo-resmi', form);
      setStatus('Tersimpan.');
    } catch (err) {
      setStatus(err.message);
    }
  }

  return (
    <div>
      <h1>Logo Resmi</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <ImageUploadField label="Logo Sekolah" value={form.foto} onChange={(url) => set('foto', url)} />
        <div className="field"><label>Keterangan</label>
          <input value={form.keterangan} onChange={(e) => set('keterangan', e.target.value)} placeholder="Keterangan logo" /></div>
        <button type="submit" className="btn">Simpan</button>
        {status && <p className="hint">{status}</p>}
      </form>
      {form.foto && (
        <div className="mt-6">
          <h3>Preview Logo</h3>
          <img src={fileUrl(form.foto)} alt="Logo" className="max-w-[300px] mt-2" />
        </div>
      )}
    </div>
  );
}
