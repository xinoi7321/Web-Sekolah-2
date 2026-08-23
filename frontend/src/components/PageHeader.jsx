export default function PageHeader({ title, subtitle }) {
  return (
    <div className="relative overflow-hidden bg-brand-gradient text-white py-14 px-5 mb-2 rounded-b-3xl">
      <div className="absolute bg-white/10 blur-3xl rounded-full w-72 h-72 -top-20 -right-10"></div>
      <div className="absolute bg-white/10 blur-3xl rounded-full w-56 h-56 -bottom-24 -left-12"></div>
      <div className="relative z-10 max-w-[1140px] mx-auto px-5">
        <h1 className="text-white text-4xl mb-2 drop-shadow-md font-display">{title}</h1>
        {subtitle && <p className="text-white/90 m-0 text-[1.05rem] max-w-[640px]">{subtitle}</p>}
      </div>
    </div>
  );
}
