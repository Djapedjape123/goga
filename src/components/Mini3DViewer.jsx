import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Html } from '@react-three/drei';

// Mapa koja povezuje tvoje kategorije iz filtera sa 3D modelima
const CATEGORY_MODELS = {
  "viljuskari": "/models/viliskar-v1.glb",
  "mini-bageri": "/models/miniBager-v1.glb",
  "bageri": "/models/bagerV-v1.glb",
  "mini-mikseri": "/models/mixer-v1.glb"
};

function Model({ putanja }) {
  const { scene } = useGLTF(putanja);
  return <primitive object={scene} scale={1} position={[0, 0, 0]} />;
}

export default function Mini3DViewer({ kategorija }) {
  const modelPath = CATEGORY_MODELS[kategorija];

  // Ako za tu kategoriju nemamo model (npr. 'sve' ili 'telehenderi'), ne prikazuj ništa
  if (!modelPath) return null;

  return (
    <div className="w-full h-48 md:h-64 bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-3xl border border-blue-100 shadow-inner mb-8 relative overflow-hidden flex items-center justify-center">
      
      {/* Mali informativni bedž */}
      <div className="absolute top-4 left-6 z-10">
        <span className="bg-blue-600 text-white text-[10px] uppercase tracking-widest font-black px-3 py-1 rounded-full shadow-md">
          3D Prikaz Kategorije
        </span>
      </div>

      <Canvas shadows dpr={[1, 2]} camera={{ position: [4, 2, 5], fov: 45 }}>
        <Suspense fallback={
          <Html center>
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </Html>
        }>
          <Stage environment="city" intensity={0.5} adjustCamera>
            <Model putanja={modelPath} />
          </Stage>
        </Suspense>

        <OrbitControls 
          autoRotate 
          autoRotateSpeed={1.5} 
          enableZoom={false} // JAKO BITNO: isključeno da korisnik može normalno da skrola katalog na dole!
          makeDefault 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2} 
        />
      </Canvas>
    </div>
  );
}

// Preload da bude brzo kad se pojavi
Object.values(CATEGORY_MODELS).forEach((putanja) => {
  useGLTF.preload(putanja);
});