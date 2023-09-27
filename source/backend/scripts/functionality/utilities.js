function program_delay_timer(time){
  return new Promise(resolve => setTimeout(resolve, time));
}

async function wait_for_ready(condition) {
  while (!condition.ready)
    await new Promise(resolve => setTimeout(resolve, 10));
}

function alert_on_hmi(messageInfo){

}

module.exports = {
  program_delay_timer, 
  wait_for_ready, 
  alert_on_hmi
};