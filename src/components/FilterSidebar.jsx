import React from 'react';

function FilterSidebar({ filters, setFilters, categories }) {
  
  // Pomoćna funkcija za ažuriranje filtera
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Funkcija za resetovanje svih filtera na početna podešavanja
  const resetFilters = () => {
    setFilters({
      kategorija: 'sve',
      minVisina: '',
      maxVisina: '',
      minNosivost: '',
      maxNosivost: ''
    });
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-24">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl font-black text-slate-900">Filteri</h2>
        <button 
          onClick={resetFilters}
          className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
        >
          Poništi sve
        </button>
      </div>

      {/* 1. Kategorija */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Kategorija</h3>
        <div className="flex flex-col gap-2">
          {categories.map((cat, idx) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="kategorija" 
                value={cat}
                checked={filters.kategorija === cat}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
              <span className={`text-slate-700 font-medium group-hover:text-blue-600 transition-colors ${filters.kategorija === cat ? 'text-blue-600 font-bold' : ''}`}>
                {cat === 'sve' ? 'Sve mašine' : cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 2. Visina Dizanja */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Visina dizanja (m)</h3>
        <div className="flex items-center gap-2">
          <input 
            type="number" 
            name="minVisina"
            value={filters.minVisina}
            onChange={handleChange}
            placeholder="Min" 
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
          <span className="text-slate-400 font-bold">-</span>
          <input 
            type="number" 
            name="maxVisina"
            value={filters.maxVisina}
            onChange={handleChange}
            placeholder="Max" 
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {/* 3. Nosivost */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Nosivost (kg)</h3>
        <div className="flex items-center gap-2">
          <input 
            type="number" 
            name="minNosivost"
            value={filters.minNosivost}
            onChange={handleChange}
            placeholder="Min" 
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
          <span className="text-slate-400 font-bold">-</span>
          <input 
            type="number" 
            name="maxNosivost"
            value={filters.maxNosivost}
            onChange={handleChange}
            placeholder="Max" 
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

    </div>
  );
}

export default FilterSidebar;