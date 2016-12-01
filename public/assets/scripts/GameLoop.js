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
            checkMovement();
            break;
        case GAMESTATES.GAMEOVER:
            hideAll();
            showGameOver();
            if (multiplayer) {
                multiplayer = false;
                sendScore();
            }
            gamestate = GAMESTATES.HOLD;
            break;
        case GAMESTATES.HOLD:
            break;
        case GAMESTATES.WAITING:
            showWaiting();
            break;
        case GAMESTATES.TOOMANYPLAYERS:
            showTooMany();
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
powerNum = 0;
powerMod = 5;

function checkMovement() {

    var collision = collisionMethod(ball, hole);

    var xdiff = Math.floor(Math.pow((stage.mouseX - ball.x), 2));
    var ydiff = Math.floor(Math.pow((stage.mouseY - ball.y), 2));

    var totalDiff = Math.floor(Math.sqrt((xdiff + ydiff)) / 50);

    if (startPower && ballSpeedX === 0 && ballSpeedY === 0) {
        powerNum += powerMod;

        if (powerNum > 150) {
            powerMod = -powerMod;
        }
        if (powerNum < 0) {
            powerMod = -powerMod;
        }

        if (powerNum % 10 === 0) {
            powertext.text = "Power: " + powerNum;
            power.graphics.clear().beginFill("#000").drawRect(50, 520, powerNum, 20);
        }
    } else {
        powerNum = 0;
        powerMod = 5;
    }
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


    if ((prevX !== ball.x || prevY !== ball.y) && multiplayer) {
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

    if (collision && Math.pow(ballSpeedX, 2) < 49 && Math.pow(ballSpeedY, 2) < 49) {
        ball.x = 120;
        ball.y = 120;
        ballSpeedX = 0;
        ballSpeedY = 0;
        updateScore();
    }
}

function startLoop() {

    createjs.Ticker.addEventListener('tick', loop);
    createjs.Ticker.setFPS(FPS);

    gamestate = GAMESTATES.TITLE;
}