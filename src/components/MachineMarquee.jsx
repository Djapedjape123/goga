import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { sveMasine } from '../data/sveMasine';
import { useTranslation } from "react-i18next"; // 👈 IMPORT ZA PREVOD

// Dodat fallbackText argument za prevod "Na upit"
function formatPrice(value, fallbackText) {
  if (!value || value === 0 || value === "0" || value === "") return fallbackText;
  const num = typeof value === "number"
    ? value
    : Number(String(value).replace(/[^0-9.-]+/g, ""));
  if (isNaN(num)) return fallbackText;

  return new Intl.NumberFormat("sr-RS", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(num);
}

const MachineMarquee = ({ currentSlug }) => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // 👈 INICIJALIZACIJA PREVODA

  const nasumicneMasine = useMemo(() => {
    return [...sveMasine]
      .filter(m => m.slug !== currentSlug)
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
  }, [currentSlug]);

  const trackRef = useRef(null);
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

  // --- NOVA MAGIJA ZA SKROLOVANJE (AUTO + PRST) ---
  useEffect(() => {
    if (prefersReducedMotion) return;

    const el = trackRef.current;
    if (!el) return;

    let animationFrameId;

    const scroll = () => {
      if (!paused) {
        el.scrollLeft += 1; 
        
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [paused, prefersReducedMotion]);

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

  // POMOĆNA FUNKCIJA ZA DINAMIČKE SPECIFIKACIJE (Sada sa prevodom)
  const renderSpecifikacije = (masina) => {
    const { kategorija, specifikacije: s } = masina;
    if (!s) return null;

    if (kategorija === "telehenderi" || kategorija === "telehendleri") {
      return (
        <>
          <span>{t('machine_marquee.specs.lifting')} {s.visinaDizanja || s.maksVisinaDizanja || "-"} m</span>
          <span>{t('machine_marquee.specs.load')} {s.nosivost || "-"} kg</span>
        </>
      );
    }
    if (kategorija === "viljuskari") {
      return (
        <>
          <span>{t('machine_marquee.specs.punjenje')} {s.punjenje || "-"}</span>
          <span>{t('machine_marquee.specs.load')} {s.nosivost || "-"} kg</span>
        </>
      );
    }
    if (kategorija === "mini-bageri") {
      return (
        <>
          <span>{t('machine_marquee.specs.digging')} {s.maxDubinaKopanja || "-"}</span>
          <span>{t('machine_marquee.specs.weight')} {s.nosivost || "-"} kg</span>
        </>
      );
    }
    if (kategorija === "bageri") {
      return (
        <>
          <span>{t('machine_marquee.specs.digging')} {s.maxDubinaKopanja || "-"}</span>
          <span>{t('machine_marquee.specs.weight')} {s.operativnaTezina || "-"}</span>
        </>
      );
    }
    if (kategorija === "mini-mikseri") {
      return (
        <>
          <span>{t('machine_marquee.specs.capacity')} {s.kapacitetMesanja || "-"} m³</span>
          <span>{t('machine_marquee.specs.power')} {s.snaga || "-"}</span>
        </>
      );
    }
    if (kategorija === "dronovi") {
      return (
        <>
          <span>{t('machine_marquee.specs.capacity')} {s.kapacitetRezervoara || "-"}</span>
          <span>{t('machine_marquee.specs.navigation')} {s.navigacija ? s.navigacija.split('+')[0].trim() : "-"}</span>
        </>
      );
    }
    if (kategorija === "kosilice") {
      return (
        <>
          <span>{t('machine_marquee.specs.area')} {s.maksimalnaPovrsina || "-"}</span>
          <span>{t('machine_marquee.specs.tilt')} {s.maksNagib || "-"}</span>
        </>
      );
    }
    
    // Default fallback za svaki slučaj
    return (
      <>
        <span>{t('machine_marquee.specs.power')} {s.snagaMotora || s.snaga || "-"}</span>
        <span>{t('machine_marquee.specs.weight')} {s.operativnaTezina || s.tezina || "-"}</span>
      </>
    );
  };

  return (
    <div className="mt-20 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
          <span className="w-2 h-10 bg-orange-600 rounded-full" />
          {t('machine_marquee.title')} {/* 👈 PREVEDENO */}
        </h2>
      </div>

      <div
        className="relative w-full"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)} 
        onTouchEnd={() => setPaused(false)} 
      >
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing"
          style={{
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none', 
          }}
        >
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {items.map((m, index) => {
            const price = formatPrice(m.cena, t('machine_marquee.price_on_request')); // 👈 PREVEDENO
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
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 pointer-events-none"
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

                    <div className="flex justify-between text-xs sm:text-sm font-semibold text-slate-700 bg-slate-50 rounded-xl px-3 py-2">
                      {renderSpecifikacije(m)}
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-lg font-bold text-slate-900">
                        {price}
                      </span>

                      <Link
                        to={`/masina/${m.slug}`}
                        className="text-sm font-bold bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                      >
                        {t('machine_marquee.btn_details')} {/* 👈 PREVEDENO */}
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