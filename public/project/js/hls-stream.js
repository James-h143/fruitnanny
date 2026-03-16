var streamContext = StreamContext;
var audioSpectrumWidget = AudioSpectrumWidget;
var target = document.getElementById('spinner');
spinner = new Spinner().spin(target);
$(document).ready(function () {
    var video = document.getElementById('video');
    var src = '/hls/stream.m3u8';
    if (Hls.isSupported()) {
        var hls = new Hls({
            liveSyncDurationCount: 1,
            liveMaxLatencyDurationCount: 2,
        });
        hls.attachMedia(video);
        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
            hls.loadSource(src);
        });
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play().catch(function (e) {
                console.warn('Autoplay blocked:', e);
            });
            if (spinner !== null && spinner !== undefined) {
                spinner.stop();
                spinner = null;
            }
        });

        var audioEl = document.createElement('audio');
        audioEl.style.display = 'none';
        document.body.appendChild(audioEl);
        var hlsAudio = new Hls({
            liveSyncDurationCount: 1,
            liveMaxLatencyDurationCount: 2,
        });
        hlsAudio.attachMedia(audioEl);
        hlsAudio.on(Hls.Events.MEDIA_ATTACHED, function () {
            hlsAudio.loadSource('/hls/audio.m3u8');
        });
        hlsAudio.on(Hls.Events.MANIFEST_PARSED, function () {
            audioEl.play().catch(function () {
                // Autoplay blocked — start on first user gesture
                document.addEventListener('click', function resumeAudio() {
                    audioEl.play().catch(function (e) { console.warn(e); });
                    document.removeEventListener('click', resumeAudio);
                }, { once: true });
            });
            streamContext.initFromElement(audioEl);
            audioSpectrumWidget.enable();
        });
        hlsAudio.on(Hls.Events.ERROR, function (event, data) {
            if (data.fatal) {
                switch (data.type) {
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        hlsAudio.recoverMediaError();
                        break;
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        hlsAudio.startLoad();
                        break;
                    default:
                        hlsAudio.destroy();
                        break;
                }
            }
        });
        hls.on(Hls.Events.ERROR, function (event, data) {
            if (data.fatal) {
                console.error('HLS fatal error:', data);
                switch (data.type) {
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        hls.recoverMediaError();
                        break;
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        hls.startLoad();
                        break;
                    default:
                        hls.destroy();
                        break;
                }
            }
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
        video.addEventListener('loadedmetadata', function () {
            video.play();
            if (spinner !== null && spinner !== undefined) {
                spinner.stop();
                spinner = null;
            }
        });
    } else {
        console.error('HLS not supported in this browser');
    }
});