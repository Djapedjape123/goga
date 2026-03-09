import React from 'react';
import { motion } from 'framer-motion';
import { FaHandshake, FaGlobeAmericas, FaShieldAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next'; // IMPORTUJEMO PREVOD

function Onama() {
  const { t } = useTranslation(); // INICIJALIZACIJA PREVODA

  return (
    <section className="py-20 bg-gradient-to-b from-white to-sky-50 relative overflow-hidden">
      
      {/* Dekorativni svetlo-plavi elementi u pozadini (Blobs) */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-200 blur-3xl opacity-60 z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-200 blur-3xl opacity-40 z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEVA STRANA - Udarni naslov i moto */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest mb-6 border border-blue-100 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              {t('about.badge')}
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
              {t('about.title_1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">{t('about.title_highlight')}</span>.
            </h2>
            
            <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed mb-8 border-l-4 border-blue-500 pl-6">
              {t('about.subtitle')}
            </p>
            
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl shadow-slate-900/10 inline-block">
              <p className="text-lg font-bold">
                {t('about.box_text')}
              </p>
            </div>
          </motion.div>

          {/* DESNA STRANA - Staklena kartica sa detaljima */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-white/40 relative"
          >
            <div className="space-y-10">
              
              {/* Stavka 1 */}
              <div className="flex gap-5 group">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 text-2xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <FaGlobeAmericas />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 mb-2">{t('about.item1_title')}</h4>
                  <p className="text-slate-500 leading-relaxed font-medium">
                    {t('about.item1_text')}
                  </p>
                </div>
              </div>

              {/* Stavka 2 */}
              <div className="flex gap-5 group">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 text-2xl group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm">
                    <FaHandshake />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 mb-2">{t('about.item2_title')}</h4>
                  <p className="text-slate-500 leading-relaxed font-medium">
                    {t('about.item2_text')}
                  </p>
                </div>
              </div>

              {/* Stavka 3 */}
              <div className="flex gap-5 group">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-2xl group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 shadow-sm">
                    <FaShieldAlt />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 mb-2">{t('about.item3_title')}</h4>
                  <p className="text-slate-500 leading-relaxed font-medium">
                    {t('about.item3_text')}
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

export default Onama;