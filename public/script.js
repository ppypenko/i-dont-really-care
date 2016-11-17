"use strict";
var stage;
var queue;
var my_name;
var user;
var current_score = 0;
var manifest = [{
    src: "scripts/mouse.js"
}, {
    src: "scripts/player.js"
}];

function createSocket() {
    var socket = io.connect('http://localhost:3000');

    socket.on('connect', function () {
        socket.emit('adduser', prompt("What's your name?"));
    });


    socket.on('updatechat', function (username, data) {
        $('#conversation').append('<b>' + username + ':</b> ' + data + '<br>');
    });

    socket.on('updateusers', function (data) {
        $('#users').empty();
        $.each(data, function (key, value) {
            console.log(key, value);
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

var player = {
    x: ((Math.random() * 60) * 10) + 100,
    y: 20
};

function setStage(socket) {

}

function createPlayer() {
    var rectangle = new createjs.Shape();
    rectangle.graphics.beginFill("#447").drawRect(0, 0, 20, 20);
    myText = new createjs.Text(my_name, "12px Arial", "#ffffff"); //creates text object
    myText.x = 0;
    myText.y = 0;
}

function loadComplete(evt) {
    createPlayer();
    mouseInfo();
}

function loadFiles() {
    queue = new createjs.LoadQueue(true, "assets/");
    queue.on("complete", loadComplete, this);
    queue.loadManifest(manifest);
}

function setupCanvas() {
    var canvas = document.getElementById("game"); //get canvas with id='game'
    canvas.width = 800;
    canvas.height = 400;
    canvas.style.backgroundColor = "lightblue";
    stage = new createjs.Stage(canvas); //makes stage object from the canvas
}

(function () {
    setupCanvas(); //sets up the canvas
    loadFiles();
    createSocket();
})();