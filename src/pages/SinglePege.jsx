import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sveMasine } from '../data/sveMasine'; 

function SinglePege() {
  const { slug } = useParams();
  const masina = sveMasine.find((m) => m.slug === slug);

  // State za promenu slike u galeriji
  const [glavnaSlika, setGlavnaSlika] = useState(masina?.coverSlika);

  // Scroll na vrh kada se otvori stranica
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!masina) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="text-6xl mb-4">🚜</div>
        <h1 className="text-4xl font-black text-slate-800 mb-4">Mašina nije pronađena</h1>
        <Link to="/katalog" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
          Vrati se na katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-32 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* BREADCRUMBS */}
        <nav className="mb-8 flex items-center gap-2 text-sm font-bold tracking-wide">
          <Link to="/katalog" className="text-slate-400 hover:text-blue-600 transition-colors">Katalog</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-400 capitalize">{masina.kategorija}</span>
          <span className="text-slate-300">/</span>
          <span className="text-blue-600">{masina.naziv}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEVA STRANA: PREMIUM GALERIJA */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            {/* Glavni prikaz slike */}
            <div className="relative aspect-square bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img 
                src={glavnaSlika} 
                alt={masina.naziv} 
                className="relative z-10 w-full h-full object-contain drop-shadow-2xl transform transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Thumbnail-ovi */}
            <div className="grid grid-cols-4 gap-4">
              {masina.galerija.map((slika, index) => (
                <button 
                  key={index}
                  onClick={() => setGlavnaSlika(slika)}
                  className={`aspect-square bg-white rounded-2xl p-2 border-2 transition-all duration-300 overflow-hidden
                    ${glavnaSlika === slika ? 'border-blue-600 scale-95 shadow-inner' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={slika} alt={`${masina.naziv} ${index}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* DESNA STRANA: PODACI I PRODAJA */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            {/* Glavni Info */}
            <div className="mb-8">
              <span className="inline-block px-4 py-1 bg-blue-50 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] rounded-full mb-4 border border-blue-100">
                Novo u ponudi • 2026
              </span>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">{masina.naziv}</h1>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-blue-600">{masina.cena}</span>
                {masina.cena !== "Na upit" && <span className="text-slate-400 font-bold text-sm">bez PDV-a</span>}
              </div>
            </div>

            <p className="text-lg text-slate-500 leading-relaxed mb-10 font-medium">
              {masina.opis}
            </p>

            {/* TEHNIČKE SPECIFIKACIJE - SADA SA SVIM NOVIM POLJIMA */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm mb-10">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                Tehnički detalji
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10">
                <SpecItem label="Visina dizanja" value={`${masina.specifikacije.visinaDizanja} m`} />
                <SpecItem label="Nosivost" value={`${masina.specifikacije.nosivost} kg`} />
                <SpecItem label="Motor" value={masina.specifikacije.motor} />
                <SpecItem label="Snaga" value={masina.specifikacije.snaga} />
                <SpecItem label="Pogon" value={masina.specifikacije.pogon} />
                <SpecItem label="Upravljanje" value={masina.specifikacije.upravljanje} />
                <SpecItem label="Transmisija" value={masina.specifikacije.tipTransmisije} />
                <SpecItem label="Stanje" value="Novo (Garancija)" />
              </div>
            </div>

            {/* CTA DUGMIĆI */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-[2] bg-slate-900 hover:bg-blue-600 text-white font-black py-5 px-8 rounded-2xl transition-all duration-300 shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 group">
                Zatraži ponudu
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <a href="tel:+38160000000" className="flex-1 bg-white border-2 border-slate-100 hover:border-blue-600 text-slate-900 font-black py-5 px-8 rounded-2xl transition-all duration-300 text-center">
                Pozovi prodaju
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

// Mala pomoćna komponenta za redove u tabeli specifikacija
function SpecItem({ label, value }) {
  return (
    <div className="flex flex-col border-b border-slate-50 pb-2">
      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">{label}</span>
      <span className="text-slate-800 font-extrabold">{value || "/"}</span>
    </div>
  );
}

export default SinglePege;