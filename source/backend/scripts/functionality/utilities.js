const websocket = require("../communication/websocket_sender.js").websocket;

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

module.exports = {
  minimize_application,
  program_delay_timer, 
  exit_application,
  wait_for_ready,
  alert_on_hmi, 
  get_app_api
};