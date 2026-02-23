import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTractor, FaPhoneAlt } from 'react-icons/fa';

function HomePage() {
  // Varijante za kontejner - pokreće animacije dece jednu za drugom
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  // Varijanta za pojedinačne elemente (ulazak odozdo ka gore)
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 60, damping: 15 } 
    },
  };

  return (
    // PROMENA: min-h-[100svh] omogućava da video krene od same gornje ivice browsera!
    <div className="relative min-h-[100svh] w-full overflow-x-hidden bg-slate-900 flex flex-col items-center justify-center py-16 px-4">
      
      {/* --- 1. VIDEO POZADINA --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* --- 2. GLAVNI CENTRIRANI SADRŽAJ --- */}
      <motion.div 
        className="relative z-20 text-center w-full max-w-4xl mx-auto pt-16" 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Nadnaslov */}
        <motion.p 
          variants={itemVariants} 
          className="text-orange-500 font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base"
        >
          Lideri u mehanizaciji
        </motion.p>
        
        {/* Glavni Naslov */}
        <motion.h1 
          variants={itemVariants} 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight md:leading-tight tracking-tight mb-6"
        >
          SNAGA KOJA <br className="hidden sm:block" />
          POKREĆE <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">POSAO</span>
        </motion.h1>
        
        {/* Podnaslov (Tekst ispod naslova) */}
        <motion.p 
          variants={itemVariants} 
          className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed px-2"
        >
          Pouzdan izbor građevinskih mašina i poljoprivredne mehanizacije. Vrhunski brendovi spremni za najteže terenske izazove.
        </motion.p>
        
        {/* Dugmad - flex centriran, prelazi u kolonu na baš malim ekranima */}
        <motion.div 
          variants={itemVariants} 
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full max-w-md mx-auto sm:max-w-none"
        >
          <Link 
            to="/katalog" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-extrabold rounded-lg text-sm md:text-base uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:scale-105"
          >
            <FaTractor className="text-lg" />
            Pogledaj Katalog
          </Link>

          <Link 
            to="/konsultacije" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-extrabold rounded-lg text-sm md:text-base uppercase tracking-wider transition-all hover:scale-105"
          >
            <FaPhoneAlt className="text-sm" />
            Zakaži Konsultacije
          </Link>
        </motion.div>
      </motion.div>

      {/* --- 3. BLAGI PRELAZ KA SLEDEĆOJ SEKCIJI NA DNU --- */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none"></div> */}

    </div>
  );
}

export default HomePage;