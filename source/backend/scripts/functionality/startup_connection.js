const settings = require("../../settings/comms_settings.json");
const tcp_socket = require("../communication/plc_tcp_sender.js").tcp_socket;
const websocket = require("../communication/websocket_sender.js").websocket;
const wait_for_ready = require("./utilities.js").wait_for_ready;
const alert_on_hmi = require("./utilities.js").alert_on_hmi;

async function check_plc_startup_connection(){
  await wait_for_ready(websocket);

  var conn_tester = setTimeout(()=>{
    websocket.forward({type: "disconnect"});
  },settings["max plc ping value"]);

  await wait_for_ready(tcp_socket);

  clearTimeout(conn_tester);
  alert_on_hmi(
    "Remote Drilling is Connected to the Machine", 
    "success"
  );
}

check_plc_startup_connection();

