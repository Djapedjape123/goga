import { useState, useEffect, Suspense,lazy } from 'react'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom'

import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
// import Footer from './components/Footer';

const Footer = lazy(() => import('./components/Footer'));

// Ovde unesi tačno ime svog logo fajla iz assets foldera
import logo from './assets/gogaPoz.webp'


function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Posle 1.5 sekundi (1500ms) kreće animacija gašenja
    const fadeTimer = setTimeout(() => setFadeOut(true), 2000);
    // Posle tačno 2 sekunde (2000ms) potpuno brišemo beli ekran
    const hideTimer = setTimeout(() => setLoading(false), 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      {/* 1. UVODNI Beli Ekran (Splash Screen) */}
      {loading && (
        <div
          className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-500 ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
        >
          <img
            src={logo}
            alt="Logo"
            className="object-contain" // Možeš povećati w-48 u w-64 ako ti je logo mali
          />
        </div>
      )}

      {/* 2. TVOJ SAJT KAKAV JESTE (Bez ikakvih promena) */}
      <ScrollToTop />
      <NavBar />

      <main>
        <Suspense fallback={<div className="h-screen flex items-center justify-center bg-slate-900 text-white">Učitavanje...</div>}>
          <Outlet />
        </Suspense>
      </main>


      <WhatsAppButton />
      <Suspense fallback={<div className="h-64 w-full bg-[#05070a]"></div>}>
        <Footer />
      </Suspense>

    </>
  )
}

export default App