import { useEffect, useState } from 'react';
import { api, fileUrl } from '../../api/client';
import ImageUploadField from '../../components/ImageUploadField';

const empty = { nama: '', deskripsi: '', thumbnail: '', urutan: 0 };

export default function AdminFasilitas() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState('');
  const [managingId, setManagingId] = useState(null); // item yang sedang dikelola galerinya
  const [detail, setDetail] = useState(null); // detail item termasuk galeri
  const [galeriUrl, setGaleriUrl] = useState('');
  const [galeriCaption, setGaleriCaption] = useState('');

  function load() {
    api.get('/fasilitas').then(setItems).catch(() => {});
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
      if (editingId) await api.put(`/fasilitas/${editingId}`, form);
      else await api.post('/fasilitas', form);
      resetForm();
      load();
      setStatus('Tersimpan.');
    } catch (err) {
      setStatus(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Hapus fasilitas ini beserta seluruh galerinya?')) return;
    await api.del(`/fasilitas/${id}`);
    if (managingId === id) { setManagingId(null); setDetail(null); }
    load();
  }

  function openGaleri(id) {
    setManagingId(id);
    api.get(`/fasilitas/${id}`).then(setDetail).catch(() => {});
  }

  async function addGaleriFoto() {
    if (!galeriUrl) return;
    await api.post(`/fasilitas/${managingId}/galeri`, { url: galeriUrl, caption: galeriCaption });
    setGaleriUrl('');
    setGaleriCaption('');
    openGaleri(managingId);
  }

  async function deleteGaleriFoto(galeriId) {
    if (!confirm('Hapus foto ini?')) return;
    await api.del(`/fasilitas/galeri/${galeriId}`);
    openGaleri(managingId);
  }

  return (
    <div>
      <h1>Fasilitas</h1>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="field"><label>Nama Fasilitas</label>
          <input value={form.nama} onChange={(e) => set('nama', e.target.value)} required /></div>
        <div className="field"><label>Deskripsi</label>
          <textarea value={form.deskripsi} onChange={(e) => set('deskripsi', e.target.value)} /></div>
        <ImageUploadField label="Thumbnail (foto sampul)" value={form.thumbnail} onChange={(url) => set('thumbnail', url)} />
        <button type="submit" className="btn">{editingId ? 'Simpan Perubahan' : 'Tambah'}</button>
        {editingId && <button type="button" className="btn btn-outline" onClick={resetForm}>Batal</button>}
        {status && <p className="hint">{status}</p>}
      </form>

      <table className="admin-table">
        <thead><tr><th>Nama</th><th>Deskripsi</th><th></th></tr></thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td>{it.nama}</td>
              <td>{it.deskripsi?.slice(0, 60)}</td>
              <td>
                <button className="btn-link" onClick={() => edit(it)}>Ubah</button>
                <button className="btn-link" onClick={() => openGaleri(it.id)}>Kelola Galeri</button>
                <button className="btn-link danger" onClick={() => handleDelete(it.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {managingId && detail && (
        <section className="admin-galeri-manager">
          <h2>Galeri Foto Fasilitas: {detail.nama}</h2>
          <div className="admin-form-inline">
            <ImageUploadField label="Foto baru" value={galeriUrl} onChange={setGaleriUrl} />
            <input placeholder="Keterangan foto (opsional)" value={galeriCaption} onChange={(e) => setGaleriCaption(e.target.value)} />
            <button className="btn" onClick={addGaleriFoto} disabled={!galeriUrl}>Tambahkan ke Galeri</button>
          </div>
          <div className="admin-gallery-grid">
            {detail.galeri.map((g) => (
              <div className="admin-gallery-item" key={g.id}>
                <img src={fileUrl(g.url)} alt={g.caption} />
                <p className="meta">{g.caption}</p>
                <button className="btn-link danger" onClick={() => deleteGaleriFoto(g.id)}>Hapus</button>
              </div>
            ))}
            {detail.galeri.length === 0 && <p>Belum ada foto.</p>}
          </div>
        </section>
      )}
    </div>
  );
}
