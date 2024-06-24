
const languageCodes = {
  ar: "Arabic",
  am: "Amharic",
  bn: "Bengali",
  bg: "Bulgarian",
  ca: "Catalan",
  zh_CN: "Chinese (China)",
  zh_TW: "Chinese (Taiwan)",
  hr: "Croatian",
  cs: "Czech",
  da: "Danish",
  nl: "Dutch",
  en: "English",
  en_AU: "English (Australia)",
  en_GB: "English (Great Britain)",
  en_US: "English (USA)",
  et: "Estonian",
  fil: "Filipino",
  fi: "Finnish",
  fr: "French",
  de: "German",
  el: "Greek",
  gu: "Gujarati",
  he: "Hebrew",
  hi: "Hindi",
  hu: "Hungarian",
  id: "Indonesian",
  it: "Italian",
  ja: "Japanese",
  kn: "Kannada",
  ko: "Korean",
  lv: "Latvian",
  lt: "Lithuanian",
  ms: "Malay",
  ml: "Malayalam",
  mr: "Marathi",
  no: "Norwegian",
  fa: "Persian",
  pl: "Polish",
  pt_BR: "Portuguese (Brazil)",
  pt_PT: "Portuguese (Portugal)",
  ro: "Romanian",
  ru: "Russian",
  sr: "Serbian",
  sk: "Slovak",
  sl: "Slovenian",
  es: "Spanish",
  es_419: "Spanish (Latin America and Caribbean)",
  sw: "Swahili",
  sv: "Swedish",
  ta: "Tamil",
  te: "Telugu",
  th: "Thai",
  tr: "Turkish",
  uk: "Ukrainian",
  vi: "Vietnamese"
};


chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    // The extension was just installed
    for (const [key, value] of Object.entries(languageCodes)) {
      chrome.storage.local.set({ [key]: true });
      console.log(`Initial language values are set.`);
    }
  }
});
