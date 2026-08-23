import { useEffect, useState } from 'react';
import { api } from '../../api/client';

const empty = { instagram: '', facebook: '', youtube: '', tiktok: '', whatsapp: '' };

export default function AdminSosialMedia() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState('');

  useEffect(() => {
    api.get('/sosial-media').then((d) => setForm({ ...empty, ...d })).catch(() => {});
  }, []);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('Menyimpan...');
    try {
      await api.put('/sosial-media', form);
      setStatus('Tersimpan.');
    } catch (err) {
      setStatus(err.message);
    }
  }

  return (
    <div>
      <h1>Sosial Media</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        {['instagram', 'facebook', 'youtube', 'tiktok', 'whatsapp'].map((k) => (
          <div className="field" key={k}>
            <label>{k[0].toUpperCase() + k.slice(1)}</label>
            <input value={form[k]} onChange={(e) => set(k, e.target.value)} placeholder="https://" />
          </div>
        ))}
        <button type="submit" className="btn">Simpan</button>
        {status && <p className="hint">{status}</p>}
      </form>
    </div>
  );
}
