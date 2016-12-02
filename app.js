var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

var members = {};
var rooms = [];
var roomnum = 1;
var numofconnections = 0;
var maxconnections = 3;
var scores = 0;
io.on("connection", function (socket) {
    if (numofconnections < maxconnections) {
        socket.on('adduser', function (username) {
            if (members[username] === undefined && username != null) {
                //!!!check for Duplicate usernames here
                numofconnections += 1;
                socket.username = username;
                members[username] = {
                    username: username,
                    score: 0,
                    mousex: 0,
                    mousey: 0,
                    ballx: 0,
                    bally: 0,
                    force: 0
                };
                socket.emit('updatechat', 'SERVER', 'you have connected');
                socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
                io.sockets.emit('updateusers', members);
            } else {
                socket.emit('nametaken', username);
            }
        });

        socket.on('disconnect', function () {
            if (socket.username != undefined) {
                numofconnections -= 1;
                delete members[socket.username];
                io.sockets.emit('updateusers', members);
                socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
            }
        });

        socket.on("startGame", function () {
            io.sockets.emit('startGame');
        })

        socket.on("sendScore", function (data) {
            scores += 1;
            members[socket.username].score = data;

            if (scores >= Object.keys(members).length) {
                io.sockets.emit('showScores', members);
            }
        })

        socket.on("gameover", function () {
            io.sockets.emit('updateusers', members);
            if (numofconnections > 0) {
                numofconnections -= 1;
            }
            delete members[socket.username];
            socket.disconnect();
        })

        socket.on('sendchat', function (data) {
            io.sockets.emit('updatechat', socket.username, data);
        });

        socket.on('updateScore', function (score) {
            members[socket.username].score += score;
            io.sockets.emit('updateusers', members);
        });

        socket.on('ballMove', function (ball) {
            members[socket.username].ballx = ball.ballX;
            members[socket.username].bally = ball.ballY;
            socket.broadcast.emit('updateusers', members);
        })

    } else {
        socket.emit('updatechat', 'Server', "We are sorry this game is full");
        socket.emit("tooManyPlayers");
        socket.disconnect();
    }
});

app.use(express.static('public'));

var port = Number(process.env.PORT || 3000);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

server.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

exports = module.exports = app;

// http.listen(3000, function () {
//     console.log("listening on port 3000");
// })

