import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaFileInvoiceDollar, FaHandshake, FaTruckLoading, FaArrowRight, FaUndo } from 'react-icons/fa';

const koraci = [
  {
    ikona: <FaEdit />,
    naslov: "Upit",
    opis: "Pošaljite nam upit za mašinu koja vam je potrebna i naš tim će vam u najkraćem roku odgovoriti sa svim informacijama. Na osnovu vašeg zahteva pripremamo ponudu i pomažemo vam da pronađete idealnu mašinu za vaš posao.",
    gradient: "from-blue-500 to-cyan-400",
    glow: "group-hover:shadow-blue-500/40 border-blue-100",
    textColor: "text-blue-500"
  },
  {
    ikona: <FaFileInvoiceDollar />,
    naslov: "Ponuda",
    opis: "Na osnovu vašeg upita pripremamo detaljnu i transparentnu ponudu sa svim informacijama o mašini, ceni i uslovima kupovine. Cilj nam je da jasno vidite šta dobijate i da budete sigurni u svaku odluku pre nego što pristupite ugovoru.",
    gradient: "from-sky-500 to-indigo-500",
    glow: "group-hover:shadow-indigo-500/40 border-indigo-100",
    textColor: "text-indigo-500"
  },
  {
    ikona: <FaHandshake />,
    naslov: "Ugovor",
    opis: "Nakon što potvrdite ponudu, pripremamo jasan i siguran ugovor koji definiše sve uslove kupovine, uključujući garanciju na mašinu. Ovo vam garantuje potpunu transparentnost, sigurnost i pouzdanost tokom celog procesa",
    gradient: "from-violet-500 to-purple-500",
    glow: "group-hover:shadow-purple-500/40 border-purple-100",
    textColor: "text-purple-500"
  },
  {
    ikona: <FaTruckLoading />,
    naslov: "Isporuka",
    opis: "Organizujemo bezbednu i brzu isporuku mašine direktno na vašu adresu, uz kompletnu logistiku i carinsku podršku. Naša pažljivo planirana dostava garantuje da vaša mašina stigne u savršenom stanju, spremna za rad",
    gradient: "from-slate-700 to-slate-900",
    glow: "group-hover:shadow-slate-900/40 border-slate-200",
    textColor: "text-slate-800"
  }
];

// 👈 NOVA KOMPONENTA ZA 3D KARTICU
const FlipCard = ({ korak, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-full h-[420px] [perspective:1000px] group z-10">
      {/* POVEĆANA VISINA NA 420px DA BI SVE BILE ISTE I DA TEKST STANE */}
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 60, damping: 15 }}
      >
        {/* --- PREDNJA STRANA --- */}
        <div 
          onClick={() => setIsFlipped(true)}
          className={`absolute inset-0 [backface-visibility:hidden] bg-white/60 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-2xl shadow-blue-500 flex flex-col justify-between transition-all duration-500 hover:-translate-y-3 hover:bg-white ${korak.glow} cursor-pointer`}
        >
          {/* Vodeni žig */}
          

          <div className="relative z-10">
            {/* Ikona */}
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${korak.gradient} text-white text-3xl flex items-center justify-center mb-8 shadow-lg shadow-slate-200 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
              {korak.ikona}
            </div>

            {/* Naslov */}
            <h3 className={`text-3xl font-black mb-2 tracking-tight transition-colors duration-300 ${korak.textColor}`}>
              {korak.naslov}
            </h3>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Korak 0{index + 1}</p>
          </div>

          {/* Dugme "Pogledaj" */}
          <button 
            className="relative z-10 flex items-center gap-2 text-sm font-black text-slate-400 hover:text-blue-600 transition-colors mt-auto pt-4 w-fit group/btn"
          >
            POGLEDAJ
            <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* --- ZADNJA STRANA (Okrenuta za 180 stepeni) --- */}
        <div 
          className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br ${korak.gradient} p-8 rounded-[2.5rem] shadow-2xl flex flex-col justify-center items-center`}
        >
          {/* Suptilna ikona u pozadini na zadnjoj strani */}
          <div className="absolute opacity-10 text-9xl pointer-events-none">
            {korak.ikona}
          </div>

          <h3 className="text-white text-2xl font-black mb-4 relative z-10 text-center">
            {korak.naslov}
          </h3>
          
          {/* text-justify DA IVICE BUDU U RAVNI */}
          <p className="text-white/90 font-medium leading-relaxed mb-8 relative z-10 text-justify text-sm sm:text-base">
            {korak.opis}
          </p>

          <button 
            onClick={() => setIsFlipped(false)}
            className="relative z-10 flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold backdrop-blur-sm transition-all hover:scale-105"
          >
            <FaUndo className="text-sm" />
            Nazad
          </button>
        </div>

      </motion.div>
    </div>
  );
};

function KakoRadimo() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      
      {/* MEGA MODERNA POZADINA (BLOBS) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/40 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* NASLOV SEKCIJE */}
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block py-1 px-4 rounded-full bg-white border border-slate-200 text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] mb-4 shadow-sm"
          >
            Sistem rada
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight"
          >
            Kako do <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">mašine?</span>
          </motion.h2>
        </div>

        {/* KORACI SA FLIP KARTICAMA */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
          
          {/* Suptilna isprekidana linija koja povezuje korake na velikim ekranima */}
          <div className="hidden lg:block absolute top-1/2 left-[12%] w-[76%] h-[2px] z-0 opacity-50 border-dashed border-t-2 border-transparent pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, #94a3b8 50%, transparent 50%)", backgroundSize: "16px 2px", backgroundRepeat: "repeat-x" }}></div>

          {koraci.map((korak, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative z-10"
            >
              {/* Pozivamo našu novu 3D FlipCard komponentu */}
              <FlipCard korak={korak} index={index} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default KakoRadimo;