import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  // === SRPSKI ===
  sr: {
    translation: {
      nav: {
        home: "Početna",
        catalog: "Katalog",
        consulting: "Konsultacije",
        contact: "Kontakt"
      },
      home: {
        badge: "Lideri u mehanizaciji",
        title_1: "SNAGA KOJA",
        title_2: "POKREĆE",
        title_highlight: "POSAO",
        subtitle: "Pouzdan izbor građevinskih mašina i poljoprivredne mehanizacije. Vrhunski brendovi spremni za najteže terenske izazove.",
        btn_catalog: "Pogledaj Katalog",
        btn_consulting: "Zakaži Konsultacije"
      }
      // Ovde ćemo kasnije dodavati prevode za katalog, footer, itd.
    }
  },

  // === ENGLESKI ===
  en: {
    translation: {
      nav: {
        home: "Home",
        catalog: "Catalog",
        consulting: "Consulting",
        contact: "Contact"
      },
      home: {
        badge: "Leaders in machinery",
        title_1: "POWER THAT",
        title_2: "DRIVES",
        title_highlight: "BUSINESS",
        subtitle: "Reliable choice of construction and agricultural machinery. Top brands ready for the toughest field challenges.",
        btn_catalog: "View Catalog",
        btn_consulting: "Book Consultation"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng:"sr",
    fallbackLng: "sr", // Ako nešto nije prevedeno, prikaži srpski
    interpolation: {
      escapeValue: false // React već sam štiti od XSS napada
    }
  });

export default i18n;