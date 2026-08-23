import { useEffect, useState } from 'react';
import { api, fileUrl } from '../../api/client';
import ImageUploadField from '../../components/ImageUploadField';

const empty = { judul: '', deskripsi: '', tingkat: '', tahun: '', foto: '', urutan: 0 };

export default function AdminPrestasi() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState('');

  function load() {
    api.get('/prestasi').then(setItems).catch(() => {});
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
      if (editingId) await api.put(`/prestasi/${editingId}`, form);
      else await api.post('/prestasi', form);
      resetForm();
      load();
      setStatus('Tersimpan.');
    } catch (err) {
      setStatus(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Hapus prestasi ini?')) return;
    await api.del(`/prestasi/${id}`);
    load();
  }

  return (
    <div>
      <h1>Prestasi</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="field"><label>Judul</label>
          <input value={form.judul} onChange={(e) => set('judul', e.target.value)} required /></div>
        <div className="field"><label>Deskripsi</label>
          <textarea value={form.deskripsi} onChange={(e) => set('deskripsi', e.target.value)} /></div>
        <div className="field-row">
          <div className="field"><label>Tingkat (mis. Nasional)</label>
            <input value={form.tingkat} onChange={(e) => set('tingkat', e.target.value)} /></div>
          <div className="field"><label>Tahun</label>
            <input value={form.tahun} onChange={(e) => set('tahun', e.target.value)} /></div>
        </div>
        <ImageUploadField label="Foto Prestasi" value={form.foto} onChange={(url) => set('foto', url)} />
        <button type="submit" className="btn">{editingId ? 'Simpan Perubahan' : 'Tambah Prestasi'}</button>
        {editingId && <button type="button" className="btn btn-outline" onClick={resetForm}>Batal</button>}
        {status && <p className="hint">{status}</p>}
      </form>

      <div className="admin-gallery-grid">
        {items.map((p) => (
          <div className="admin-gallery-item" key={p.id}>
            {p.foto && <img src={fileUrl(p.foto)} alt={p.judul} />}
            <h4>{p.judul}</h4>
            <p className="meta">{p.tingkat} {p.tahun}</p>
            <div>
              <button className="btn-link" onClick={() => edit(p)}>Ubah</button>
              <button className="btn-link danger" onClick={() => handleDelete(p.id)}>Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
