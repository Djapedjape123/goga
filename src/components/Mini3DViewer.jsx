import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Html } from '@react-three/drei';

const CATEGORY_MODELS = {
    "viljuskari": "/models/viliskar-v1.glb",
    "mini-bageri": "/models/miniBager-v1.glb",
    "bageri": "/models/bagerV-v1.glb",
    "mini-mikseri": "/models/mixer-v1.glb",
    "kosilice": "/models/kosilica-v1.glb",
    "telehenderi": "/models/tekegDD-v1.glb",
};

function Model({ putanja }) {
    const { scene } = useGLTF(putanja);
    return <primitive object={scene} scale={1} position={[0, 0, 0]} />;
}

export default function Mini3DViewer({ kategorija }) {
    const [error, setError] = useState(null);
    const modelPath = CATEGORY_MODELS[kategorija];

    // Preload samo kad se komponenta montira
    // Preload samo kad se komponenta montira
    useEffect(() => {
        if (modelPath) {
            // Samo pozivamo preload, bez .catch() jer ne vraća Promise
            try {
                useGLTF.preload(modelPath);
            } catch (err) {
                console.error("Desila se greška pri učitavanju modela", err);
                setError("Model ne može biti učitan");
            }
        }
    }, [modelPath]);

    if (!modelPath) return null;
    if (error) return (
        <div className="w-full h-48 md:h-64 bg-red-50 rounded-3xl border border-red-200 flex items-center justify-center">
            <p className="text-red-600 font-medium">⚠️ {error}</p>
        </div>
    );

    return (
        <div className="w-full h-48 md:h-64 bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-3xl border border-blue-100 shadow-inner mb-8 relative overflow-hidden flex items-center justify-center">

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
                    enableZoom={false}
                    makeDefault
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 2}
                />
            </Canvas>
        </div>
    );
}