import React, { useState } from 'react';
import { sveMasine } from '../data/sveMasine'; // Prilagodi putanju
import MachineCard from '../components/MachineCard'; // Uvozimo našu novu komponentu!

function CatalogPage() {
  // Stanje koje prati koja je kategorija izabrana. Početno je 'sve'.
  const [activeCategory, setActiveCategory] = useState('sve');

  // Dinamički izvlačimo sve jedinstvene kategorije iz baze
  const categories = ['sve', ...new Set(sveMasine.map(masina => masina.kategorija))];

  // Filtriramo mašine na osnovu izabrane kategorije
  const filteredMasine = activeCategory === 'sve' 
    ? sveMasine 
    : sveMasine.filter(masina => masina.kategorija === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 pt-32 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER SEKCIJA --- */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Naša <span className="text-blue-600">Mehanizacija</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Pregledajte naš vrhunski vozni park. Pouzdane mašine spremne za svaki vaš građevinski izazov.
          </p>
        </div>

        {/* --- DUGMIĆI ZA KATEGORIJE (FILTER) --- */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ease-in-out
                ${activeCategory === category 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:scale-105 shadow-sm border border-slate-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* --- GRID SA KARTICAMA --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Ovde sada koristimo našu posebnu komponentu i prosleđujemo joj podatke */}
          {filteredMasine.map((masina) => (
            <MachineCard key={masina.id} masina={masina} />
          ))}
        </div>

        {/* Poruka ako nema rezultata */}
        {filteredMasine.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Nema pronađenih mašina</h3>
            <p className="text-slate-500">Pokušajte da izaberete drugu kategoriju.</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default CatalogPage;