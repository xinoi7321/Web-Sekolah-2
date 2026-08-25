import { useEffect, useState } from 'react';
import { api } from '../../api/client';

function MisiManager() {
  const [items, setItems] = useState([]);
  const [teks, setTeks] = useState('');
  const [editingId, setEditingId] = useState(null);

  function load() {
    api.get('/misi').then(setItems).catch(() => {});
  }
  useEffect(load, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!teks.trim()) return;
    if (editingId) await api.put(`/misi/${editingId}`, { teks, urutan: 0 });
    else await api.post('/misi', { teks, urutan: items.length });
    setTeks('');
    setEditingId(null);
    load();
  }

  async function handleDelete(id) {
    if (!confirm('Hapus poin misi ini?')) return;
    await api.del(`/misi/${id}`);
    load();
  }

  return (
    <section>
      <h2>Misi</h2>
      <form onSubmit={handleSubmit} className="admin-form-inline">
        <input placeholder="Poin misi" value={teks} onChange={(e) => setTeks(e.target.value)} required />
        <button type="submit" className="btn">{editingId ? 'Simpan' : 'Tambah'}</button>
      </form>
      <ul className="admin-list">
        {items.map((m) => (
          <li key={m.id}>
            <span>{m.teks}</span>
            <span>
              <button className="btn-link" onClick={() => { setEditingId(m.id); setTeks(m.teks); }}>Ubah</button>
              <button className="btn-link danger" onClick={() => handleDelete(m.id)}>Hapus</button>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function AdminMisiStruktur() {
  return (
    <div>
      <h1>Misi</h1>
      <MisiManager />
    </div>
  );
}
