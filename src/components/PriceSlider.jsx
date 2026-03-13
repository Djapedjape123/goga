import React, { useState, useEffect, useRef } from "react";

const PriceSlider = ({ min, max, step, initialMin, initialMax, onChange }) => {
    // 1. KORISTIMO ?? UMESTO || (dozvoljava da 0 bude validna vrednost)
    const [minVal, setMinVal] = useState(initialMin ?? min);
    const [maxVal, setMaxVal] = useState(initialMax ?? max);
    const minValRef = useRef(initialMin ?? min);
    const maxValRef = useRef(initialMax ?? max);
    const range = useRef(null);

    // 2. ŠTITIMO SE OD DELJENJA NULOM
    const getPercent = (value) => {
        if (max === min) return 0;
        return Math.round(((value - min) / (max - min)) * 100);
    };

    // Pomeranje plave trake u sredini
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, min, max]);

    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, min, max]);

    // 3. DEBOUNCING: Šaljemo podatke roditelju tek kad korisnik prestane da pomera.
    // OBAVEZNO bez onChange u array-u ispod, da ne bi rušilo paginaciju!
    useEffect(() => {
        const handler = setTimeout(() => {
            if (typeof onChange === 'function') {
                onChange(minVal, maxVal);
            }
        }, 300);
        return () => clearTimeout(handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [minVal, maxVal]); 

    // Resetovanje i sinhronizacija spoljnih filtera
    useEffect(() => {
        if (initialMin === "" || initialMin == null) {
            setMinVal(min);
            minValRef.current = min;
        } else {
            setMinVal(initialMin);
            minValRef.current = initialMin;
        }

        if (initialMax === "" || initialMax == null) {
            setMaxVal(max);
            maxValRef.current = max;
        } else {
            setMaxVal(initialMax);
            maxValRef.current = initialMax;
        }
    }, [initialMin, initialMax, min, max]);

    return (
        <div className="relative w-full pb-2">

            {/* 1. PRIKAZ CENA (Moderni bedževi iznad klizača) */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Od</span>
                    <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl shadow-sm text-sm font-black text-slate-700 w-24 text-center">
                        {minVal.toLocaleString()} €
                    </div>
                </div>

                {/* Dekorativna crtica između */}
                <div className="w-4 h-[2px] bg-slate-200 mt-4 rounded-full"></div>

                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Do</span>
                    <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl shadow-sm text-sm font-black text-blue-700 w-24 text-center ring-1 ring-blue-500/20">
                        {maxVal.toLocaleString()} €
                    </div>
                </div>
            </div>

            {/* 2. SKRIVENI PRAVI KLIZAČI */}
            <div className="relative h-2 w-full">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={minVal}
                    aria-label="Minimalna cena"
                    aria-valuemin={min}
                    aria-valuemax={max}
                    aria-valuenow={minVal}
                    onChange={(event) => {
                        const value = Math.min(Number(event.target.value), maxVal - step);
                        setMinVal(value);
                        minValRef.current = value;
                    }}
                    className="thumb thumb--left"
                    style={{ zIndex: minVal > max - 100 ? "5" : "3" }}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={maxVal}
                    aria-label="Maksimalna cena"
                    aria-valuemin={min}
                    aria-valuemax={max}
                    aria-valuenow={maxVal}
                    onChange={(event) => {
                        const value = Math.max(Number(event.target.value), minVal + step);
                        setMaxVal(value);
                        maxValRef.current = value;
                    }}
                    className="thumb thumb--right"
                    style={{ zIndex: "4" }}
                />

                {/* 3. VIZUELNI DEO KLIZAČA */}
                <div className="slider">
                    <div className="slider__track" />
                    <div ref={range} className="slider__range" />
                </div>
            </div>

            {/* CSS STILOVI */}
            <style>{`
        .thumb,
        .thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent;
        }
        .thumb {
          pointer-events: none;
          position: absolute;
          height: 0;
          width: 100%;
          outline: none;
        }
        .thumb--left { z-index: 3; }
        .thumb--right { z-index: 4; }
        
        /* Za bolji odziv na mobilnim uređajima, dodajemo pointer-events: all samo na thumb */
        .thumb::-webkit-slider-thumb {
          background-color: #ffffff;
          border: 3px solid #2563eb; 
          border-radius: 50%;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          cursor: pointer;
          height: 24px;
          width: 24px;
          margin-top: 4px; 
          pointer-events: all;
          position: relative;
          transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
        }
        .thumb::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.2), 0 4px 6px -2px rgba(37, 99, 235, 0.1);
        }
        .thumb::-webkit-slider-thumb:active {
          transform: scale(0.95);
          background-color: #eff6ff;
        }

        .thumb::-moz-range-thumb {
          background-color: #ffffff;
          border: 3px solid #2563eb;
          border-radius: 50%;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          height: 24px;
          width: 24px;
          pointer-events: all;
          position: relative;
          transition: transform 0.1s;
        }
        
        .slider { position: relative; width: 100%; }
        .slider__track, .slider__range {
          position: absolute;
          border-radius: 9999px;
          height: 6px;
          top: 50%;
          transform: translateY(-50%);
        }
        .slider__track { 
          background-color: #e2e8f0; 
          width: 100%; 
          z-index: 1; 
        }
        .slider__range { 
          background: linear-gradient(to right, #3b82f6, #4f46e5); 
          z-index: 2; 
        }
      `}</style>
        </div>
    );
};

export default PriceSlider;