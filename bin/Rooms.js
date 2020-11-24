var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const shortid = require('shortid');
var rooms = []; //arreglo de salas

//exportación de variables y métodos a otros módulos
module.exports = {
    rooms
}