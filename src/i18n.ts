import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

const i18nConfig = {
  locales: ["en", "ar"],
  defaultLocale: "en",
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "./locales/{{lng}}/{{ns}}.json",
    },
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    debug: true,
  });

export default i18n;
