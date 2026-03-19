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
        contact: "Kontakt",
        favorites: "Omiljene mašine",
        do:"Do",
        od:"Od"
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
      },
      how_it_works: {
        badge: "Sistem rada",
        title: "Kako do ",
        title_highlight: "mašine?",
        btn_view: "POGLEDAJ",
        btn_back: "Nazad",
        step_label: "Korak",
        steps: {
          step1: {
            title: "Upit",
            desc: "Pošaljite nam upit za mašinu koja vam je potrebna i naš tim će vam u najkraćem roku odgovoriti sa svim informacijama. Na osnovu vašeg zahteva pripremamo ponudu i pomažemo vam da pronađete idealnu mašinu za vaš posao."
          },
          step2: {
            title: "Ponuda",
            desc: "Na osnovu vašeg upita pripremamo detaljnu i transparentnu ponudu sa svim informacijama o mašini, ceni i uslovima kupovine. Cilj nam je da jasno vidite šta dobijate i da budete sigurni u svaku odluku."
          },
          step3: {
            title: "Ugovor",
            desc: "Nakon što potvrdite ponudu, pripremamo jasan i siguran ugovor koji definiše sve uslove kupovine, uključujući garanciju na mašinu. Ovo vam garantuje potpunu transparentnost tokom celog procesa."
          },
          step4: {
            title: "Isporuka",
            desc: "Organizujemo bezbednu i brzu isporuku mašine direktno na vašu adresu, uz kompletnu logistiku i carinsku podršku. Naša pažljivo planirana dostava garantuje da vaša mašina stigne spremna za rad."
          }
        }
      },
      footer: {
        description: "Vodeći partner u prodaji i distribuciji građevinske mehanizacije. Inovacija, snaga i pouzdanost u svakom radnom satu.",
        navigation_title: "Navigacija",
        contact_title: "Kontakt",
        address: "Bulevar Oslobođenja 123,<br />21000 Novi Sad, Srbija",
        rights: "Sva prava zadržana.",
        privacy: "Politika privatnosti",
        terms: "Uslovi korišćenja",
        dev_by: "Development by"
      },
      catalog: {
        title: "Naša ",
        title_highlight: "Mehanizacija",
        subtitle: "Pronađite savršenu mašinu za vaš projekat. Koristite filtere za preciznu pretragu.",
        available: "Dostupne mašine",
        found: "Pronađeno:",
        no_results_title: "Ne postoji takva mašina",
        no_results_desc: "Pokušajte da proširite parametre pretrage ili poništite filtere.",
        btn_reset: "Poništi sve filtere",
        btn_prev: "Nazad",
        btn_next: "Dalje"
      },
      filter_sidebar: {
        title: "Filteri",
        reset: "Poništi sve",
        price_range: "Opseg cene (€)",
        category: "Kategorija",
        all_machines: "Sve mašine",
        lifting_height: "Visina dizanja (m)",
        load_capacity: "Nosivost (kg)",
        mixing_capacity: "Kapacitet mešanja (m³)",
        digging_depth: "Dubina kopanja (mm)",
        digging_height: "Visina kopanja (mm)",
        dumping_height: "Visina istovara (mm)",
        min: "Min",
        max: "Max",
        categories: {
          "telehendleri": "Telehendleri",
          "viljuskari": "Viljuškari",
          "mini-mikseri": "Mini mikseri",
          "mini-bageri": "Mini bageri",
          "bageri": "Bageri",
          "kosilice": "Kosilice",
          "dronovi": "Dronovi"
        }
      },
      single_page: {
        not_found: "Mašina nije pronađena",
        back_to_catalog: "Vrati se na katalog",
        breadcrumb_catalog: "Katalog",
        no_images: "Nema dodatnih slika.",
        new_badge: "Novo u ponudi",
        plus_vat: "+ PDV",
        tech_details: "Tehnički detalji",
        condition: "Stanje",
        condition_new: "Novo (Garancija)",
        btn_quote: "Zatraži ponudu",
        btn_call: "Pozovi prodaju",
        modal_title: "Zatraži ponudu",
        modal_for: "Za mašinu:",
        success_msg: "Upit je uspešno poslat!",
        error_msg: "Došlo je do greške. Pokušajte ponovo kasnije.",
        form_name: "Ime Firme / Osobe",
        form_name_ph: "Unesite naziv",
        form_email: "Email",
        form_email_ph: "vas@email.com",
        form_phone: "Telefon",
        form_phone_ph: "06x xxx xxxx",
        form_msg: "Dodatna poruka (Opciono)",
        form_msg_ph: "Npr. Zanima me rok isporuke...",
        btn_sending: "Šaljem...",
        btn_send: "Pošalji Upit",
        email_subject: "Novi upit za mašinu:",
        specs: {
          visinaDizanja: "Visina dizanja",
          maksVisinaDizanja: "Max visina dizanja",
          nosivost: "Nosivost",
          kapacitetMesanja: "Kapacitet mešanja",
          rezervoarVode: "Rezervoar vode",
          maxDubinaKopanja: "Max dubina kopanja",
          maxVisinaKopanja: "Max visina kopanja",
          maxVisinaIstovara: "Max visina istovara",
          kapacitetRezervoara: "Kapacitet rezervoara",
          baterija: "Baterija",
          maksimalnaPovrsina: "Max površina košenja",
          sirinaKosenja: "Širina košenja",
          snaga: "Snaga",
          snagaMotora: "Snaga motora",
          operativnaTezina: "Operativna težina",
          tezina: "Težina",
          navigacija: "Navigacija",
          maksNagib: "Max nagib"
        }
      },
      machine_card: {
        price_on_request: "Na upit",
        add_fav: "Dodaj",
        remove_fav: "Ukloni",
        in_fav: "u favorite",
        from_fav: "iz favorita",
        price_label: "Cena",
        btn_details: "Detalji",
        specs: {
          height: "Visina",
          max_height: "Max visina",
          load_capacity: "Nosivost",
          capacity: "Kapacitet",
          tank: "Rezervoar",
          dig_depth: "Dubina kopanja",
          max_dig_depth: "Max dubina kopanja",
          dig_height: "Visina kopanja",
          max_dump_height: "Max visina istovara",
          battery: "Baterija",
          max_mow_area: "Max površina košenja",
          max_mow_width: "Max širina košenja"
        }
      },
      // 👇 NOVI DEO ZA MACHINE MARQUEE 👇
      machine_marquee: {
        title: "Još mašina",
        price_on_request: "Na upit",
        btn_details: "Detalji",
        specs: {
          lifting: "Dizanje:",
          load: "Nosivost:",
          digging: "Kopanje:",
          weight: "Težina:",
          capacity: "Kapacitet:",
          power: "Snaga:",
          navigation: "Navigacija:",
          area: "Površina:",
          tilt: "Nagib:"
        }
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
        contact: "Contact",
        favorites: "Favorite Machines",
        do:"To",
        od:"From",
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
      },
      how_it_works: {
        badge: "Work System",
        title: "How to get the ",
        title_highlight: "machine?",
        btn_view: "VIEW",
        btn_back: "Back",
        step_label: "Step",
        steps: {
          step1: {
            title: "Inquiry",
            desc: "Send us an inquiry for the machine you need and our team will respond as quickly as possible. Based on your request, we prepare an offer and help you find the ideal machine for your business."
          },
          step2: {
            title: "Offer",
            desc: "Based on your inquiry, we prepare a detailed and transparent offer with all machine info, price, and terms. Our goal is for you to be sure in every decision before proceeding."
          },
          step3: {
            title: "Contract",
            desc: "Once the offer is confirmed, we prepare a secure contract defining all purchase terms, including the warranty. This guarantees complete transparency and reliability throughout the process."
          },
          step4: {
            title: "Delivery",
            desc: "We organize safe and fast delivery directly to your address, with complete logistics and customs support. Our delivery guarantees your machine arrives in perfect condition."
          }
        }
      },
      footer: {
        description: "Leading partner in the sale and distribution of construction machinery. Innovation, power, and reliability in every working hour.",
        navigation_title: "Navigation",
        contact_title: "Contact",
        address: "Bulevar Oslobođenja 123,<br />21000 Novi Sad, Serbia",
        rights: "All rights reserved.",
        privacy: "Privacy Policy",
        terms: "Terms of Use",
        dev_by: "Development by"
      },
      catalog: {
        title: "Our ",
        title_highlight: "Machinery",
        subtitle: "Find the perfect machine for your project. Use filters for precise search.",
        available: "Available machines",
        found: "Found:",
        no_results_title: "No such machine exists",
        no_results_desc: "Try expanding your search parameters or reset the filters.",
        btn_reset: "Reset all filters",
        btn_prev: "Back",
        btn_next: "Next"
      },
      filter_sidebar: {
        title: "Filters",
        reset: "Reset all",
        price_range: "Price range (€)",
        category: "Category",
        all_machines: "All machines",
        lifting_height: "Lifting height (m)",
        load_capacity: "Load capacity (kg)",
        mixing_capacity: "Mixing capacity (m³)",
        digging_depth: "Digging depth (mm)",
        digging_height: "Digging height (mm)",
        dumping_height: "Dumping height (mm)",
        min: "Min",
        max: "Max",
        categories: {
          "telehendleri": "Telehandlers",
          "viljuskari": "Forklifts",
          "mini-mikseri": "Mini mixers",
          "mini-bageri": "Mini excavators",
          "bageri": "Excavators",
          "kosilice": "Lawnmowers",
          "dronovi": "Drones"
        }
      },
      single_page: {
        not_found: "Machine not found",
        back_to_catalog: "Back to catalog",
        breadcrumb_catalog: "Catalog",
        no_images: "No additional images.",
        new_badge: "New in offer",
        plus_vat: "+ VAT",
        tech_details: "Technical details",
        condition: "Condition",
        condition_new: "New (Warranty)",
        btn_quote: "Request a quote",
        btn_call: "Call sales",
        modal_title: "Request a quote",
        modal_for: "For machine:",
        success_msg: "Inquiry sent successfully!",
        error_msg: "An error occurred. Please try again later.",
        form_name: "Company / Contact Name",
        form_name_ph: "Enter name",
        form_email: "Email",
        form_email_ph: "your@email.com",
        form_phone: "Phone",
        form_phone_ph: "+xxx xx xxx xxxx",
        form_msg: "Additional message (Optional)",
        form_msg_ph: "E.g. I am interested in the delivery time...",
        btn_sending: "Sending...",
        btn_send: "Send Inquiry",
        email_subject: "New inquiry for machine:",
        specs: {
          // General and Engine
          motor: "Engine",
          snaga: "Power",
          snagaMotora: "Engine power",
          tipPogona: "Drive type",
          pogon: "Drive",
          tipTransmisije: "Transmission type",
          upravljanje: "Steering",
          brzinaKretanja: "Travel speed",
          maksBrzina: "Max speed",
          garancija: "Warranty",
          
          // Weight and Capacity
          nosivost: "Load capacity",
          ukupnaMasa: "Total weight",
          operativnaTezina: "Operating weight",
          tezina: "Weight",
          
          // Lifting, Turning, Digging
          visinaDizanja: "Lifting height",
          maksVisinaDizanja: "Max lifting height",
          brzinaDizanja: "Lifting speed",
          radijusOkretanja: "Turning radius",
          zapreminaKasike: "Bucket capacity",
          kapacitetPrednjeKasike: "Front bucket capacity",
          kapacitetZadnjeKasike: "Rear bucket capacity",
          maxDubinaKopanja: "Max digging depth",
          maxVisinaKopanja: "Max digging height",
          maxVisinaIstovara: "Max dumping height",
          maksimalniNagib: "Max gradient",
          maksNagib: "Max tilt",
          
          // Mixers
          kapacitetMesanja: "Mixing capacity",
          rezervoarVode: "Water tank",
          
          // Drones
          kapacitetRezervoara: "Tank capacity",
          sistemRasprsivanja: "Spraying system",
          navigacija: "Navigation",
          senzori: "Sensors",
          osnovniPaket: "Basic package",
          dodatnaOpremaOpciono: "Optional equipment",
          
          // Electrical components and Batteries
          baterija: "Battery",
          napon: "Voltage",
          kapacitetBaterije: "Battery capacity",
          punjenje: "Charging",
          vremePunjenja: "Charging time",
          automatskoPunjenje: "Auto charging",
          
          // Mowers
          maksimalnaPovrsina: "Max mowing area",
          kapacitetKosenja: "Mowing capacity",
          izbegavanjePrepreka: "Obstacle avoidance",
          planiranjeRute: "Route planning",
          sirinaKosenja: "Mowing width",
          visinaKosenja: "Mowing height",
          brojNozeva: "Number of blades",
          brzina: "Speed",
          kontrola: "Control",
          povezivanje: "Connectivity",
          zastitaOdKradje: "Anti-theft"
        }
      },
      machine_card: {
        price_on_request: "On request",
        add_fav: "Add",
        remove_fav: "Remove",
        in_fav: "to favorites",
        from_fav: "from favorites",
        price_label: "Price",
        btn_details: "Details",
        specs: {
          height: "Height",
          max_height: "Max height",
          load_capacity: "Load capacity",
          capacity: "Capacity",
          tank: "Tank",
          dig_depth: "Dig depth",
          max_dig_depth: "Max dig depth",
          dig_height: "Dig height",
          max_dump_height: "Max dumping height",
          battery: "Battery",
          max_mow_area: "Max mow area",
          max_mow_width: "Max mow width"
        }
      },
      // 👇 NOVI DEO ZA MACHINE MARQUEE 👇
      machine_marquee: {
        title: "More machines",
        price_on_request: "On request",
        btn_details: "Details",
        specs: {
          lifting: "Lifting:",
          load: "Capacity:",
          digging: "Digging:",
          weight: "Weight:",
          capacity: "Capacity:",
          power: "Power:",
          navigation: "Navigation:",
          area: "Area:",
          tilt: "Tilt:"
        }
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
    fallbackLng: "sr",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;