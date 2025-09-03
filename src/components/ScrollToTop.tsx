import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Komponent automatycznie przewijający stronę na górę przy zmianie route
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Przewiń na górę przy każdej zmianie ścieżki
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Płynne przewijanie
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
