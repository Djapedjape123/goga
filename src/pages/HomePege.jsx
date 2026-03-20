import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTractor, FaPhoneAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next'; // 👈 1. IMPORT KUKICE ZA PREVOD
import SEO from '../components/SEO'; // 👈 2. IMPORT NAŠE SEO KOMPONENTE

// LAZY IMPORT KOMPONENTI
const Onama = lazy(() => import('../components/Onama'));
const KakoRadimo = lazy(() => import('../components/KakoRadimo'));

function HomePage() {
  const { t } = useTranslation(); // 👈 3. INICIJALIZACIJA PREVODA

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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 60, damping: 15 } 
    },
  };

  return (
    <> 
      {/* 👇 SEO MAGIJA ZA POČETNU STRANU 👇 */}
      <SEO 
        title={t('home.seo_title', { defaultValue: "Masine.ai | Lideri u prodaji građevinskih mašina" })}
        description={t('home.seo_desc', { defaultValue: "Pouzdan izbor građevinskih mašina i poljoprivredne mehanizacije. Vrhunski brendovi spremni za najteže terenske izazove." })}
      />

      {/* --- 1. HERO SEKCIJA SA VIDEOM --- */}
      <div className="relative min-h-[100svh] w-full overflow-x-hidden bg-slate-900 flex flex-col items-center justify-center py-16 px-4">
        
        {/* VIDEO POZADINA */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/video2.mp4" type="video/mp4" />
          </video>
        </div>

        {/* GLAVNI CENTRIRANI SADRŽAJ */}
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
            {t('home.badge')}
          </motion.p>
          
          {/* Glavni Naslov */}
          <motion.h1 
            variants={itemVariants} 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight md:leading-tight tracking-tight mb-6"
          >
            {t('home.title_1')} <br className="hidden sm:block" />
            {t('home.title_2')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-200">{t('home.title_highlight')}</span>
          </motion.h1>
          
          {/* Podnaslov */}
          <motion.p 
            variants={itemVariants} 
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed px-2"
          >
            {t('home.subtitle')}
          </motion.p>
          
          {/* Dugmad */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full max-w-md mx-auto sm:max-w-none"
          >
            <Link 
              to="/katalog" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-lg text-sm md:text-base uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:scale-105"
            >
              <FaTractor className="text-lg" />
              {t('home.btn_catalog')}
            </Link>

            <Link 
              to="/contact" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-extrabold rounded-lg text-sm md:text-base uppercase tracking-wider transition-all hover:scale-105"
            >
              <FaPhoneAlt className="text-sm" />
              {t('nav.contact')}
            </Link>
          </motion.div>
        </motion.div>

        {/* BLAGI PRELAZ */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
      </div>

      {/* SEKCIJA O NAMA */}
      <Suspense fallback={
        <div className="py-32 flex justify-center items-center bg-white min-h-[400px]">
          <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      }>
        <Onama />
      </Suspense>

      {/* SEKCIJA KAKO RADIMO */}
      <Suspense fallback={
        <div className="py-32 flex justify-center items-center bg-slate-50 min-h-[400px]">
          <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      }>
        <KakoRadimo />
      </Suspense>

    </>
  );
}

export default HomePage;