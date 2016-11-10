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
    var add = true,
        room = "";
    if (users.length === 0) {
        users.push(socket);
        room = "room0";
        add = false;
    } else {
        users.forEach(function (user, index) {
            if (!user) {
                user = socket;
                room = "room" + Math.floor(index / maxPlayers);
                add = false;
            }
        });
        if (add) {
            users.push(socket);
            room = "room" + Math.floor(users.length / maxPlayers);
        }
    }
    socket.join(room);
    if (rooms.indexOf(room) === -1) {
        rooms.push(room);
    }
    socket.emit('updatechat', 'SERVER', socket.id + " has connected to this room");
    socket.emit('updaterooms', rooms, room);



    console.log(socket.id + " user has connected");
    socket.nickname = 'Guest';
    socket.on("disconnect", function () {
        currentGamers.forEach(function (member, index) {
            if (member.id === socket.id) {
                member = false;
                socket.leave("joined room" + Math.floor(index / maxPlayers));
            }
        });
        console.log(socket.id + " user has disconnected");
    });

    socket.on("chat message", function (msg) {
        console.log(msg.msg, socket.id);
        var room;
        users.forEach(function (user) {
            if (user.if === socket.id) {}
        })
        currentGamers.forEach(function (member, index) {
            if (member.id === socket.id) {
                member = false;
                room = "room" + Math.floor(index / maxPlayers);
            }
        });
        io.to(room).emit('chat received', {
            message: msg.msg,
            sid: socket.id,
            name: msg.name
        });
        //        io.emit('chat received', {
        //            message: msg.msg,
        //            sid: socket.id,
        //            name: msg.name
        //        });
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