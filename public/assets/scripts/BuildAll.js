function buildAll() {

    collisionMethod = ndgmr.checkPixelCollision;

    titleScreen = new createjs.Bitmap(loader.getResult("title"));
    instructionScreen = new createjs.Bitmap(loader.getResult("instruction"));
    backgroundScreen = new createjs.Bitmap(loader.getResult("bg"));
    gameoverScreen = new createjs.Bitmap(loader.getResult("gameover"));

    inBtn = new createjs.Bitmap(loader.getResult("inBtn"));
    menuBtn = new createjs.Bitmap(loader.getResult("menuBtn"));
    playBtn = new createjs.Bitmap(loader.getResult("playBtn"));


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
    inBtn.x = 650;
    inBtn.y = 500;

    inBtn.on("click", function (evt) {
        hideAll();
        showInstructions();
    });

    //title button
    menuBtn.x = 650;
    menuBtn.y = 500;

    menuBtn.on("click", function (evt) {
        hideAll();
        showTitle();
    })

    //play Button
    playBtn.x = 530
    playBtn.y = 500;

    playBtn.on("click", function (evt) {
        hideAll();
        gamestate = GAMESTATES.STARTGAME;
    })

    //text
    timertext = new createjs.Text("", "20px Arial", "#000");
    timertext.x = 50;
    timertext.y = 50;

    scoretext = new createjs.Text("", "20px Arial", "#000");
    scoretext.x = 650;
    scoretext.y = 50;

    mousetext = new createjs.Text("", "20px Arial", "#000");
    mousetext.x = 50;
    mousetext.y = 100;

    hole = new createjs.Shape();
    hole.graphics.beginFill("#fff").drawCircle(0, 0, 15);
    hole.x = CANVAS_WIDTH / 2;
    hole.y = CANVAS_HEIGHT / 2;
    hole.radius = 15;

    ball = new createjs.Shape();
    ball.graphics.beginFill("#a00").drawCircle(50, 50, 10);
    ball.regX = 25;
    ball.regY = 25;

    ball.on("mousedown", function (evt) {
        startX = evt.stageX;
        startY = evt.stageY;
    });
    ball.on("pressup", function (evt) {
        var angle = Math.atan2(evt.stageY - (ball.y + 25), evt.stageX - (ball.x + 25));
        angle = (toDegrees(angle) + 180) % 360;


        xdiff = Math.floor(Math.pow((evt.stageX - startX), 2));
        ydiff = Math.floor(Math.pow((evt.stageY - startY), 2));

        var velocityX = Math.floor(Math.cos((angle) * Math.PI / 180) * 10);
        var velocityY = Math.floor(Math.sin((angle) * Math.PI / 180) * 10);

        totalDiff = Math.floor(Math.sqrt((xdiff + ydiff)) / 50);

        if (ballSpeedX === 0 && ballSpeedY === 0) {
            ballSpeedX = velocityX;
            ballSpeedY = velocityY;
        }
    })

    //append to stage
    stage.addChild(titleScreen);
    stage.addChild(instructionScreen);
    stage.addChild(backgroundScreen);
    stage.addChild(gameoverScreen);
    stage.addChild(playBtn);
    stage.addChild(inBtn);
    stage.addChild(menuBtn);
    stage.addChild(timertext);
    stage.addChild(scoretext);
    stage.addChild(mousetext);
    stage.addChild(ball);
    stage.addChild(hole);


    hideAll();
    showTitle();
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

function buildSprite() {

}

function displaySprites() {
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
}