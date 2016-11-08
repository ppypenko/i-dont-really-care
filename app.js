var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

var currentMembers = [{}, {}, {}];

io.on("connection", function (socket) {
    currentMembers[0] = socket;
    currentMembers.forEach(function (member) {
        console.log(member);
    })
    console.log(socket.id + " user has connected");
    socket.nickname = 'Guest';
    socket.on("disconnect", function () {
        console.log(socket.id + "user has disconnected");
    });

    socket.on("chat message", function (msg) {
        console.log(msg.msg);
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
})