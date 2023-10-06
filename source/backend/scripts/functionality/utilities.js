const frames = require("../../settings/modbus_frames.json");
const websocket = require("../communication/websocket_sender.js").websocket;
const tcp_socket = require("../communication/plc_tcp_sender.js").tcp_socket;
const create_modbus_frame = require("../functionality/modbus.js").create_modbus_frame;

var app_api;
var win_api;

function get_app_api(app, window){
  app_api = app;
  win_api = window; 
}

function exit_application(){
  app_api.quit();
}

function minimize_application(){
  win_api.minimize();
}

function program_delay_timer(time){
  return new Promise(resolve => setTimeout(resolve, time));
}

async function wait_for_ready(condition) {
  while (!condition.ready)
    await new Promise(resolve => setTimeout(resolve, 10));
}

function alert_on_hmi(messageInfo){
  websocket.forward({
    type: "alert",
    alert: messageInfo
  });
}

function turn_on_remote_control(){
  tcp_socket.forward(create_modbus_frame(frames["start control"]));
}

function turn_off_remote_control(){
  tcp_socket.forward(create_modbus_frame(frames["stop control"]));
}

module.exports = {
  turn_off_remote_control,
  turn_on_remote_control,
  minimize_application,
  program_delay_timer, 
  exit_application,
  wait_for_ready,
  alert_on_hmi, 
  get_app_api
};