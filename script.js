document.addEventListener('DOMContentLoaded', () => {
    feather.replace(); 

    const playPauseButton = document.getElementById('play-pause');
    const audio = document.getElementById('audio');
    const songDuration = document.getElementById('song-duration');
    const lyricsContainer = document.getElementById('lyrics-container');
    let intervalId;

    const lyrics = [
        { time: 0, text: "Let's dance in style, let's dance for a while" },
        { time: 19, text: "Heaven can wait, we're only watching the skies" },
        { time: 23, text: "Hoping for the best but expecting the worst" },
        { time: 26, text: "Are you gonna drop the bomb or not?" },
        { time: 30, text: "Let us die young or let us live forever" },
        { time: 33, text: "We don't have the power but we never say never" },
        { time: 37, text: "Sitting in a sandpit, life is a short trip" },
        { time: 40, text: "The music's for the sad men" },
        { time: 44, text: "Can you imagine when this race is won" },
        { time: 47, text: "Turn our golden faces into the sun" },
        { time: 51, text: "Praising our leaders, we're getting in tune" },
        { time: 54, text: "The music's played by the, the mad man" },
        { time: 57, text: "Forever young" },
        { time: 60, text: "I want to be forever young" },
        { time: 65, text: "Do you really want to live forever?" },
        { time: 68, text: "Forever, and ever" },
        { time: 71, text: "Forever young" },
        { time: 74, text: "I want to be forever young" },
        { time: 79, text: "Do you really want to live forever?" },
        { time: 84, text: "Forever young" },
        { time: 89, text: "Some are like water, some are like the heat" },
        { time: 93, text: "Some are a melody and some are the beat" },
        { time: 97, text: "Sooner or later, they all will be gone" },
        { time: 100, text: "Why don't they stay young?" },
        { time: 103, text: "It's so hard to get old without a cause" },
        { time: 107, text: "I don't want to perish like a fading horse" },
        { time: 110, text: "Youth's like diamonds in the sun" },
        { time: 114, text: "And diamonds are forever" },
        { time: 117, text: "So many adventures couldn't happen today" },
        { time: 120, text: "So many songs we forgot to play" },
        { time: 125, text: "So many dreams swinging out of the blue" },
        { time: 128, text: "We'll let 'em come true" },
        { time: 131, text: "Forever young" },
        { time: 133, text: "I want to be forever young" },
        { time: 138, text: "Do you really want to live forever?" },
        { time: 142, text: "Forever, and ever" },
        { time: 144, text: "Forever young" },
        { time: 127, text: "I want to be forever young" },
        { time: 131, text: "Do you really want to live forever?" },
        { time: 136, text: "Forever, and ever" },
        { time: 139, text: "Forever young" },
        { time: 141, text: "I wanna be forever young" },
        { time: 147, text: "Do you really want to live forever? (Forever)" }
    ];
    
    

    playPauseButton.addEventListener('click', () => {
        togglePlay();
    });

    function togglePlay() {
        if (audio.paused) {
            audio.play();
            playPauseButton.innerHTML = '<i data-feather="pause"></i>'; 
            feather.replace(); 
            displayDuration(); 
            startPageTransition(); 
            syncLyrics(); 
        } else {
            audio.pause();
            playPauseButton.innerHTML = '<i data-feather="play"></i>';
            feather.replace(); 
            clearInterval(intervalId); 
            clearInterval(lyricsInterval); 
        }
    }

    function displayDuration() {
        audio.addEventListener('loadedmetadata', () => {
            const duration = formatTime(audio.duration);
            songDuration.textContent = duration; 
        });

        audio.addEventListener('timeupdate', () => {
            const currentTime = formatTime(audio.currentTime);
            const duration = formatTime(audio.duration);
            songDuration.textContent = currentTime + ' / ' + duration; 
        });
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedTime = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        return formattedTime;
    }

    function preloadImages(pages) {
        return new Promise((resolve) => {
            let loadedCount = 0;
            const totalImages = pages.length;

            pages.forEach(page => {
                const img = page.querySelector('img');
                if (img.complete) {
                    loadedCount++;
                    if (loadedCount === totalImages) resolve();
                } else {
                    img.onload = () => {
                        loadedCount++;
                        if (loadedCount === totalImages) resolve();
                    };
                }
            });
        });
    }

    const rightPages = document.querySelectorAll('.right-page');
    let currentPage = 0;

    function showPage(pageIndex) {
        rightPages.forEach((page, index) => {
            if (index === pageIndex) {
                page.style.transform = 'rotateY(0deg)';
                page.style.zIndex = 2;
                page.style.visibility = 'visible';
            } else if (index < pageIndex) {
                page.style.transform = 'rotateY(-180deg)';
                page.style.zIndex = 1;
                page.style.visibility = 'visible';
            } else {
                page.style.transform = 'rotateY(0deg)';
                page.style.zIndex = 0;
                page.style.visibility = 'visible';
            }
        });

        if (pageIndex < rightPages.length - 1) {
            rightPages[pageIndex + 1].style.transform = 'rotateY(0deg)';
            rightPages[pageIndex + 1].style.zIndex = 1;
            rightPages[pageIndex + 1].style.visibility = 'visible';
        }
    }

    function nextPage() {
        if (currentPage < rightPages.length - 1) {
            currentPage++;
        } else {
            currentPage = 0; 
        }
        showPage(currentPage);
    }

    function startPageTransition() {
        intervalId = setInterval(nextPage, 4000);
    }

    function syncLyrics() {
        const lyricsInterval = setInterval(() => {
            const currentTime = audio.currentTime;
            const currentLyric = lyrics.find(lyric => Math.floor(lyric.time) === Math.floor(currentTime));
            if (currentLyric) {
                lyricsContainer.textContent = currentLyric.text;
            }
        }, 1000);
    }

    preloadImages(rightPages).then(() => {
        showPage(currentPage);
    });
});