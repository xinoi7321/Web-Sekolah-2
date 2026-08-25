import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, fileUrl } from '../api/client';
import PageHeader from '../components/PageHeader';

export default function GuruTendik() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/guru-tendik').then(setItems).catch(() => {});
  }, []);

  const kepala = items.filter((i) => i.kategori === 'kepala sekolah');
  const guru = items.filter((i) => i.kategori === 'guru');
  const tendik = items.filter((i) => i.kategori === 'tendik');

  function Grid({ list }) {
    return (
      <div className="staff-grid">
        {list.map((g) => (
          <Link to={`/guru-tendik/${g.id}`} className="staff-card" key={g.id}>
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
    );
  }

  return (
    <div className="page-content">
      <PageHeader title="Guru & Tenaga Kependidikan" subtitle="Pendidik dan tenaga kependidikan sekolah" />
      <div className="container">
        {kepala.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-display font-bold text-slate-800 mb-4">Kepala Sekolah</h2>
            <Grid list={kepala} />
          </section>
        )}
        <section>
          <h2>Guru</h2>
          <Grid list={guru} />
        </section>
        <section>
          <h2>Tenaga Kependidikan</h2>
          <Grid list={tendik} />
        </section>
      </div>
    </div>
  );
}
