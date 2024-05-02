import { LanguageCodes } from 'config/constant/language.config';
import { STORAGE_KEYS } from 'config/constant/storage.config';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getPersistData, persistData } from 'utils/helpers/storage.helpers';
import { TxKeyPath } from './i18n.type';
import fr from './fr';
import { ar } from './ar';

const storedLanguage =
  getPersistData(STORAGE_KEYS.languageKey, false) || LanguageCodes.FRENCH.short;

i18n.use(initReactI18next).init({
  resources: {
    fr: {
      translation: fr,
    },
    ar: {
      translation: ar,
    },
  },
  lng: storedLanguage,
  fallbackLng: LanguageCodes.FRENCH.short,
  interpolation: {
    escapeValue: false,
  },
});
i18n.on('languageChanged', (lng) => {
  persistData(STORAGE_KEYS.languageKey, lng);
});

/**
 * Returns the localized string defined in language files.
 * @param name the complete path to string key => Exp: actions.continue
 * @param params Custom json params if needed to inject custom data into strings.
 * @returns - Returns translated string based on name and params (from languages files)
 */
export function translate(name: TxKeyPath, params = {}): string {
  return i18n.t(name, params);
}

export default i18n;
