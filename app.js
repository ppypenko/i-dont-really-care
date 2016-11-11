"use strict";
var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});
var users = [];
var rooms = ["room0", "room1", "room2"];
var maxPlayers = 4;

io.on("connection", function (socket) {
    console.log(socket.id + " user has connected");
    socket.nickname = 'Guest';
    socket.on("disconnect", function () {
        var index = 0;
        for (index = 0; index < users.length; index += 1) {
            if (users[index] === socket.id) {
                users[index] = false;
            }
        }
        console.log(socket.id + " user has disconnected");
    });

    socket.on("chat message", function (msg) {
        io.emit('chat received', {
            message: msg.msg,
            sid: socket.id,
            name: msg.name
        });
    });

    socket.on("get clients", function (msg) {
        console.log('sending clients');
        console.log(io.sockets.clients());
        io.emit('list clients', io.sockets.clients().adapter.sids);
    });
});

app.use(express.static('public'));

http.listen(3000, function () {
    console.log("listening on port 3000");
});