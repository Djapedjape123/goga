import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

//prevod
import './i18n'; 

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
// import FavoritePege from './pages/FavoritePege.jsx';

// --- OBRISANI OBIČNI IMPORTI ---
// import CatalogPage from './pages/CatalogPage.jsx';
// import SinglePege from './pages/SinglePege.jsx';

// --- SVE STRANICE SU SADA LAZY LOADED ---
const HomePage = lazy(() => import('./pages/HomePege.jsx'));
const CatalogPage = lazy(() => import('./pages/CatalogPage.jsx'));
const SinglePege = lazy(() => import('./pages/SinglePege.jsx'));
const FavoritePege = lazy(() => import('./pages/FavoritePege.jsx'));

// Zajednička komponenta za učitavanje (da kod bude uredniji)
const Loader = ({ tekst }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
    <p className="text-xl font-bold text-slate-700">{tekst}...</p>
  </div>
);

// Rute sa Suspense omotačima
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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