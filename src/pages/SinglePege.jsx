import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { sveMasine } from '../data/sveMasine';
import MachineMarquee from '../components/MachineMarquee';

// Pomoćna funkcija za formatiranje ključeva iz baze
const formatKey = (key) => {
  const result = key.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

function SinglePege() {
  const { slug } = useParams();
  const masina = sveMasine.find((m) => m.slug === slug);

  const [glavnaSlika, setGlavnaSlika] = useState(null);
  
  // --- STATE ZA MODAL I FORMU ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (masina) setGlavnaSlika(masina.coverSlika);
  }, [slug, masina]);

  // --- LOGIKA ZA SLANJE FORME ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    const formData = new FormData(e.target);
    // Automatski dodajemo ime mašine u naslov mejla!
    formData.append('_subject', `Novi upit za mašinu: ${masina.naziv}`);
    formData.append('_captcha', 'false');

    try {
      // Šaljemo na Goranov mail
      const response = await fetch("https://formsubmit.co/vidovicgoran@masine.ai", {
        method: "POST",
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      if (response.ok) {
        setStatusMessage('uspeh');
        e.target.reset(); // Čistimo formu
        
        // Zatvaramo modal automatski posle 3 sekunde
        setTimeout(() => {
          setIsModalOpen(false);
          setStatusMessage('');
        }, 3000);
      } else {
        setStatusMessage('greska');
      }
    } catch (error) {
      console.error(error);
      setStatusMessage('greska');
    } finally {
      setIsSubmitting(false);
      // Sklanjamo poruku o grešci posle 5 sekundi
      if (statusMessage === 'greska') {
        setTimeout(() => setStatusMessage(''), 5000);
      }
    }
  };

  if (!masina) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="text-6xl mb-4 text-slate-300">🚜</div>
        <h1 className="text-4xl font-black text-slate-800 mb-4">Mašina nije pronađena</h1>
        <Link to="/katalog" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
          Vrati se na katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-200 pt-32 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">

        {/* BREADCRUMBS */}
        <nav className="mb-8 flex items-center gap-2 text-sm font-bold tracking-wide">
          <Link to="/katalog" className="text-slate-400 hover:text-blue-600 transition-colors">Katalog</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-400 capitalize">{masina.kategorija.replace("-", " ")}</span>
          <span className="text-slate-300">/</span>
          <span className="text-blue-600">{masina.naziv}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEVA STRANA: GALERIJA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="relative aspect-square bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img
                src={glavnaSlika}
                alt={masina.naziv}
                className="relative z-10 w-full h-full object-contain drop-shadow-2xl transform transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {masina.galerija?.length > 0 ? (
                masina.galerija.map((slika, index) => (
                  <button
                    key={index}
                    onClick={() => setGlavnaSlika(slika)}
                    className={`aspect-square bg-white rounded-2xl p-2 border-2 transition-all duration-300 overflow-hidden
        ${glavnaSlika === slika ? 'border-blue-600 scale-95 shadow-inner' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img
                      src={slika || "/placeholder.webp"}
                      alt={`${masina.naziv} ${index}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))
              ) : (
                <div className="text-slate-400 text-sm col-span-4">
                  Nema dodatnih slika.
                </div>
              )}
            </div>
          </motion.div>

          {/* DESNA STRANA: PODACI */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
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

            <p className="text-lg text-slate-500 leading-relaxed mb-10 font-medium italic border-l-4 border-blue-100 pl-4">
              {masina.opis}
            </p>

            {/* DINAMIČKE TEHNIČKE SPECIFIKACIJE */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm mb-10">
              <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                Tehnički detalji
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                {Object.entries(masina.specifikacije || {}).map(([key, value]) => {
                  if (value == null) return null;
                  return (
                    <SpecItem
                      key={key}
                      label={formatKey(key)}
                      value={value}
                      unit={key === 'visinaDizanja' ? 'm' : key === 'nosivost' ? 'kg' : key === 'kapacitetMesanja' ? 'm³' : ''}
                    />
                  );
                })}
                <SpecItem label="Stanje" value="Novo (Garancija)" />
              </div>
            </div>

            {/* CTA DUGMIĆI */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* OTVARA MODAL NA KLIK */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex-[2] bg-slate-900 hover:bg-blue-600 text-white font-black py-5 px-8 rounded-2xl transition-all duration-300 shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 group"
              >
                Zatraži ponudu
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <a href="tel:+381640000000" className="flex-1 bg-white border-2 border-slate-100 hover:border-blue-600 text-slate-900 font-black py-5 px-8 rounded-2xl transition-all duration-300 text-center flex items-center justify-center">
                Pozovi prodaju
              </a>
            </div>
          </motion.div>

        </div>
        <MachineMarquee currentSlug={masina.slug} />
      </div>

      {/* --- MODAL ZA FORMU --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Zatamnjena pozadina */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            ></motion.div>

            {/* Sadržaj Modala - POPRAVLJENO ZA MOBILNI */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-[2rem] p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10"
            >
              {/* X dugme za zatvaranje */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition-colors bg-slate-100 hover:bg-slate-200 p-2 rounded-full z-20"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-900">Zatraži ponudu</h3>
                <p className="text-slate-500 font-medium mt-1">Za mašinu: <span className="text-blue-600 font-bold">{masina.naziv}</span></p>
              </div>

              {/* Poruke o statusu */}
              {statusMessage === 'uspeh' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3 font-bold">
                  <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Upit je uspešno poslat!
                </div>
              )}
              {statusMessage === 'greska' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-bold">
                  Došlo je do greške. Pokušajte ponovo kasnije.
                </div>
              )}

              {/* Sama Forma */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-slate-700 text-sm font-bold mb-1 ml-1 block">Ime Firme / Osobe</label>
                  <input 
                    type="text" 
                    name="Ime" 
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Unesite naziv"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-slate-700 text-sm font-bold mb-1 ml-1 block">Email</label>
                    <input 
                      type="email" 
                      name="Email" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="vas@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 text-sm font-bold mb-1 ml-1 block">Telefon</label>
                    <input 
                      type="tel" 
                      name="Telefon" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="06x xxx xxxx"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-700 text-sm font-bold mb-1 ml-1 block">Dodatna poruka (Opciono)</label>
                  <textarea 
                    name="Poruka"
                    rows="3"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                    placeholder="Npr. Zanima me rok isporuke..."
                  ></textarea>
                </div>

                <button 
                  disabled={isSubmitting || statusMessage === 'uspeh'} 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Šaljem...' : 'Pošalji Upit'}
                </button>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Poboljšana pomoćna komponenta za specifikacije
function SpecItem({ label, value, unit }) {
  return (
    <div className="flex flex-col border-b border-slate-50 pb-2 group/spec transition-colors hover:border-blue-100">
      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1 group-hover/spec:text-blue-400 transition-colors">
        {label}
      </span>
      <span className="text-slate-800 font-extrabold flex gap-1">
        {value} <span className="text-blue-600/50">{unit}</span>
      </span>
    </div>
  );
}

export default SinglePege;