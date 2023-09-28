const frames = require("../../settings/modbus_frames.json");
const wait_for_ready = require("./utilities.js").wait_for_ready;
const settings = require("../../settings/comms_settings.json");
const tcp_socket = require("../communication/plc_tcp_sender.js").tcp_socket;
const websocket = require("../communication/websocket_sender.js").websocket;
const to_1D_list = require("./modbus.js").to_1D_list;

async function start_feedback_loop(){
  await wait_for_ready(tcp_socket);
  await wait_for_ready(websocket);
  tcp_socket.forward(frames["request feedabck"]);
}

function process_drive_feedback(data){ // [word, word, word]
  // format the drive feedback
  var message = {};
  var data = [];

  data.forEach(function(value){
    var binaryString = value.toString(2);
    var padding = '0'.repeat(16 - binaryString.length);
    data.push((padding + binaryString).split('').map(Number));
  });

  message["type"] = "feedabck";
  message["data"] = to_1D_list(data);

  // send drive feedback to the hmi
  websocket.forward(message);

  setTimeout(function(){
    tcp_socket.forward(frames["request feedabck"]);
  },settings["feedback rate"]);
}

// start_feedback_loop();

module.exports = {
  process_drive_feedback
}