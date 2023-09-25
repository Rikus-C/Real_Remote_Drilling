// basic testing function thats shows button id's when they are pressed
// please remove from program once it is in production. Also for this
// function to work the input elemnt's type should not be password.
function show_button_id(button){
  document.getElementById("password").value = button;
}

// called each time drive feedback is received
function show_feedback(feedback){
  // catch error if setting files are not correctly set-up
  if(feedback.length !== feedbackButtons.length){
    console.log("error in process_feedback() function, panel lights will not work");
    return;
  }

  feedbackButtons.forEach(function(button, index){
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
function update_button_styles(buttonType){
  buttonType.forEach(function(button){
    // add logic to ensure this does not apply to push buttons
    if (buttonStates[button] === 1){
      // give button the pressed style
      document.getElementById(button).className = buttonStyles[button]["active"];
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

// function is only called when latch or toggle button is pressed
function button_pressed_events(button){
  show_button_id(button); // remove later, used for developing purposes
  // add logic here to check if button is not push button
  if(toggleButtons.includes(button)){
    buttonStates[button] = !buttonStates[button];
  }
  else if(latchButtons.includes(button)){
    buttonStates[button] = 1;
  }

  button_special_logic(); 
  update_button_styles(latchButtons);
  update_button_styles(toggleButtons);
}

function check_push_buttons(){
  pushButtons.forEach(function(button){
    if(document.getElementById(button).classList.contains("pressed")){
      buttonStates[button] = 1;
    } else {
      buttonStates[button] = 0;
    }
  });
}

function get_user_inputs(){ // this function will still need some work to accomudate toggle buttons
  check_push_buttons();
  return buttonStates;
}

function initial_checks(){
  const len1 = pushButtons.length;
  const len2 = latchButtons.length;
  const len3 = toggleButtons.length;
  const len4 = Object.keys(buttonStates).length;
  const len5 = Object.keys(buttonStyles).length;

  if(len1 + len2 + len3 !== len4 || len4 !== len5){
    conbsole.log("warning some of the button settings do not match");
  }
} 

function create_event_listeners(inputType, buttonType){
  buttonType.forEach(function(button){
    document.getElementById(button).addEventListener(inputType, function() {
      button_pressed_events(this.id);
    });
  });
} 

initial_checks();
create_event_listeners(settings["input type"], latchButtons);
create_event_listeners(settings["input type"], toggleButtons);
create_event_listeners(settings["input type"], pushButtons); // only used for debugging and testing, remove later please
