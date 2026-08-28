import { NavLink } from 'react-router-dom';

export default function AdminDashboard() {
  const cards = [
    { to: '/admin/profil-sekolah', label: 'Identitas & Profil', icon: '🏫' },
    { to: '/admin/sambutan', label: 'Sambutan Kepsek', icon: '👋' },
    { to: '/admin/statistik', label: 'Statistik', icon: '📊' },
    { to: '/admin/prestasi', label: 'Prestasi', icon: '🏆' },
    { to: '/admin/ekstrakurikuler', label: 'Ekstrakurikuler', icon: '🎯' },
    { to: '/admin/fasilitas', label: 'Fasilitas', icon: '🏫' },
    { to: '/admin/guru-tendik', label: 'Guru & Tendik', icon: '👩‍🏫' },
    { to: '/admin/misi-struktur', label: 'Misi & Struktur', icon: '📋' },
    { to: '/admin/sosial-media', label: 'Sosial Media', icon: '📱' },
    { to: '/admin/tata-tertib', label: 'Tata Tertib', icon: '📜' },
    { to: '/admin/program-unggulan', label: 'Program Unggulan', icon: '⭐' },
    { to: '/admin/komite', label: 'Komite', icon: '🤝' },
    { to: '/admin/background-slideshow', label: 'Background Slideshow', icon: '🖼️' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-slate-800 mb-1">Selamat datang di Panel Admin</h1>
      <p className="text-slate-500 mb-6">Pilih menu di bawah untuk mengelola konten website sekolah:</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <NavLink
            key={c.to}
            to={c.to}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:-translate-y-1 transition duration-300 flex flex-col items-center gap-3 text-center"
          >
            <span className="text-3xl">{c.icon}</span>
            <span className="font-semibold text-slate-700 text-sm">{c.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
