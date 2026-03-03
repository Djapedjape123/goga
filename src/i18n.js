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
      },
      // DODAT PREVOD ZA SEKCIJU "O NAMA"
      about: {
        badge: "O Masine.ai",
        title_1: "Više od opreme, vaše ",
        title_highlight: "strateško partnerstvo",
        subtitle: "Masine.ai nije samo prodaja mašina – to je strateško partnerstvo u razvoju vašeg biznisa.",
        box_text: "Vaša veza između ambicije i konkretne, pouzdane realizacije.",
        item1_title: "Premium izvori",
        item1_text: "Donosimo premium industrijsku opremu iz pouzdanih izvora širom Evrope i sveta, uz potpunu kontrolu kvaliteta i procesa nabavke.",
        item2_title: "Individualni pristup",
        item2_text: "Razumemo da je svaka investicija u mašine odluka koja definiše budući rast, zato pristupamo svakom projektu individualno i odgovorno.",
        item3_title: "Sigurnost i efikasnost",
        item3_text: "Ako tražite sigurnost, efikasnost i partnera koji govori jezik industrije – na pravom ste mestu. Masine.ai je vaša veza između ambicije i konkretne, pouzdane realizacije."
      }
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
      },
      // DODAT PREVOD ZA SEKCIJU "O NAMA"
      about: {
        badge: "About Masine.ai",
        title_1: "More than equipment, your ",
        title_highlight: "strategic partnership",
        subtitle: "Masine.ai is not just about selling machines – it is a strategic partnership in developing your business.",
        box_text: "Your connection between ambition and concrete, reliable realization.",
        item1_title: "Premium sources",
        item1_text: "We bring premium industrial equipment from reliable sources across Europe and the world, with complete control over quality and the procurement process.",
        item2_title: "Individual approach",
        item2_text: "We understand that every investment in machinery is a decision that defines future growth, which is why we approach every project individually and responsibly.",
        item3_title: "Security and efficiency",
        item3_text: "If you are looking for security, efficiency, and a partner who speaks the language of the industry – you are in the right place. Masine.ai is your link between ambition and concrete, reliable execution."
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "sr",
    fallbackLng: "sr", // Ako nešto nije prevedeno, prikaži srpski
    interpolation: {
      escapeValue: false // React već sam štiti od XSS napada
    }
  });

export default i18n;