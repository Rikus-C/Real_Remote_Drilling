function program_delay_timer(time){
  return new Promise(resolve => setTimeout(resolve, time));
}

async function wait_for_condition(condition) {
  while (!condition)
    await new Promise(resolve => setTimeout(resolve, 10));
}

function proccess_hmi_inputs(rawInputs){

}

function alert_on_hmi(messageInfo){

}

module.exports = {
  program_delay_timer, 
  wait_for_condition, 
  proccess_hmi_inputs, 
  alert_on_hmi
};