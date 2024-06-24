chrome.storage.local.get(['run'], function(result) {
    if (result.run) {
        window.addEventListener('load', main);
    }
});  

async function main() {
    
    console.log("Hello from Language Filter!");

    const wanted_langs = await getWantedLangs();
    console.log("Getting results for: ", wanted_langs);
    document.querySelectorAll('ytd-video-renderer').forEach(video => {
        checkAndHide(video, wanted_langs);
    });
    observeResults(checkAndHide, wanted_langs);
    
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

async function checkAndHide(video_element, wanted_langs) {

    const text = getText(video_element);
    const languageCode = await detectLanguage(text);
    if (!(wanted_langs.includes(languageCode))) {
        video_element.style.display = 'none';
    }

}

function observeResults(callback, wanted_langs) {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1 && node.tagName === 'YTD-VIDEO-RENDERER') {
                    callback(node, wanted_langs);
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
    try {
        const url = chrome.runtime.getURL('languageCodes.json');
        const response = await fetch(url);
        const languageCodes = await response.json();
        const keys = Object.keys(languageCodes);
        
        const wanted_langs = await new Promise((resolve, reject) => {
            chrome.storage.local.get(keys, function (result) {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }
                const langs = keys.filter(key => result[key]);
                resolve(langs);
            });
        });

        return wanted_langs;
    } catch (error) {
        console.error('Error fetching the JSON file or getting storage data:', error);
        return [];
    }
}


