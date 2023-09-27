const net = require("net");
const settings = require("../../settings/comms_settings.json");
const tcp_sender_initiate = require("./plc_tcp_sender.js").initiate_tcp_socket_sender;
const read_modbus_frame = require("../functionality/modbus.js").read_modbus_frame;
const process_drive_feedback = require("../functionality/feedback_loop.js").process_drive_feedback;

const client = new net.Socket();

client.connect(settings["plc port"], settings["plc ip"], function() {
  tcp_sender_initiate(client);
  console.log("Connection to Drill Established");
});

client.on("data", function(data){
  var modbus_frame = read_modbus_frame(data);

  if(modbus_frame["transaction id"] === 1){
    process_drive_feedback(modbus_frame["data"]);
  }
});

client.on("close", function() {});
client.on("error", function(err){});
client.on("end", function() {});
client.on("finish", function() {});
