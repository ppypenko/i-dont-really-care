"use strict";

var CANVAS_HEIGHT = 600;
var CANVAS_WIDTH = 800;
var FPS = 30;
var titleScreen, backgroundScreen, instructionScreen, gameoverScreen, tooManyScreen;
var inBtn, menuBtn, playBtn
var timertext, scoretext, playerCountText;
var score;
var socket;
var collisionMethod;
var startTime;
var gamestate;
var ball, hole;
var startX;
var startY;
var startPower = false;
var GAMESTATES = {
    CONSTRUCT: 0,
    TITLE: 1,
    INSTRUCTION: 2,
    STARTGAME: 3,
    INGAME: 4,
    GAMEOVER: 5,
    HOLD: 6,
    WAITING: 7,
    TOOMANYPLAYERS: 8
}
var stage, loader;
var multiplayer = false;
var my_name;
var user;
var current_score = 0;

var manifest = [{
    src: "scripts/mouse.js"
}, {
    src: "scripts/player.js"
}];
function handleComplete() {
    setupCanvas();
    createPlayer();
    mouseInfo();
    buildAll();
    startLoop();
}


(function main() {

    var date = new Date();
    var cacheVersion = date.getTime();
    //var cacheVersion = 1;

    var jsEnd = ".js?a=" + cacheVersion;

    manifest = [{
        src: "scripts/CanvasSetup" + jsEnd
    }, {
        src: "scripts/KeyCommands" + jsEnd
    }, {
        src: "scripts/BuildAll" + jsEnd
    }, {
        src: "scripts/Timer" + jsEnd
    }, {
        src: "scripts/Score" + jsEnd
    }, {
        src: "scripts/GameLoop" + jsEnd
    }, {
        src: "scripts/Show" + jsEnd
    }, {
        src: "scripts/Round" + jsEnd
    }, {
        src: "images/title.png",
        id: "title"
    }, {
        src: "images/instruction.png",
        id: "instruction"
    }, {
        src: "images/gameover.png",
        id: "gameover"
    }, {
        src: "images/background.png",
        id: "bg"
    }, {
        src: "images/inbutton.png",
        id: "inBtn"
    }, {
        src: "images/menubutton.png",
        id: "menuBtn"
    }, {
        src: "images/playButton.png",
        id: "playBtn"
    }, {
        src: "images/sprites.png",
        id: "mySprites"
    },
    {
        src: "images/golfHole.png",
        id: "golfHole"
    },
    {
        src: "images/golfBall.png",
        id: "golfBall"
    },
    {
        src: "images/multiplayer.png",
        id: "multi"
    },
    {
        src: "images/waiting.png",
        id: "waiting"
    },
    {
        src: "images/toomany.png",
        id: "toomany"
    },
    {
        src: "images/cancel.png",
        id: "cancel"
    },
    {
        src: "scripts/mouse.js"
    }, {
        src: "scripts/player.js"
    },
    {
        src: "scripts/Collision/ndgmr.Collision" + jsEnd
    }];

    loader = new createjs.LoadQueue(true, "assets/");
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest);
})()



function createSocket() {
    multiplayer = true;
    gamestate = GAMESTATES.WAITING;

    var enemiesBalls = {};
    socket = io.connect('http://localhost:3000');

    socket.on('connect', function () {
        my_name = prompt("What's your name?");
        socket.emit('adduser', my_name);
    });


    socket.on('updatechat', function (username, data) {
        $('#conversation').append('<b>' + username + ':</b> ' + data + '<br>');
    });

    socket.on('updateusers', function (data) {
        var numofusers = 0;
        $('#users').empty();
        $.each(data, function (key, value) {
            numofusers += 1;
            if (key != my_name) {
                if (enemiesBalls[key] === undefined) {
                    enemiesBalls[key] = new createjs.Shape();
                    enemiesBalls[key].graphics.beginFill("#000").drawCircle(50, 50, 5);
                    enemiesBalls[key].regX = 25;
                    enemiesBalls[key].regY = 25;
                    stage.addChild(enemiesBalls[key]);
                }
                enemiesBalls[key].x = value.ballx;
                enemiesBalls[key].y = value.bally;
            }
            $('#users').append('<div>' + key + ' - Score: ' + value.score + '</div >');
        });
        playerCountText.text = numofusers + "/3";
        if (numofusers >= 3 && gamestate !== GAMESTATES.INGAME) {
            socket.emit("startGame");
        }
    });

    socket.on('nametaken', function (username) {
        socket.emit('adduser', prompt("The username " + username + " was taken or invalid please enter a different name."));
    });

    socket.on('startGame', function () {
        hideAll();
        gamestate = GAMESTATES.STARTGAME;
    })

    socket.on('tooManyPlayers', function () {
        multiplayer = false;
        gamestate = GAMESTATES.TOOMANYPLAYERS;
    })

    socket.on('showScores', function (members) {
        var scoredata = "";
        $.each(members, function (key, value) {
            scoredata += value.username + ": " + value.score + " \n";
        });
        console.log(scoredata);
        scoretext.text = scoredata;
        disconnectSocket();
    });

    $(function () {
        $('#datasend').click(function () {
            var message = $('#data').val();
            $('#data').val('');
            socket.emit('sendchat', message);
        });

        $('#scoresend').click(function () {
            var message = $('#data').val();
            $('#data').val('');
            socket.emit('updateScore', 1);
        });

        $('#data').keypress(function (e) {
            if (e.which === 13) {
                $(this).blur();
                $('#datasend').focus().click();
            }
        });

    });
}

function disconnectSocket() {
    $('#users').empty();
    playerCountText.text = "";
    socket.emit("gameover", score);
}

function sendScore() {
    if (score > localStorage.getItem("highScore")) {
        localStorage.setItem('highScore', score);
        socket.emit('sendchat', "set a new HighScore !!!");
    }
    socket.emit("sendScore", score);
}

function createPlayer() {
    var rectangle = new createjs.Shape();
    rectangle.graphics.beginFill("#447").drawRect(0, 0, 20, 20);
    myText = new createjs.Text(my_name, "12px Arial", "#ffffff"); //creates text object
    myText.x = 0;
    myText.y = 0;
}

