import Player from '@vimeo/player';
import throttle from "lodash.throttle";

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(playerCurrentTime, 1000));
player.on('ended', getEndedVideo);
setVideoTime();


function playerCurrentTime(data) {
    const dataJSON = JSON.stringify(data);

    if (data.percent > 0.99) {
        player.off('timeupdate');
    }

    localStorage.setItem(STORAGE_KEY, dataJSON);
}

function getEndedVideo() {
    console.log('finished the video!');

   localStorage.removeItem(STORAGE_KEY);
    
}

function setVideoTime() {
    const savedTime = localStorage.getItem(STORAGE_KEY);

    if (savedTime) {
        const parceJSON = JSON.parse(savedTime);
        player.setCurrentTime(parceJSON.seconds);
    }
}
