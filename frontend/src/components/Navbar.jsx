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
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <span className="brand">Website Sekolah</span>
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '✕' : '☰'}
        </button>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
