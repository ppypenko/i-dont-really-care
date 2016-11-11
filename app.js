var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

var members = {};
var rooms = [];
var numofconnections = 0;
var maxconnections = 3;


function makeConnection(socket, members, roomname) {
    socket.on('adduser', function (username) {
        socket.username = username;
        members[username] = {
            username: username,
            score: 0
        };
        socket.join(roomname);
        socket.emit('updatechat', 'SERVER', 'you have connected');
        socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
        console.log(members, roomname);
        //io.sockets.emit('updateusers', members);
        io.to(roomname).emit('updateusers', members);
    });

    socket.on('disconnect', function () {
        delete members[socket.username];
        io.sockets.emit('updateusers', members);
        socket.leave(roomname);
        socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    });

    socket.on('sendchat', function (data) {
        io.to(roomname).emit('updatechat', socket.username, data);
        //io.sockets.emit('updatechat', socket.username, data);
    });
    socket.on('updateScore', function (score) {
        console.log(score);
        members[socket.username].score += score;
        io.to(roomname).emit('updateusers', members);
        //io.sockets.emit('updateusers', members);
    });
}
io.on("connection", function (socket) {
    var room = {};
    if (rooms.length > 0) {
        var add = true;
        rooms.forEach(function (arrayRoom, index) {
            if (Object.keys(arrayRoom).length < maxconnections && add) {
                makeConnection(socket, arrayRoom, "room" + index);
                add = false;
            }
        });
        if (add) {
            rooms.push(room);
            makeConnection(socket, room, "room" + rooms.length);
        }
    } else {
        rooms.push(room);
        makeConnection(socket, room, "room0");
    }
    //    if (numofconnections < maxconnections) {
    //        socket.on('adduser', function (username) {
    //            numofconnections += 1;
    //            socket.username = username;
    //            members[username] = username;
    //            socket.emit('updatechat', 'SERVER', 'you have connected');
    //            socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
    //            console.log(members);
    //            io.sockets.emit('updateusers', members);
    //        });
    //
    //        socket.on('disconnect', function () {
    //            numofconnections -= 1;
    //            delete members[socket.username];
    //            io.sockets.emit('updateusers', members);
    //            socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    //        });
    //
    //        socket.on('sendchat', function (data) {
    //            io.sockets.emit('updatechat', socket.username, data);
    //        });
    //
    //    } else {
    //        console.log("too many players");
    //        socket.emit('updatechat', 'Server', "We are sorry there are currently to many connections");
    //        socket.disconnect();
    //    }
});

app.use(express.static('public'));

http.listen(3000, function () {
    console.log("listening on port 3000");
})