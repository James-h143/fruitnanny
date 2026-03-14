var streamContext = StreamContext;
var audioSpectrumWidget = AudioSpectrumWidget;
var target = document.getElementById('spinner');
spinner = new Spinner().spin(target);
$(document).ready(function () {
    var video = document.getElementById('video');
    var src = '/hls/stream.m3u8';
    if (Hls.isSupported()) {
        var hls = new Hls({
            liveSyncDurationCount: 2,
            liveMaxLatencyDurationCount: 4,
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
            streamContext.initFromElement(video);
            audioSpectrumWidget.enable();
        });
        hls.on(Hls.Events.ERROR, function (event, data) {
            if (data.fatal) {
                console.error('HLS fatal error:', data);
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