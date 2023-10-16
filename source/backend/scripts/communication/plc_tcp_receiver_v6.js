const net = require("net");
const settings = require("../../settings/comms_settings.json");
const tcp_sender_initiate = require("./plc_tcp_sender.js").initiate_tcp_socket_sender;
const read_modbus_frame = require("../functionality/modbus.js").read_modbus_frame;
const process_drive_feedback = require("../functionality/feedback_loop.js").process_drive_feedback;
var ping_response = require("../functionality/ping_loop.js").ping_response;

const client = net.createConnection({
  host: settings["plc ipv6"],
  port: settings["plc port"],
  family: 6, // Use IPv6
});

client.on("connect", function(){
  tcp_sender_initiate(client);
  console.log("Connection to Drill Established using IPv6");
});

client.on("data", function(data){
  var modbus_frame = read_modbus_frame(data);

  if(modbus_frame["transaction id"] === 1){
    process_drive_feedback(modbus_frame["data"]);
  }
  else if(modbus_frame["transaction id"] === 99){
    ping_response.ready = true;
  }
});

client.on("end", function(){});
client.on("error", function(err){});
client.on("close", function(){});

