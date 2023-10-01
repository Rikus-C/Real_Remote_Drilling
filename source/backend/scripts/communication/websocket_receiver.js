const websocket = require("ws");
const settings = require("../../settings/comms_settings.json");
const initiate_websocket_sender = require("./websocket_sender.js").initiate_websocket_sender;

// create a websocket server
const wss = new websocket.Server({port: settings["websocket port"]});

// event listener for when a client connects
wss.on("connection", function(ws){
  initiate_websocket_sender(ws);
  ws.on("message", function(msg){
    var message = JSON.parse(msg);
    if(message.type === "user inputs"){
      console.log(message.data);
    } 
    else if(message.type === ""){

    } 
    else if(message.type === ""){

    }
  });
  ws.on("close", function(){

  });
});

