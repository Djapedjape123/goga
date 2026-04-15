import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import ReactGA from "react-ga4";
ReactGA.initialize("G-RK7FY6C2FN");

//prevod
import './i18n';

// 👇 ДОДАТО: Увезен useRouteError
import { createBrowserRouter, RouterProvider, useRouteError } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

// --- SVE STRANICE SU SADA LAZY LOADED ---
const HomePage = lazy(() => import('./pages/HomePege.jsx'));
const CatalogPage = lazy(() => import('./pages/CatalogPage.jsx'));
const SinglePege = lazy(() => import('./pages/SinglePege.jsx'));
const FavoritePege = lazy(() => import('./pages/FavoritePege.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));


// Zajednička komponenta za učitavanje (da kod bude uredniji)
const Loader = ({ tekst }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
    <p className="text-xl font-bold text-slate-700">{tekst}...</p>
  </div>
);

// 👇 ДОДАТО: Глобална страница за грешке (лепша од белог екрана смрти)
const GlobalError = () => {
  const error = useRouteError();
  console.error("Глобална грешка:", error);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
      <div className="text-6xl mb-4">🔧</div>
      <h1 className="text-3xl font-black text-slate-800 mb-2">Упс, дошло је до прекида!</h1>
      <p className="text-slate-500 mb-6">Проверите интернет конекцију или покушајте поново.</p>
      <button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-colors">
        Освежи страницу
      </button>
    </div>
  );
};

// Rute sa Suspense omotačima
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <GlobalError />, // 👈 ДОДАТО: Ово спречава "Unexpected Application Error!" екран
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Loader tekst="Učitavam početnu" />}>
            <HomePage />
          </Suspense>
        )
      },
      {
        path: '/katalog',
        element: (
          <Suspense fallback={<Loader tekst="Učitavam katalog" />}>
            <CatalogPage />
          </Suspense>
        )
      },
      {
        path: "/masina/:slug",
        element: (
          <Suspense fallback={<Loader tekst="Pripremam detalje mašine" />}>
            <SinglePege />
          </Suspense>
        )
      },
      {
        path: "/favorite",
        element: (
          <Suspense fallback={<Loader tekst="Omiljene mašine" />}>
            <FavoritePege />
          </Suspense>
        )
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<Loader tekst="Učitavam kontakt" />}>
            <Contact />
          </Suspense>
        )
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>,
)