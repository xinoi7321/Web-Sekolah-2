import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, fileUrl } from '../api/client';
import PageHeader from '../components/PageHeader';

export default function Home() {
  const [profil, setProfil] = useState(null);
  const [statistik, setStatistik] = useState([]);
  const [sambutan, setSambutan] = useState(null);
  const [prestasi, setPrestasi] = useState([]);

  useEffect(() => {
    api.get('/profil-sekolah').then(setProfil).catch(() => {});
    api.get('/statistik').then(setStatistik).catch(() => {});
    api.get('/sambutan').then(setSambutan).catch(() => {});
    api.get('/prestasi').then(setPrestasi).catch(() => {});
  }, []);

  const tahunAjaran = statistik.find((s) => /tahun ajaran|ajaran/i.test(s.label));
  const siswa = statistik.find((s) => /siswa|peserta didik/i.test(s.label));
  const guru = statistik.find((s) => /guru|pendidik|tendik/i.test(s.label));
  const kelas = statistik.find((s) => /kelas|rombel/i.test(s.label));

  return (
    <div>
      <section className="relative overflow-hidden text-white py-16 px-5 text-center shadow-soft" style={{
        backgroundImage: profil?.background ? `url(${fileUrl(profil.background)})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#dc2626',
      }}>
        {!profil?.background && (
          <>
            <div className="absolute bg-white/10 blur-3xl rounded-full w-56 h-56 -top-20 -left-10"></div>
            <div className="absolute bg-white/10 blur-3xl rounded-full w-48 h-48 -bottom-16 -right-10"></div>
          </>
        )}
        <div className="relative z-10 max-w-[1140px] mx-auto">
          {profil?.logo && (
            <img
              src={fileUrl(profil.logo)}
              alt="Logo sekolah"
              className="relative z-10 w-20 h-20 object-contain bg-white rounded-2xl p-2 shadow-lg mx-auto mb-4"
            />
          )}
          <h1 className="relative z-10 text-white text-4xl sm:text-5xl mb-2 drop-shadow-md font-display">
            {profil?.nama_sekolah || 'Nama Sekolah'}
          </h1>
          <p className="relative z-10 text-white/90 mb-6 text-[1.05rem]">{profil?.alamat}</p>
          <Link to="/profil" className="btn">Pelajari Profil</Link>
        </div>
      </section>

      {(tahunAjaran || siswa || guru || kelas) && (
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-[1140px] mx-auto px-5 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {tahunAjaran && (
              <div className="text-center">
                <p className="text-2xl font-bold text-brand">{tahunAjaran.nilai}</p>
                <p className="text-sm text-slate-500">{tahunAjaran.label}</p>
              </div>
            )}
            {siswa && (
              <div className="text-center">
                <p className="text-2xl font-bold text-brand">{siswa.nilai}</p>
                <p className="text-sm text-slate-500">{siswa.label}</p>
              </div>
            )}
            {guru && (
              <div className="text-center">
                <p className="text-2xl font-bold text-brand">{guru.nilai}</p>
                <p className="text-sm text-slate-500">{guru.label}</p>
              </div>
            )}
            {kelas && (
              <div className="text-center">
                <p className="text-2xl font-bold text-brand">{kelas.nilai}</p>
                <p className="text-sm text-slate-500">{kelas.label}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {sambutan?.aktif && (
        <section className="bg-white border border-slate-200 rounded-2xl p-7 my-7 shadow-sm max-w-[1140px] mx-auto">
          <h2 className="text-2xl font-display font-bold text-slate-800 mb-4">Sambutan Kepala Sekolah</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-48 flex-shrink-0">
              {sambutan.foto ? (
                <img src={fileUrl(sambutan.foto)} alt={sambutan.nama_kepala_sekolah} className="w-full rounded-2xl object-cover aspect-[3/4] shadow-sm" />
              ) : (
                <div className="photo-placeholder avatar w-32 h-32 mx-auto md:mx-0">Foto</div>
              )}
              <h3 className="text-center md:text-left mt-2 font-bold">{sambutan.nama_kepala_sekolah}</h3>
              <p className="text-center md:text-left text-sm text-slate-500">{sambutan.jabatan}</p>
            </div>
            <div className="flex-1">
              <p className="text-slate-600 leading-relaxed line-clamp-6">
                {sambutan.teks?.slice(0, 400)}{sambutan.teks?.length > 400 ? '…' : ''}
              </p>
              <Link to="/sambutan" className="btn mt-4 inline-block">Baca selengkapnya</Link>
            </div>
          </div>
        </section>
      )}

      <section className="max-w-[1140px] mx-auto px-5 my-10">
        <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">Prestasi Terbaru</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prestasi.slice(0, 3).map((p) => (
            <Link to="/prestasi" className="clickable-card" key={p.id}>
              {p.foto ? (
                <img src={fileUrl(p.foto)} alt={p.judul} />
              ) : (
                <div className="photo-placeholder">{p.judul}</div>
              )}
              <div className="p-4">
                <h3 className="text-base mb-1">{p.judul}</h3>
                <p className="text-sm text-slate-500">{p.tingkat} {p.tingkat && p.tahun ? '·' : ''} {p.tahun}</p>
              </div>
            </Link>
          ))}
        </div>
        {prestasi.length === 0 && <p className="text-slate-500">Belum ada data prestasi.</p>}
      </section>

      <section className="max-w-[1140px] mx-auto px-5 my-10">
        <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">Menu Cepat</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <Link to="/prestasi" className="quick-card">
            <span className="quick-icon bg-accent-gradient">🏆</span>
            Prestasi
          </Link>
          <Link to="/ekstrakurikuler" className="quick-card">
            <span className="quick-icon bg-[linear-gradient(135deg,#dc2626,#f97316)]">🎯</span>
            Ekstrakurikuler
          </Link>
          <Link to="/fasilitas" className="quick-card">
            <span className="quick-icon bg-[linear-gradient(135deg,#ea580c,#f59e0b)]">🏫</span>
            Fasilitas
          </Link>
          <Link to="/guru-tendik" className="quick-card">
            <span className="quick-icon bg-[linear-gradient(135deg,#f97316,#dc2626)]">👩‍🏫</span>
            Guru & Tendik
          </Link>
          <Link to="/program-unggulan" className="quick-card">
            <span className="quick-icon bg-[linear-gradient(135deg,#ef4444,#f97316)]">⭐</span>
            Program Unggulan
          </Link>
          <Link to="/tata-tertib" className="quick-card">
            <span className="quick-icon bg-[linear-gradient(135deg,#dc2626,#ea580c)]">📋</span>
            Tata Tertib
          </Link>
          <Link to="/komite" className="quick-card">
            <span className="quick-icon bg-[linear-gradient(135deg,#f59e0b,#dc2626)]">🤝</span>
            Komite
          </Link>
          <Link to="/profil" className="quick-card">
            <span className="quick-icon bg-[linear-gradient(135deg,#f97316,#f59e0b)]">📞</span>
            Kontak
          </Link>
          <Link to="/maps" className="quick-card">
            <span className="quick-icon bg-[linear-gradient(135deg,#ea580c,#ef4444)]">📍</span>
            Maps
          </Link>
          <Link to="/logo-resmi" className="quick-card">
            <span className="quick-icon bg-[linear-gradient(135deg,#dc2626,#f97316)]">🖼️</span>
            Logo Resmi
          </Link>
        </div>
      </section>
    </div>
  );
}
