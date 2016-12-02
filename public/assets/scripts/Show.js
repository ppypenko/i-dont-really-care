function showTitle() {
    titleScreen.visible = true;
    inBtn.visible = true;
    playBtn.visible = true;
    multiBtn.visible = true;
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
    ball.x = 120;
    ball.y = 120;
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