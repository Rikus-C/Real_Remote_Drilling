const WebSocket = require('ws');
const Remote_Drilling = require('./remote_drilling.js');

var Websocket = {};
Websocket.Buffer = [];

Websocket.Socket = new WebSocket.Server({port: 3000});

Websocket.Socket.on("connection", function (ws) {
  ws.on("message", function (frame) {
    Remote_Drilling.Read_Websocket_Frame(frame);
  });
});

Websocket.Send = function (msg) {
  Websocket.Socket.clients.forEach(function each(client) {
    client.send(msg);
  });
}

Remote_Drilling.Update_Websocket(Websocket);

module.exports = Websocket;
