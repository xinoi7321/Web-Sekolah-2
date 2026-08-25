import { useEffect, useState } from 'react';
import { api, fileUrl } from '../../api/client';
import ImageUploadField from '../../components/ImageUploadField';

const empty = { judul: '', deskripsi: '', foto: '', urutan: 0, galeri: [] };

export default function AdminBerita() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState('');
  const [galeri, setGaleri] = useState([]);

  function load() {
    api.get('/berita').then(setItems).catch(() => {});
  }
  useEffect(load, []);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function edit(item) {
    setEditingId(item.id);
    setForm(item);
    setGaleri(item.galeri || []);
  }

  function resetForm() {
    setEditingId(null);
    setForm(empty);
    setGaleri([]);
  }

  async function handleUploadGaleri(e) {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    try {
      const uploaded = [];
      for (const file of files) {
        const url = await api.uploadFile(file);
        uploaded.push({ url, caption: '' });
      }
      setGaleri((g) => [...g, ...uploaded]);
    } catch (err) {
      setStatus(err.message);
    }
  }

  function removeGaleri(index) {
    setGaleri((g) => g.filter((_, i) => i !== index));
  }

  function moveGaleri(index, direction) {
    setGaleri((g) => {
      const newGaleri = [...g];
      const target = index + direction;
      if (target < 0 || target >= newGaleri.length) return g;
      [newGaleri[index], newGaleri[target]] = [newGaleri[target], newGaleri[index]];
      return newGaleri;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('Menyimpan...');
    try {
      const payload = { ...form, galeri };
      if (editingId) await api.put(`/berita/${editingId}`, payload);
      else await api.post('/berita', payload);
      resetForm();
      load();
      setStatus('Tersimpan.');
    } catch (err) {
      setStatus(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Hapus berita ini?')) return;
    await api.del(`/berita/${id}`);
    load();
  }

  return (
    <div>
      <h1>Berita / News</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="field"><label>Judul</label>
          <input value={form.judul} onChange={(e) => set('judul', e.target.value)} required /></div>
        <div className="field"><label>Deskripsi</label>
          <textarea value={form.deskripsi} onChange={(e) => set('deskripsi', e.target.value)} rows={4} /></div>
        <ImageUploadField label="Foto Utama" value={form.foto} onChange={(url) => set('foto', url)} />

        <div className="field">
          <label>Galeri Foto (bisa lebih dari 1)</label>
          <input type="file" accept="image/*" multiple onChange={handleUploadGaleri} />
          {galeri.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-3">
              {galeri.map((g, i) => (
                <div key={i} className="relative group">
                  <img src={fileUrl(g.url)} alt="" className="w-full h-20 object-cover rounded-lg" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-1 rounded-lg">
                    <button type="button" onClick={() => moveGaleri(i, -1)} className="text-white text-xs bg-black/50 px-1 rounded">←</button>
                    <button type="button" onClick={() => moveGaleri(i, 1)} className="text-white text-xs bg-black/50 px-1 rounded">→</button>
                    <button type="button" onClick={() => removeGaleri(i)} className="text-white text-xs bg-red-600 px-1 rounded">✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="btn">{editingId ? 'Simpan Perubahan' : 'Tambah'}</button>
        {editingId && <button type="button" className="btn btn-outline" onClick={resetForm}>Batal</button>}
        {status && <p className="hint">{status}</p>}
      </form>
      <table className="admin-table">
        <thead><tr><th>Foto</th><th>Judul</th><th>Galeri</th><th></th></tr></thead>
        <tbody>
          {items.map((b) => (
            <tr key={b.id}>
              <td>{b.foto ? <img src={fileUrl(b.foto)} alt={b.judul} className="thumb" /> : '-'}</td>
              <td>{b.judul}</td>
              <td>{b.galeri?.length || 0} foto</td>
              <td>
                <button className="btn-link" onClick={() => edit(b)}>Ubah</button>
                <button className="btn-link danger" onClick={() => handleDelete(b.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
