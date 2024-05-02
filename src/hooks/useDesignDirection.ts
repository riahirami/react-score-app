import { LanguageCodes } from 'config/constant/language.config';
import i18n from 'locales/i18n';
import { useState, useEffect } from 'react';
import { DirectionType } from 'types/interfaces/global';
interface UseDesignDirectionProps {
  direction: DirectionType;
}

const useDesignDirection = (): UseDesignDirectionProps => {
  const [direction, setDirection] = useState<DirectionType>('ltr');

  useEffect(() => {
    const currentLanguage = i18n.language;
    const newDirection = currentLanguage === LanguageCodes.ARABIC.short ? 'rtl' : 'ltr';
    setDirection(newDirection);
  }, [i18n.language]);

  return { direction };
};

export default useDesignDirection;
