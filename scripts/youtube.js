// YOUTUBE

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: h,
        width: w,
        videoId: 'EOyGTU2vAfI',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    // do nothing
    player.seekTo(35);
}

var interval;
var done = false;
function onPlayerStateChange(event) {

    if (event.data == YT.PlayerState.PLAYING && !done) {
        interval = setInterval(function() {


            // animation


        }, 1000 / 30);
        renderer.domElement.style.display = 'block';
        done = true;
    }
    if (event.data == YT.PlayerState.ENDED) {
        clearInterval(interval);
        done = false;
        renderer.domElement.style.display = 'none';
    }
}

