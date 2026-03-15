import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

function formatPrice(value) {
  if (!value || value === 0 || value === "0" || value === "") {
    return "Na upit";
  }

  const num =
    typeof value === "number"
      ? value
      : Number(String(value).replace(/[^0-9.-]+/g, ""));

  if (isNaN(num)) return "Na upit";

  try {
    return new Intl.NumberFormat("sr-RS", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(num);
  } catch {
    return num.toLocaleString("sr-RS") + " €";
  }
}

export default function MachineCard({ masina }) {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);

  const price = useMemo(() => formatPrice(masina?.cena), [masina?.cena]);
  const titleId = `machine-title-${masina?.slug || "unknown"}`;
  
  // PROVERA KATEGORIJE
  const isMikser = masina?.kategorija === "mini-mikseri";
  const isBager = masina?.kategorija === "mini-bageri";
  const isViljuskar = masina?.kategorija === "viljuskari"; // <-- DODATO
  const isBagerV = masina?.kategorija === "bageri";
  const isDron = masina?.kategorija === "dronovi";
  const isKosilica = masina?.kategorija === "kosilice";

  // DINAMIČKE SPECIFIKACIJE ZA KARTICU
  let spec1Label = "Visina";
  let spec1Value = `${masina?.specifikacije?.visinaDizanja ?? "-"} m`;
  
  let spec2Label = "Nosivost";
  let spec2Value = `${masina?.specifikacije?.nosivost ?? "-"} kg`;

  if (isMikser) {
    spec1Label = "Kapacitet";
    spec1Value = `${masina?.specifikacije?.kapacitetMesanja ?? "-"} m³`;
    spec2Label = "Rezervoar";
    spec2Value = `${masina?.specifikacije?.rezervoarVode ?? "-"}`;
  } else if (isBager) {
    spec1Label = "Dubina kopanja";
    // Podatak u bazi već sadrži "MM" pa ga ispisujemo direktno (npr. "1650MM")
    // Možemo dodati .toLowerCase() da bi izgledalo lepše ("1650mm")
    spec1Value = masina?.specifikacije?.maxDubinaKopanja ? masina.specifikacije.maxDubinaKopanja.toLowerCase() : "-";
    spec2Label = "Visina kopanja";
    spec2Value = `${masina?.specifikacije?.maxVisinaKopanja ?? ""} `;
  }else if (isViljuskar) { // <-- DODATO ZA VILJUŠKARE
    spec1Label = "Max visina";
    spec1Value = `${masina?.specifikacije?.maksVisinaDizanja ?? "-"}`;
    spec2Label = "Nosivost";
    spec2Value = `${masina?.specifikacije?.nosivost ?? "-"}kg`;
  }else if (isBagerV) {
    // --- NOVO PODEŠAVANJE ZA BAGERE (Kašike) ---
    spec1Label = "Max dubina kopanja";
    spec1Value = `${masina?.specifikacije?.maxDubinaKopanja ?? "-"}`;
    spec2Label = "Max visina istovara";
    spec2Value = `${masina?.specifikacije?.maxVisinaIstovara ?? "-"}`;
  }else if (isDron) { // <-- DODATO ZA DRONOVE
    spec1Label = "Rezervoar";
    spec1Value = `${masina?.specifikacije?.kapacitetRezervoara ?? "-"}`;
    spec2Label = "Baterija";
    // Skraćujemo tekst za karticu (brišemo ono u zagradi da dizajn ostane čist)
    let bat = masina?.specifikacije?.baterija ?? "-";
    spec2Value = bat.split(" (")[0]; 
  }else if (isKosilica) {
    // --- NOVO PODEŠAVANJE ZA BAGERE (Kašike) ---
    spec1Label = "Max površina košenja";
    spec1Value = `${masina?.specifikacije?.maksimalnaPovrsina ?? "-"}`;
    spec2Label = "Max širina košenja";
    spec2Value = `${masina?.specifikacije?.sirinaKosenja ?? "-"}`;
  }

  // inicijalno učitavanje favorita
  useEffect(() => {
    if (!masina?.slug) return;

    try {
      const fav =
        JSON.parse(localStorage.getItem("omiljeneMasine")) || [];
      setIsFavorited(fav.includes(masina.slug));
    } catch {
      setIsFavorited(false);
    }
  }, [masina?.slug]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!masina?.slug) return;

    try {
      const fav =
        JSON.parse(localStorage.getItem("omiljeneMasine")) || [];

      let updated;

      if (!fav.includes(masina.slug)) {
        updated = [...fav, masina.slug];
        setIsFavorited(true);
        navigate("/favorite");
      } else {
        updated = fav.filter((s) => s !== masina.slug);
        setIsFavorited(false);
      }

      localStorage.setItem("omiljeneMasine", JSON.stringify(updated));
      window.dispatchEvent(new Event("favoritiPromenjeni"));
    } catch (err) {
      console.error("Greška pri radu sa localStorage:", err);
    }
  };

  if (!masina) {
    return (
      <div className="animate-pulse p-4 bg-white rounded-3xl shadow-sm border border-slate-100">
        <div className="h-40 bg-slate-300 rounded-lg mb-4" />
        <div className="h-4 bg-slate-200 rounded w-3/5 mb-2" />
        <div className="h-4 bg-slate-400 rounded w-2/5" />
      </div>
    );
  }

  return (
    <article
      onClick={() => navigate(`/masina/${masina.slug}`)}
      aria-labelledby={titleId}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col focus:outline-none focus:ring-4 focus:ring-blue-200"
      tabIndex={0}
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-[4/3] bg-slate-100 flex items-center justify-center overflow-hidden">
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-slate-800 uppercase tracking-widest z-10 shadow-sm">
          {masina.kategorija?.replace("-", " ")}
        </div>

        <picture className="z-0 w-full h-full">
          {masina.coverSlikaSmall && (
            <source
              srcSet={`${masina.coverSlikaSmall} 480w, ${masina.coverSlika} 1024w`}
              sizes="(max-width:640px) 480px, 800px"
            />
          )}
          <img
            src={masina.coverSlika || "/placeholder.webp"}
            alt={masina.naziv}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
        </picture>

        {/* FAVORITE BUTTON */}
        <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-300 flex gap-2 z-20 translate-y-2 group-hover:translate-y-0 group-focus:translate-y-0">
          <button
            type="button"
            onClick={toggleFavorite}
            aria-pressed={isFavorited}
            aria-label={
              isFavorited
                ? `Ukloni ${masina.naziv} iz favorita`
                : `Dodaj ${masina.naziv} u favorite`
            }
            className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-white flex items-center justify-center transition-all duration-300 hover:bg-white active:scale-90"
          >
            {isFavorited ? (
              <MdFavorite className="text-xl text-red-500" />
            ) : (
              <MdFavoriteBorder className="text-xl text-slate-600" />
            )}
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col gap-4 flex-grow">
        <h2
          id={titleId}
          className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2"
        >
          {masina.naziv}
        </h2>

        {/* DINAMIČNE SPECIFIKACIJE */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col items-center text-center">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">
              {spec1Label}
            </span>
            <span className="text-base font-black text-slate-800">
              {spec1Value}
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col items-center text-center">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">
              {spec2Label}
            </span>
            <span className="text-base font-black text-slate-800">
              {spec2Value}
            </span>
          </div>
        </div>

        {masina.opis && (
          <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
            {masina.opis}
          </p>
        )}

        {/* FOOTER */}
        <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Cena
            </span>
            <span className="text-xl font-black text-slate-900 tracking-tight">
              {price}
            </span>
          </div>

          <Link
            to={`/masina/${masina.slug}`}
            aria-label={`Pogledaj detalje za ${masina.naziv}`}
            className="group/btn relative inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold overflow-hidden transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30"
          >
            <span className="relative z-10 text-sm">Detalji</span>
            <svg
              className="w-4 h-4 relative z-10 transform transition-transform duration-300 group-hover/btn:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out"></div>
          </Link>
        </div>
      </div>
    </article>
  );
}