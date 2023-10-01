const frames = require("../../settings/modbus_frames.json");
const wait_for_ready = require("./utilities.js").wait_for_ready;
const program_delay_timer = require("./utilities.js").program_delay_timer;
const settings = require("../../settings/comms_settings.json");
const tcp_socket = require("../communication/plc_tcp_sender.js").tcp_socket;
const websocket = require("../communication/websocket_sender.js").websocket;
const to_1D_list = require("./modbus.js").to_1D_list;
const create_modbus_frame = require("./modbus.js").create_modbus_frame;

async function start_feedback_loop(){
  await wait_for_ready(tcp_socket);
  await wait_for_ready(websocket);
  tcp_socket.forward(create_modbus_frame(frames["request feedback"]));
}

async function process_drive_feedback(data){ // [word, word, word]
  // format the drive feedback 
  var message = {};
  var new_data = [];

  data.forEach(function(value){
    var binaryString = value.toString(2);
    var padding = '0'.repeat(16 - binaryString.length);
    new_data.push((padding + binaryString).split('').map(Number));
  });

  message["type"] = "feedback";
  message["data"] = to_1D_list(new_data);

  // send drive feedback to the hmi
  websocket.forward(message);

  console.log(message);

  await program_delay_timer(settings["feedback rate"]);
  tcp_socket.forward(frames["request feedback"]);
}

start_feedback_loop();

module.exports = {
  process_drive_feedback
}