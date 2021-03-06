let PORT = 3000;
var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

const io = require('socket.io')(server);
const users = {};
let v;
io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    })
    socket.on('send', message => {
        socket.broadcast.emit('receive', {
            message: message,
            name: users[socket.id]
        })
    })
    socket.on('disconnect', name => {
        socket.broadcast.emit('user-left', users[socket.id]);
     });
})

server.listen(PORT || process.env.PORT, function() {
    console.log('Chat server running');
  });
