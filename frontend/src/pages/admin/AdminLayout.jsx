import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const menu = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/profil-sekolah', label: 'Identitas & Profil' },
  { to: '/admin/sambutan', label: 'Sambutan' },
  { to: '/admin/statistik', label: 'Statistik' },
  { to: '/admin/berita', label: 'Berita / News' },
  { to: '/admin/prestasi', label: 'Prestasi' },
  { to: '/admin/ekstrakurikuler', label: 'Ekstrakurikuler' },
  { to: '/admin/fasilitas', label: 'Fasilitas' },
  { to: '/admin/guru-tendik', label: 'Guru & Tendik' },
  { to: '/admin/misi-struktur', label: 'Misi' },
  { to: '/admin/struktur-organisasi', label: 'Struktur Organisasi' },
  { to: '/admin/sosial-media', label: 'Sosial Media' },
  { to: '/admin/tata-tertib', label: 'Tata Tertib' },
  { to: '/admin/program-unggulan', label: 'Program Unggulan' },
  { to: '/admin/komite', label: 'Komite' },
  { to: '/admin/logo-resmi', label: 'Logo Resmi' },
];

export default function AdminLayout() {
  const { username, logout } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  return (
    <div className="min-h-screen bg-amber-50/30">
      <header className="bg-amber-50/50 shadow-sm sticky top-0 z-50">
        <div className="max-w-[1140px] mx-auto px-5 flex items-center justify-between h-14">
          <h1 className="font-display font-bold text-lg text-slate-800">Panel Admin</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600 hidden sm:inline">Masuk sebagai <strong>{username}</strong></span>
            <button onClick={handleLogout} className="btn text-xs py-1.5 px-3">Keluar</button>
            <button
              className="md:hidden flex items-center justify-center border-0 text-slate-700 w-10 h-10 rounded-lg text-xl cursor-pointer"
              aria-label="Toggle menu"
              onClick={() => setDrawerOpen((v) => !v)}
            >
              {drawerOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {drawerOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={closeDrawer} />
          <aside className="fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-slate-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-slate-700">
              <span className="font-display font-bold text-lg text-white">Menu Admin</span>
              <button
                className="border-0 text-white text-2xl cursor-pointer w-8 h-8 flex items-center justify-center"
                onClick={closeDrawer}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <ul className="p-4 space-y-1">
              {menu.map((m) => (
                <li key={m.to}>
                  <NavLink
                    to={m.to}
                    end={m.end}
                    className={({ isActive }) =>
                      `block px-4 py-3 text-sm font-medium rounded-xl transition ${
                        isActive ? 'bg-brand text-white' : 'text-slate-200 hover:bg-slate-700'
                      }`
                    }
                    onClick={closeDrawer}
                  >
                    {m.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </aside>
        </>
      )}

      <nav className="hidden md:block bg-slate-800 text-white">
        <div className="max-w-[1140px] mx-auto px-5">
          <ul className="flex flex-row gap-0 overflow-x-auto">
            {menu.map((m) => (
              <li key={m.to}>
                <NavLink
                  to={m.to}
                  end={m.end}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-sm font-medium whitespace-nowrap transition hover:bg-slate-700 ${
                      isActive ? 'bg-brand text-white' : 'text-white'
                    }`
                  }
                >
                  {m.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="max-w-[1140px] mx-auto px-5 py-6">
        <Outlet />
      </main>
    </div>
  );
}
