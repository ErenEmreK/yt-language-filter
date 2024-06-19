
var wanted_languages = ['French', 'Rus'];

function checkAndHide(video_element, wanted_langs) {
    const lang = getLangByDescription(video_element);
        if (!(wanted_langs.includes(lang))) {
            video_element.style.display = 'none';
        }
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

function getLangByDescription(video_element) {
    
    function textToLang(title, description) {
        //TODO
        let lang = '';
        text = (title + description).toLowerCase();
        if (text.includes("the")) {
            lang = 'English';
        }
        else {
            lang = 'Russian';
        }
        return lang;
    }
    //We get title and description
    let titleElement = video_element.querySelector('#video-title');
    let title = titleElement ? titleElement.textContent.trim() : '';

    let snippetElement = video_element.querySelector('.metadata-snippet-text-navigation');
    let description = snippetElement.textContent.trim();

    language = textToLang(title, description);
    return language;
}

function getLangByAPI(video_element, API_KEY) {
    // keep in case you need
    
    const videoId = video_element.querySelector('a#video-title').href.split('v=')[1];
    
    if (videoId) {
        const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`;
        fetch(url)
            .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log(response.json());
            return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}
            
function main() {
    /*
    //TODO check playlist and shorts too
    console.log("Hello from Filter");
    document.querySelectorAll('ytd-video-renderer, yt-reel').forEach(video => {
        checkAndHide(video, wanted_languages);
    });

    observeResults();
    */

    const video = document.querySelector('ytd-video-renderer');
    
    console.log("Hello from Language Filter!");
    //saveApiKey(API_KEY);

    (async function() {
        const YT_API_KEY = await getApiKey();    
        const video_language = getLangByAPI(video, YT_API_KEY);
    })();
    
    
}



function saveApiKey(API_KEY) {
    chrome.storage.sync.set({ youtube_api_key: API_KEY }, function() {
        console.log('API key set.');
    });
}

function getApiKey() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(['youtube_api_key'], function(result) {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(result.youtube_api_key);
            }
        });
    });
}


window.addEventListener('load', main);










/*

 .then(response => response.json())
            .then(data => {
            if (data.items.length > 0) {
                console.log(data);
                const video = data.items[0];
                const audioLanguage = video.snippet.defaultAudioLanguage;
                const language = video.snippet.defaultLanguage;
                console.log(`Default Audio Language: ${audioLanguage}`);
                console.log(`Default Language: ${language}`);
            } else {
                console.log('Video not found');
            }
            })
            .catch(error => console.error('Error:', error));
*/










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