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
        do: "Do",
        od: "Od"
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
      },
      // 👇 OPISI MAŠINA NA SRPSKOM 👇
      descriptions: {
        // Viljuškari
        "el-20pro-viljuskar": "Električni viljuškar BYD EL-20PRO sa litijumskom baterijom. Nosivost 2000kg, maksimalna visina dizanja do 6m.",
        "el-25pro-viljuskar": "Električni viljuškar BYD EL-25PRO sa nosivošću od 2500kg. Idealan za magacinski rad uz dugotrajnu litijumsku bateriju.",
        "el-30pro-viljuskar": "Pouzdan električni viljuškar BYD EL-30PRO. Nosivost 3000kg i snažan AC motor garantuju visoku efikasnost.",
        "el-35pro-viljuskar": "Snažan BYD EL-35PRO električni viljuškar. Nosivost od 3500kg ga čini savršenim za teže industrijske uslove.",
        "el-40pro-viljuskar": "Teški električni viljuškar BYD EL-40PRO sa nosivošću od 4000kg i pojačanim kapacitetom baterije od 420Ah.",
        "el-50pro-viljuskar": "Najteži i najsnažniji model u seriji - BYD EL-50PRO. Nosivost od neverovatnih 5000kg, idealan za najzahtevnije terete.",
        
        // Telehendleri
        "te3007-A": "TE3007-A | 2026 | 7m | 3000Kg |",
        "te3007": "TE3007 | 2026 | 7m | 3000Kg |",
        "te3507": "TE3507 | 2026 | 7m | 3500Kg | Novo sa garancijom",
        "te3510": "TE3510 | 2026 | 10m | 3500Kg | Novo sa garancijom",
        "te4007": "TE4007 | 2026 | 7m | 4000kg | Novo sa garancijom",
        "te4010": "TE4010 | 2026 | 10m | 4000Kg | Novo sa garancijom",
        "te4014": "TE4014 | 2026 | 14m | 4000kg | Novo sa garancijom",
        "te4018": "TE4018 | 2026 | 18m | 4000kg | Novo sa garancijom",
        "te5010": "TE5010 | 2026 | 10m | 5000Kg | Novo sa garancijom",
        "te5014": "TE5014 | 2026 | 14m | 5000Kg | Novo sa garancijom",
        "te5018": "TE5018 | 2026 | 18m | 5000Kg | Novo sa garancijom",
        "te6018": "TE6018 | 2026 | 18m | 6000Kg | Novo sa garancijom",
        "te7018": "TE7018 | 2026 | 18m | 7000Kg | Novo sa garancijom",

        // Mikseri
        "szj07-mikser": "Kompaktni samoutovarni mini mikser. Idealno za građevinske firme, investitore, komunalne službe i poljoprivredna gazdinstva.",
        "szj10-mikser": "Samoutovarni mini mikser SZJ10. Pouzdan i brz za rad na terenu.",
        "szj15-mikser": "Samoutovarni mini mikser SZJ15. Kapacitet 1.5 kubika.",
        "szj16-mikser": "Samoutovarni mini mikser SZJ16. Ekonomičan dizel motor.",
        "szj18-mikser": "Samoutovarni mini mikser SZJ18 sa kapacitetom od 1.8 kubika.",
        "szj20-mikser": "Samoutovarni mini mikser SZJ20. Idealan balans snage i kapaciteta.",
        "szj26-mikser": "Srednji samoutovarni mikser SZJ26 sa 2.6 kubika kapaciteta.",
        "szj30-mikser": "Samoutovarni mini mikser SZJ30, 3 kubika, izuzetna snaga.",
        "szj35-mikser": "Veliki samoutovarni mikser SZJ35, kapacitet 3.5 kubika.",
        "szj40a-mikser": "Teški samoutovarni mikser SZJ40A. 4 kubika betona po mešanju.",
        "szj40b-mikser": "Premium samoutovarni mikser SZJ40B. Povećan rezervoar za vodu.",
        "szj45-mikser": "Najveći u klasi - SZJ45. Kapacitet od 4.5 kubika sa duplim rezervoarom.",

        // Mini bageri
        "se10-bager": "Kompaktni mini bager SE10. Nosivost 1000kg, idealan za rad u uskim prostorima i manja gradilišta.",
        "se18-bager": "Mini bager SE12. Nosivost 1200kg sa odličnim dohvatom i efikasnim motorom.",
        "se15-bager": "Mini bager SE15 kapaciteta 1500kg. Idealan balans snage (14.1kW) i kompaktnosti.",
        "se20l-bager": "Snažan mini bager SE20L sa nosivošću od 2000kg. Motor od 22kW osigurava brzo obavljanje zadataka.",
        "se25-bager": "Srednji bager SE25L. Nosivost 2500kg i zapremina kašike od 0.1m³ za ozbiljnije zemljane radove.",
        "se30l-bager": "Bager SE30L nudi odlične performanse sa nosivošću od 3000kg i dubinom kopanja do 2000mm.",
        "se35-bager": "Izuzetno snažan model SE35 sa motorom od 36.8kW. Nosivost od 3500kg savlađuje najteže prepreke.",
        "se40-bager": "Najteži mini bager u ponudi - SE40. Nosivost 4000kg i kašika od 0.12m³ osiguravaju maksimalnu produktivnost.",

        // Bageri
        "wz06-10-bager": "Kompaktni bager WZ06-10 sa pouzdanim Kubota motorom. Operativna težina od 1800kg ga čini odličnim za uže prostore.",
        "wz08-12-bager": "Snažan bager WZ08-12 sa Yunnei motorom (opciono Kubota). Odličan balans snage od 37kW i kapaciteta.",
        "wz10-20-bager": "Srednji bager WZ10-20, operativna težina 3400kg uz veliku prednju kašiku od 0.75m³ za efikasan utovar.",
        "wz15-26-bager": "Najteži model WZ15-26. Sa težinom od skoro 5 tona i motorom od 79 konjskih snaga, dizajniran je za najveće izazove.",

        // Dronovi
        "jt80-dron": "JT-80 Agri Drone je profesionalni poljoprivredni dron dizajniran za efikasno i precizno prskanje pesticida, herbicida i tečnih đubriva. Zahvaljujući velikom rezervoaru od 70L i naprednim navigacionim sistemima (GPS + RTK), omogućava brzo tretiranje velikih površina uz minimalan utrošak hemikalija i radne snage. Opremljen je centrifugalnim diznama za ravnomerno raspršivanje, radarskim senzorima za izbegavanje prepreka i FPV kamerom za nadzor leta. Integrisana aplikacija i daljinski upravljač omogućavaju precizno planiranje leta i potpuno automatsko prskanje, smanjujući troškove i povećavajući produktivnost.",

        // Kosilice
        "mai-an1000v": "Pametna robotska kosilica MAI AN1000V idealna za dvorišta i travnjake do 1000 m². Koristi naprednu AI Vision kameru i IMU za izbegavanje prepreka i planiranje rute bez potrebe za graničnim žicama. Upravljanje je potpuno automatizovano putem mobilne aplikacije.",
        "mai-an3000v": "Unapređeni model MAI AN3000V namenjen srednjim i većim površinama do 3000 m². Uz AI Vision kameru, ovaj model koristi i RTK satelitsku navigaciju za centimetarsku preciznost, kao i ugrađen GPS praćenje (Anti-theft).",
        "mai-commercialpro": "Zver za komercijalnu upotrebu – MAI COMMERCIALPRO. Dizajnirana za ogromne površine do neverovatnih 50.000 m² (sportski tereni, parkovi, golf tereni). Opremljena moćnom 48V LiFePO4 baterijom, industrijskim diskovima za košenje, 4G + RTK povezivanjem i ultrazvučnim senzorima."
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
        do: "To",
        od: "From"
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
      },
      // 👇 OPISI MAŠINA NA ENGLESKOM 👇
      descriptions: {
        // Forklifts
        "el-20pro-viljuskar": "Electric forklift BYD EL-20PRO with a lithium battery. Capacity 2000kg, max lifting height up to 6m.",
        "el-25pro-viljuskar": "Electric forklift BYD EL-25PRO with a capacity of 2500kg. Ideal for warehouse work with a long-lasting lithium battery.",
        "el-30pro-viljuskar": "Reliable electric forklift BYD EL-30PRO. Capacity 3000kg and a powerful AC motor guarantee high efficiency.",
        "el-35pro-viljuskar": "Powerful BYD EL-35PRO electric forklift. The 3500kg capacity makes it perfect for tougher industrial conditions.",
        "el-40pro-viljuskar": "Heavy-duty electric forklift BYD EL-40PRO with 4000kg capacity and an enhanced 420Ah battery.",
        "el-50pro-viljuskar": "The heaviest and most powerful model in the series - BYD EL-50PRO. An incredible 5000kg capacity, ideal for the most demanding loads.",
        
        // Telehandlers
        "te3007-A": "TE3007-A | 2026 | 7m | 3000Kg |",
        "te3007": "TE3007 | 2026 | 7m | 3000Kg |",
        "te3507": "TE3507 | 2026 | 7m | 3500Kg | New with warranty",
        "te3510": "TE3510 | 2026 | 10m | 3500Kg | New with warranty",
        "te4007": "TE4007 | 2026 | 7m | 4000kg | New with warranty",
        "te4010": "TE4010 | 2026 | 10m | 4000Kg | New with warranty",
        "te4014": "TE4014 | 2026 | 14m | 4000kg | New with warranty",
        "te4018": "TE4018 | 2026 | 18m | 4000kg | New with warranty",
        "te5010": "TE5010 | 2026 | 10m | 5000Kg | New with warranty",
        "te5014": "TE5014 | 2026 | 14m | 5000Kg | New with warranty",
        "te5018": "TE5018 | 2026 | 18m | 5000Kg | New with warranty",
        "te6018": "TE6018 | 2026 | 18m | 6000Kg | New with warranty",
        "te7018": "TE7018 | 2026 | 18m | 7000Kg | New with warranty",

        // Mixers
        "szj07-mikser": "Compact self-loading mini mixer. Ideal for construction companies, investors, utility services, and agricultural farms.",
        "szj10-mikser": "Self-loading mini mixer SZJ10. Reliable and fast for fieldwork.",
        "szj15-mikser": "Self-loading mini mixer SZJ15. Capacity 1.5 cubic meters.",
        "szj16-mikser": "Self-loading mini mixer SZJ16. Economical diesel engine.",
        "szj18-mikser": "Self-loading mini mixer SZJ18 with a capacity of 1.8 cubic meters.",
        "szj20-mikser": "Self-loading mini mixer SZJ20. Ideal balance of power and capacity.",
        "szj26-mikser": "Medium self-loading mixer SZJ26 with 2.6 cubic meters of capacity.",
        "szj30-mikser": "Self-loading mini mixer SZJ30, 3 cubic meters, exceptional power.",
        "szj35-mikser": "Large self-loading mixer SZJ35, capacity 3.5 cubic meters.",
        "szj40a-mikser": "Heavy self-loading mixer SZJ40A. 4 cubic meters of concrete per mix.",
        "szj40b-mikser": "Premium self-loading mixer SZJ40B. Increased water tank.",
        "szj45-mikser": "The largest in its class - SZJ45. Capacity of 4.5 cubic meters with a double tank.",

        // Mini Excavators
        "se10-bager": "Compact mini excavator SE10. Load capacity 1000kg, ideal for working in narrow spaces and smaller construction sites.",
        "se18-bager": "Mini excavator SE12. Load capacity 1200kg with excellent reach and an efficient engine.",
        "se15-bager": "Mini excavator SE15 with 1500kg capacity. Ideal balance of power (14.1kW) and compactness.",
        "se20l-bager": "Powerful mini excavator SE20L with a 2000kg capacity. The 22kW engine ensures fast task completion.",
        "se25-bager": "Medium excavator SE25L. Capacity 2500kg and 0.1m³ bucket for more serious earthworks.",
        "se30l-bager": "Excavator SE30L offers excellent performance with 3000kg capacity and digging depth up to 2000mm.",
        "se35-bager": "Extremely powerful SE35 model with a 36.8kW engine. The 3500kg capacity overcomes the toughest obstacles.",
        "se40-bager": "The heaviest mini excavator in the lineup - SE40. 4000kg capacity and 0.12m³ bucket ensure maximum productivity.",

        // Excavators
        "wz06-10-bager": "Compact excavator WZ06-10 with a reliable Kubota engine. The 1800kg operating weight makes it excellent for narrow spaces.",
        "wz08-12-bager": "Powerful excavator WZ08-12 with Yunnei engine (optional Kubota). Excellent balance of 37kW power and capacity.",
        "wz10-20-bager": "Medium excavator WZ10-20, operating weight 3400kg with a large 0.75m³ front bucket for efficient loading.",
        "wz15-26-bager": "Heaviest model WZ15-26. Weighing nearly 5 tons with a 79 horsepower engine, it is designed for the biggest challenges.",

        // Drones
        "jt80-dron": "The JT-80 Agri Drone is a professional agricultural drone designed for efficient and precise spraying of pesticides, herbicides, and liquid fertilizers. Thanks to a large 70L tank and advanced navigation systems (GPS + RTK), it enables rapid treatment of large areas with minimal use of chemicals and labor. It is equipped with centrifugal nozzles for even spraying, radar sensors for obstacle avoidance, and an FPV camera for flight monitoring. The integrated app and remote controller allow precise flight planning and fully automatic spraying, reducing costs and increasing productivity.",

        // Mowers
        "mai-an1000v": "Smart robotic lawnmower MAI AN1000V ideal for yards and lawns up to 1000 m². It uses an advanced AI Vision camera and IMU for obstacle avoidance and route planning without the need for boundary wires. Fully automated control via a mobile app.",
        "mai-an3000v": "Upgraded MAI AN3000V model designed for medium to large areas up to 3000 m². Along with the AI Vision camera, this model uses RTK satellite navigation for centimeter precision, as well as built-in GPS tracking (Anti-theft).",
        "mai-commercialpro": "A beast for commercial use – MAI COMMERCIALPRO. Designed for huge areas up to an incredible 50,000 m² (sports fields, parks, golf courses). Equipped with a powerful 48V LiFePO4 battery, industrial mowing disks, 4G + RTK connectivity, and ultrasonic sensors."
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