import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sveMasine } from '../data/sveMasine'; // Putanja do tvoje baze
import MachineCard from '../components/MachineCard'; // Putanja do tvoje kartice

function FavoritePege() {
  const [omiljeneMasine, setOmiljeneMasine] = useState([]);

  useEffect(() => {
    // 1. Čitamo slug-ove iz memorije pretraživača kada se stranica učita
    const snimljeniFavoriti = JSON.parse(localStorage.getItem('omiljeneMasine')) || [];
    
    // 2. Filtriramo našu glavnu bazu: ostavljamo samo mašine čiji je slug u memoriji
    const filtrirane = sveMasine.filter(masina => snimljeniFavoriti.includes(masina.slug));
    
    // 3. Stavljamo ih u state kako bi se prikazale na ekranu
    setOmiljeneMasine(filtrirane);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/80 via-white to-slate-50 pt-32 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SEKCIJA SA ANIMACIJOM */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1.5 px-5 rounded-full bg-white/60 border border-red-100 text-red-500 text-xs font-black tracking-widest uppercase backdrop-blur-sm shadow-sm mb-4">
            Tvoja kolekcija
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
            Sačuvane <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">Mašine</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-light">
            Sve mašine koje si dodao u favorite nalaze se ovde. Spreman za sledeći korak?
          </p>
        </motion.div>

        {/* AKO IMA OMILJENIH MAŠINA -> PRIKAŽI GRID */}
        {omiljeneMasine.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 auto-rows-fr"
          >
            {omiljeneMasine.map((masina) => (
              <div 
                key={masina.id} 
                className="relative group/card flex transform transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.01]"
              >
                {/* Glow efekat ispod kartice */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-pink-500/20 rounded-[2rem] blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 ease-out pointer-events-none"></div>
                
                <div className="relative w-full h-full flex flex-col [&>article]:h-full [&>article]:w-full">
                  <MachineCard masina={masina} />
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          /* AKO NEMA OMILJENIH MAŠINA -> PRIKAŽI PRAZAN EKRAN (EMPTY STATE) */
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center text-center py-24 px-4 bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-3xl mx-auto mt-8"
          >
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-white">
              <span className="text-5xl drop-shadow-sm">💔</span>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">Tvoja lista je prazna</h3>
            <p className="text-slate-500 mb-8 max-w-md text-lg leading-relaxed">
              Još uvek nisi dodao nijednu mašinu u favorite. Istraži naš katalog i pronađi savršenu opremu za svoj projekat.
            </p>
            
            <Link 
              to="/katalog" // OBAVEZNO: Podesi ovo na tačnu putanju tvog kataloga u ruteru
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-300 bg-slate-900 rounded-xl hover:shadow-xl hover:shadow-slate-900/20 hover:-translate-y-1 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Nazad u katalog
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
            </Link>
          </motion.div>
        )}

      </div>
    </div>
  );
}

export default FavoritePege;