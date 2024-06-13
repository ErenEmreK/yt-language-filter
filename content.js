
    
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

    console.log("Title: ", title);
    language = textToLang(title, description);
    return language;
}

function hideVideos(wanted_langs) {
    let videos = document.querySelectorAll('ytd-video-renderer');
    videos.forEach(video => {
        const lang = getLangByDescription(video);
        if (!(lang in wanted_langs)) {
            video.style.display = 'none';
        }
    });
}

function main() {
    console.log("Hello from Filter");
    hideVideos(['French']);
}

window.addEventListener('load', main);

//TODO make it dynamic and block as you slide