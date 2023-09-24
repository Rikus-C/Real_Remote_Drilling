// these are used for when testing, using nodejs:

// const buttonFeedback = require("../settings/button_feedback.json");
// const buttonStates = require("../settings/button_states.json");
// const buttonTypes = require("../settings/button_types.json");
// const settings = require("../settings/panel_settings.json");

// button types:
// push   ->  does nothing in the button_pressed_event() function
// toggle ->  changes state with each press
// latch  ->  if pressed is turned on or remains on if allready on
//            can only ne turned off in special cases where another
//            button being turned on/off will also turn this button off

// basic testing function thats shows button id's when they are pressed
// please remove from program once it is in production. Also for this
// function to work the input elemnt's type should not be password.
function show_button_id(button){
  document.getElementById("password").value = button;
}

// basic check to see if the settings objects contain the right amount of
// items in each of them, invalid settings can still be present even if 
// all tests are passed in this function
function initial_checks(){
  var len1 = Object.keys(buttonStates).length;
  var len2 = Object.keys(buttonStyles).length;
  var len3 = Object.keys(buttonTypes).length;

  if(len1 !== len2 || len1 !== len3){
    conbsole.log("warning some of the button settings do not match");
  }
} initial_checks();

// called each time drive feedback is received
function show_feedback(feedback){
  // catch error if setting files are not correctly set-up
  // if(feedback.length !== buttonFeedback.length){
  //   console.log("error in process_feedback() function, panel lights will not work");
  //   return;
  // } // removed for testing purposes, add later on

  buttonFeedback.forEach(function(button, index){
    if(feedback[index] === 1){
      // change skin of button to light up (white)
      document.getElementById(button).className = buttonStyles[button]["feedback"];
    } else {
      // chnage skin of button to no be lit (normal)
      document.getElementById(button).className = buttonStyles[button]["normal"];
    }
  });
}

// called when ever a button was pressed
function update_button_styles(){
  Object.keys(buttonStates).forEach(function(button){
    if (buttonStates[button] === 1){
      // give button the pressed style
      document.getElementById(button).className = buttonStyles[button]["latched"];
    } else if (buttonStates[button] === 0){
      // give button the normal style (not pressed)
      document.getElementById(button).className = buttonStyles[button]["normal"];
    }
  });
}

// some logic used for unlatching buttons, or any other user
// inputs restraints that might be needed for the program
// to function as the user wants it to function
function button_special_logic(){

}

function button_pressed_events(button){
  show_button_id(button);
  if(buttonType[button] == "toggle"){
    buttonStates[button] = !buttonStates[button];
  }
  else if(buttonType[button] == "latch"){
    buttonStates[button] = 1;
  }
  button_special_logic();  
  update_button_styles();
}

function check_push_buttons(){
  Object.keys(buttonStates).forEach(function(button){
    // if it is a toggle type then no it should not be changed
    if(buttonType[button] === "push"){
      var currentButton = document.getElementById(button);
      // check if button is currently being pressed
      if (currentButton.classList.contains("pressed")) {
        buttonStates[button] = 1;
      } 
      else buttonStates[button] = 0;
    }
  });
}

function get_user_inputs(){ // this function will still need some work to accomudate toggle buttons
  check_push_buttons();
  return buttonStates;
}
