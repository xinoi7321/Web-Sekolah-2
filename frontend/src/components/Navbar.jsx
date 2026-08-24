import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/profil', label: 'Profil' },
  { to: '/sambutan', label: 'Sambutan Kepsek' },
  { to: '/prestasi', label: 'Prestasi' },
  { to: '/ekstrakurikuler', label: 'Ekstrakurikuler' },
  { to: '/fasilitas', label: 'Fasilitas' },
  { to: '/guru-tendik', label: 'Guru & Tendik' },
  { to: '/program-unggulan', label: 'Program Unggulan' },
  { to: '/tata-tertib', label: 'Tata Tertib' },
  { to: '/komite', label: 'Komite' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-brand-gradient text-white shadow-glow sticky top-0 z-50">
      <div className="max-w-[1140px] mx-auto px-5 py-3 flex items-center justify-between gap-3">
        <span className="font-display font-bold text-base text-white bg-white/15 px-4 py-1.5 rounded-full backdrop-blur">
          Website Sekolah
        </span>
        <button
          className="md:hidden flex items-center justify-center bg-white/20 border-0 text-white w-10 h-10 rounded-xl text-xl cursor-pointer"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>
      <nav
        className={`flex-col md:flex md:flex-row gap-1.5 items-center max-w-[1140px] mx-auto px-5 pb-3 ${
          open ? 'flex' : 'hidden'
        }`}
      >
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              `px-3 py-2 rounded-full opacity-90 text-sm font-medium transition duration-200 hover:bg-white/15 hover:opacity-100 ${
                isActive ? 'bg-white/25 opacity-100' : ''
              }`
            }
            onClick={() => setOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
