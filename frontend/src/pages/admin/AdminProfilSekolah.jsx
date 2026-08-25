import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import ImageUploadField from '../../components/ImageUploadField';

const empty = {
  nama_sekolah: '', singkatan: '', alamat: '', npsn: '', telepon: '',
  email: '', logo: '', visi: '', sejarah: '', maps: '', background: '', jam_operasional: '',
};

export default function AdminProfilSekolah() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState('');

  useEffect(() => {
    api.get('/profil-sekolah').then((d) => setForm({ ...empty, ...d })).catch(() => {});
  }, []);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('Menyimpan...');
    try {
      await api.put('/profil-sekolah', form);
      setStatus('Tersimpan.');
    } catch (err) {
      setStatus(err.message);
    }
  }

  return (
    <div>
      <h1>Identitas & Profil Sekolah</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="field"><label>Nama Sekolah</label>
          <input value={form.nama_sekolah} onChange={(e) => set('nama_sekolah', e.target.value)} /></div>
        <div className="field"><label>Singkatan</label>
          <input value={form.singkatan} onChange={(e) => set('singkatan', e.target.value)} /></div>
        <div className="field"><label>Alamat</label>
          <textarea value={form.alamat} onChange={(e) => set('alamat', e.target.value)} /></div>
        <div className="field"><label>NPSN</label>
          <input value={form.npsn} onChange={(e) => set('npsn', e.target.value)} /></div>
        <div className="field"><label>Telepon</label>
          <input value={form.telepon} onChange={(e) => set('telepon', e.target.value)} /></div>
        <div className="field"><label>Email</label>
          <input value={form.email} onChange={(e) => set('email', e.target.value)} /></div>
        <div className="field"><label>Jam Operasional</label>
          <input value={form.jam_operasional} onChange={(e) => set('jam_operasional', e.target.value)} placeholder="Senin - Jumat, 07:00 - 15:00 WIB" /></div>
        <div className="field"><label>Google Maps (URL embed)</label>
          <input value={form.maps} onChange={(e) => set('maps', e.target.value)} placeholder="https://maps.google.com/..." /></div>
        <ImageUploadField label="Logo Sekolah" value={form.logo} onChange={(url) => set('logo', url)} />
        <ImageUploadField label="Background Beranda" value={form.background} onChange={(url) => set('background', url)} />
        <div className="field"><label>Visi</label>
          <textarea value={form.visi} onChange={(e) => set('visi', e.target.value)} /></div>
        <div className="field"><label>Sejarah</label>
          <textarea rows={6} value={form.sejarah} onChange={(e) => set('sejarah', e.target.value)} /></div>
        <button type="submit" className="btn">Simpan</button>
        {status && <p className="hint">{status}</p>}
      </form>
    </div>
  );
}
