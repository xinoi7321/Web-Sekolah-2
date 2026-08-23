export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Website Sekolah. Dikelola melalui panel admin.</p>
      <a href="/admin/login" className="admin-link">Login Admin</a>
    </footer>
  );
}
