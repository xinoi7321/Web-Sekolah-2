import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { api, fileUrl } from '../api/client';

function useInView(options) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];
}

function AnimatedSection({ children, className = '' }) {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function AnimatedNumber({ value, duration = 2000 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [ref, isInView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    const numericValue = parseInt(value.replace(/\D/g, ''), 10) || 0;
    const startTime = Date.now();
    const suffix = value.replace(/[0-9]/g, '');

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easeOut * numericValue);

      setDisplayValue(current + suffix);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function Home() {
  const [profil, setProfil] = useState(null);
  const [statistik, setStatistik] = useState([]);
  const [sambutan, setSambutan] = useState(null);
  const [prestasi, setPrestasi] = useState([]);
  const [berita, setBerita] = useState([]);
  const [ekstrakurikuler, setEkstrakurikuler] = useState([]);
  const [fasilitas, setFasilitas] = useState([]);
  const [guruTendik, setGuruTendik] = useState([]);
  const [programUnggulan, setProgramUnggulan] = useState([]);
  const [komite, setKomite] = useState([]);

  useEffect(() => {
    api.get('/profil-sekolah').then(setProfil).catch(() => {});
    api.get('/statistik').then(setStatistik).catch(() => {});
    api.get('/sambutan').then(setSambutan).catch(() => {});
    api.get('/prestasi').then(setPrestasi).catch(() => {});
    api.get('/berita').then(setBerita).catch(() => {});
    api.get('/ekstrakurikuler').then(setEkstrakurikuler).catch(() => {});
    api.get('/fasilitas').then(setFasilitas).catch(() => {});
    api.get('/guru-tendik').then(setGuruTendik).catch(() => {});
    api.get('/program-unggulan').then(setProgramUnggulan).catch(() => {});
    api.get('/komite').then(setKomite).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero Section */}
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

      {/* Statistik dengan animasi menghitung */}
      {statistik.length > 0 && (
        <AnimatedSection>
          <section className="bg-amber-50/50 border-b border-slate-200">
            <div className="max-w-[1140px] mx-auto px-5 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {statistik.map((s) => (
                <div key={s.id} className="text-center">
                  <p className="text-3xl font-bold text-brand">
                    <AnimatedNumber value={s.nilai} />
                  </p>
                  <p className="text-sm text-slate-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* Sambutan */}
      {sambutan?.aktif && (
        <AnimatedSection>
          <section className="bg-amber-50/50 border border-slate-200 rounded-2xl p-7 my-7 shadow-sm max-w-[1140px] mx-auto">
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
        </AnimatedSection>
      )}

      {/* Berita Terbaru */}
      <AnimatedSection>
        <section className="max-w-[1140px] mx-auto px-5 my-10">
          <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">Berita Terbaru</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {berita.slice(0, 3).map((b) => (
              <Link to={`/berita/${b.id}`} className="clickable-card" key={b.id}>
                {b.foto ? (
                  <img src={fileUrl(b.foto)} alt={b.judul} />
                ) : (
                  <div className="photo-placeholder">{b.judul}</div>
                )}
                <div className="p-4">
                  <h3 className="text-base mb-1">{b.judul}</h3>
                  <p className="text-sm text-slate-500 line-clamp-3">{b.deskripsi}</p>
                </div>
              </Link>
            ))}
          </div>
          {berita.length === 0 && <p className="text-slate-500">Belum ada berita.</p>}
        </section>
      </AnimatedSection>

      {/* Prestasi */}
      <AnimatedSection>
        <section className="max-w-[1140px] mx-auto px-5 my-10">
          <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">Prestasi</h2>
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
      </AnimatedSection>

      {/* Ekstrakurikuler */}
      <AnimatedSection>
        <section className="max-w-[1140px] mx-auto px-5 my-10">
          <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">Ekstrakurikuler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ekstrakurikuler.slice(0, 3).map((e) => (
              <Link to="/ekstrakurikuler" className="clickable-card" key={e.id}>
                {e.thumbnail ? (
                  <img src={fileUrl(e.thumbnail)} alt={e.nama} />
                ) : (
                  <div className="photo-placeholder">{e.nama}</div>
                )}
                <div className="p-4">
                  <h3 className="text-base mb-1">{e.nama}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2">{e.deskripsi}</p>
                </div>
              </Link>
            ))}
          </div>
          {ekstrakurikuler.length === 0 && <p className="text-slate-500">Belum ada data ekstrakurikuler.</p>}
        </section>
      </AnimatedSection>

      {/* Fasilitas */}
      <AnimatedSection>
        <section className="max-w-[1140px] mx-auto px-5 my-10">
          <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">Fasilitas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fasilitas.slice(0, 3).map((f) => (
              <Link to="/fasilitas" className="clickable-card" key={f.id}>
                {f.thumbnail ? (
                  <img src={fileUrl(f.thumbnail)} alt={f.nama} />
                ) : (
                  <div className="photo-placeholder">{f.nama}</div>
                )}
                <div className="p-4">
                  <h3 className="text-base mb-1">{f.nama}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2">{f.deskripsi}</p>
                </div>
              </Link>
            ))}
          </div>
          {fasilitas.length === 0 && <p className="text-slate-500">Belum ada data fasilitas.</p>}
        </section>
      </AnimatedSection>

      {/* Guru & Tendik */}
      <AnimatedSection>
        <section className="max-w-[1140px] mx-auto px-5 my-10">
          <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">Guru & Tenaga Kependidikan</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {guruTendik.slice(0, 4).map((g) => (
              <Link to="/guru-tendik" className="staff-card" key={g.id}>
                {g.foto ? (
                  <img src={fileUrl(g.foto)} alt={g.nama} />
                ) : (
                  <div className="photo-placeholder avatar">{g.nama?.[0]}</div>
                )}
                <h4>{g.nama}</h4>
                <p>{g.jabatan}</p>
              </Link>
            ))}
          </div>
          {guruTendik.length === 0 && <p className="text-slate-500">Belum ada data guru.</p>}
        </section>
      </AnimatedSection>

      {/* Program Unggulan */}
      <AnimatedSection>
        <section className="max-w-[1140px] mx-auto px-5 my-10">
          <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">Program Unggulan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {programUnggulan.slice(0, 2).map((p) => (
              <Link to="/program-unggulan" className="clickable-card" key={p.id}>
                {p.foto && (
                  <img src={fileUrl(p.foto)} alt={p.nama} className="h-48 object-cover w-full" />
                )}
                <div className="p-4">
                  <h3 className="text-base mb-1">{p.nama}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2">{p.deskripsi}</p>
                </div>
              </Link>
            ))}
          </div>
          {programUnggulan.length === 0 && <p className="text-slate-500">Belum ada data program unggulan.</p>}
        </section>
      </AnimatedSection>

      {/* Komite */}
      <AnimatedSection>
        <section className="max-w-[1140px] mx-auto px-5 my-10">
          <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">Komite</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {komite.slice(0, 4).map((k) => (
              <Link to="/komite" className="staff-card" key={k.id}>
                {k.foto ? (
                  <img src={fileUrl(k.foto)} alt={k.nama} />
                ) : (
                  <div className="photo-placeholder avatar">{k.nama?.[0]}</div>
                )}
                <h4>{k.nama}</h4>
                <p>{k.jabatan}</p>
              </Link>
            ))}
          </div>
          {komite.length === 0 && <p className="text-slate-500">Belum ada data komite.</p>}
        </section>
      </AnimatedSection>
    </div>
  );
}
