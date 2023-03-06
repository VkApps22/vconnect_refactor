import i18n from 'i18next';
import * as Localization from 'expo-localization';
import { initReactI18next } from 'react-i18next';
import enUs from './assets/translations/en-us.json';
import ptBr from './assets/translations/pt-br.json';
import es from './assets/translations/es.json';
import countriesEN from './assets/translations/countries/countries.en.json';
import countriesPT from './assets/translations/countries/countries.pt.json';
import countriesES from './assets/translations/countries/countries.es.json';
import statesEN from './assets/translations/states/states.en.json';
import statesPT from './assets/translations/states/states.pt.json';
import statesES from './assets/translations/states/states.es.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enUs.common,
      countries: countriesEN,
      states: statesEN,
    },
    pt: {
      common: ptBr.common,
      countries: countriesPT,
      states: statesPT,
    },
    es: {
      common: es.common,
      countries: countriesES,
      states: statesES,
    },
  },
  whitelist: ['en', 'pt', 'es'],
  nonExplicitWhitelist: false,
  lng: Localization.locale,
  fallbackLng: 'en',

  ns: ['common', 'countries'],
  defaultNS: 'common',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
