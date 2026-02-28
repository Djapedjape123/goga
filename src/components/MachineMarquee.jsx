import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { sveMasine } from '../data/sveMasine';

function formatPrice(value) {
  if (!value || value === 0 || value === "0" || value === "") return "Na upit";
  const num = typeof value === "number"
    ? value
    : Number(String(value).replace(/[^0-9.-]+/g, ""));
  if (isNaN(num)) return "Na upit";

  return new Intl.NumberFormat("sr-RS", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(num);
}

const MachineMarquee = ({ currentSlug }) => {

  const navigate = useNavigate();

  const nasumicneMasine = useMemo(() => {
    return [...sveMasine]
      .filter(m => m.slug !== currentSlug)
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
  }, [currentSlug]);

  const trackRef = useRef(null);
  const [duration, setDuration] = useState(45);
  const [paused, setPaused] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("omiljeneMasine")) || [];
    setFavorites(stored);
  }, []);

  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  useEffect(() => {
    if (prefersReducedMotion) return setDuration(0);

    const el = trackRef.current;
    if (!el) return;

    const fullWidth = el.scrollWidth / 2 || 0;
    const speedPxPerSec = 55;
    const calc = Math.max(20, Math.min(90, Math.round(fullWidth / speedPxPerSec)));
    setDuration(calc);

    const onResize = () => {
      const w = el.scrollWidth / 2 || 0;
      const newDur = Math.max(20, Math.min(120, Math.round(w / speedPxPerSec)));
      setDuration(newDur);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);

  }, [nasumicneMasine, prefersReducedMotion]);

  const toggleFavorite = (slug, e) => {
    e.preventDefault();
    e.stopPropagation();

    let updated;

    if (!favorites.includes(slug)) {
      updated = [...favorites, slug];
      navigate("/favorite");
    } else {
      updated = favorites.filter(s => s !== slug);
    }

    localStorage.setItem("omiljeneMasine", JSON.stringify(updated));
    setFavorites(updated);
  };

  const items = [...nasumicneMasine, ...nasumicneMasine];

  return (
    <div className="mt-20 pb-20 overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 mb-10">
        <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
          <span className="w-2 h-10 bg-orange-600 rounded-full" />
          Još mašina
        </h2>
      </div>

      <div
        className="relative flex overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div
          ref={trackRef}
          className="flex gap-6 whitespace-nowrap will-change-transform"
          style={
            prefersReducedMotion || duration === 0
              ? { transform: 'none' }
              : {
                animationName: 'marquee',
                animationDuration: `${duration}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationPlayState: paused ? 'paused' : 'running',
              }
          }
        >
          {items.map((m, index) => {
            const price = formatPrice(m.cena);
            const isFav = favorites.includes(m.slug);

            return (
              <div
                key={`${m.slug}-${index}`}
                className="w-[300px] flex-shrink-0"
              >
                <article className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">

                  {/* IMAGE */}
                  <div className="relative w-full aspect-[16/9] bg-slate-100 overflow-hidden">
                    <img
                      src={m.coverSlika}
                      alt={m.naziv}
                      loading="lazy"
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />

                    <button
                      onClick={(e) => toggleFavorite(m.slug, e)}
                      className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-md hover:scale-110 transition"
                    >
                      {isFav ? (
                        <MdFavorite className="text-red-500 text-lg" />
                      ) : (
                        <MdFavoriteBorder className="text-slate-600 text-lg" />
                      )}
                    </button>
                  </div>

                  {/* CONTENT */}
                  <div className="p-4 flex flex-col gap-3 flex-grow">

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2 leading-snug">
                      {m.naziv}
                    </h3>

                    <div className="flex justify-between text-sm font-semibold text-slate-700 bg-slate-50 rounded-xl px-3 py-2">
                      <span>{m.specifikacije?.visinaDizanja ?? "-"} m</span>
                      <span>{m.specifikacije?.nosivost ?? "-"} kg</span>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-lg font-bold text-slate-900">
                        {price}
                      </span>

                      <Link
                        to={`/masina/${m.slug}`}
                        className="text-sm font-bold bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                      >
                        Detalji
                      </Link>
                    </div>

                  </div>
                </article>
              </div>
            );
          })}
          
        </div>
      </div>
    </div>
  );
};

export default MachineMarquee;