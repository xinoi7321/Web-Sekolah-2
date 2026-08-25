import { useEffect, useState } from 'react';
import { api, fileUrl } from '../../api/client';
import ImageUploadField from '../../components/ImageUploadField';

const empty = { judul: '', nama_siswa: '', deskripsi: '', tingkat: '', tahun: '', bulan: '', foto: '', urutan: 0 };

const bulanOrder = {
  'Januari': 1, 'Februari': 2, 'Maret': 3, 'April': 4, 'Mei': 5, 'Juni': 6,
  'Juli': 7, 'Agustus': 8, 'September': 9, 'Oktober': 10, 'November': 11, 'Desember': 12
};

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

  async function exportExcel() {
    const XLSX = await import('xlsx');
    const data = items.map((p) => ({
      'Nama Lomba': p.judul || '',
      'Nama Siswa': p.nama_siswa || '',
      'Tahun': p.tahun || '',
      'Bulan': p.bulan || '',
      'Tingkat Kejuaraan': p.tingkat || ''
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Prestasi');
    XLSX.writeFile(wb, 'prestasi.xlsx');
  }

  const grouped = items.reduce((acc, item) => {
    const year = item.tahun || 'Tanpa Tahun';
    const month = item.bulan || '';
    if (!acc[year]) acc[year] = {};
    if (!acc[year][month]) acc[year][month] = [];
    acc[year][month].push(item);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => (b === 'Tanpa Tahun' ? -1 : a === 'Tanpa Tahun' ? 1 : Number(b) - Number(a)));

  return (
    <div>
      <h1>Prestasi</h1>
      <div className="flex items-center justify-between mb-4">
        <p className="page-lead m-0">Kelola data prestasi siswa.</p>
        <button type="button" className="btn" onClick={exportExcel}>Download Excel</button>
      </div>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="field"><label>Nama Prestasi</label>
          <input value={form.judul} onChange={(e) => set('judul', e.target.value)} required /></div>
        <div className="field"><label>Nama Siswa</label>
          <input value={form.nama_siswa} onChange={(e) => set('nama_siswa', e.target.value)} /></div>
        <div className="field"><label>Deskripsi</label>
          <textarea value={form.deskripsi} onChange={(e) => set('deskripsi', e.target.value)} /></div>
        <div className="field-row">
          <div className="field"><label>Tingkat Prestasi</label>
            <select value={form.tingkat} onChange={(e) => set('tingkat', e.target.value)}>
              <option value="">- Pilih Tingkat -</option>
              <option value="Kota">Kota</option>
              <option value="Provinsi">Provinsi</option>
              <option value="Nasional">Nasional</option>
              <option value="Internasional">Internasional</option>
            </select></div>
          <div className="field"><label>Tahun Prestasi</label>
            <input value={form.tahun} onChange={(e) => set('tahun', e.target.value)} /></div>
        </div>
        <div className="field"><label>Bulan Prestasi</label>
          <select value={form.bulan} onChange={(e) => set('bulan', e.target.value)}>
            <option value="">- Pilih Bulan -</option>
            <option value="Januari">Januari</option>
            <option value="Februari">Februari</option>
            <option value="Maret">Maret</option>
            <option value="April">April</option>
            <option value="Mei">Mei</option>
            <option value="Juni">Juni</option>
            <option value="Juli">Juli</option>
            <option value="Agustus">Agustus</option>
            <option value="September">September</option>
            <option value="Oktober">Oktober</option>
            <option value="November">November</option>
            <option value="Desember">Desember</option>
          </select></div>
        <ImageUploadField label="Foto Prestasi" value={form.foto} onChange={(url) => set('foto', url)} />
        <button type="submit" className="btn">{editingId ? 'Simpan Perubahan' : 'Tambah Prestasi'}</button>
        {editingId && <button type="button" className="btn btn-outline" onClick={resetForm}>Batal</button>}
        {status && <p className="hint">{status}</p>}
      </form>

      <div className="mt-8">
        {years.map((year) => (
          <section key={year} className="mb-8">
            <h2 className="text-2xl font-display font-bold text-slate-800 mb-4">{year}</h2>
            {Object.keys(grouped[year]).sort((a, b) => {
              if (a === '' && b === '') return 0;
              if (a === '') return 1;
              if (b === '') return -1;
              return (bulanOrder[a] || 0) - (bulanOrder[b] || 0);
            }).map((month) => (
              <div key={month} className="mb-6">
                {month && <h3 className="text-xl font-display font-bold text-slate-700 mb-3">{month}</h3>}
                <div className="admin-gallery-grid">
                  {grouped[year][month].map((p) => (
                    <div className="admin-gallery-item" key={p.id}>
                      {p.foto && <img src={fileUrl(p.foto)} alt={p.judul} />}
                      <h4>{p.judul}</h4>
                      {p.nama_siswa && <p className="meta">Oleh: {p.nama_siswa}</p>}
                      <p className="meta">{p.tingkat} {p.tingkat && p.tahun ? '·' : ''} {p.tahun}</p>
                      <div>
                        <button className="btn-link" onClick={() => edit(p)}>Ubah</button>
                        <button className="btn-link danger" onClick={() => handleDelete(p.id)}>Hapus</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
