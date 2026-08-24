import { useEffect, useState } from 'react';
import { api, fileUrl } from '../../api/client';
import ImageUploadField from '../../components/ImageUploadField';

const empty = { nama: '', jabatan: '', foto: '', urutan: 0 };

export default function AdminKomite() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState('');

  function load() {
    api.get('/komite').then(setItems).catch(() => {});
  }
  useEffect(load, []);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function edit(item) {
    setEditingId(item.id);
    setForm(item);
  }

  function resetForm() {
    setEditingId(null);
    setForm(empty);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('Menyimpan...');
    try {
      if (editingId) await api.put(`/komite/${editingId}`, form);
      else await api.post('/komite', form);
      resetForm();
      load();
      setStatus('Tersimpan.');
    } catch (err) {
      setStatus(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Hapus data ini?')) return;
    await api.del(`/komite/${id}`);
    load();
  }

  return (
    <div>
      <h1>Komite</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="field"><label>Nama</label>
          <input value={form.nama} onChange={(e) => set('nama', e.target.value)} required /></div>
        <div className="field"><label>Jabatan</label>
          <input value={form.jabatan} onChange={(e) => set('jabatan', e.target.value)} /></div>
        <ImageUploadField label="Foto" value={form.foto} onChange={(url) => set('foto', url)} />
        <button type="submit" className="btn">{editingId ? 'Simpan Perubahan' : 'Tambah'}</button>
        {editingId && <button type="button" className="btn btn-outline" onClick={resetForm}>Batal</button>}
        {status && <p className="hint">{status}</p>}
      </form>
      <div className="admin-gallery-grid">
        {items.map((k) => (
          <div className="admin-gallery-item" key={k.id}>
            {k.foto && <img src={fileUrl(k.foto)} alt={k.nama} />}
            <h4>{k.nama}</h4>
            <p className="meta">{k.jabatan}</p>
            <div>
              <button className="btn-link" onClick={() => edit(k)}>Ubah</button>
              <button className="btn-link danger" onClick={() => handleDelete(k.id)}>Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
