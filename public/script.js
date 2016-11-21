"use strict";

var CANVAS_HEIGHT = 600;
var CANVAS_WIDTH = 800;
var FPS = 30;
var titleScreen, backgroundScreen, instructionScreen, gameoverScreen;
var inBtn, menuBtn, playBtn
var timertext, scoretext;
var score;
var socket;
var startTime;
var gamestate;
var ball;
var startX;
var startY;
var GAMESTATES = {
    CONSTRUCT: 0,
    TITLE: 1,
    INSTRUCTION: 2,
    STARTGAME: 3,
    INGAME: 4,
    GAMEOVER: 5,
    HOLD: 6
}
var stage, loader;

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
    createSocket();
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
        src: "scripts/mouse.js"
    }, {
        src: "scripts/player.js"
    }];

    loader = new createjs.LoadQueue(true, "assets/");
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest);
})()



function createSocket() {
    var enemiesBalls = {};
    socket = io.connect('http://localhost:3000');

    socket.on('connect', function () {
        socket.emit('adduser', prompt("What's your name?"));
    });


    socket.on('updatechat', function (username, data) {
        $('#conversation').append('<b>' + username + ':</b> ' + data + '<br>');
    });

    socket.on('updateusers', function (data) {
        $('#users').empty();
        console.log(data);
        $.each(data, function (key, value) {
            enemiesBalls[key] = value;
            stage.removeChild(enemiesBalls[key].ball);
            enemiesBalls[key].ball = new createjs.Shape();
            enemiesBalls[key].ball.graphics.beginFill("#000").drawCircle(value.ballx, value.bally, 5);
            enemiesBalls[key].ball.regX = 5;
            enemiesBalls[key].ball.regY = 5;
            stage.addChild(enemiesBalls[key].ball);
            enemiesBalls[key].ball.x = value.ballx;
            enemiesBalls[key].ball.y = value.bally;
            $('#users').append('<div>' + key + ' - ballx: ' + value.ballx + ' bally: ' + value.bally + '</div>');
        });
    });

    socket.on('nametaken', function (username) {
        socket.emit('adduser', prompt("The username " + username + " was taken or invalid please enter a different name."));
    });

    stage.on("stagemousedown", function (evt) {
        var mouseDownX = Math.floor(evt.stageX),
            mouseDownY = Math.floor(evt.stageY);
    });
    stage.on("stagemouseup", function (evt) {
        var mouse = {};
        mouse.upX = Math.floor(evt.stageX);
        mouse.upY = Math.floor(evt.stageY);
        socket.emit('update', mouse);
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

function createPlayer() {
    var rectangle = new createjs.Shape();
    rectangle.graphics.beginFill("#447").drawRect(0, 0, 20, 20);
    myText = new createjs.Text(my_name, "12px Arial", "#ffffff"); //creates text object
    myText.x = 0;
    myText.y = 0;
}

