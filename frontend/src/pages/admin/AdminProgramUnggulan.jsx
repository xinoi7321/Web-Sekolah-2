import { useEffect, useState } from 'react';
import { api } from '../../api/client';

const empty = { nama: '', deskripsi: '', urutan: 0 };

export default function AdminProgramUnggulan() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState('');

  function load() {
    api.get('/program-unggulan').then(setItems).catch(() => {});
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
      if (editingId) await api.put(`/program-unggulan/${editingId}`, form);
      else await api.post('/program-unggulan', form);
      resetForm();
      load();
      setStatus('Tersimpan.');
    } catch (err) {
      setStatus(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Hapus data ini?')) return;
    await api.del(`/program-unggulan/${id}`);
    load();
  }

  return (
    <div>
      <h1>Program Unggulan</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="field"><label>Nama Program</label>
          <input value={form.nama} onChange={(e) => set('nama', e.target.value)} required /></div>
        <div className="field"><label>Deskripsi</label>
          <textarea value={form.deskripsi} onChange={(e) => set('deskripsi', e.target.value)} /></div>
        <button type="submit" className="btn">{editingId ? 'Simpan Perubahan' : 'Tambah'}</button>
        {editingId && <button type="button" className="btn btn-outline" onClick={resetForm}>Batal</button>}
        {status && <p className="hint">{status}</p>}
      </form>
      <table className="admin-table">
        <thead><tr><th>Nama</th><th>Deskripsi</th><th></th></tr></thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id}>
              <td>{p.nama}</td>
              <td>{p.deskripsi?.slice(0, 80)}</td>
              <td>
                <button className="btn-link" onClick={() => edit(p)}>Ubah</button>
                <button className="btn-link danger" onClick={() => handleDelete(p.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
