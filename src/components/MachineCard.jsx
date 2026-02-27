import React from 'react';
import { Link } from 'react-router-dom'; // DODATO: Uvozimo Link

function MachineCard({ masina }) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col">
      {/* ... [Gornji deo koda ostaje potpuno isti: Slika, Bedž, Naslov, Brzi pregled] ... */}
      
      <div className="relative h-64 bg-slate-100 p-6 overflow-hidden flex items-center justify-center">
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 uppercase tracking-wide z-10 shadow-sm">
          {masina.kategorija}
        </div>
        <img 
          src={masina.coverSlika} 
          alt={masina.naziv} 
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-in-out"
          loading="lazy"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
          {masina.naziv}
        </h2>
        
        <div className="grid grid-cols-2 gap-4 my-4 bg-slate-50 p-4 rounded-2xl">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase">Visina</p>
            <p className="text-lg font-bold text-slate-800">{masina.specifikacije.visinaDizanja}m</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase">Nosivost</p>
            <p className="text-lg font-bold text-slate-800">{masina.specifikacije.nosivost}kg</p>
          </div>
        </div>

        <p className="text-slate-600 text-sm line-clamp-2 mb-6 flex-grow">
          {masina.opis}
        </p>

        {/* --- OVDE JE PROMENA --- */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-extrabold text-slate-900">
            {masina.cena}
          </span>
          {/* Menjamo <button> u <Link> i gađamo slug iz baze */}
          <Link 
            to={`/masina/${masina.slug}`} 
            className="bg-slate-900 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-colors duration-300 shadow-md inline-block text-center"
          >
            Detalji
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MachineCard;