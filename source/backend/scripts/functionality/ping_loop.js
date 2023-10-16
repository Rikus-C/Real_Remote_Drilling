const frames = require("../../settings/modbus_frames.json");
const settings = require("../../settings/comms_settings.json");
const create_modbus_frame = require("./modbus.js").create_modbus_frame;
const tcp_socket = require("../communication/plc_tcp_sender.js").tcp_socket;
const wait_for_ready = require("./utilities.js").wait_for_ready;
const program_delay_timer = require("./utilities.js").program_delay_timer;
const websocket = require("../communication/websocket_sender.js").websocket;

var ping_response = {};
ping_response.ready = false;

async function start_ping_timer(){
  await wait_for_ready(tcp_socket);
  await wait_for_ready(websocket);
  var ping_send_time;
  var ping_received_time;

  while(true){
    ping_response.ready = false;
    tcp_socket.forward(create_modbus_frame(frames["ping plc"]));

    ping_send_time = new Date();
    var conn_failed = setTimeout(()=>{
      websocket.forward({type: "disconnect"});
    }, settings["max plc ping value"]);

    await wait_for_ready(ping_response);
    clearTimeout(conn_failed);
    ping_received_time = new Date();

    var ping_value = ping_received_time - ping_send_time; 
    websocket.forward({type: "ping", data: ping_value});
    await program_delay_timer(settings["plc ping delay"]);
  }
}

start_ping_timer();

module.exports = {
  ping_response
}