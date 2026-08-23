// Klien API terpusat: semua panggilan ke backend Express lewat sini.
const API_URL = import.meta.env.VITE_API_URL || '';

function getToken() {
  return localStorage.getItem('admin_token');
}

async function request(path, { method = 'GET', body, isForm = false, auth = false } = {}) {
  const headers = {};
  if (!isForm) headers['Content-Type'] = 'application/json';
  if (auth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}/api${path}`, {
    method,
    headers,
    body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
  });

  if (res.status === 204) return null;

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Terjadi kesalahan.');
  return data;
}

export const api = {
  get: (path) => request(path),
  getAuth: (path) => request(path, { auth: true }),
  post: (path, body) => request(path, { method: 'POST', body, auth: true }),
  put: (path, body) => request(path, { method: 'PUT', body, auth: true }),
  del: (path) => request(path, { method: 'DELETE', auth: true }),
  login: (username, password) => request('/auth/login', { method: 'POST', body: { username, password } }),
  uploadFile: async (file) => {
    const form = new FormData();
    form.append('file', file);
    return request('/upload', { method: 'POST', body: form, isForm: true, auth: true });
  },
};

export function fileUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_URL}${path}`;
}

export default API_URL;
