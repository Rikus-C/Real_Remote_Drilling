var websocket;
websocket.ready = false;

function initiate_websocket_sender(ws){
  websocket = ws;
  websocket.ready = true;
}

function websocket_forward(obj){
  websocket.send(JSON.stringify(obj));
}

module.exports = {
  initiate_websocket_sender, 
  websocket_forward
};

