import { StrictMode, lazy } from 'react' // DODALI SMO 'lazy'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

//prevod
import './i18n'; 

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

// --- OVO JE TAJNA: LAZY LOADING ---
// Umesto klasičnog importa, React će ove fajlove "povući" tek kada zatrebaju
const HomePage = lazy(() => import('./pages/HomePege.jsx'));


// Rute ostaju potpuno iste!
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { 
        path: '/',
       element: <HomePage /> 
      },

      // Ostatak ruta ostaje nepromenjen
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
