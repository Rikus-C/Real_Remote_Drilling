const websocket = require("ws");
const settings = require("../settings/comms_settings.json");

// create a websocket server
const wss = new websocket.Server({port: settings["websocket port"]});

// event listener for when a client connects
wss.on("connection", (ws) => {
  console.log("A client connected.");
  send_dummy_data(ws); // please remove later or face the conciquences
  // event listener for when a message is received from a client
  ws.on("message", (message) => {
    console.log("Received from frontend:\n");
    console.log(JSON.parse(message));
  });

  // event listener for when a client disconnects
  ws.on("close", () => {
    console.log("A client disconnected.");
  });
});

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

