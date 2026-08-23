import { useState } from 'react';
import { api, fileUrl } from '../api/client';

// Dipakai di semua form admin yang butuh upload foto (kepsek, prestasi,
// thumbnail/galeri ekstrakurikuler & fasilitas, foto guru/tendik, logo).
export default function ImageUploadField({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const { url } = await api.uploadFile(file);
      onChange(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="field image-upload-field">
      {label && <label>{label}</label>}
      {value && <img src={fileUrl(value)} alt="preview" className="preview-thumb" />}
      <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} />
      {uploading && <span className="hint">Mengunggah...</span>}
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}
