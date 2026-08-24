import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const menu = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/profil-sekolah', label: 'Identitas & Profil' },
  { to: '/admin/sambutan', label: 'Sambutan Kepsek' },
  { to: '/admin/statistik', label: 'Statistik' },
  { to: '/admin/prestasi', label: 'Prestasi' },
  { to: '/admin/ekstrakurikuler', label: 'Ekstrakurikuler' },
  { to: '/admin/fasilitas', label: 'Fasilitas' },
  { to: '/admin/guru-tendik', label: 'Guru & Tendik' },
  { to: '/admin/misi-struktur', label: 'Misi & Struktur Organisasi' },
  { to: '/admin/sosial-media', label: 'Sosial Media' },
  { to: '/admin/tata-tertib', label: 'Tata Tertib' },
  { to: '/admin/program-unggulan', label: 'Program Unggulan' },
  { to: '/admin/komite', label: 'Komite' },
];

export default function AdminLayout() {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <h2>Panel Admin</h2>
        <nav>
          {menu.map((m) => (
            <NavLink key={m.to} to={m.to} end={m.end} className={({ isActive }) => (isActive ? 'active' : '')}>
              {m.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <p>Masuk sebagai <strong>{username}</strong></p>
          <button onClick={handleLogout} className="btn btn-outline">Keluar</button>
        </div>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
