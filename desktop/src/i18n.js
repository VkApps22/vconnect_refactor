import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enUs from './assets/translations/en-us.json';
import ptBr from './assets/translations/pt-br.json';
import es from './assets/translations/es.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enUs.common,
    },
    pt: {
      common: ptBr.common,
    },
    es: {
      common: es.common,
    },
  },
  whitelist: ['en', 'pt', 'es'],
  lng: window.navigator.language,
  nonExplicitWhitelist: false,
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
