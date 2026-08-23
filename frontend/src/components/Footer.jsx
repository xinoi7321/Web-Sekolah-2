export default function Footer() {
  return (
    <footer className="text-center text-white bg-brand-gradient py-10 px-4 mt-14 rounded-t-3xl">
      <div className="flex gap-5 justify-center flex-wrap mt-4 mb-2">
        <a href="/profil" className="opacity-95 font-medium transition hover:opacity-100 hover:underline">Profil</a>
        <a href="/ekstrakurikuler" className="opacity-95 font-medium transition hover:opacity-100 hover:underline">Ekstrakurikuler</a>
        <a href="/fasilitas" className="opacity-95 font-medium transition hover:opacity-100 hover:underline">Fasilitas</a>
        <a href="/guru-tendik" className="opacity-95 font-medium transition hover:opacity-100 hover:underline">Guru & Tendik</a>
      </div>
      <p className="my-1 opacity-95">&copy; {new Date().getFullYear()} Website Sekolah. Dikelola melalui panel admin.</p>
      <a href="/admin/login" className="inline-block mt-1 text-white bg-white/20 px-4 py-1.5 rounded-full font-semibold transition hover:bg-white/30">Login Admin</a>
    </footer>
  );
}
