import { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function Footer() {
  const [sosmed, setSosmed] = useState(null);

  useEffect(() => {
    api.get('/sosial-media').then(setSosmed).catch(() => {});
  }, []);

  const links = [
    { key: 'instagram', label: 'Instagram', base: 'https://instagram.com/' },
    { key: 'youtube', label: 'YouTube', base: 'https://youtube.com/' },
    { key: 'tiktok', label: 'TikTok', base: 'https://tiktok.com/' },
  ];

  function href(key) {
    if (!sosmed) return '#';
    const val = (sosmed[key] || '').trim();
    if (!val) return '#';
    if (val.startsWith('http')) return val;
    return links.find((l) => l.key === key)?.base + val;
  }

  return (
    <footer className="text-center text-white bg-brand-gradient py-10 px-4 mt-14 rounded-t-3xl">
      <div className="flex gap-5 justify-center flex-wrap mt-4 mb-2">
        <a href="/profil" className="opacity-95 font-medium transition hover:opacity-100 hover:underline">Profil</a>
        <a href="/ekstrakurikuler" className="opacity-95 font-medium transition hover:opacity-100 hover:underline">Ekstrakurikuler</a>
        <a href="/fasilitas" className="opacity-95 font-medium transition hover:opacity-100 hover:underline">Fasilitas</a>
        <a href="/guru-tendik" className="opacity-95 font-medium transition hover:opacity-100 hover:underline">Guru & Tendik</a>
      </div>
      <div className="flex gap-4 justify-center flex-wrap mt-3 mb-2">
        {links.map((l) => (
          <a key={l.key} href={href(l.key)} target="_blank" rel="noreferrer" className="opacity-90 hover:opacity-100">{l.label}</a>
        ))}
      </div>
      <p className="my-1 opacity-95">&copy; {new Date().getFullYear()} Website Sekolah. Dikelola melalui panel admin.</p>
      <p className="my-1 opacity-80 text-sm">Dibuat oleh <span className="font-semibold">Orbit Digital Labs</span></p>
      <a href="/admin/login" className="inline-block mt-1 text-white bg-white/20 px-4 py-1.5 rounded-full font-semibold transition hover:bg-white/30">Login Admin</a>
    </footer>
  );
}
