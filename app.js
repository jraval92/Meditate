const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.animate circle');
    const video = document.querySelector('.vid-container video');

    const sounds = document.querySelectorAll('.audio-picker button');

    const timeLeft = document.querySelector('.time-left');
    const timeSelect = document.querySelectorAll('.time-select button');

    const outlineLength = outline.getTotalLength();
    //console.log(outlineLength);
    let fDur = 600;
    //Time remaining to the circle
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    sounds.forEach(sound => 
        {
            sound.addEventListener('click', function(){
                song.src = this.getAttribute('data-sound');
                video.src = this.getAttribute('data-video');
                checkPlay(song);
            });
        });


    //Adds mouse click to the play icon
    play.addEventListener('click', () => {
        checkPlay(song);
    });

    timeSelect.forEach(option => 
        {
            option.addEventListener('click', function()
            {
                fDur = this.getAttribute('data-time');
                timeLeft.textContent = `${Math.floor(fDur / 60)}:${Math.floor(fDur%60)}`;
            });
        }); 
    //Checks to see if the song is playing
    const checkPlay = song =>
    {
        if(song.paused)
        {
            song.play();
            video.play();
            play.src = './svg/pause.svg'
        }
        else
        {
            song.pause();
            video.pause();
            play.src = './svg/play.svg'
        }
    };

    song.ontimeupdate = () =>
    {
        let currentTime = song.currentTime;
        let elapsed = fDur - currentTime;
        let sec = Math.floor(elapsed % 60);
        let min = Math.floor(elapsed / 60);

        //Animate the circle
        let progress = outlineLength - (currentTime/fDur) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //Animate text
        timeLeft.textContent = `${min}:${sec}`;

        if(currentTime >= fDur)
        {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg'
            video.pause();
        }
    };

};

app();