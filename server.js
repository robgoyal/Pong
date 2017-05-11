
var express = require('express');
var app = express();

var server = app.listen(3000);

 
app.use(express.static('public'));
console.log("My socket server is running");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('new connection: ' + socket.id);

    // If a message called ball comes from client, trigger ballMessage
    socket.on('ball', ballMessage);

    function ballMessage(data) {
        socket.broadcast.emit('ball', data);
        console.log(data);
    }
}