var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

var members = {};
var rooms = [];
var roomnum = 1;
var numofconnections = 0;
var maxconnections = 3;
io.on("connection", function (socket) {
    console.log(numofconnections);
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
        socket.on('update', function (user) {
            members[socket.username].ballx = user.upX;
            members[socket.username].bally = user.upY;
            io.sockets.emit('updateusers', members);
        });

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
            io.sockets.emit('updateusers', members);
        })

    } else {
        socket.emit('updatechat', 'Server', "We are sorry this game is full");
        socket.disconnect();
    }
});

// io.on("connection", function (socket) {
//     if (io.nsps['/'].adapter.rooms["room-" + roomnum] && io.nsps['/'].adapter.rooms["room-" + roomnum].length > 1) {
//         roomnum += 1;
//     }

//     rooms.forEach(function (arrayRoom, index) {
//         if (Object.keys(arrayRoom).length < maxconnections && add) {
//             makeConnection(socket, arrayRoom, "room" + index);
//             add = false;
//         }
//         members[socket.username].score += score;
//         io.sockets.emit('updateusers', members);
//     });
//     if (add) {
//         rooms.push(room);
//         makeConnection(socket, room, "room" + rooms.length);
//     }
// } else {
//         rooms.push(room);
//         socket.emit('updatechat', 'Server', "We are sorry this game is full");
//         makeConnection(socket, room, "room0");
// socket.disconnect();
//     }
// });

// function makeConnection(socket, members, roomname) {
//     socket.on('adduser', function (username) {
//         //!!!check for Duplicate usernames here
//         console.log(members[username]);
//         numofconnections += 1;
//         socket.username = username;
//         members[username] = {
//             username: username,
//             score: 0
//         };
//         socket.emit('updatechat', 'SERVER', 'you have connected');
//         socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
//         io.sockets.emit('updateusers', members);
//     });

//     socket.on('disconnect', function () {
//         numofconnections -= 1;
//         delete members[socket.username];
//         io.sockets.emit('updateusers', members);
//         socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
//     });
//     socket.on('updateScore', function (score) {
//         delete members[socket.username];
//         io.sockets.emit('updateusers', members);
//         socket.leave(roomname);
//         socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
//     });

//     socket.on('sendchat', function (data) {
//         io.to(roomname).emit('updatechat', socket.username, data);
//         //io.sockets.emit('updatechat', socket.username, data);
//     });
//     socket.on('updateScore', function (score) {
//         console.log(score);
//         members[socket.username].score += score;
//         io.to(roomname).emit('updateusers', members);
//         //io.sockets.emit('updateusers', members);
//     });
// };

app.use(express.static('public'));

http.listen(3000, function () {
    console.log("listening on port 3000");
})