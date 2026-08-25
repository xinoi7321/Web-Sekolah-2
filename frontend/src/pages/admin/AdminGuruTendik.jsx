import { useEffect, useState } from 'react';
import { api, fileUrl } from '../../api/client';
import ImageUploadField from '../../components/ImageUploadField';

const empty = { nama: '', nip: '', jabatan: '', kategori: 'guru', foto: '', urutan: 0 };

export default function AdminGuruTendik() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState('');

  function load() {
    api.get('/guru-tendik').then(setItems).catch(() => {});
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
      if (editingId) await api.put(`/guru-tendik/${editingId}`, form);
      else await api.post('/guru-tendik', form);
      resetForm();
      load();
      setStatus('Tersimpan.');
    } catch (err) {
      setStatus(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Hapus data ini?')) return;
    await api.del(`/guru-tendik/${id}`);
    load();
  }

  return (
    <div>
      <h1>Guru & Tenaga Kependidikan</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="field-row">
          <div className="field"><label>Nama</label>
            <input value={form.nama} onChange={(e) => set('nama', e.target.value)} required /></div>
          <div className="field"><label>NIP</label>
            <input value={form.nip} onChange={(e) => set('nip', e.target.value)} /></div>
        </div>
        <div className="field-row">
          <div className="field"><label>Jabatan / Mapel</label>
            <input value={form.jabatan} onChange={(e) => set('jabatan', e.target.value)} /></div>
          <div className="field"><label>Kategori</label>
            <select value={form.kategori} onChange={(e) => set('kategori', e.target.value)}>
              <option value="guru">Guru</option>
              <option value="tendik">Tenaga Kependidikan</option>
            </select></div>
        </div>
        <ImageUploadField label="Foto" value={form.foto} onChange={(url) => set('foto', url)} />
        <button type="submit" className="btn">{editingId ? 'Simpan Perubahan' : 'Tambah'}</button>
        {editingId && <button type="button" className="btn btn-outline" onClick={resetForm}>Batal</button>}
        {status && <p className="hint">{status}</p>}
      </form>

      <div className="admin-gallery-grid">
        {items.map((g) => (
          <div className="admin-gallery-item" key={g.id}>
            {g.foto && <img src={fileUrl(g.foto)} alt={g.nama} />}
            <h4>{g.nama}</h4>
            {g.nip && <p className="meta">NIP: {g.nip}</p>}
            <p className="meta">{g.jabatan} · {g.kategori}</p>
            <div>
              <button className="btn-link" onClick={() => edit(g)}>Ubah</button>
              <button className="btn-link danger" onClick={() => handleDelete(g.id)}>Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
