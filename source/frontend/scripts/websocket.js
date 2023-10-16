// this is a websocket client code, the websocket server it will be
// connecting to can be found in the backend code for this program

const socket = new WebSocket("ws://" + settings["backend ip"] + ":" + settings["backend port"]);

socket.addEventListener("open", function() {
  console.log("Connected to backend");
});

socket.addEventListener("message", function(msg) {
  var message = JSON.parse(msg.data);

  if(message.type === "feedback"){
    show_feedback(message.data);
  } 
  else if (message.type === "request inputs"){
    socket.send(JSON.stringify(get_user_inputs()));
  } 
  else if (message.type === "alert"){
    show_alert_message(message.alert, message.varient);
  }
  else if (message.type === "ping"){
    show_connection_delay(message.data);
  }
  else if (message.type === "stop"){
    
  }
  else if (message.type === "disconnect"){
    show_comms_failure_message()
  }
});

socket.addEventListener("close", (event) => {
  if (event.wasClean) {
    console.log("WebSocket connection closed cleanly.");
  } else {
    console.error("WebSocket connection closed unexpectedly.");
  }
  console.log("Close code:", event.code, "Reason:", event.reason);
});

socket.addEventListener("error", (event) => {
  console.error("WebSocket error:", event);
});
