function loop() {

    //state machine for GameState (instruction, startgame, start level, In game, construct, hold)
    switch (gamestate) {
        case GAMESTATES.CONSTRUCT:
            break;
        case GAMESTATES.TITLE:
            break;
        case GAMESTATES.INSTRUCTION:
            break;
        case GAMESTATES.STARTGAME:
            startGame();
            break;
        case GAMESTATES.INGAME:
            updateTimer();
            score += 1;
            scoretext.text = "Score: " + score;
            checkMovement();
            break;
        case GAMESTATES.GAMEOVER:
            hideAll();
            showGameOver();
            gamestate = GAMESTATES.HOLD;
            break;
        case GAMESTATES.HOLD:
            break;
    }

    stage.update();
}

ballSpeedX = 0;
ballSpeedY = 0;
speedXModifier = 1;
speedYModifier = 1;
frictionX = -.1;
frictionY = -.1;
prevX, prevY;
function checkMovement() {

    prevX = ball.x;
    prevY = ball.y;
    if (ballSpeedX < 0) {
        frictionX = .1;
    }
    else {
        frictionX = -.1;
    }
    if (ballSpeedY < 0) {
        frictionY = .1;
    }
    else {
        frictionY = -.1;
    }

    if (ball.x < 0) {
        ballSpeedX = -ballSpeedX
        frictionX = -frictionX;
        speedXModifier = -speedXModifier;
    }
    if (ball.x + 60 > CANVAS_WIDTH) {
        ballSpeedX = -ballSpeedX
        frictionX = -frictionX;
        speedXModifier = -speedXModifier;
    }

    if (ball.y < 0) {
        ballSpeedY = -ballSpeedY;
        frictionY = -frictionY;
        speedYModifier = -speedYModifier;
    }
    if (ball.y + 60 > CANVAS_HEIGHT) {
        ballSpeedY = -ballSpeedY;
        frictionY = -frictionY;
        speedYModifier = -speedYModifier;
    }

    ball.x += ballSpeedX;
    ball.y += ballSpeedY;

    if (prevX !== ball.x || prevY !== ball.y) {
        socket.emit("ballMove", { ballX: ball.x, ballY: ball.y });
    }
    if (ballSpeedX > .1 || ballSpeedX < -.1) {
        ballSpeedX += frictionX;
    }
    else {
        ballSpeedX = 0;
    }
    if (ballSpeedY > .1 || ballSpeedY < -.1) {
        ballSpeedY += frictionY;
    } else {
        ballSpeedY = 0;
    }
}

function startLoop() {

    createjs.Ticker.addEventListener('tick', loop);
    createjs.Ticker.setFPS(FPS);

    gamestate = GAMESTATES.TITLE;
}