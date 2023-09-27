const websocket = require("ws");
const settings = require("../settings/comms_settings.json");

// create a websocket server
const wss = new websocket.Server({port: settings["websocket port"]});
let hmi_socket;

// event listener for when a client connects
wss.on("connection", (ws) => {
  hmi_socket = ws;
  send_dummy_data(ws); // please remove later or face the conciquences

  ws.on("message", (message) => {
    
  });

  // event listener for when a client disconnects
  ws.on("close", () => {
    
  });
});

function send_and_wait(frame, condition){
  hmi_socket.send();
}

// all this code can be removed later

var msg = {type: "feedback", rawArray: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};

function send_dummy_data(ws){
  setInterval(function(){
    msg.rawArray.forEach(function(a,b){
      msg.rawArray[b] = Math.floor(Math.random() * 2);
    });
    ws.send(JSON.stringify(msg));
  }, 500);
}

module.exports = {hmi_socket, send_and_wait};

