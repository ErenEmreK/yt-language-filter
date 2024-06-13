
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
    
function getLangByDescription(video_element) {
    //We get title and description
    let titleElement = video_element.querySelector('#video-title');
    let title = titleElement ? titleElement.textContent.trim() : '';

    let snippetElement = video_element.querySelector('.metadata-snippet-text-navigation');
    let description = snippetElement.textContent.trim();

    console.log("Title: ", title);
    language = textToLang(title, description);
    return language;
}

function cutVideos(wanted_langs) {

}

function main() {
    console.log("Hello from Filter");
    let videos = document.querySelectorAll('ytd-video-renderer');
    
    const lang = getLangByDescription(videos[0]);
    if (lang != "French") {
        videos[0].style.display = 'none';
    }

}

window.addEventListener('load', main);




















function getVideoIds() {
    //keep for api integration
    const videos = document.querySelectorAll('ytd-video-renderer');
    const videoIds = [];
    
    videos.forEach(video => {
        const videoId = video.querySelector('a#video-title').href.split('v=')[1];
        if (videoId) {
            videoIds.push(videoId);
        }
    });
    console.log(videoIds);
    
    return videoIds;
}
