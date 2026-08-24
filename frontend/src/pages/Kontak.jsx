export default function Kontak() {
  return (
    <div className="page-content">
      <div className="relative overflow-hidden bg-brand-gradient text-white py-14 px-5 mb-2 rounded-b-3xl">
        <div className="absolute bg-white/10 blur-3xl rounded-full w-72 h-72 -top-20 -right-10"></div>
        <div className="absolute bg-white/10 blur-3xl rounded-full w-56 h-56 -bottom-24 -left-12"></div>
        <div className="relative z-10 max-w-[1140px] mx-auto px-5">
          <h1 className="text-white text-4xl mb-2 drop-shadow-md font-display">Kontak</h1>
          <p className="text-white/90 m-0 text-[1.05rem] max-w-[640px]">Hubungi kami untuk informasi lebih lanjut</p>
        </div>
      </div>
      <div className="container">
        <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
          <p className="mb-2"><strong>Alamat:</strong> Jl. Pendidikan No. 17, Kecamatan Sukamaju</p>
          <p className="mb-2"><strong>Telepon:</strong> (021) 123-4567</p>
          <p className="mb-2"><strong>Email:</strong> info@sekolah.sch.id</p>
          <p><strong>Jam Operasional:</strong> Senin - Jumat, 07:00 - 15:00 WIB</p>
        </div>
      </div>
    </div>
  );
}
