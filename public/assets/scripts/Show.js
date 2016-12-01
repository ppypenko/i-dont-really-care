function showTitle() {
    titleScreen.visible = true;
    inBtn.visible = true;
    playBtn.visible = true;
    multiBtn.visible = true;
    console.log("title");
}

function showInstructions() {
    instructionScreen.visible = true;
    menuBtn.visible = true;
}

function showGameOver() {
    gameoverScreen.visible = true;
    menuBtn.visible = true;
    scoretext.visible = true;
    scoretext.x = 380;
    scoretext.y = 300;
}

function startGame() {
    scoretext.x = 650;
    scoretext.y = 50;
    scoretext.text = "Score: 0"
    backgroundScreen.visible = true;
    startTimer();
    startScore();
    gamestate = GAMESTATES.INGAME;
    ball.visible = true;
    hole.visible = true;
    powertext.visible = true;
    power.visible = true;
}

function showWaiting() {
    hideAll();
    console.log("here1");
    waitingScreen.visible = true;
    playerCountText.visible = true;
    cancelBtn.visible = true;
    gamestate = GAMESTATES.HOLD;
}

function showTooMany() {
    hideAll();
    tooManyScreen.visible = true;
    menuBtn.visible = true;
    gamestate = GAMESTATES.HOLD;
}