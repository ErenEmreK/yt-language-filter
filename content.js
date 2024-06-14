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


function main() {
    //TODO check playlist and shorts too
    console.log("Hello from Filter");
    document.querySelectorAll('ytd-video-renderer, yt-reel').forEach(video => {
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