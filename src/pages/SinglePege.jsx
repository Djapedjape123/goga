import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { sveMasine } from '../data/sveMasine';
import MachineMarquee from '../components/MachineMarquee';
import { useTranslation } from 'react-i18next'; // 👈 IMPORT ZA PREVOD
import SEO from '../components/SEO'; // 👈 DODATO: Import naše SEO komponente

// Pomoćna funkcija za formatiranje ključeva iz baze (čuvamo kao "plan B")
const formatKey = (key) => {
  const result = key.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

function SinglePege() {
  const { slug } = useParams();
  const masina = sveMasine.find((m) => m.slug === slug);
  const { t } = useTranslation(); // 👈 INICIJALIZACIJA PREVODA

  const [glavnaSlika, setGlavnaSlika] = useState(null);

  // --- STATE ZA MODAL FORMU ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // --- STATE ZA MODAL SLIKE (SLAJDER) ---
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (masina) setGlavnaSlika(masina.coverSlika);
  }, [slug, masina]);

  // --- LOGIKA ZA SLAJDER U MODALU ---
  const openImageModal = () => {
    if (masina?.galerija) {
      const index = masina.galerija.indexOf(glavnaSlika);
      setCurrentImageIndex(index !== -1 ? index : 0);
    }
    setIsImageModalOpen(true);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (!masina?.galerija) return;
    setCurrentImageIndex((prev) =>
      prev === masina.galerija.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (!masina?.galerija) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? masina.galerija.length - 1 : prev - 1
    );
  };

  // --- LOGIKA ZA SLANJE FORME ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    const formData = new FormData(e.target);
    // 👈 PREVEDEN SUBJEKAT EMAILA
    formData.append('_subject', `${t('single_page.email_subject')} ${masina.naziv}`);
    formData.append('_captcha', 'false');

    try {
      const response = await fetch("https://formsubmit.co/sales@masine.ai", {
        method: "POST",
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      if (response.ok) {
        setStatusMessage('uspeh');
        e.target.reset();

        setTimeout(() => {
          setIsModalOpen(false);
          setStatusMessage('');
        }, 3000);
      } else {
        setStatusMessage('greska');
      }
    } catch (error) {
      console.error(error);
      setStatusMessage('greska');
    } finally {
      setIsSubmitting(false);
      if (statusMessage === 'greska') {
        setTimeout(() => setStatusMessage(''), 5000);
      }
    }
  };

  if (!masina) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="text-6xl mb-4 text-slate-300">🚜</div>
        <h1 className="text-4xl font-black text-slate-800 mb-4">{t('single_page.not_found')}</h1>
        <Link to="/katalog" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
          {t('single_page.back_to_catalog')}
        </Link>
      </div>
    );
  }

  // 👇 DODATO: Generisanje Structured Data (JSON-LD) za Google 👇
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": masina.naziv,
    "image": `https://masine.ai${masina.coverSlika}`,
    "description": t(`descriptions.${masina.id}`, { defaultValue: masina.opis }),
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      // Čistimo sve osim brojeva za Google (ako je "Na upit", šalje 0)
      "price": String(masina.cena).replace(/[^0-9]/g, '') || "0",
      "availability": "https://schema.org/InStock",
      "url": typeof window !== 'undefined' ? window.location.href : `https://masine.ai/masina/${masina.slug}`
    }
  };

  const modalSlika = masina?.galerija?.[currentImageIndex] || glavnaSlika;
  const imaViseSlika = masina?.galerija?.length > 1;

  return (
    <>
      {/* 👇 DODATO: SEO KOMPONENTA SA SCHEMA KODOM 👇 */}
      {/* 👇 DODATO: SEO KOMPONENTA SA SCHEMA KODOM 👇 */}
      <SEO
        title={`${masina.naziv} | Masine.ai`}
        description={t(`descriptions.${masina.id}`, { defaultValue: masina.opis })}
        type="product"
        image={`https://masine.ai${masina.coverSlika}`} // 👈 ИСПРАВЉЕНО
        schema={productSchema}
      />

      <div className="min-h-screen bg-slate-200 pt-32 py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">

          {/* BREADCRUMBS */}
          <nav className="mb-8 flex items-center gap-2 text-sm font-bold tracking-wide">
            <Link to="/katalog" className="text-slate-400 hover:text-blue-600 transition-colors">{t('single_page.breadcrumb_catalog')}</Link>
            <span className="text-slate-300">/</span>
            {/* 👈 PAMETNO KORISTI PREVOD KATEGORIJA IZ FILTERA KOJI VEĆ IMAMO */}
            <span className="text-slate-400 capitalize">{t(`filter_sidebar.categories.${masina.kategorija}`, { defaultValue: masina.kategorija.replace("-", " ") })}</span>
            <span className="text-slate-300">/</span>
            <span className="text-blue-600">{masina.naziv}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* LEVA STRANA: GALERIJA */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-6"
            >
              <div
                onClick={openImageModal}
                className="relative aspect-square bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm flex items-center justify-center overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-3 rounded-2xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg z-20">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>

                <img
                  src={glavnaSlika}
                  alt={masina.naziv}
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                {masina.galerija?.length > 0 ? (
                  masina.galerija.map((slika, index) => (
                    <button
                      key={index}
                      onClick={() => setGlavnaSlika(slika)}
                      className={`aspect-square bg-white rounded-2xl p-2 border-2 transition-all duration-300 overflow-hidden
          ${glavnaSlika === slika ? 'border-blue-600 scale-95 shadow-inner' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <img
                        src={slika || "/placeholder.webp"}
                        alt={`${masina.naziv} ${index}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))
                ) : (
                  <div className="text-slate-400 text-sm col-span-4">
                    {t('single_page.no_images')} {/* 👈 PREVEDENO */}
                  </div>
                )}
              </div>
            </motion.div>

            {/* DESNA STRANA: PODACI */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <div className="mb-8">
                <span className="inline-block px-4 py-1 bg-blue-50 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] rounded-full mb-4 border border-blue-100">
                  {t('single_page.new_badge')} • 2026 {/* 👈 PREVEDENO */}
                </span>
                <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">{masina.naziv}</h1>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-blue-600">{masina.cena}</span>
                  {masina.cena !== "Na upit" && <span className="text-slate-400 font-bold text-lg">{t('single_page.plus_vat')}</span>}
                </div>
              </div>

              <p className="text-lg text-slate-500 leading-relaxed mb-10 font-medium italic border-l-4 border-blue-100 pl-4">
                {t(`descriptions.${masina.id}`, { defaultValue: masina.opis })}
              </p>

              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm mb-10">
                <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                  <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                  {t('single_page.tech_details')} {/* 👈 PREVEDENO */}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                  {Object.entries(masina.specifikacije || {}).map(([key, value]) => {
                    if (value == null) return null;
                    return (
                      <SpecItem
                        key={key}
                        // 👇 PAMETAN PREVOD: Prvo traži prevod ključa iz baze, a ako ga nema koristi formatKey funkciju! 👇
                        label={t(`single_page.specs.${key}`, { defaultValue: formatKey(key) })}
                        value={value}
                        unit={key === 'visinaDizanja' ? 'm' : key === 'nosivost' ? 'kg' : key === 'kapacitetMesanja' ? 'm³' : ''}
                      />
                    );
                  })}
                  <SpecItem label={t('single_page.condition')} value={t('single_page.condition_new')} /> {/* 👈 PREVEDENO */}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex-[2] bg-slate-900 hover:bg-blue-600 text-white font-black py-5 px-8 rounded-2xl transition-all duration-300 shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 group"
                >
                  {t('single_page.btn_quote')} {/* 👈 PREVEDENO */}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <a href="tel:+38162746324" className="flex-1 bg-white border-2 border-slate-100 hover:border-blue-600 text-slate-900 font-black py-5 px-8 rounded-2xl transition-all duration-300 text-center flex items-center justify-center">
                  {t('single_page.btn_call')} {/* 👈 PREVEDENO */}
                </a>
              </div>
            </motion.div>

          </div>
          <MachineMarquee currentSlug={masina.slug} />
        </div>

        {/* --- MODAL ZA PREGLED SLIKE (SLAJDER) --- */}
        <AnimatePresence>
          {isImageModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsImageModalOpen(false)}
                className="absolute inset-0 bg-slate-900/95 backdrop-blur-md cursor-pointer"
              />

              <button
                onClick={() => setIsImageModalOpen(false)}
                className="absolute top-6 right-6 z-[110] text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {imaViseSlika && (
                <button
                  onClick={prevImage}
                  className="absolute left-4 sm:left-8 z-[110] text-white/50 hover:text-white bg-white/5 hover:bg-white/20 p-4 rounded-full backdrop-blur-md transition-all active:scale-95"
                >
                  <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none"
              >
                <img
                  src={modalSlika}
                  alt={masina.naziv}
                  className="max-w-full max-h-[80vh] md:max-h-[85vh] object-contain drop-shadow-2xl pointer-events-auto"
                />
                {imaViseSlika && (
                  <div className="mt-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/80 text-sm font-bold tracking-widest pointer-events-auto">
                    {currentImageIndex + 1} / {masina.galerija.length}
                  </div>
                )}
              </motion.div>

              {imaViseSlika && (
                <button
                  onClick={nextImage}
                  className="absolute right-4 sm:right-8 z-[110] text-white/50 hover:text-white bg-white/5 hover:bg-white/20 p-4 rounded-full backdrop-blur-md transition-all active:scale-95"
                >
                  <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

            </div>
          )}
        </AnimatePresence>

        {/* --- MODAL ZA FORMU --- */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              ></motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white rounded-[2rem] p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10"
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition-colors bg-slate-100 hover:bg-slate-200 p-2 rounded-full z-20"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="mb-8">
                  <h3 className="text-2xl font-black text-slate-900">{t('single_page.modal_title')}</h3> {/* 👈 PREVEDENO */}
                  <p className="text-slate-500 font-medium mt-1">{t('single_page.modal_for')} <span className="text-blue-600 font-bold">{masina.naziv}</span></p> {/* 👈 PREVEDENO */}
                </div>

                {statusMessage === 'uspeh' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3 font-bold">
                    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {t('single_page.success_msg')} {/* 👈 PREVEDENO */}
                  </div>
                )}
                {statusMessage === 'greska' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-bold">
                    {t('single_page.error_msg')} {/* 👈 PREVEDENO */}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-slate-700 text-sm font-bold mb-1 ml-1 block">{t('single_page.form_name')}</label> {/* 👈 PREVEDENO */}
                    <input
                      type="text"
                      name="Ime"
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder={t('single_page.form_name_ph')} /* 👈 PREVEDENO */
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-slate-700 text-sm font-bold mb-1 ml-1 block">{t('single_page.form_email')}</label> {/* 👈 PREVEDENO */}
                      <input
                        type="email"
                        name="Email"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder={t('single_page.form_email_ph')} /* 👈 PREVEDENO */
                      />
                    </div>
                    <div>
                      <label className="text-slate-700 text-sm font-bold mb-1 ml-1 block">{t('single_page.form_phone')}</label> {/* 👈 PREVEDENO */}
                      <input
                        type="tel"
                        name="Telefon"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder={t('single_page.form_phone_ph')} /* 👈 PREVEDENO */
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-700 text-sm font-bold mb-1 ml-1 block">{t('single_page.form_msg')}</label> {/* 👈 PREVEDENO */}
                    <textarea
                      name="Poruka"
                      rows="3"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                      placeholder={t('single_page.form_msg_ph')} /* 👈 PREVEDENO */
                    ></textarea>
                  </div>

                  <button
                    disabled={isSubmitting || statusMessage === 'uspeh'}
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t('single_page.btn_sending') : t('single_page.btn_send')} {/* 👈 PREVEDENO */}
                  </button>
                </form>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}

// Poboljšana pomoćna komponenta za specifikacije
function SpecItem({ label, value, unit }) {
  return (
    <div className="flex flex-col border-b border-slate-50 pb-2 group/spec transition-colors hover:border-blue-100">
      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1 group-hover/spec:text-blue-400 transition-colors">
        {label}
      </span>
      <span className="text-slate-800 font-extrabold flex gap-1">
        {value} <span className="text-blue-600/50">{unit}</span>
      </span>
    </div>
  );
}

export default SinglePege;