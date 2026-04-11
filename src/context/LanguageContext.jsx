import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const isAr = lang === 'ar';

  useEffect(() => {
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.body.style.fontFamily = isAr
      ? "'Cairo', sans-serif"
      : "'Poppins', sans-serif";
  }, [lang]);

  const toggle = () => setLang(prev => prev === 'en' ? 'ar' : 'en');

  return (
    <LanguageContext.Provider value={{ lang, isAr, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
