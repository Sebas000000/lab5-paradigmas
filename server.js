// npm install para descargar los paquetes...

// librerias
var validation = require('./libs/unalib');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// Middleware para parsear bodies JSON y urlencoded en peticiones HTTP
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// root: presentar html
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// Ruta HTTP que recibe mensajes (POST /mensaje, POST /chat, POST /api/mensaje)
app.post(['/mensaje', '/chat', '/api/mensaje'], function(req, res){
  var body = req.body;
  if (!body) {
    return res.status(400).json({ error: 'Cuerpo de mensaje no proporcionado' });
  }

  // Llamada a validarMensaje de una-lib
  var validatedJsonStr = (typeof validation.validarMensaje === 'function') 
    ? validation.validarMensaje(body)
    : validation.validateMessage(body);

  var validatedObj = JSON.parse(validatedJsonStr);

  // Emitir a todos los clientes conectados a traves de Socket.IO
  io.emit('Evento-Mensaje-Server', validatedJsonStr);

  // Si contiene URL no permitida, se rechaza la entrada (HTTP 400)
  if (validatedObj.mensaje && validatedObj.mensaje.includes('URL no permitida')) {
    return res.status(400).json(validatedObj);
  }

  // Entrada aceptada (imagen valida, video valido o texto regular saneado)
  return res.status(200).json(validatedObj);
});

// escuchar una conexion por socket
io.on('connection', function(socket){
  // si se escucha "Evento-Mensaje-Server"
  socket.on('Evento-Mensaje-Server', function(msg){
    // Validar mensaje usando unalib (validarMensaje)
    if (typeof validation.validarMensaje === 'function') {
      msg = validation.validarMensaje(msg);
    } else {
      msg = validation.validateMessage(msg);
    }
    // volvemos a emitir el mensaje validado y procesado
    io.emit('Evento-Mensaje-Server', msg);
  });
});

// Iniciar servidor solo si se ejecuta directamente y no requerido por tests
if (require.main === module) {
  http.listen(port, function(){
    console.log('listening on *:' + port);
  });
}

// Exportar para pruebas de integracion con Supertest
module.exports = { app: app, http: http, server: http };
