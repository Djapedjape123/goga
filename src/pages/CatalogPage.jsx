import React, { useState } from 'react';
import { sveMasine } from '../data/sveMasine';
import MachineCard from '../components/MachineCard';
import FilterSidebar from '../components/FilterSidebar';
import { motion } from 'framer-motion';

function CatalogPage() {
  const [filters, setFilters] = useState({
    kategorija: 'sve',
    minVisina: '',
    maxVisina: '',
    minNosivost: '',
    maxNosivost: ''
  });

  const categories = ['sve', ...new Set(sveMasine.map(m => m.kategorija))];

  const filteredMasine = sveMasine.filter(masina => {
    if (filters.kategorija !== 'sve' && masina.kategorija !== filters.kategorija) {
      return false;
    }
    if (filters.minVisina && masina.specifikacije.visinaDizanja < Number(filters.minVisina)) return false;
    if (filters.maxVisina && masina.specifikacije.visinaDizanja > Number(filters.maxVisina)) return false;
    if (filters.minNosivost && masina.specifikacije.nosivost < Number(filters.minNosivost)) return false;
    if (filters.maxNosivost && masina.specifikacije.nosivost > Number(filters.maxNosivost)) return false;
    return true;
  });

  return (
    <>
      
        
     
      {/* OBRISAN overflow-x-hidden! Vraćen tvoj originalni div! */}
      <div className="min-h-screen bg-gradient-to-br from-sky-200 via-blue-300 to-sky-400 pt-32 py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-200 rounded-full blur-3xl opacity-30"></div>
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Naša <span className="text-blue-600">Mehanizacija</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Pronađite savršenu mašinu za vaš projekat. Koristite filtere za preciznu pretragu.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* LEVA KOLONA: motion.div sa uletanjem + TVOJ sticky */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full lg:w-1/4 lg:sticky top-28 self-start z-10"
            >
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                categories={categories}
              />
            </motion.div>

            {/* DESNA KOLONA: motion.div sa uletanjem */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="w-full lg:w-3/4"
            >
              {/* ULTRA MODERNI BROJAČ REZULTATA */}
              <div className="mb-8 flex justify-between items-center bg-white/70 backdrop-blur-xl px-6 py-4 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(37,99,235,0.08)] hover:-translate-y-0.5">

                {/* Leva strana: Pulsirajuća "Live" tačka i naslov */}
                <div className="flex items-center gap-4">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                  </span>
                  <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">Dostupne mašine</h2>
                </div>

                {/* Desna strana: Moderan bedž sa brojem */}
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 font-medium text-sm hidden sm:block">Pronađeno:</span>
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-1.5 rounded-full text-sm font-black shadow-md shadow-blue-500/30">
                    {filteredMasine.length}
                  </div>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredMasine.map((masina) => (
                  <MachineCard key={masina.id} masina={masina} />
                ))}
              </div>

              {filteredMasine.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 mt-8">
                  <div className="text-6xl mb-4">🚜</div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Ne postoji takva mašina</h3>
                  <p className="text-slate-500 mb-6">Pokušajte da proširite parametre pretrage ili poništite filtere.</p>
                  <button
                    onClick={() => setFilters({ kategorija: 'sve', minVisina: '', maxVisina: '', minNosivost: '', maxNosivost: '' })}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
                  >
                    Poništi sve filtere
                  </button>
                </div>
              )}
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
}

export default CatalogPage;