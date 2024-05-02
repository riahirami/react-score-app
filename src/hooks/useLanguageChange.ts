import i18n from 'locales/i18n';
import { useState } from 'react';

interface UseLanguageChangeProps {
  changeLanguage: (event: React.ChangeEvent<{ value: unknown }>) => void;
  currentLanguage: string;
}

const useLanguageChange = (): UseLanguageChangeProps => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const changeLanguage = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newLanguage = event.target.value as string;
    i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
  };

  return { changeLanguage, currentLanguage };
};

export default useLanguageChange;
