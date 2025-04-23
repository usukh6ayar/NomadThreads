import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

const translations = {
  mn: {
    common: {
      error: "Алдаа гарлаа",
      retry: "Дахин оролдох",
      loading: "Уншиж байна...",
    },
    auth: {
      login: "Нэвтрэх",
      register: "Бүртгүүлэх",
      email: "И-мэйл",
      password: "Нууц үг",
    },
    // Add more translations here
  },
  en: {
    // English translations
  },
};

const i18n = new I18n(translations);

i18n.locale = Localization.locale;
i18n.enableFallback = true;
i18n.defaultLocale = "mn";

export default i18n;
