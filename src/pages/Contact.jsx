import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Facebook, Instagram, 
  Copy, CheckCircle, Briefcase, MessageSquare, Send
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO'; // 👈 DODATO: Import SEO komponente

const Contact = () => {
  // Stanja za formu
  const [activeForm, setActiveForm] = useState('kontakt'); // 'kontakt' ili 'saradnja'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const { t } = useTranslation();
  
  // Stanje za kopiranje maila
  const [copied, setCopied] = useState(false);

  const emailAdresa = "sales@masine.ai";

  // Funkcija za brzo kopiranje maila
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAdresa);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Tvoja prilagođena logika za slanje
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    const formData = new FormData(e.target);
    
    // Dinamički Subject u zavisnosti od forme!
    const subjectText = activeForm === 'saradnja' 
      ? `[SARADNJA] Novi B2B upit od: ${formData.get('Ime/Firma')}`
      : `[KONTAKT] Novo pitanje sa sajta od: ${formData.get('Ime')}`;
      
    formData.append('_subject', subjectText);
    formData.append('_captcha', 'false'); // Isključujemo dosadni reCaptcha

    try {
      const response = await fetch("https://formsubmit.co/sales@masine.ai", {
        method: "POST",
        headers: { 'Accept': 'application/json' },
        body: formData
      });

      if (response.ok) {
        setStatusMessage('uspeh');
        e.target.reset(); 
        setTimeout(() => setStatusMessage(''), 5000);
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

 return (
    <>
      {/* 👇 DODATO: SEO KOMPONENTA ZA KONTAKT STRANU 👇 */}
      <SEO 
        title={t('contact_page.seo_title', { defaultValue: "Kontakt | Masine.ai" })}
        description={t('contact_page.seo_desc', { defaultValue: "Kontaktirajte nas za sva pitanja u vezi građevinskih mašina. Bilo da imate brzo pitanje ili želite B2B saradnju, tu smo za vas." })}
      />

      <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* LEVA STRANA: Informacije i Mreže */}
          <div className="flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                {t('contact_page.title_1')} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {t('contact_page.title_highlight')}
                </span>
              </h1>
              <p className="text-slate-600 text-lg mb-10 max-w-md">
                {t('contact_page.subtitle')}
              </p>

              {/* Kontakt Kartice */}
              <div className="space-y-6 mb-12">
                {/* Mail Kartica sa Copy opcijom */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{t('contact_page.email_label')}</p>
                      <a href={`mailto:${emailAdresa}`} className="text-slate-600 hover:text-blue-600 transition-colors">
                        {emailAdresa}
                      </a>
                    </div>
                  </div>
                  <button 
                    onClick={handleCopyEmail}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    title="Kopiraj email"
                  >
                    {copied ? <CheckCircle size={20} className="text-green-500" /> : <Copy size={20} />}
                  </button>
                </div>

                {/* Telefon Kartica */}
                <a href="tel:+38162746324" className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{t('contact_page.phone_label')}</p>
                    <span  className="text-slate-600 group-hover:text-blue-600 transition-colors">
                      +381 62 746 324
                    </span>
                  </div>
                </a>

              </div>

              {/* Društvene mreže - Glow efekti */}
              <div>
                <p className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">{t('contact_page.social_label')}</p>
                <div className="flex gap-4">
                  <a href="https://www.facebook.com/share/18NMx3qFG1/" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-600 shadow-sm hover:border-[#1877F2] hover:text-[#1877F2] hover:shadow-[0_0_15px_rgba(24,119,242,0.3)] transition-all">
                    <Facebook size={24} />
                  </a>
                  <a href="https://www.instagram.com/masine.ai/" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-600 shadow-sm hover:border-[#E4405F] hover:text-[#E4405F] hover:shadow-[0_0_15px_rgba(228,64,95,0.3)] transition-all">
                    <Instagram size={24} />
                  </a>
                </div>
              </div>

            </motion.div>
          </div>

          {/* DESNA STRANA: Interaktivna Forma */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 relative overflow-hidden"
          >
            {/* Prekidač (Toggle) */}
            <div className="flex p-1 bg-slate-100 rounded-2xl mb-8 relative">
              <button
                onClick={() => setActiveForm('kontakt')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all z-10 ${activeForm === 'kontakt' ? 'text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <MessageSquare size={18} /> {t('contact_page.tab_quick')}
              </button>
              <button
                onClick={() => setActiveForm('saradnja')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all z-10 ${activeForm === 'saradnja' ? 'text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Briefcase size={18} /> {t('contact_page.tab_b2b')}
              </button>
              {/* Animirani pozadinski pill */}
              <div 
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-xl shadow-sm transition-all duration-300 ease-out ${activeForm === 'kontakt' ? 'left-1' : 'left-[calc(50%+2px)]'}`}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence mode="wait">
                {/* FORMA 1: KONTAKT */}
                {activeForm === 'kontakt' && (
                  <motion.div
                    key="kontakt"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">{t('contact_page.label_name')}</label>
                      <input type="text" name="Ime" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder={t('contact_page.ph_name')} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">{t('contact_page.label_email')}</label>
                      <input type="email" name="Email" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder={t('contact_page.ph_email')} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">{t('contact_page.label_message')}</label>
                      <textarea name="Poruka" required rows="4" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" placeholder={t('contact_page.ph_message')}></textarea>
                    </div>
                  </motion.div>
                )}

                {/* FORMA 2: SARADNJA */}
                {activeForm === 'saradnja' && (
                  <motion.div
                    key="saradnja"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">{t('contact_page.label_company')}</label>
                        <input type="text" name="Ime/Firma" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder={t('contact_page.ph_company')} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">{t('contact_page.label_pib')}</label>
                        <input type="text" name="PIB" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="10XXXXXXX" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">{t('contact_page.label_sector')}</label>
                      <select name="Delatnost" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 cursor-pointer appearance-none">
                        <option value="Građevina">{t('contact_page.sector_construction')}</option>
                        <option value="Poljoprivreda">{t('contact_page.sector_agriculture')}</option>
                        <option value="Magacin/Logistika">{t('contact_page.sector_logistics')}</option>
                        <option value="Komunalno">{t('contact_page.sector_utility')}</option>
                        <option value="Drugo">{t('contact_page.sector_other')}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">{t('contact_page.label_work_email')}</label>
                      <input type="email" name="Email" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder={t('contact_page.ph_work_email')} />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">{t('contact_page.label_needs')}</label>
                      <textarea name="Poruka" required rows="4" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" placeholder={t('contact_page.ph_needs')}></textarea>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dugme za slanje + Status Poruke */}
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>{t('contact_page.btn_send')} <Send size={18} /></>
                  )}
                </button>

                {/* Animacija Uspeha / Greške */}
                <AnimatePresence>
                  {statusMessage === 'uspeh' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="mt-4 p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-2 border border-green-200"
                    >
                      <CheckCircle size={20} />
                      <span className="font-medium text-sm">{t('contact_page.msg_success')}</span>
                    </motion.div>
                  )}
                  {statusMessage === 'greska' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200"
                    >
                      <span className="font-medium text-sm">{t('contact_page.msg_error')}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </form>
          </motion.div>

        </div>
      </div>
    </>
  );
}

export default Contact;