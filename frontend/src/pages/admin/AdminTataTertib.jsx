import { useEffect, useState } from 'react';
import { api } from '../../api/client';

const empty = { teks: '', urutan: 0 };

export default function AdminTataTertib() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState('');

  function load() {
    api.get('/tata-tertib').then(setItems).catch(() => {});
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
      if (editingId) await api.put(`/tata-tertib/${editingId}`, form);
      else await api.post('/tata-tertib', form);
      resetForm();
      load();
      setStatus('Tersimpan.');
    } catch (err) {
      setStatus(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Hapus data ini?')) return;
    await api.del(`/tata-tertib/${id}`);
    load();
  }

  return (
    <div>
      <h1>Tata Tertib Siswa</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="field"><label>Isi Tata Tertib</label>
          <textarea value={form.teks} onChange={(e) => set('teks', e.target.value)} required /></div>
        <button type="submit" className="btn">{editingId ? 'Simpan Perubahan' : 'Tambah'}</button>
        {editingId && <button type="button" className="btn btn-outline" onClick={resetForm}>Batal</button>}
        {status && <p className="hint">{status}</p>}
      </form>
      <table className="admin-table">
        <thead><tr><th>Isi</th><th></th></tr></thead>
        <tbody>
          {items.map((t) => (
            <tr key={t.id}>
              <td>{t.teks}</td>
              <td>
                <button className="btn-link" onClick={() => edit(t)}>Ubah</button>
                <button className="btn-link danger" onClick={() => handleDelete(t.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
