const frames = require("../../settings/modbus_frames.json");
const settings = require("../../settings/comms_settings.json");
const create_modbus_frame = require("./modbus.js").create_modbus_frame;
const tcp_socket = require("../communication/plc_tcp_sender.js").tcp_socket;
const wait_for_ready = require("./utilities.js").wait_for_ready;
const program_delay_timer = require("./utilities.js").program_delay_timer;
const alert_on_hmi = require("./utilities.js").alert_on_hmi;

async function start_watchdog_timer(){
  await wait_for_ready(tcp_socket);
  alert_on_hmi("Watchdog has started");

  while(true){
    // send watchdog high signal
    tcp_socket.forward(create_modbus_frame(frames["watchdog high"]));
    await program_delay_timer(settings["watchdog toggle wait"]);

    // send watchdog low signal 
    tcp_socket.forward(create_modbus_frame(frames["watchdog low"]));
    await program_delay_timer(settings["watchdog toggle wait"]);
  }
}

start_watchdog_timer();

