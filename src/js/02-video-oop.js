import Player from '@vimeo/player';
import throttle from "lodash.throttle";

class VideoPlayer{
    static STORAGE_KEY = 'videoplayer-current-time';

    constructor(selector, player) {
        this.$el = document.querySelector(selector)
        this.player = new player(this.$el);
        this.playerEvent();
        this.setVideoTime();
    }

    playerCurrentTime = (data) => {
        const dataJSON = JSON.stringify(data);
        
        if (data.percent === 1) {
            player.off('play');
        }

        localStorage.setItem(VideoPlayer.STORAGE_KEY, dataJSON);
    }

    getEndedVideo = () => {
        localStorage.removeItem(VideoPlayer.STORAGE_KEY);
    }

    setVideoTime() {
    const savedTime = localStorage.getItem(VideoPlayer.STORAGE_KEY);

        if (savedTime) {
            const parceJSON = JSON.parse(savedTime);
            this.player.setCurrentTime(parceJSON.seconds);
        }
    }

    playerEvent() {

        let timeupdateArrowFunc = this.playerCurrentTime.bind(this);
        let endedArrowFunc = this.getEndedVideo.bind(this);

        this.player.on('timeupdate', throttle(timeupdateArrowFunc, 1000));
        this.player.on('ended', endedArrowFunc);
    }

}

const playerVimeo = new VideoPlayer('iframe', Player);
console.log(playerVimeo);

