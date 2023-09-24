const websocket = require("ws");
const settings = require("../settings/comms_settings.json");

// Create a websocket server
const wss = new websocket.Server({port: settings["websocket port"]});

// Event listener for when a client connects
wss.on("connection", (ws) => {
  console.log("A client connected.");
  send_dummy_data(ws); // please remove later or face the conciquences
  // Event listener for when a message is received from a client
  ws.on("message", (message) => {
    console.log("Received from frontend:\n");
    console.log(JSON.parse(message));
  });

  // Event listener for when a client disconnects
  ws.on("close", () => {
    console.log("A client disconnected.");
  });
});

// all this code can be removed later

var msg1 = {type: "feedback", rawArray: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};
var msg2 = {type: "feedback", rawArray: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
var flag = false;

function send_dummy_data(ws){
  setInterval(function(){
    if(flag === true) ws.send(JSON.stringify(msg1));
    else ws.send(JSON.stringify(msg2))
    flag = !flag;
  }, 2000);
}
