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
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <span className="brand">Website Sekolah</span>
        <nav className="nav-links">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'active' : '')}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
