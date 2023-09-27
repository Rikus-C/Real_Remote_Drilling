var websocket_sender;
var websocket = {}; 
websocket.ready = false; 

websocket.forward = function(obj){
  websocket_sender.send(JSON.stringify(obj));
}

function initiate_websocket_sender(ws){
  websocket_sender = ws; 
  websocket.ready = true;
}

module.exports = {
  websocket,
  initiate_websocket_sender
};

