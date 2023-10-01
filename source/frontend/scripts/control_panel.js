function show_button_id(button){ // remove later after testing
  document.getElementById("password").value = button;
}

function show_alert_message(msg){

}

// called each time drive feedback is received
function show_feedback(feedback){
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

function turn_of_multiple(buttons){
  buttons.forEach(function(button){
    buttonStates[button] = 0;
  });
}

function exit_application(){
  Swal.fire({
    title: "Are you sure you want to exit?",
    text: "Stop remote control on HMI first!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "red",
    cancelButtonText: "No",
    confirmButtonText: "Yes",
  }).then(function(result){
    if (result.isConfirmed) {
      socket.send(JSON.stringify({
        Type: "Exit"
      }));
    } 
  });
}

function minimize_application(){
  Swal.fire({
    title: "Are you sure you want to minimize?",
    text: "Stop remote control on HMI first!",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "green",
    cancelButtonText: "No",
    confirmButtonText: "Yes",
  }).then(function(result){
    if (result.isConfirmed) {
      socket.send(JSON.stringify({
        Type: "Minimize"
      }));
    }
  });
}

function show_virtual_keyboard(){
  KioskBoard.run(".passwf", {
		keysArrayOfObjects:	null,
		keysJsonUrl: "./scripts/Imports/kioskboard-keys-english.json",
		keysSpecialCharsArrayOfStrings: null,
		keysNumpadArrayOfNumbers: null,
		language: "en",
		theme: "dark",
		autoScroll: true,
		capsLockActive: true,
		allowRealKeyboard: false,
		allowMobileKeyboard: false,
		cssAnimations: true,
		cssAnimationsDuration: 50,
		cssAnimationsStyle: "slide",
		keysAllowSpacebar: true,
		keysSpacebarText: "Space",
		keysFontFamily: "sans-serif",
		keysFontSize: "22px",
		keysFontWeight: "normal",
		keysIconSize: "25px",
		keysEnterText: "Enter",
		keysEnterCallback: undefined,
		keysEnterCanClose: true,
	});
}

function unlock_panel(){
  if(document.getElementById("password").value !== settings["password"]){
    buttonStates["B-01"] = 0;
    buttonStates["B-02"] = 1;
  } 
}

// special button press cases
function button_special_logic(button){
  if(button === "B-01") buttonStates["B-02"] = 0;
  else if(button === "B-02") buttonStates["B-01"] = 0;
  else if(button === "B-10") buttonStates["B-11"] = 0;
  else if(button === "B-11") buttonStates["B-10"] = 0;
  else if(button === "B-39") buttonStates["B-40"] = 0;
  else if(button === "B-40") buttonStates["B-39"] = 0;

  else if(button === "B-06") turn_of_multiple(["B-07", "B-08", "B-09"]);
  else if(button === "B-07") turn_of_multiple(["B-06", "B-08", "B-09"]);
  else if(button === "B-08") turn_of_multiple(["B-06", "B-07", "B-09"]);
  else if(button === "B-09") turn_of_multiple(["B-06", "B-07", "B-08"]);

  else if(button === "B-05") reset_panel();
  else if(button === "B-49") exit_application();
  else if(button === "B-50") minimize_application();

  if(button === "B-01") unlock_panel();
  else if(button === "B-02") reset_panel();
}

function reset_panel(){
  buttonStates["B-01"] = 0;
  buttonStates["B-02"] = 1;
  buttonStates["B-06"] = 1;
  buttonStates["B-10"] = 0;
  buttonStates["B-11"] = 1;
  buttonStates["B-39"] = 0;
  buttonStates["B-40"] = 0;

  button_special_logic("B-06");
  update_button_styles(latchButtons);
  update_button_styles(toggleButtons);
}

function button_pressed_pre_checks(button){
  if(buttonStates["B-01"] === 1 || button === "B-05" ||
  button === "B-01" || button === "B-49" || button === "B-50"){
    return true;
  } else return false;
}

// function is only called when latch or toggle button is pressed
function button_pressed_events(button){
  if(button_pressed_pre_checks(button)){
    if(toggleButtons.includes(button)){
      if(buttonStates[button] === 1)
        buttonStates[button] = 0;
      else buttonStates[button] = 1;
    }
    else if(latchButtons.includes(button)){
      buttonStates[button] = 1;
    }

    button_special_logic(button); 
    update_button_styles(latchButtons);
    update_button_styles(toggleButtons);
  }
  show_button_id(button); // remove later, used for developing purposes
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

function get_user_inputs(){
  check_push_buttons();
  var user_inputs = {type: "user inputs", data: []};
  Object.keys(buttonStates).forEach(function(button){
    user_inputs.data.push(buttonStates[button]);
  });
  return user_inputs;
}

function initial_checks(){
  const len1 = pushButtons.length;
  const len2 = latchButtons.length;
  const len3 = toggleButtons.length;
  const len4 = Object.keys(buttonStates).length;
  const len5 = Object.keys(buttonStyles).length;

  if(len1 + len2 + len3 !== len4 || len4 !== len5){
    console.log("warning some of the button settings do not match");
  }

  update_button_styles(latchButtons);
  update_button_styles(toggleButtons);
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
create_event_listeners(settings["input type"], pushButtons);

document.getElementById("password").addEventListener(settings["input type"], function(){
  show_virtual_keyboard();
});

