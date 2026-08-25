import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const menu = [
  { to: '/', label: 'Beranda', end: true },
  {
    label: 'Profil',
    children: [
      { to: '/profil', label: 'Visi & Misi' },
      { to: '/sambutan', label: 'Sambutan Kepsek' },
    ],
  },
  { to: '/struktur-organisasi', label: 'Struktur Organisasi' },
  { to: '/prestasi', label: 'Prestasi' },
  { to: '/ekstrakurikuler', label: 'Ekstrakurikuler' },
  { to: '/fasilitas', label: 'Fasilitas' },
  { to: '/guru-tendik', label: 'Guru & Tendik' },
  { to: '/komite', label: 'Komite' },
  { to: '/logo-resmi', label: 'Logo Resmi' },
  {
    label: 'Info',
    children: [
      { to: '/program-unggulan', label: 'Program Unggulan' },
      { to: '/tata-tertib', label: 'Tata Tertib' },
      { to: '/maps', label: 'Maps' },
    ],
  },
  { to: '/kontak', label: 'Kontak' },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  function closeDrawer() {
    setDrawerOpen(false);
    setExpanded(null);
  }

  return (
    <header className="bg-slate-800 shadow-md sticky top-0 z-50">
      <div className="max-w-[1140px] mx-auto px-5 flex items-center justify-between h-16">
        <Link to="/" className="font-display font-bold text-lg" style={{
          color: 'white',
          textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 8px rgba(0,0,0,0.5)',
          letterSpacing: '0.5px'
        }}>
          SD NEGERI KALIBATA 01
        </Link>
        <button
          className="md:hidden flex items-center justify-center border-0 text-slate-700 w-10 h-10 rounded-lg text-xl cursor-pointer"
          aria-label="Toggle menu"
          onClick={() => setDrawerOpen((v) => !v)}
        >
          {drawerOpen ? '✕' : '☰'}
        </button>
      </div>

      <nav className="hidden md:block bg-slate-800 text-white">
        <div className="max-w-[1140px] mx-auto px-5">
          <ul className="flex flex-row gap-0">
            {menu.map((m) => (
              <li key={m.to || m.label} className="relative group">
                {m.children ? (
                  <button className="px-4 py-3 text-sm font-medium flex items-center gap-1 hover:bg-slate-700 transition">
                    {m.label}
                    <span className="text-xs">▾</span>
                  </button>
                ) : (
                  <NavLink
                    to={m.to}
                    end={m.end}
                    className={({ isActive }) =>
                      `block px-4 py-3 text-sm font-medium transition hover:bg-slate-700 ${
                        isActive ? 'bg-brand text-white' : 'text-white'
                      }`
                    }
                  >
                    {m.label}
                  </NavLink>
                )}
                {m.children && (
                  <ul className="hidden group-hover:block absolute left-0 top-full bg-slate-800 border-t border-slate-700 min-w-[200px] shadow-lg">
                    {m.children.map((c) => (
                      <li key={c.to}>
                        <NavLink
                          to={c.to}
                          className={({ isActive }) =>
                            `block px-4 py-2.5 text-sm transition hover:bg-slate-700 ${
                              isActive ? 'bg-brand text-white' : 'text-slate-200'
                            }`
                          }
                        >
                          {c.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {drawerOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={closeDrawer} />
          <aside className="fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-slate-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-slate-700">
              <span className="font-display font-bold text-lg text-white">Menu</span>
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
                <li key={m.to || m.label}>
                  {m.children ? (
                    <>
                      <button
                        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-700 rounded-xl transition"
                        onClick={() => setExpanded(expanded === m.label ? null : m.label)}
                      >
                        {m.label}
                        <span className="text-xs transition-transform duration-200" style={{ transform: expanded === m.label ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
                      </button>
                      {expanded === m.label && (
                        <ul className="ml-4 mt-1 space-y-1 border-l-2 border-slate-600 pl-3">
                          {m.children.map((c) => (
                            <li key={c.to}>
                              <NavLink
                                to={c.to}
                                className={({ isActive }) =>
                                  `block px-4 py-2.5 text-sm rounded-lg transition ${
                                    isActive ? 'bg-brand text-white' : 'text-slate-300 hover:bg-slate-700'
                                  }`
                                }
                                onClick={closeDrawer}
                              >
                                {c.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={m.to}
                      end={m.end}
                      className={({ isActive }) =>
                        `block px-4 py-3 text-sm font-semibold rounded-xl transition ${
                          isActive ? 'bg-brand text-white' : 'text-slate-200 hover:bg-slate-700'
                        }`
                      }
                      onClick={closeDrawer}
                    >
                      {m.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </aside>
        </>
      )}
    </header>
  );
}
