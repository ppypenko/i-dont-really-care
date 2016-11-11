var stage;
var my_name;
var current_score = 0;

$('document').ready(function () {

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
            $('#users').append('<div>' + key + '- Score: ' + value.score + '</div>');
        });
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
            if (e.which == 13) {
                $(this).blur();
                $('#datasend').focus().click();
            }
        });
    });

    socket.on("too Many", function (data) {
        console.log(data);
        $('#messages').prepend($('<li>').text(data.message));
    })

    main();
});

var player = {
    x: ((Math.random() * 60) * 10) + 100,
    y: 20
}

function setupCanvas() {
    var canvas = document.getElementById("game"); //get canvas with id='game'
    canvas.width = 800;
    canvas.height = 400;
    stage = new createjs.Stage(canvas); //makes stage object from the canvas
}

function createPlayer() {
    var rectangle = new createjs.Shape();
    rectangle.graphics.beginFill("#447").drawRect(0, 0, 20, 20);
    myText = new createjs.Text(my_name, "12px Arial", "#ffffff");  //creates text object
    myText.x = 0;
    myText.y = 0;
}

function main() {
    // setupCanvas(); //sets up the canvas
    // createPlayer();
}

