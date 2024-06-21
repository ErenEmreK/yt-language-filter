const languageCodes = {
    ar: "Arabic",
    am: "Amharic",
    bg: "Bulgarian",
    bn: "Bengali",
    ca: "Catalan",
    cs: "Czech",
    da: "Danish",
    de: "German",
    el: "Greek",
    en: "English",
    en_AU: "English (Australia)",
    en_GB: "English (Great Britain)",
    en_US: "English (USA)",
    es: "Spanish",
    es_419: "Spanish (Latin America and Caribbean)",
    et: "Estonian",
    fa: "Persian",
    fi: "Finnish",
    fil: "Filipino",
    fr: "French",
    gu: "Gujarati",
    he: "Hebrew",
    hi: "Hindi",
    hr: "Croatian",
    hu: "Hungarian",
    id: "Indonesian",
    it: "Italian",
    ja: "Japanese",
    kn: "Kannada",
    ko: "Korean",
    lt: "Lithuanian",
    lv: "Latvian",
    ml: "Malayalam",
    mr: "Marathi",
    ms: "Malay",
    nl: "Dutch",
    no: "Norwegian",
    pl: "Polish",
    pt_BR: "Portuguese (Brazil)",
    pt_PT: "Portuguese (Portugal)",
    ro: "Romanian",
    ru: "Russian",
    sk: "Slovak",
    sl: "Slovenian",
    sr: "Serbian",
    sv: "Swedish",
    sw: "Swahili",
    ta: "Tamil",
    te: "Telugu",
    th: "Thai",
    tr: "Turkish",
    uk: "Ukrainian",
    vi: "Vietnamese",
    zh_CN: "Chinese (China)",
    zh_TW: "Chinese (Taiwan)"
};

var wanted_languages = ['de', 'fr'];

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


         
function main() {

    console.log("Hello from Language Filter!");

    document.querySelectorAll('ytd-video-renderer').forEach(video => {
        checkAndHide(video, wanted_languages);
    });

    observeResults();
}

window.addEventListener('load', main);























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