import React from "react";
import PriceSlider from "./PriceSlider";
import { useTranslation } from "react-i18next"; // 👈 IMPORT ZA PREVOD

const DEFAULT_FILTERS = {
  kategorija: "sve",
  minCena: "", 
  maxCena: "",
  minVisina: "",
  maxVisina: "",
  minNosivost: "",
  maxNosivost: "",
  minKapacitet: "",
  maxKapacitet: "",
  minDubinaKopanja: "",
  maxDubinaKopanja: "",
  minVisinaKopanja: "",
  maxVisinaKopanja: "",
  minVisinaIstovara: "",
  maxVisinaIstovara: "",
};

function FilterSidebar({
  filters = DEFAULT_FILTERS,
  setFilters = () => { },
  categories = [],
}) {
  const { t } = useTranslation(); // 👈 INICIJALIZACIJA PREVODA
  const safeFilters = { ...DEFAULT_FILTERS, ...filters };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!name) return;
    setFilters((prev) => ({
      ...prev,
      [name]: value ?? "",
    }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  // 👇 VRAĆENO NA TVOJE: "telehendleri"
  const showTelehenderFilters = safeFilters.kategorija === "telehendleri"; 
  const showMikserFilters = safeFilters.kategorija === "mini-mikseri";
  const showViljuskarFilters = safeFilters.kategorija === "viljuskari";
  const showMiniBagerFilters = safeFilters.kategorija === "mini-bageri";
  const showVelikiBagerFilters = safeFilters.kategorija === "bageri";

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-24">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl font-black text-slate-900">{t('filter_sidebar.title')}</h2>
        <button
          type="button"
          onClick={resetFilters}
          className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
        >
          {t('filter_sidebar.reset')}
        </button>
      </div>
      
      <div className="mb-8 pb-8 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">
          {t('filter_sidebar.price_range')}
        </h3>
        <PriceSlider 
          min={0} 
          max={150000} 
          step={500}
          initialMin={safeFilters.minCena}
          initialMax={safeFilters.maxCena}
          onChange={(min, max) => {
            setFilters(prev => ({ ...prev, minCena: min, maxCena: max }));
          }}
        />
      </div>

      {/* KATEGORIJA */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
          {t('filter_sidebar.category')}
        </h3>
        <div className="flex flex-col gap-2">
          {Array.isArray(categories) &&
            categories.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="kategorija"
                  value={cat}
                  checked={safeFilters.kategorija === cat}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
                <span
                  className={`text-slate-700 font-medium group-hover:text-blue-600 transition-colors ${safeFilters.kategorija === cat
                      ? "text-blue-600 font-bold"
                      : ""
                    }`}
                >
                  {cat === "sve"
                    ? t('filter_sidebar.all_machines')
                    : t(`filter_sidebar.categories.${cat}`, { defaultValue: String(cat).replace("-", " ") })}
                </span>
              </label>
            ))}
        </div>
      </div>

      {/* TELEHENDER FILTERI */}
      {showTelehenderFilters && (
        <>
          <div className="mb-8">
            <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-3">
              {t('filter_sidebar.lifting_height')}
            </h3>
            <div className="flex items-center gap-2">
              <input type="number" name="minVisina" value={safeFilters.minVisina} onChange={handleChange} placeholder={t('filter_sidebar.min')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all" />
              <span className="text-slate-400 font-bold">-</span>
              <input type="number" name="maxVisina" value={safeFilters.maxVisina} onChange={handleChange} placeholder={t('filter_sidebar.max')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all" />
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-3">
              {t('filter_sidebar.load_capacity')}
            </h3>
            <div className="flex items-center gap-2">
              <input type="number" name="minNosivost" value={safeFilters.minNosivost} onChange={handleChange} placeholder={t('filter_sidebar.min')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all" />
              <span className="text-slate-400 font-bold">-</span>
              <input type="number" name="maxNosivost" value={safeFilters.maxNosivost} onChange={handleChange} placeholder={t('filter_sidebar.max')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all" />
            </div>
          </div>
        </>
      )}

      {/* MIKSER FILTERI */}
      {showMikserFilters && (
        <div className="mb-6">
          <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-3">
            {t('filter_sidebar.mixing_capacity')}
          </h3>
          <div className="flex items-center gap-2">
            <input type="number" name="minKapacitet" value={safeFilters.minKapacitet} onChange={handleChange} placeholder={t('filter_sidebar.min')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all" />
            <span className="text-slate-400 font-bold">-</span>
            <input type="number" name="maxKapacitet" value={safeFilters.maxKapacitet} onChange={handleChange} placeholder={t('filter_sidebar.max')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all" />
          </div>
        </div>
      )}

      {/* MINI BAGERI FILTERI */}
      {showMiniBagerFilters && (
        <>
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-3">
              {t('filter_sidebar.digging_depth')}
            </h3>
            <div className="flex items-center gap-2">
              <input type="number" name="minDubinaKopanja" value={safeFilters.minDubinaKopanja} onChange={handleChange} placeholder={t('filter_sidebar.min')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all" />
              <span className="text-slate-400 font-bold">-</span>
              <input type="number" name="maxDubinaKopanja" value={safeFilters.maxDubinaKopanja} onChange={handleChange} placeholder={t('filter_sidebar.max')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all" />
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-3">
              {t('filter_sidebar.digging_height')}
            </h3>
            <div className="flex items-center gap-2">
              <input type="number" name="minVisinaKopanja" value={safeFilters.minVisinaKopanja} onChange={handleChange} placeholder={t('filter_sidebar.min')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all" />
              <span className="text-slate-400 font-bold">-</span>
              <input type="number" name="maxVisinaKopanja" value={safeFilters.maxVisinaKopanja} onChange={handleChange} placeholder={t('filter_sidebar.max')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all" />
            </div>
          </div>
        </>
      )}

      {/* VELIKI BAGERI FILTERI */}
      {showVelikiBagerFilters && (
        <>
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-3">
              {t('filter_sidebar.digging_depth')}
            </h3>
            <div className="flex items-center gap-2">
              <input type="number" name="minDubinaKopanja" value={safeFilters.minDubinaKopanja} onChange={handleChange} placeholder={t('filter_sidebar.min')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all" />
              <span className="text-slate-400 font-bold">-</span>
              <input type="number" name="maxDubinaKopanja" value={safeFilters.maxDubinaKopanja} onChange={handleChange} placeholder={t('filter_sidebar.max')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all" />
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-3">
              {t('filter_sidebar.dumping_height')}
            </h3>
            <div className="flex items-center gap-2">
              <input type="number" name="minVisinaIstovara" value={safeFilters.minVisinaIstovara} onChange={handleChange} placeholder={t('filter_sidebar.min')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all" />
              <span className="text-slate-400 font-bold">-</span>
              <input type="number" name="maxVisinaIstovara" value={safeFilters.maxVisinaIstovara} onChange={handleChange} placeholder={t('filter_sidebar.max')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all" />
            </div>
          </div>
        </>
      )}

      {/* VILJUŠKARI FILTERI */}
      {showViljuskarFilters && (
        <div className="mb-6">
          <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-3">
            {t('filter_sidebar.load_capacity')}
          </h3>
          <div className="flex items-center gap-2">
            <input type="number" name="minNosivost" value={safeFilters.minNosivost} onChange={handleChange} placeholder={t('filter_sidebar.min')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all" />
            <span className="text-slate-400 font-bold">-</span>
            <input type="number" name="maxNosivost" value={safeFilters.maxNosivost} onChange={handleChange} placeholder={t('filter_sidebar.max')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all" />
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterSidebar;