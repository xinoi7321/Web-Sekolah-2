import { useEffect, useState } from 'react';
import { api } from '../../api/client';

const empty = { label: '', nilai: '' };

export default function AdminStatistik() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState('');

  function load() {
    api.get('/statistik').then(setItems).catch(() => {});
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
      if (editingId) await api.put(`/statistik/${editingId}`, form);
      else await api.post('/statistik', form);
      resetForm();
      load();
      setStatus('Tersimpan.');
    } catch (err) {
      setStatus(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Hapus data ini?')) return;
    await api.del(`/statistik/${id}`);
    load();
  }

  return (
    <div>
      <h1>Statistik</h1>
      <form onSubmit={handleSubmit} className="admin-form admin-form-inline">
        <input placeholder="Label (mis. Peserta Didik)" value={form.label} onChange={(e) => set('label', e.target.value)} required />
        <input placeholder="Nilai (mis. 1.024)" value={form.nilai} onChange={(e) => set('nilai', e.target.value)} required />
        <button type="submit" className="btn">{editingId ? 'Simpan Perubahan' : 'Tambah'}</button>
        {editingId && <button type="button" className="btn btn-outline" onClick={resetForm}>Batal</button>}
      </form>
      {status && <p className="hint">{status}</p>}

      <table className="admin-table">
        <thead><tr><th>Label</th><th>Nilai</th><th></th></tr></thead>
        <tbody>
          {items.map((s) => (
            <tr key={s.id}>
              <td>{s.label}</td><td>{s.nilai}</td>
              <td>
                <button className="btn-link" onClick={() => edit(s)}>Ubah</button>
                <button className="btn-link danger" onClick={() => handleDelete(s.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
