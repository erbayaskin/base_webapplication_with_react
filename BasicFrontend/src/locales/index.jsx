import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.json";
import tr from "./translations/tr.json";
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init
const initialLanguage =
  localStorage.getItem("lng") || navigator.language || "tr";
export const i18nInstance = i18n.use(initReactI18next);
i18nInstance.init({
  resources: {
    en: {
      translation: en,
    },
    tr: {
      translation: tr,
    },
  },
  fallbackLng: initialLanguage,
  interpolation: {
    escabeValue: false,
  },
});
