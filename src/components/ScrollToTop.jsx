import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // Uzimamo trenutnu putanju (npr. /katalog ili /contact)
  const { pathname } = useLocation();

  useEffect(() => {
    // Svaki put kada se putanja promeni, baci skrol na vrh (0,0)
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Ova komponenta ne renderuje ništa, samo radi logiku
};

export default ScrollToTop;