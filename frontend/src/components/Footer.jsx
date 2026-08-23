export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/profil">Profil</a>
        <a href="/ekstrakurikuler">Ekstrakurikuler</a>
        <a href="/fasilitas">Fasilitas</a>
        <a href="/guru-tendik">Guru & Tendik</a>
      </div>
      <p>&copy; {new Date().getFullYear()} Website Sekolah. Dikelola melalui panel admin.</p>
      <a href="/admin/login" className="admin-link">Login Admin</a>
    </footer>
  );
}
