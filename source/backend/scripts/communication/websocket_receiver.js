const websocket = require("ws");
const settings = require("../../settings/comms_settings.json");
const ws_sender_initiate = require("./websocket_sender.js").initiate_websocket_sender;

// create a websocket server
const wss = new websocket.Server({port: settings["websocket port"]});

// event listener for when a client connects
wss.on("connection", function(ws){
  ws_sender_initiate(ws);
  ws.on("message", function(msg){
    var message = JSON.parse(msg);
    if(message.type === ""){

    } 
    else if(message.type === ""){

    } 
    else if(message.type === ""){

    }
  });
  ws.on("close", function(){

  });
});

