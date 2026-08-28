import { useState } from 'react';
import { api, fileUrl } from '../api/client';

export default function MultiImageUploadField({ label, value = [], onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    setError('');
    try {
      const uploaded = [];
      for (const file of files) {
        const { url } = await api.uploadFile(file);
        uploaded.push(url);
      }
      onChange([...value, ...uploaded]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  function remove(index) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className="field">
      {label && <label>{label}</label>}
      <div className="admin-gallery-grid">
        {(value || []).map((url, idx) => (
          <div key={idx} className="admin-gallery-item">
            <img src={fileUrl(url)} alt={`bg-${idx}`} />
            <button type="button" className="btn-link danger" onClick={() => remove(idx)}>Hapus</button>
          </div>
        ))}
      </div>
      <input type="file" accept="image/*" multiple onChange={handleFiles} disabled={uploading} />
      {uploading && <span className="hint">Mengunggah...</span>}
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}
