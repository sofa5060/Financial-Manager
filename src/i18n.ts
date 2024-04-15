import i18n from "i18next";
import ChainedBackend from "i18next-chained-backend";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const i18nConfig = {
  locales: ["en", "ar"],
  defaultLocale: "en",
};

i18n
  .use(ChainedBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    backend: {
      backends: [HttpBackend],
      backendOptions: [
        {
          loadPath: "/locales/{{lng}}/{{ns}}.json",
        },
      ],
    },
    debug: true,
  });

export default i18n;
