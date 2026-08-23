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

function StrukturManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ jabatan: '', nama: '' });
  const [editingId, setEditingId] = useState(null);

  function load() {
    api.get('/struktur-organisasi').then(setItems).catch(() => {});
  }
  useEffect(load, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.jabatan.trim() || !form.nama.trim()) return;
    if (editingId) await api.put(`/struktur-organisasi/${editingId}`, { ...form, urutan: 0 });
    else await api.post('/struktur-organisasi', { ...form, urutan: items.length });
    setForm({ jabatan: '', nama: '' });
    setEditingId(null);
    load();
  }

  async function handleDelete(id) {
    if (!confirm('Hapus data ini?')) return;
    await api.del(`/struktur-organisasi/${id}`);
    load();
  }

  return (
    <section>
      <h2>Struktur Organisasi</h2>
      <form onSubmit={handleSubmit} className="admin-form-inline">
        <input placeholder="Jabatan" value={form.jabatan} onChange={(e) => setForm((f) => ({ ...f, jabatan: e.target.value }))} required />
        <input placeholder="Nama" value={form.nama} onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))} required />
        <button type="submit" className="btn">{editingId ? 'Simpan' : 'Tambah'}</button>
      </form>
      <ul className="admin-list">
        {items.map((s) => (
          <li key={s.id}>
            <span><strong>{s.jabatan}</strong> — {s.nama}</span>
            <span>
              <button className="btn-link" onClick={() => { setEditingId(s.id); setForm({ jabatan: s.jabatan, nama: s.nama }); }}>Ubah</button>
              <button className="btn-link danger" onClick={() => handleDelete(s.id)}>Hapus</button>
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
      <h1>Misi & Struktur Organisasi</h1>
      <MisiManager />
      <StrukturManager />
    </div>
  );
}
