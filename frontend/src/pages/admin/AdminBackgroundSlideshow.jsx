import { useEffect, useState } from 'react';
import { api, fileUrl } from '../../api/client';
import MultiImageUploadField from '../../components/MultiImageUploadField';

export default function AdminBackgroundSlideshow() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('');
  const [uploadedUrls, setUploadedUrls] = useState([]);

  useEffect(() => {
    api.get('/background-slideshow').then(setItems).catch(() => {});
  }, []);

  async function addSlides() {
    if (!uploadedUrls.length) return;
    setStatus('Menyimpan...');
    try {
      const created = [];
      for (const url of uploadedUrls) {
        const row = await api.post('/background-slideshow', { url });
        created.push(row);
      }
      setItems([...items, ...created]);
      setUploadedUrls([]);
      setStatus('Tersimpan.');
    } catch (err) {
      setStatus(err.message);
    }
  }

  async function removeItem(id) {
    await api.del(`/background-slideshow/${id}`);
    setItems(items.filter((i) => i.id !== id));
  }

  return (
    <div>
      <h1>Background Slideshow</h1>
      <p className="text-slate-500 mb-4">Upload banyak foto untuk background beranda. Foto akan berganti otomatis setiap 4 detik.</p>

      <div className="admin-form">
        <MultiImageUploadField label="Tambah Foto Background" value={uploadedUrls} onChange={setUploadedUrls} />
        <div className="admin-form-inline">
          <button type="button" className="btn" onClick={addSlides} disabled={!uploadedUrls.length}>Tambah ke Daftar</button>
        </div>
      </div>

      {status && <p className="hint mt-3">{status}</p>}

      <h3 className="mt-8 mb-2">Daftar Background ({items.length})</h3>
      {items.length === 0 && <p className="text-slate-500">Belum ada foto background.</p>}
      <ul className="admin-list mt-4">
        {items.map((item, idx) => (
          <li key={item.id}>
            <div className="flex items-center gap-3">
              <img src={fileUrl(item.url)} alt="" className="thumb" />
              <div>
                <p className="font-semibold text-sm">Foto #{idx + 1}</p>
                <p className="text-slate-500 text-xs">{item.url}</p>
              </div>
            </div>
            <button type="button" className="btn-link danger" onClick={() => removeItem(item.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
