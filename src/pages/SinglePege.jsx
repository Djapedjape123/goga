import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { sveMasine } from '../data/sveMasine'; // Prilagodi putanju ako treba

function SinglePege() {
  // 1. Čitamo slug iz URL-a (npr. tvojsajt.com/masina/te3007-telehender)
  const { slug } = useParams();

  // 2. Tražimo mašinu u našoj bazi koja ima taj tačan slug
  const masina = sveMasine.find((m) => m.slug === slug);

  // 3. State za galeriju (početna slika je coverSlika ili prva iz galerije)
  const [glavnaSlika, setGlavnaSlika] = useState(masina?.galerija[0] || masina?.coverSlika);

  // 4. Zaštita: Ako neko ukuca pogrešan link
  if (!masina) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Mašina nije pronađena</h1>
        <Link to="/" className="text-blue-600 hover:underline">Vrati se na katalog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-32 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumbs (Navigaciona putanja) - Odlično za SEO */}
        <div className="mb-8 text-sm text-slate-500 font-medium">
          <Link to="/" className="hover:text-blue-600 transition-colors">Katalog</Link> 
          <span className="mx-2">/</span> 
          <span className="capitalize">{masina.kategorija}</span>
          <span className="mx-2">/</span> 
          <span className="text-slate-900">{masina.naziv}</span>
        </div>

        {/* Glavni Grid: Levo Slike, Desno Podaci */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          
          {/* LEVA STRANA: GALERIJA */}
          <div className="flex flex-col gap-4">
            {/* Velika slika */}
            <div className="w-full h-[400px] bg-slate-100 rounded-3xl p-8 flex items-center justify-center border border-slate-200">
              <img 
                src={glavnaSlika} 
                alt={masina.naziv} 
                className="w-full h-full object-contain drop-shadow-xl transition-all duration-300"
              />
            </div>
            {/* Male sličice (Thumbnails) */}
            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
              {masina.galerija.map((slika, index) => (
                <button 
                  key={index}
                  onClick={() => setGlavnaSlika(slika)}
                  className={`flex-shrink-0 w-24 h-24 bg-slate-100 rounded-xl p-2 border-2 transition-all 
                    ${glavnaSlika === slika ? 'border-blue-600 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={slika} alt={`${masina.naziv} slika ${index + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* DESNA STRANA: INFORMACIJE */}
          <div className="flex flex-col justify-center">
            {/* Bedž i Naslov */}
            <div className="mb-6">
              <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 font-bold text-xs uppercase tracking-wider rounded-full mb-4">
                {masina.kategorija}
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">{masina.naziv}</h1>
              <p className="text-3xl font-extrabold text-blue-600">Cena: {masina.cena}</p>
            </div>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {masina.opis}
            </p>

            {/* Tabela specifikacija */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6 border-b pb-4">Tehničke Specifikacije</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Max visina dizanja</span>
                  <span className="font-bold text-slate-900">{masina.specifikacije.visinaDizanja} m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Maksimalna nosivost</span>
                  <span className="font-bold text-slate-900">{masina.specifikacije.nosivost} kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Motor</span>
                  <span className="font-bold text-slate-900">{masina.specifikacije.motor}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Snaga motora</span>
                  <span className="font-bold text-slate-900">{masina.specifikacije.snaga}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Godište</span>
                  <span className="font-bold text-slate-900">{masina.specifikacije.godiste}</span>
                </div>
              </div>
            </div>

            {/* Call to Action Dugmići */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg shadow-blue-600/30">
                Zatraži ponudu
              </button>
              <button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg">
                Pozovi nas
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePege;