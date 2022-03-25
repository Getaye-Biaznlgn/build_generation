import am from "./assets/am";
import store from "./store";
import en from "./assets/en.js";
import { createI18n } from "vue-i18n/index";

const messages = {
  en: en,
  am: am,
};
const i18n = createI18n({
  locale: store.getters.lang || "en", // set locale
  fallbackLocale: "en", // set fallback locale
  // If you need to specify other options, you can set other options
  // ...
  messages,
});

export default i18n;
