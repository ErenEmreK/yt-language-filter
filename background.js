
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    fetch('languageCodes.json')
    .then(response => response.json())
    .then(languageCodes => {
      for (const key of Object.keys(languageCodes)) {
        chrome.storage.local.set({ [key]: true });
      }
      console.log(`Initial values set for languages.`);
    })
    .catch(error => {
      console.error('Error fetching JSON:', error);
    });
  }
});


