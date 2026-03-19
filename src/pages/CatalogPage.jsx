import React, { useState, useMemo, lazy, Suspense } from 'react';
import { sveMasine } from '../data/sveMasine';
import MachineCard from '../components/MachineCard';
import FilterSidebar from '../components/FilterSidebar';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // 👈 DODATO ZA PREVOD

// --- LAZY LOAD ZA 3D PREGLEDAČ (Da ne uspori katalog!) ---
const Mini3DViewer = lazy(() => import('../components/Mini3DViewer'));

// --- POMOĆNA FUNKCIJA ZA SIGURNO PRETVARANJE U BROJ ---
const parseToNumber = (value) => {
  if (value === null || value === undefined || value === "") return 0;
  if (typeof value === "number") return value;
  const cleaned = String(value).replace(/[^0-9.]+/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
};

const DEFAULT_FILTERS = {
  kategorija: 'sve',
  minCena: '', 
  maxCena: '',
  minVisina: '', maxVisina: '',
  minNosivost: '', maxNosivost: '',
  minKapacitet: '', maxKapacitet: '',
  minDubinaKopanja: '', maxDubinaKopanja: '',
  minVisinaKopanja: '', maxVisinaKopanja: '',
  minVisinaIstovara: '', maxVisinaIstovara: '',
};

const MASINA_PO_STRANI = 6;

function CatalogPage() {
  const { t } = useTranslation(); // 👈 INICIJALIZOVAN PREVOD
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSetFilters = (updater) => {
    setFilters((prev) => {
      const nextState = typeof updater === 'function' ? updater(prev) : updater;

      if (nextState.kategorija !== prev.kategorija) {
        setCurrentPage(1);
        return {
          ...DEFAULT_FILTERS,
          kategorija: nextState.kategorija
        };
      }

      setCurrentPage(1);
      return nextState;
    });
  };

  const categories = useMemo(() => {
    return ['sve', ...new Set(sveMasine.map(m => m.kategorija))];
  }, []);

  // --- GLAVNA LOGIKA FILTRIRANJA ---
  const filteredMasine = useMemo(() => {
    return sveMasine.filter(masina => {
      if (filters.kategorija !== 'sve' && masina.kategorija !== filters.kategorija) return false;

      const s = masina.specifikacije || {};
      const mCena = parseToNumber(masina.cena);
      
      const isPriceFiltered = (filters.minCena !== "" && filters.minCena > 0) || 
                              (filters.maxCena !== "" && filters.maxCena < 150000);

      if (isPriceFiltered) {
        if (mCena === 0) return false; 
        if (filters.minCena && mCena < parseToNumber(filters.minCena)) return false;
        if (filters.maxCena && mCena > parseToNumber(filters.maxCena)) return false;
      }

      if (['sve', 'telehendleri', 'viljuskari'].includes(filters.kategorija)) {
        const mVisina = parseToNumber(s.visinaDizanja || s.maksVisinaDizanja);
        const mNosivost = parseToNumber(s.nosivost);

        if (filters.minVisina && mVisina < parseToNumber(filters.minVisina)) return false;
        if (filters.maxVisina && mVisina > parseToNumber(filters.maxVisina)) return false;
        if (filters.minNosivost && mNosivost < parseToNumber(filters.minNosivost)) return false;
        if (filters.maxNosivost && mNosivost > parseToNumber(filters.maxNosivost)) return false;
      }

      if (['sve', 'mini-mikseri'].includes(filters.kategorija)) {
        const mKapacitet = parseToNumber(s.kapacitetMesanja);
        if (filters.minKapacitet && mKapacitet < parseToNumber(filters.minKapacitet)) return false;
        if (filters.maxKapacitet && mKapacitet > parseToNumber(filters.maxKapacitet)) return false;
      }

      if (['sve', 'mini-bageri'].includes(filters.kategorija)) {
        const mDubina = parseToNumber(s.maxDubinaKopanja);
        const mVisinaK = parseToNumber(s.maxVisinaKopanja);

        if (filters.minDubinaKopanja && mDubina < parseToNumber(filters.minDubinaKopanja)) return false;
        if (filters.maxDubinaKopanja && mDubina > parseToNumber(filters.maxDubinaKopanja)) return false;
        if (filters.minVisinaKopanja && mVisinaK < parseToNumber(filters.minVisinaKopanja)) return false;
        if (filters.maxVisinaKopanja && mVisinaK > parseToNumber(filters.maxVisinaKopanja)) return false;
      }

      if (['sve', 'bageri'].includes(filters.kategorija)) {
        const mDubina = parseToNumber(s.maxDubinaKopanja);
        const mVisinaI = parseToNumber(s.maxVisinaIstovara);

        if (filters.minDubinaKopanja && mDubina < parseToNumber(filters.minDubinaKopanja)) return false;
        if (filters.maxDubinaKopanja && mDubina > parseToNumber(filters.maxDubinaKopanja)) return false;
        if (filters.minVisinaIstovara && mVisinaI < parseToNumber(filters.minVisinaIstovara)) return false;
        if (filters.maxVisinaIstovara && mVisinaI > parseToNumber(filters.maxVisinaIstovara)) return false;
      }

      return true;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredMasine.length / MASINA_PO_STRANI);
  const startIndex = (currentPage - 1) * MASINA_PO_STRANI;
  const currentMachines = filteredMasine.slice(startIndex, startIndex + MASINA_PO_STRANI);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#0A0F3C] via-[#2C5DA9] to-[#C8DAF9] pt-32 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-200 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              {t('catalog.title')} <span className="text-[#FEFFB9]">{t('catalog.title_highlight')}</span> {/* 👈 PREVEDENO */}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('catalog.subtitle')} {/* 👈 PREVEDENO */}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full lg:w-1/4 lg:sticky top-28 self-start z-10"
            >
              <FilterSidebar
                filters={filters}
                setFilters={handleSetFilters}
                categories={categories}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="w-full lg:w-3/4 flex flex-col min-h-[500px]"
            >
              <div className="mb-8 flex justify-between items-center bg-white/70 backdrop-blur-xl px-6 py-4 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60">
                <div className="flex items-center gap-4">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                  </span>
                  <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">{t('catalog.available')}</h2> {/* 👈 PREVEDENO */}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-500 font-medium text-sm hidden sm:block">{t('catalog.found')}</span> {/* 👈 PREVEDENO */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-1.5 rounded-full text-sm font-black shadow-md shadow-blue-500/30">
                    {filteredMasine.length}
                  </div>
                </div>
              </div>

              {/* === NOVO: DINAMIČKI 3D BANER === */}
              {filters.kategorija !== 'sve' && (
                <Suspense fallback={<div className="h-48 mb-8 bg-white/40 animate-pulse rounded-3xl"></div>}>
                  <Mini3DViewer kategorija={filters.kategorija} />
                </Suspense>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 flex-grow">
                {currentMachines.map((masina) => (
                  <MachineCard key={masina.id} masina={masina} />
                ))}
              </div>

              {filteredMasine.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 mt-8">
                  <div className="text-6xl mb-4">🚜</div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">{t('catalog.no_results_title')}</h3> {/* 👈 PREVEDENO */}
                  <p className="text-slate-500 mb-6">{t('catalog.no_results_desc')}</p> {/* 👈 PREVEDENO */}
                  <button
                    onClick={() => handleSetFilters(DEFAULT_FILTERS)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
                  >
                    {t('catalog.btn_reset')} {/* 👈 PREVEDENO */}
                  </button>
                </div>
              )}

              {totalPages > 1 && (
                <div className="mt-16 mb-8 flex justify-center items-center gap-2 sm:gap-4 w-full">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="group flex items-center justify-center w-12 h-12 sm:w-auto sm:px-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-sm active:scale-95"
                  >
                    <svg className="w-5 h-5 sm:mr-2 transform transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="hidden sm:block font-bold">{t('catalog.btn_prev')}</span> {/* 👈 PREVEDENO */}
                  </button>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      const isActive = currentPage === pageNum;
                      const isNearCurrent = Math.abs(currentPage - pageNum) <= 1;
                      const isEdge = pageNum === 1 || pageNum === totalPages;
                      const showOnMobile = isNearCurrent || isEdge;

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`
                            w-10 h-10 sm:w-12 sm:h-12 rounded-2xl font-black transition-all duration-300 flex items-center justify-center text-sm sm:text-base
                            ${isActive
                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-110 z-10'
                              : 'bg-white/70 backdrop-blur-md border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
                            }
                            ${!showOnMobile ? 'hidden sm:flex' : 'flex'}
                          `}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="group flex items-center justify-center w-12 h-12 sm:w-auto sm:px-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-sm active:scale-95"
                  >
                    <span className="hidden sm:block font-bold">{t('catalog.btn_next')}</span> {/* 👈 PREVEDENO */}
                    <svg className="w-5 h-5 sm:ml-2 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}

            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
}

export default CatalogPage;