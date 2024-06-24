window.addEventListener('load', main);
      
function main() {
    /*
    console.log("Hello from Language Filter!");

    document.querySelectorAll('ytd-video-renderer').forEach(video => {
        checkAndHide(video, wanted_languages);
    });

    observeResults();

    */
   console.log("Hello from Language Filter");
    getWantedLangs();
    
   

}






function getText(video_element) {
    
    //We get title and description
    let titleElement = video_element.querySelector('#video-title');
    let title = titleElement ? titleElement.textContent.trim() : '';

    let snippetElement = video_element.querySelector('.metadata-snippet-text-navigation');
    let description = snippetElement ? snippetElement.textContent.trim() : '';

    return title + '  -  ' + description;
}

async function detectLanguage(text) {
    const response = await chrome.i18n.detectLanguage(text);
    return response.languages[0].language;
}

function checkAndHide(video_element, wanted_langs) {

    (async () => {
        const text = getText(video_element);
        const languageCode = await detectLanguage(text);
        
        if (!(wanted_langs.includes(languageCode))) {
            video_element.style.display = 'none';
        }
    })();

        
}

function observeResults(callback) {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1 && node.tagName === 'YTD-VIDEO-RENDERER') {
                    checkAndHide(node, wanted_languages);
                }
            });
        });
    });

    observer.observe(document.querySelector('ytd-app'), {
        childList: true,
        subtree: true
    });
}


async function getWantedLangs() {
    const url = chrome.runtime.getURL('languageCodes.json');
    fetch(url)
    .then(response => response.json())
    .then(languageCodes => {
        const keys = Object.keys(languageCodes);
        console.log(keys);
        let wanted_langs = [];
        chrome.storage.local.get(keys, function (result) {
            for (const key of keys) {
                result[key] && wanted_langs.push(key);
            }
            console.log(wanted_langs);
        });
        
    })
    .catch(error => {
        console.error('Error fetching the JSON file:', error);
    });
}


/*



*/











/*

function getVideoIds() {
    const videoElements = document.querySelectorAll('ytd-video-renderer');
    const videoIds = [];
    videoElements.forEach(video => {
        const videoId = video.querySelector('a#video-title').href.split('v=')[1];
        if (videoId) {
            videoIds.push(videoId);
        }
    });
    return videoIds;
}







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

*/