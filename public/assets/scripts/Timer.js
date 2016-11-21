    function startTimer() {
        startTime = (new Date()).getTime();
        timertext.visible = true;
    }

    function updateTimer() {
        currentTime = (new Date()).getTime();
        var time = ((currentTime - startTime) / 1000).toFixed(1);
        timertext.text = time + "s";
        // if (time >= 30) {
        //     gamestate = GAMESTATES.GAMEOVER;
        // }
    }