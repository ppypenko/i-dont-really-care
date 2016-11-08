var stage;
var my_name;

$('document').ready(function () {
    
    var socket = io();
    $('#client_info').submit(function (evt) {
        evt.preventDefault();
        var temp = '';
        socket.emit('get clients', temp);
    });
    
    socket.on("list clients", function (data) {
        console.log(data);
    });
    
    $('#message_form').hide();
    $('#name_form').submit(function (evt) {
        evt.preventDefault();
        my_name = $('#name').val();
        $('#name').val("");
        $('#name_holder').html('<h3>' + my_name + '</h3>');
        $('#message_form').show();
    });

    $('#message_form').submit(function (evt) {
        evt.preventDefault();
        var temp = {
            name: my_name,
            msg: $('#msg').val()
        }
        socket.emit('chat message', temp);
        $('#msg').val("");
    });

    socket.on("chat received", function (data) {
        $('#messages').prepend($('<li>').text(data.name + ' says: ' + data.message));
    });
    
    main();
});

var player = {
    x: ((Math.random()*60) * 10)+100,
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
    setupCanvas(); //sets up the canvas
    createPlayer();
}

