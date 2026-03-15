import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // OBAVEZNO: Importujemo Link za brzu React navigaciju

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Tvoje stvarne putanje iz rutera
  const navigacija = [
    { ime: 'Početna', putanja: '/' },
    { ime: 'Katalog', putanja: '/katalog' },
    { ime: 'Omiljene mašine', putanja: '/favorite' },
    { ime: 'Kontact', putanja: '/contact' }
  ];

  return (
    <footer className="relative bg-[#05070a] text-slate-300 pt-20 pb-10 overflow-hidden border-t border-white/5 mt-auto">
      {/* Suptilni plavi sjaj na vrhu footera */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      {/* Pozadinski glow efekat (nevidljiv na telefonu, daje dubinu na računaru) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Prilagođen grid na 3 kolone umesto 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-16">
          
          {/* 1. Brend & Opis */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-white tracking-tighter">
              MASINE<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">.AI</span>
            </h2>
            <p className="text-sm leading-relaxed text-slate-400 pr-4">
              Vodeći partner u prodaji i distribuciji građevinske mehanizacije. 
              Inovacija, snaga i pouzdanost u svakom radnom satu.
            </p>
            <div className="flex gap-4 pt-2">
              {/* Društvene mreže */}
              {[
                { icon: <Facebook size={20} />, link: "#", label: "Facebook" },
                { icon: <Instagram size={20} />, link: "#", label: "Instagram" }
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.link}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 hover:border-blue-500 hover:bg-blue-500/20 hover:text-blue-400 transition-all shadow-lg"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* 2. Brzi linkovi (Koristi pravi React Router Link) */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
              Navigacija
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              {navigacija.map((item) => (
                <li key={item.ime}>
                  <Link 
                    to={item.putanja} 
                    className="flex items-center group text-slate-400 hover:text-white transition-all"
                  >
                    <ChevronRight 
                      size={16} 
                      className="text-blue-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 ease-out" 
                    />
                    <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                      {item.ime}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Kontakt Info */}
          <div className="space-y-6 text-sm">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
              Kontakt
            </h3>
            <div className="flex items-start gap-4 group cursor-default">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-colors">
                <MapPin size={18} className="text-blue-400" />
              </div>
              <span className="text-slate-400 pt-1 leading-relaxed">Bulevar Oslobođenja 123,<br />21000 Novi Sad, Srbija</span>
            </div>
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-colors">
                <Phone size={18} className="text-blue-400" />
              </div>
              <span className="text-slate-400 group-hover:text-white transition-colors">+381 60 123 4567</span>
            </div>
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-colors">
                <Mail size={18} className="text-blue-400" />
              </div>
              <span className="text-slate-400 group-hover:text-white transition-colors">info@masine.ai</span>
            </div>
          </div>

        </div>

        {/* Donji deo - Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>© {currentYear} MASINE.AI. Sva prava zadržana.</p>
          <div className="flex gap-6 uppercase tracking-widest">
            <a href='https://www.pedjadev.com/' className="hover:text-blue-400 transition-colors">Development by prWeb</a>
            <Link to="/" className="hover:text-blue-400 transition-colors">Politika privatnosti</Link>
            <Link to="/" className="hover:text-blue-400 transition-colors">Uslovi korišćenja</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;