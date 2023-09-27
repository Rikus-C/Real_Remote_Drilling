const wait_for_condition = require("./functions.js").wait_for_condition;
const program_delay_timer = require("./functions.js").program_delay_timer;
const proccess_hmi_inputs = require("./functions.js").proccess_hmi_inputs;
const generate_modbus_frame = require("./modbus.js").generate_modbus_frame;
const read_modbus_frame = require("./modbus.js").read_modbus_frame;
const send_and_wait = require("./websocket.js").send_and_wait;
const alert_on_hmi = require("./functions.js").alert_on_hmi;
const settings = require("../settings/comms_settings.json");
const hmi_socket = require("./websocket.js").hmi_socket;

async function start_feedback_loop(){
  while(true){
    // request data from plc using mdobus


    // proccess data received from plc


    // send data to frontend to display feedback


    await program_delay_timer(settings["feedback rate"]);
  }
}

async function start_user_input_loop(){
  // while(true){
    
  // }
}

async function start_watchdog_loop(){
  while(true){
    // send watchdog high signal
    

    await program_delay_timer(settings["watchdog toggle rate"]);


    // send watchdog low signal


    await program_delay_timer(settings["watchdog toggle rate"]);
  }
}

// start_feedback_loop();
start_user_input_loop();
// start_watchdog_loop();


// // request user inputs from the hmi, and wait for response
// var responseReceived = false;
// var response = hmi_socket.send_and_wait(
//   JSON.stringify({
//     type: "request inputs"
//   }), responseReceived
// );
// await wait_for_condition(responseReceived);

// // proccess data received from hmi
// var hmiInputs = proccess_hmi_inputs(response);
// var frame = generate_modbus_frame(hmiInputs);

// // send data to drive
// console.log(frame);