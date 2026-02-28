import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//icons
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

function formatPrice(value) {
  if (!value || value === 0 || value === "0" || value === "") {
    return "Na upit";
  }
  const num = typeof value === "number" ? value : Number(String(value).replace(/[^0-9.-]+/g, ""));
  if (isNaN(num)) return "Na upit";
  try {
    return new Intl.NumberFormat("sr-RS", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0
    }).format(num);
  } catch {
    return num.toLocaleString("sr-RS") + " €";
  }
}

export default function MachineCard({ masina }) {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);

  // Inicijalno stanje favorita
  useEffect(() => {
    if (!masina?.slug) return;
    try {
      const trenutniFavoriti = JSON.parse(localStorage.getItem("omiljeneMasine")) || [];
      setIsFavorited(trenutniFavoriti.includes(masina.slug));
    } catch {
      setIsFavorited(false);
    }
  }, [masina?.slug]);

  if (!masina) {
    return (
      <div className="animate-pulse p-4 bg-white rounded-3xl shadow-sm border border-slate-100">
        <div className="h-48 bg-slate-300 rounded-lg mb-4" />
        <div className="h-4 bg-slate-200 rounded w-3/5 mb-2" />
        <div className="h-4 bg-slate-400 rounded w-2/5" />
      </div>
    );
  }

  const price = formatPrice(masina.cena);
  const titleId = `machine-title-${masina.slug}`;

  const dodajUFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const trenutniFavoriti = JSON.parse(localStorage.getItem("omiljeneMasine")) || [];

      if (!trenutniFavoriti.includes(masina.slug)) {
        // DODAVANJE
        const novi = [...trenutniFavoriti, masina.slug];
        localStorage.setItem("omiljeneMasine", JSON.stringify(novi));
        setIsFavorited(true);
        
        // VRAĆENO NA TVOJU RUTU:
        navigate("/favorite"); 
      } else {
        // UKLANJANJE
        const novi = trenutniFavoriti.filter(s => s !== masina.slug);
        localStorage.setItem("omiljeneMasine", JSON.stringify(novi));
        setIsFavorited(false);
      }
    } catch (err) {
      console.error("Greška pri radu sa localStorage:", err);
    }
  };

  return (
    <article
      role="article"
      aria-labelledby={titleId}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col focus:outline-none focus:ring-4 focus:ring-blue-200"
      tabIndex={0}
    >
      {/* IMAGE AREA */}
      <div className="relative w-full aspect-[4/3] bg-slate-100 flex items-center justify-center overflow-hidden">
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-slate-800 uppercase tracking-widest z-10 shadow-sm">
          {masina.kategorija}
        </div>

        <picture className="z-0 w-full h-full">
          {masina.coverSlikaSmall && (
            <source srcSet={`${masina.coverSlikaSmall} 480w, ${masina.coverSlika} 1024w`} sizes="(max-width:640px) 480px, 800px" />
          )}
          <img
            src={masina.coverSlika}
            alt={masina.naziv}
            decoding="async"
            loading="lazy"
            className="w-full h-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
        </picture>

        {/* Hover quick-actions */}
        <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-2 z-20 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={dodajUFavorite}
            aria-label={isFavorited ? `Ukloni iz favorita` : `Dodaj u favorite`}
            className="group/fav bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-white flex items-center justify-center transition-all duration-300 hover:bg-white active:scale-90"
          >
            {isFavorited ? (
              <MdFavorite className="text-xl text-red-500 transition-all duration-300" />
            ) : (
              <MdFavoriteBorder className="text-xl text-slate-600 transition-all duration-300 group-hover/fav:text-red-500 group-hover/fav:scale-110" />
            )}
          </button>

          
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col gap-4 flex-grow">
        <h2 id={titleId} className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
          {masina.naziv}
        </h2>

        {/* Specifikacije */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Visina</span>
            <span className="text-base font-black text-slate-800">{masina.specifikacije?.visinaDizanja ?? "-"} m</span>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Nosivost</span>
            <span className="text-base font-black text-slate-800">{masina.specifikacije?.nosivost ?? "-"} kg</span>
          </div>
        </div>

        {masina.opis && <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{masina.opis}</p>}

        {/* FOOTER */}
        <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Cena</span>
            <span className="text-xl font-black text-slate-900 tracking-tight">{price}</span>
          </div>

          <Link
            to={`/masina/${masina.slug}`}
            className="group/btn relative inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold overflow-hidden transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30"
          >
            <span className="relative z-10 text-sm">Detalji</span>
            <svg className="w-4 h-4 relative z-10 transform transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out"></div>
          </Link>
        </div>
      </div>
    </article>
  );
}