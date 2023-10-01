const frames = require("../../settings/modbus_frames.json");
const wait_for_ready = require("./utilities.js").wait_for_ready;
const program_delay_timer = require("./utilities.js").program_delay_timer;
const settings = require("../../settings/comms_settings.json");
const tcp_socket = require("../communication/plc_tcp_sender.js").tcp_socket;
const websocket = require("../communication/websocket_sender.js").websocket;
const to_1D_list = require("./modbus.js").to_1D_list;
const create_modbus_frame = require("./modbus.js").create_modbus_frame;

async function start_input_loop(){
  await wait_for_ready(tcp_socket);
  await wait_for_ready(websocket);
  websocket.forward({type: "request inputs"});
}


start_input_loop();

