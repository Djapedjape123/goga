
import { Suspense } from 'react'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <NavBar />
      
      <main> 
        <Suspense fallback={<div className="h-screen flex items-center justify-center bg-slate-900 text-white">Učitavanje...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  )
}

export default App