var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const shortid = require('shortid');
var { rooms } = require('./bin/Rooms');

//Sockets
io.sockets.on('connect', (socket) => {
    console.log(`Un nuevo usuario con id ${socket.id} se ha conectado`)
    var msg = `El usuario con id ${socket.id} se ha conectado`
    socket.emit('connect', msg);

    socket.on('setPing', () => { // se activa en el servidor el evento on con nombre setPing enviado desde el cliente
        socket.emit('setPong', 'Esto es un pong'); //enviamos una respuesta al cliente con un nuevo nombre
    });
    socket.on('newRoom', () => {
        // se genera un id único
        var newRoomId = shortid.generate(); //genera un id aleatorio para la sala
    
        rooms.push({
            id: newRoomId, // se agrega la sala al arrglo de salas con el id generado y 
            players: [] // un array vacio para los jugadores de esa sala que se agregaran posteriormente
        });
        // se informan los cambios al cliente con el evento setNewRoom
        socket.emit('setNewRoom', { newRoomId, rooms });
    })
})

//cargar la pantilla html del juego
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//levantar el servidor
http.listen(3000, () => {
    console.log('listening on *:3000');
});