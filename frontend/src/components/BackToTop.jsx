import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 300);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-5 right-5 z-[100] w-11 h-11 rounded-full bg-brand text-white shadow-lg border-0 cursor-pointer flex items-center justify-center text-lg hover:brightness-110 transition md:bottom-6 md:right-6"
      aria-label="Kembali ke atas"
    >
      ↑
    </button>
  );
}
