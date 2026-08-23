import { useEffect, useState } from 'react';
import { api, fileUrl } from '../api/client';

export default function GuruTendik() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/guru-tendik').then(setItems).catch(() => {});
  }, []);

  const guru = items.filter((i) => i.kategori === 'guru');
  const tendik = items.filter((i) => i.kategori !== 'guru');

  function Grid({ list }) {
    return (
      <div className="staff-grid">
        {list.map((g) => (
          <div className="staff-card" key={g.id}>
            {g.foto ? (
              <img src={fileUrl(g.foto)} alt={g.nama} />
            ) : (
              <div className="photo-placeholder avatar">{g.nama?.[0]}</div>
            )}
            <h4>{g.nama}</h4>
            <p>{g.jabatan}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Guru & Tenaga Kependidikan</h1>
      <section>
        <h2>Guru</h2>
        <Grid list={guru} />
      </section>
      <section>
        <h2>Tenaga Kependidikan</h2>
        <Grid list={tendik} />
      </section>
    </div>
  );
}
