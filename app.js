var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

var members = {};
var numofconnections = 0;
var maxconnections = 3;
io.on("connection", function (socket) {
    if (numofconnections < maxconnections) {
        socket.on('adduser', function (username) {
            numofconnections += 1;
            socket.username = username;
            members[username] = username;
            socket.emit('updatechat', 'SERVER', 'you have connected');
            socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
            console.log(members);
            io.sockets.emit('updateusers', members);
        });

        socket.on('disconnect', function () {
            numofconnections -= 1;
            delete members[socket.username];
            io.sockets.emit('updateusers', members);
            socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
        });

        socket.on('sendchat', function (data) {
            io.sockets.emit('updatechat', socket.username, data);
        });

    } else {
        console.log("too many players");
        socket.emit('updatechat', 'Server', "We are sorry there are currently to many connections");
        socket.disconnect();
    }
});

app.use(express.static('public'));

http.listen(3000, function () {
    console.log("listening on port 3000");
})