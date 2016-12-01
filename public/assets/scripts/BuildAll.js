function buildAll() {

    collisionMethod = ndgmr.checkPixelCollision;

    titleScreen = new createjs.Bitmap(loader.getResult("title"));
    instructionScreen = new createjs.Bitmap(loader.getResult("instruction"));
    backgroundScreen = new createjs.Bitmap(loader.getResult("bg"));
    gameoverScreen = new createjs.Bitmap(loader.getResult("gameover"));
    waitingScreen = new createjs.Bitmap(loader.getResult("waiting"));
    tooManyScreen = new createjs.Bitmap(loader.getResult("toomany"));


    inBtn = new createjs.Bitmap(loader.getResult("inBtn"));
    menuBtn = new createjs.Bitmap(loader.getResult("menuBtn"));
    playBtn = new createjs.Bitmap(loader.getResult("playBtn"));
    multiBtn = new createjs.Bitmap(loader.getResult("multi"));
    cancelBtn = new createjs.Bitmap(loader.getResult("cancel"));


    //Screens
    titleScreen.x = 0;
    titleScreen.y = 0;

    instructionScreen.x = 0;
    instructionScreen.y = 0;

    backgroundScreen.x = 0;
    backgroundScreen.y = 0;

    gameoverScreen.x = 0;
    gameoverScreen.y = 0;

    //Buttons
    //instructions button
    inBtn.x = CANVAS_WIDTH / 2 - inBtn.getBounds().width / 2;
    inBtn.y = CANVAS_HEIGHT / 2 + 50;

    inBtn.on("click", function (evt) {
        hideAll();
        showInstructions();
    });

    //title button
    menuBtn.x = 630;
    menuBtn.y = 510;

    menuBtn.on("click", function (evt) {
        hideAll();
        showTitle();
    })

    //cancel button
    cancelBtn.x = 630;
    cancelBtn.y = 490;

    cancelBtn.on("click", function (evt) {
        hideAll();
        console.log("here");
        showTitle();
        disconnectSocket();
    })

    //play Button
    playBtn.x = CANVAS_WIDTH / 2 - playBtn.getBounds().width / 2;
    playBtn.y = CANVAS_HEIGHT / 2 - 100;

    playBtn.on("click", function (evt) {
        hideAll();
        gamestate = GAMESTATES.STARTGAME;
    })

    multiBtn.x = CANVAS_WIDTH / 2 - multiBtn.getBounds().width / 2;
    multiBtn.y = CANVAS_HEIGHT / 2 - 25;

    multiBtn.on("click", function (evt) {
        createSocket();
    })

    //text
    timertext = new createjs.Text("", "20px Arial", "#000");
    timertext.x = 50;
    timertext.y = 50;

    playerCountText = new createjs.Text("", "48px Arial", "#fff");
    playerCountText.x = 370;
    playerCountText.y = 350;

    scoretext = new createjs.Text("", "32px Arial", "#fff");
    scoretext.x = 650;
    scoretext.y = 50;
    scoretext.text = "Score: 0"

    mousetext = new createjs.Text("", "20px Arial", "#000");
    mousetext.x = 50;
    mousetext.y = 100;

    powertext = new createjs.Text("", "20px Arial", "#000");
    powertext.x = 50;
    powertext.y = 500;
    powertext.text = "Power: 0";

    power = new createjs.Shape();
    power.graphics.beginFill("#000").drawRect(50, 520, 20, 20);

    hole = new createjs.Bitmap(loader.getResult("golfHole"));
    console.log(hole.getBounds().width);
    hole.x = 450;
    hole.y = 460;

    ball = new createjs.Bitmap(loader.getResult("golfBall"));
    ball.x = 120;
    ball.y = 120;


    stage.on("stagemousedown", function (evt) {
        if (gamestate === GAMESTATES.INGAME) {
            startPower = true;
        }
    })

    stage.on("stagemouseup", function (evt) {
        var angle = Math.atan2(stage.mouseY - (ball.y + 25), stage.mouseX - (ball.x + 25));
        angle = (toDegrees(angle) + 180) % 360;


        xdiff = Math.floor(Math.pow((stage.mouseX - ball.x), 2));
        ydiff = Math.floor(Math.pow((stage.mouseY - ball.y), 2));

        totalDiff = Math.floor(Math.sqrt((xdiff + ydiff)) / 20) + 2;

        var velocityX = Math.floor(Math.cos((angle) * Math.PI / 180) * (powerNum / 10));
        var velocityY = Math.floor(Math.sin((angle) * Math.PI / 180) * (powerNum / 10));


        if (ballSpeedX === 0 && ballSpeedY === 0) {
            ballSpeedX = velocityX;
            ballSpeedY = velocityY;
        }

        startPower = false;
    })

    //append to stage
    stage.addChild(titleScreen);
    stage.addChild(instructionScreen);
    stage.addChild(backgroundScreen);
    stage.addChild(gameoverScreen);
    stage.addChild(playBtn);
    stage.addChild(inBtn);
    stage.addChild(multiBtn);
    stage.addChild(menuBtn);
    stage.addChild(timertext);
    stage.addChild(scoretext);
    stage.addChild(mousetext);
    stage.addChild(hole);
    stage.addChild(ball);
    stage.addChild(powertext);
    stage.addChild(power);
    stage.addChild(waitingScreen);
    stage.addChild(playerCountText);
    stage.addChild(tooManyScreen);
    stage.addChild(cancelBtn);

    hideAll();
    showTitle();
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

function hideAll() {
    instructionScreen.visible = false;
    inBtn.visible = false;
    titleScreen.visible = false;
    menuBtn.visible = false;
    backgroundScreen.visible = false;
    gameoverScreen.visible = false;
    playBtn.visible = false;
    timertext.visible = false;
    scoretext.visible = false;
    mousetext.visible = false;
    ball.visible = false;
    hole.visible = false;
    powertext.visible = false;
    power.visible = false;
    multiBtn.visible = false;
    waitingScreen.visible = false;
    playerCountText.visible = false;
    tooManyScreen.visible = false;
    cancelBtn.visible = false;
}