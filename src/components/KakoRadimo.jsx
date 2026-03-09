import React from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaFileInvoiceDollar, FaHandshake, FaTruckLoading } from 'react-icons/fa';

const koraci = [
  {
    ikona: <FaEdit />,
    naslov: "Upit",
    opis: "Pošaljite upit putem sajta ili nas pozovite direktno za željenu mašinu.",
    gradient: "from-blue-500 to-cyan-400",
    glow: "group-hover:shadow-blue-500/40 border-blue-100",
    textColor: "text-blue-500"
  },
  {
    ikona: <FaFileInvoiceDollar />,
    naslov: "Ponuda",
    opis: "Dobijate zvaničnu ponudu sa detaljnim specifikacijama i rokom isporuke.",
    gradient: "from-sky-500 to-indigo-500",
    glow: "group-hover:shadow-indigo-500/40 border-indigo-100",
    textColor: "text-indigo-500"
  },
  {
    ikona: <FaHandshake />,
    naslov: "Ugovor",
    opis: "Potpisujemo ugovor i definišemo precizne uslove plaćanja i logistike.",
    gradient: "from-violet-500 to-purple-500",
    glow: "group-hover:shadow-purple-500/40 border-purple-100",
    textColor: "text-purple-500"
  },
  {
    ikona: <FaTruckLoading />,
    naslov: "Isporuka",
    opis: "Mašina stiže na vašu lokaciju uz obezbeđen servis i garanciju.",
    gradient: "from-slate-700 to-slate-900",
    glow: "group-hover:shadow-slate-900/40 border-slate-200",
    textColor: "text-slate-800"
  }
];

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

        {/* KORACI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
          
          {/* Suptilna isprekidana linija koja povezuje korake na velikim ekranima */}
          <div className="hidden lg:block absolute top-12 left-[12%] w-[76%] h-[2px] bg-gradient-to-r from-blue-200 via-indigo-200 to-slate-200 z-0 border-dashed border-t-2 border-transparent" style={{ backgroundImage: "linear-gradient(to right, #cbd5e1 50%, transparent 50%)", backgroundSize: "16px 2px", backgroundRepeat: "repeat-x" }}></div>

          {koraci.map((korak, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15, type: "spring", bounce: 0.4 }}
              className="relative z-10 h-full"
            >
              {/* KARTICA (Glassmorphism) */}
              <div className={`group relative h-full bg-white/60 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-lg transition-all duration-500 hover:-translate-y-2 hover:bg-white ${korak.glow}`}>
                
                {/* Vodeni žig broj u pozadini (01, 02...) */}
                <div className="absolute -bottom-4 -right-2 text-8xl font-black text-slate-50 opacity-50 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 pointer-events-none select-none z-0">
                  0{index + 1}
                </div>

                <div className="relative z-10">
                  {/* Ikona kontejner sa Gradijentom */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${korak.gradient} text-white text-3xl flex items-center justify-center mb-8 shadow-lg shadow-slate-200 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    {korak.ikona}
                  </div>

                  {/* Tekst */}
                  <h3 className={`text-2xl font-black mb-4 tracking-tight transition-colors duration-300 ${korak.textColor}`}>
                    {korak.naslov}
                  </h3>
                  
                  <p className="text-slate-500 font-medium leading-relaxed">
                    {korak.opis}
                  </p>
                </div>
                
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default KakoRadimo;