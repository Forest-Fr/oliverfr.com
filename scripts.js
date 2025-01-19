document.addEventListener('DOMContentLoaded', function () {
    // 处理下载vCard按钮
    const downloadVCardButton = document.getElementById('downloadvcard');
    if (downloadVCardButton) {
        downloadVCardButton.addEventListener('click', function () {
            const vCardContent = `
BEGIN:VCARD
VERSION:3.0
FN:Oliver Fang
TEL:123456789
EMAIL:oliver.fang@example.com
END:VCARD
            `;
            const blob = new Blob([vCardContent], { type: 'text/vcard' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'Oliver_Fang.vcf';
            link.click();
        });
    }

    // 控制播放、暂停按钮
    const playPauseButton = document.getElementById('playPauseButton');
    const audioElement = document.getElementById('audioElement');
    const progressBar = document.getElementById('progressBar');

    let isPlaying = false;
    
    if (playPauseButton) {
        playPauseButton.addEventListener('click', function () {
            if (isPlaying) {
                audioElement.pause();
                playPauseButton.textContent = '播放';
            } else {
                audioElement.play();
                playPauseButton.textContent = '暂停';
            }
            isPlaying = !isPlaying;
        });
    }

    // 监听音频播放进度
    audioElement.addEventListener('timeupdate', function () {
        const progress = (audioElement.currentTime / audioElement.duration) * 100;
        progressBar.style.width = progress + '%';
    });

    // 实现进度条点击拖动功能
    progressBar.addEventListener('click', function (e) {
        const offsetX = e.offsetX;
        const progressBarWidth = progressBar.offsetWidth;
        const seekTime = (offsetX / progressBarWidth) * audioElement.duration;
        audioElement.currentTime = seekTime;
    });

    // 控制音频的进度条
    audioElement.addEventListener('play', function () {
        progressBar.style.width = '0%'; // reset progress when audio starts
    });

    // 音频结束时重置按钮
    audioElement.addEventListener('ended', function () {
        playPauseButton.textContent = '播放';
        isPlaying = false;
        progressBar.style.width = '0%';
    });

    // 左右移动播放按钮
    const carouselTrack = document.querySelector('.carousel-track');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    if (prevButton && nextButton && carouselTrack) {
        prevButton.addEventListener('click', function () {
            carouselTrack.scrollLeft -= 300; // 向左移动
        });

        nextButton.addEventListener('click', function () {
            carouselTrack.scrollLeft += 300; // 向右移动
        });
    }
});
