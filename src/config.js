// @mui
import { enUS, frFR } from "@mui/material/locale";

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  MOBILE_HEIGHT: 64,
  MAIN_DESKTOP_HEIGHT: 88,
  DASHBOARD_DESKTOP_HEIGHT: 92,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32,
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20,
};

// SETTINGS
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

export const defaultSettings = {
  themeMode: "light",
  themeDirection: "ltr",
  themeContrast: "default",
  themeLayout: "horizontal",
  themeColorPresets: "blue",
  themeStretch: false,
};

// MULTI LANGUAGES
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: "English",
    value: "en",
    systemValue: enUS,
    icon: "/assets/icons/flags/ic_flag_en.svg",
  },
  {
    label: "French",
    value: "fr",
    systemValue: frFR,
    icon: "/assets/icons/flags/ic_flag_fr.svg",
  },
];

export const recaptchaKey = "6Ld9gZQjAAAAADLQTD0LNzIv64zQcMpKAW46KJ89";
export const GOOGLE_MAP_API_KAY = "AIzaSyBl2oJaWVIAGrzYmMPeHSm0IQnwVm0WXMU";
// export const GOOGLE_MAP_API_KAY = "AIzaSyAoGoRxR9Rn9VqvzdAnEHO0DScyv-YDqtY";

export const defaultLang = allLangs[0]; // English

// API URL
export const BASIC_URL = "https://ollorun.com";
// export const BASIC_URL = "http://localhost:3000";

export const API_URL = "http://localhost:5000";
// export const API_URL = "http://localhost:5000";

export const CONTACT_EMAIL = "support@ollorun.com";
// export const CONTACT_EMAIL = "codeclimber55786@gmail.com";

export const ADVISOR_JOB_EMAIL = "job@ollorun.com";
// export const ADVISOR_JOB_EMAIL = "codeclimber55786@gmail.com";

export const CLIENT_JOB_EMAIL = "commercial@ollorun.com";
// export const CLIENT_JOB_EMAIL = "codeclimber55786@gmail.com";

export const SECRET_KEY = "ollorun_success";