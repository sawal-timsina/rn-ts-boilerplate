import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    ja: {
      translation: require("~/locale/ja.json"),
    },
  },
  lng: "ja",
  compatibilityJSON: "v3",
  keySeparator: false,
  nsSeparator: "|",
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
