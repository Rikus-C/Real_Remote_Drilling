const net = require("net");
const settings = require("../../settings/comms_settings.json");
const tcp_sender_initiate = require("./plc_tcp_sender.js").initiate_tcp_socket_sender;

const client = new net.Socket();

client.connect(settings["plc port"], settings["plc ip"], function() {
  tcp_sender_initiate(client);
  console.log("Connection to Drill Established");
});

client.on("data", function(data){
  
});

client.on("close", function() {});
client.on("error", function(err){});
client.on("end", function() {});
client.on("finish", function() {});
