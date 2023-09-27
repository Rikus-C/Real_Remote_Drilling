const frames = require("../../settings/modbus_frames.json");
const settings = require("../../settings/comms_settings.json");
const create_modbus_frame = require("./modbus.js").create_modbus_frame;
const tcp_socket_forward = require("../communication/plc_tcp_sender.js").tcp_socket_forward;

async function start_watchdog_timer(){
  // check to ensure that the conenction is established first
  while(true){
    // send watchdog high signal
    tcp_socket_forward(create_modbus_frame(frames["watchdog high"]));
    await program_delay_timer(settings["watchdog toggle rate"]);

    // send watchdog low signal 
    tcp_socket_forward(create_modbus_frame(frames["watchdog low"]));
    await program_delay_timer(settings["watchdog toggle rate"]);
  }
}

start_watchdog_timer();

