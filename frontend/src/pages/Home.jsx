import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { api, fileUrl } from '../api/client';

function useInView(options) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
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
  const [ref, isInView] = useInView({ threshold: 0.08 });
  return (
    <div
      ref={ref}
      className={`will-change-transform opacity-0 translate-y-6 transition-all duration-700 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : ''
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
    if (value === undefined || value === null) return;

    const strValue = String(value);
    const numericValue = parseInt(strValue.replace(/\D/g, ''), 10) || 0;
    const startTime = Date.now();
    const suffix = strValue.replace(/[0-9]/g, '');

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

function BackgroundSlideshow({ images }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images]);

  if (!images || images.length === 0) return null;

  const current = images[index];

  return (
    <div className="absolute inset-0">
      {images.map((img, i) => (
        <div
          key={img.id || i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${i === index ? 'slide-zoom' : ''}`}
          style={{
            backgroundImage: `url(${fileUrl(img.url)})`,
            opacity: i === index ? 1 : 0,
            zIndex: i === index ? 1 : 0,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black/40" style={{ zIndex: 2 }} />
    </div>
  );
}

function SectionDivider({ dividerKey, dividers }) {
  const url = dividers[dividerKey];
  if (!url) return null;
  return (
    <div className="w-full">
      <img
        src={fileUrl(url)}
        alt=""
        className="w-full h-auto max-h-40 object-contain mx-auto"
        loading="lazy"
      />
    </div>
  );
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
  const [dividers, setDividers] = useState({});
  const [slideshow, setSlideshow] = useState([]);
  const kategoriOrder = { 'kepala sekolah': 1, 'guru': 2, 'tendik': 3 };
  const sortedGuruTendik = [...guruTendik].sort((a, b) => (kategoriOrder[a.kategori] || 99) - (kategoriOrder[b.kategori] || 99));

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
    api.get('/section-dividers').then(setDividers).catch(() => {});
    api.get('/background-slideshow').then(setSlideshow).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white py-20 px-5 text-center shadow-soft" style={{
        backgroundColor: '#0f172a',
      }}>
        <BackgroundSlideshow images={slideshow} />
        {slideshow.length === 0 && profil?.background && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${fileUrl(profil.background)})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
        )}
        {slideshow.length === 0 && !profil?.background && (
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

      <SectionDivider dividerKey="hero_statistik" dividers={dividers} />

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

      <SectionDivider dividerKey="statistik_sambutan" dividers={dividers} />

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

      <SectionDivider dividerKey="sambutan_berita" dividers={dividers} />

      {/* Berita Terbaru */}
      <AnimatedSection>
        <section className="max-w-[1140px] mx-auto px-5 my-10">
          <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">Berita Terbaru</h2>
          <div className="flex flex-row gap-6 overflow-x-auto pb-4">
            {berita.map((b) => (
              <Link to={`/berita/${b.id}`} className="clickable-card flex-shrink-0 w-72" key={b.id}>
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

      <SectionDivider dividerKey="berita_prestasi" dividers={dividers} />

      {/* Prestasi */}
      <AnimatedSection>
        <section className="max-w-[1140px] mx-auto px-5 my-10">
          <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">Prestasi</h2>
          <div className="flex flex-row gap-6 overflow-x-auto pb-4">
            {prestasi.map((p) => (
              <Link to="/prestasi" className="clickable-card flex-shrink-0 w-72" key={p.id}>
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

      <SectionDivider dividerKey="prestasi_ekstrakurikuler" dividers={dividers} />

      {/* Ekstrakurikuler */}
      <AnimatedSection>
        <section className="max-w-[1140px] mx-auto px-5 my-10">
          <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">Ekstrakurikuler</h2>
          <div className="flex flex-row gap-6 overflow-x-auto pb-4">
            {ekstrakurikuler.map((e) => (
              <Link to="/ekstrakurikuler" className="clickable-card flex-shrink-0 w-72" key={e.id}>
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

      <SectionDivider dividerKey="ekstrakurikuler_fasilitas" dividers={dividers} />

      {/* Fasilitas */}
      <AnimatedSection>
        <section className="max-w-[1140px] mx-auto px-5 my-10">
          <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">Fasilitas</h2>
          <div className="flex flex-row gap-6 overflow-x-auto pb-4">
            {fasilitas.map((f) => (
              <Link to="/fasilitas" className="clickable-card flex-shrink-0 w-72" key={f.id}>
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

      <SectionDivider dividerKey="fasilitas_guru" dividers={dividers} />

      {/* Guru & Tendik */}
      <AnimatedSection>
        <section className="max-w-[1140px] mx-auto px-5 my-10">
          <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">Kepala Sekolah, Guru dan Tendik</h2>
          <div className="flex flex-row gap-6 overflow-x-auto pb-4">
            {sortedGuruTendik.map((g) => (
              <Link to={`/guru-tendik/${g.id}`} className="staff-card flex-shrink-0 w-40" key={g.id}>
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

      <SectionDivider dividerKey="guru_program" dividers={dividers} />

      {/* Program Unggulan */}
      <AnimatedSection>
        <section className="max-w-[1140px] mx-auto px-5 my-10">
          <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">Program Unggulan</h2>
          <div className="flex flex-row gap-6 overflow-x-auto pb-4">
            {programUnggulan.map((p) => (
              <Link to="/program-unggulan" className="clickable-card flex-shrink-0 w-72" key={p.id}>
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

      <SectionDivider dividerKey="program_komite" dividers={dividers} />

      {/* Komite */}
      <AnimatedSection>
        <section className="max-w-[1140px] mx-auto px-5 my-10">
          <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">Komite</h2>
          <div className="flex flex-row gap-6 overflow-x-auto pb-4">
            {komite.map((k) => (
              <Link to="/komite" className="staff-card flex-shrink-0 w-40" key={k.id}>
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

      <SectionDivider dividerKey="komite_maps" dividers={dividers} />

      {/* Maps */}
      {profil?.maps && (
        <AnimatedSection>
          <section className="max-w-[1140px] mx-auto px-5 my-10">
            <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">Lokasi Sekolah</h2>
            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200">
              <iframe
                src={profil.maps}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Lokasi Sekolah"
              />
            </div>
          </section>
        </AnimatedSection>
      )}
    </div>
  );
}
