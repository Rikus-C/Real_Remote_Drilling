const frames = require("../../settings/modbus_frames.json");
const wait_for_ready = require("./utilities.js").wait_for_ready;
const program_delay_timer = require("./utilities.js").program_delay_timer;
const settings = require("../../settings/comms_settings.json");
const tcp_socket = require("../communication/plc_tcp_sender.js").tcp_socket;
const websocket = require("../communication/websocket_sender.js").websocket;
const create_modbus_frame = require("./modbus.js").create_modbus_frame;
const _ = require("lodash");

async function start_input_loop(){
  await wait_for_ready(tcp_socket);
  await wait_for_ready(websocket);
  websocket.forward({type: "request inputs"});
}

async function proccess_user_inputs(inputs){
  //console.log(inputs);
  var new_inputs = _.cloneDeep(frames["give inputs"]);
  // console.log(frames["give inputs"]);

  var bit_counter = 0;
  var word_value = "";
  inputs.forEach(function(value){
    word_value += value.toString();
    bit_counter++;
    if(bit_counter >= 16){
      bit_counter = 0;
      while(word_value.length < 16){
        word_value += "0";
      }
      new_inputs.data.push(parseInt(word_value, 2));
      //console.log(word_value);
      word_value = "";
    }
  });

  tcp_socket.forward(create_modbus_frame(new_inputs));
  console.log(new_inputs);

  await program_delay_timer(settings["input wait"]);
  websocket.forward({type: "request inputs"});
}

start_input_loop();

module.exports = {
  proccess_user_inputs
}

