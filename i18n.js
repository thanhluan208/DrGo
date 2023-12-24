import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enLang from "./src/locales/en.json";
import langServices from "./src/services/langServices";

const resources = {
  en: {
    translation: enLang,
  },
};

i18n
  // .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: langServices.getCurrentLang(),
    fallbackLng: "en",
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
