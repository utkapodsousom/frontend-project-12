import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './resources/index';

const initI18n = () => {
  const i18n = i18next.createInstance();

  i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      fallbackLng: 'ru',
      debug: true,
      resources,
    })
    .catch((err) => {
      throw new Error(err);
    });

  return i18n;
};

export default initI18n;
