import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Html } from '@react-three/drei';

// --- 1. DINAMIČKA BAZA MODELA ---
// Ovde dodaješ nove mašine. Samo iskopiraš blok i promeniš podatke.
const masine3D = [
  {
    id: 1,
    naziv: "Viljuškari",
    opis: "Robusni viljuškari koji omogućavaju sigurno i brzo rukovanje robom u skladištima, fabrikama i logističkim centrima. Pouzdana snaga i precizna kontrola za maksimalnu efikasnost u svakodnevnom radu.",
    putanja: "/models/viliskar-v1.glb" // Tvoj model iz public/models/
  },
  {
    id: 2,
    naziv: "Mini Bageri",
    opis: "Snažni bageri za najzahtevnije građevinske radove...",
    putanja: "/models/miniBager-v1.glb"
  }
];

// --- 2. KOMPONENTA KOJA UČITAVA SAM 3D MODEL ---
function MasinaModel({ putanja }) {
  // useGLTF automatski kešira model, pa ako korisnik menja mašine, učitavanje je trenutno!
  const { scene } = useGLTF(putanja);

  return (
    <primitive
      object={scene}
      scale={1} // Možeš menjati scale ako je model prevelik/premali
      position={[0, 0, 0]}
    />
  );
}

// --- 3. GLAVNA STRANICA ---
function D3modelPage() {
  // Pratimo koja je mašina trenutno izabrana (početna je prva iz niza)
  const [aktivnaMasina, setAktivnaMasina] = useState(masine3D[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F3C] via-[#2C5DA9] to-[#C8DAF9] pt-32 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* Dekorativni krugovi u pozadini */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-200 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ZAGLAVLJE */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 md:text-white">
            Naši <span className="text-[#FEFFB9]">3D Modeli</span>
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto font-medium">
            Interaktivni pregled naše mehanizacije. Rotirajte i zumirajte modele za detaljan prikaz svakog ugla.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEVA STRANA: LISTA MAŠINA (KARTICE ZA KLIKTANJE) */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <h3 className="text-sm font-black text-blue-200 uppercase tracking-widest mb-2 ml-2">Izaberi mašinu</h3>
            {masine3D.map((masina) => {
              const isSelected = aktivnaMasina.id === masina.id;
              return (
                <button
                  key={masina.id}
                  onClick={() => setAktivnaMasina(masina)}
                  className={`text-left p-6 rounded-3xl transition-all duration-300 border backdrop-blur-md ${isSelected
                      ? "bg-white/90 border-blue-400 shadow-[0_8px_30px_rgb(0,0,0,0.12)] scale-[1.02]"
                      : "bg-white/40 border-white/20 hover:bg-white/60 text-slate-100 hover:text-slate-900"
                    }`}
                >
                  <h2 className={`text-xl font-black mb-2 ${isSelected ? "text-blue-700" : ""}`}>
                    {masina.naziv}
                  </h2>
                  <p className={`text-sm line-clamp-2 ${isSelected ? "text-slate-600 font-medium" : "opacity-80"}`}>
                    {masina.opis}
                  </p>
                </button>
              );
            })}
          </div>

          {/* DESNA STRANA: 3D PRIKAZ (CANVAS) I TEKST */}
          <div className="w-full lg:w-2/3 flex flex-col">

            {/* 3D KONTEJNER */}
            <div className="w-full h-[500px] bg-white/80 backdrop-blur-xl rounded-t-3xl border-t border-l border-r border-slate-200/60 shadow-inner relative overflow-hidden">
              <Canvas shadows dpr={[1, 2]} camera={{ position: [4, 2, 5], fov: 45 }}>

                {/* Suspense osigurava da sajt ne pukne dok se model učitava */}
                <Suspense fallback={
                  <Html center>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3"></div>
                      <span className="text-blue-800 font-bold tracking-widest text-sm uppercase">Učitavanje 3D modela...</span>
                    </div>
                  </Html>
                }>

                  {/* Stage je prečica iz 'drei' koja automatski centrira model, dodaje svetlo i senke ispod njega! */}
                  <Stage environment="city" intensity={0.6} adjustCamera>
                    {/* Ovde ubacujemo aktivni model i dajemo mu 'key' da bi se pravilno osvežio kad promeniš mašinu */}
                    <MasinaModel key={aktivnaMasina.id} putanja={aktivnaMasina.putanja} />
                  </Stage>

                </Suspense>

                {/* Kontrole za miša/prst */}
                <OrbitControls
                  autoRotate
                  autoRotateSpeed={1.5}
                  enableZoom={true}
                  makeDefault
                  minPolarAngle={Math.PI / 4}
                  maxPolarAngle={Math.PI / 2} // Sprečava da kamera ode "ispod zemlje"
                />
              </Canvas>

              {/* Mala uputstva preko Canvasa */}
              <div className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full pointer-events-none border border-white/50 shadow-sm">
                <span className="text-xs font-bold text-slate-600 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  Vuci za rotaciju, skroluj za zum
                </span>
              </div>
            </div>

            {/* TEKSTUALNI DEO (ISPOD MODELA) */}
            <div className="bg-white p-8 rounded-b-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-b border-l border-r border-slate-200/60 z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                <h2 className="text-3xl font-black text-slate-800">{aktivnaMasina.naziv}</h2>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                {aktivnaMasina.opis}
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

// OBAVEZNO: Prijavi (preload) modele unapred da bi menjanje bilo instant!
masine3D.forEach((masina) => {
  useGLTF.preload(masina.putanja);
});

export default D3modelPage;