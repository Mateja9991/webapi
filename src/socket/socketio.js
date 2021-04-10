const socketio = require('socket.io');

const exp = (server) => {
    const io = socketio(server);
    io.on('connection', (socket) => {
        console.log('New Connection');
        socket.on('sendMessage', (message, callback) => {

        });
    });
};
module.exports = exp;