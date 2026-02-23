import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Proveravamo da li smo na početnoj strani
  const isHomePage = location.pathname === '/';

  // Detekcija skrolovanja
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const changeLanguage = (lng) => {
    console.log("Menjam jezik na:", lng);
    // Ovde će ići i18n.changeLanguage(lng)
    setIsOpen(false); // Zatvaramo meni na mobilnom pri promeni jezika
  };

  // LOGIKA ZA BOJU POZADINE:
  // Ako je skrolovano ILI ako nismo na početnoj -> Tamna, providna crna
  // Ako smo na vrhu početne -> Potpuno providno
  const navBackgroundClass = (isScrolled || !isHomePage) 
    ? 'bg-slate-950/90 backdrop-blur-md shadow-2xl py-2 border-b border-white/5' 
    : 'bg-transparent py-6 border-b border-transparent';

  return (
    <nav className={`fixed w-full z-50 top-0 start-0 transition-all duration-500 ${navBackgroundClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center transition-all duration-500 h-16">
          
          {/* LOGO */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-black tracking-tighter text-white">
              GOGA<span className="text-orange-600">MACHINES</span>
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-extrabold uppercase tracking-widest text-white hover:text-orange-600 transition-colors">
              Početna
            </Link>
            <Link to="/katalog" className="text-sm font-extrabold uppercase tracking-widest text-white hover:text-orange-600 transition-colors">
              Katalog
            </Link>
            
            {/* Call to Action Dugme */}
            <Link 
              to="/konsultacije" 
              className="bg-orange-600 text-white px-6 py-2.5 rounded-full text-sm font-extrabold uppercase tracking-wider hover:bg-orange-500 transition-all shadow-lg shadow-orange-600/30"
            >
              Konsultacije
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center space-x-2 border-l border-white/20 pl-6">
              <button onClick={() => changeLanguage('sr')} className="text-xs font-extrabold text-white hover:text-orange-600 transition-colors">SRB</button>
              <span className="text-white/30">|</span>
              <button onClick={() => changeLanguage('en')} className="text-xs font-extrabold text-white hover:text-orange-600 transition-colors">ENG</button>
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 hover:text-orange-600 transition-colors"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN (Takodje prebačen u tamnu temu da se slaže sa video pozadinom) */}
      <div className={`md:hidden absolute w-full transition-all duration-300 ease-in-out origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`}>
        <div className="bg-slate-950/95 backdrop-blur-xl border-b border-white/10 px-4 pt-2 pb-6 space-y-2 shadow-2xl">
          <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-extrabold uppercase tracking-widest text-white border-b border-white/5">Početna</Link>
          <Link to="/katalog" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-extrabold uppercase tracking-widest text-white border-b border-white/5">Katalog</Link>
          <Link to="/konsultacije" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-extrabold uppercase tracking-widest text-orange-600 border-b border-white/5">Besplatne konsultacije</Link>
          <div className="flex space-x-6 px-3 py-4 justify-center">
            <button onClick={() => changeLanguage('sr')} className="text-sm font-extrabold text-white hover:text-orange-600">SRB</button>
            <span className="text-white/30">|</span>
            <button onClick={() => changeLanguage('en')} className="text-sm font-extrabold text-white hover:text-orange-600">ENG</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar