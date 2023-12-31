function show_button_id(button){ // remove later after testing
  document.getElementById("password").value = button;
}

function show_connection_delay(ping){ // remove later after testing
  document.getElementById("password").value = "delay (ms): " + ping;
}

function show_alert_message(alert_message, alert_type){
  var color;

  if(alert_type === "info"){
    color = "blue";
  }
  else if(alert_type === "success"){
    color = "green";
  }
  else if(alert_type === "warning"){
    color = "orange";
  }
  else if(alert_type === "error"){
    color = "red";
  }

  Swal.fire({
    position: "top",
    title: "Alert",
    text: alert_message,
    icon: alert_type,
    showConfirmButton: false,
    timer: 2000
    //confirmButtonColor: color,
    //confirmButtonText: "Confirm",
  });
}

function show_comms_failure_message(){
  Swal.fire({
    title: "PLC Communication Failure",
    text: "Connection to Machine Lost",
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "orange",
    cancelButtonColor: "red",
    confirmButtonText: "Restart",
    cancelButtonText: "Exit",
    allowOutsideClick: false
  }).then((result) => {
    if (result.isConfirmed) {
      socket.send(JSON.stringify({
        type: "restart"
      }));
    }
    else if(result.dismiss === Swal.DismissReason.cancel){
      socket.send(JSON.stringify({
        type: "exit"
      }));
    }
  });
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
    text: "Remote Drilling Will be Stopped",
    icon: "warning",
    showCancelButton: true,
    showCloseButton: true,
    cancelButtonColor: "orange",
    confirmButtonColor: "red",
    cancelButtonText: "Relaod",
    confirmButtonText: "Exit",
  }).then(function(result){
    // lock the panel
    if (result.isConfirmed) {
      button_pressed_events("B-02");
      socket.send(JSON.stringify({
        type: "exit"
      }));
    }
    else if(result.dismiss === Swal.DismissReason.cancel){
      button_pressed_events("B-02");
      socket.send(JSON.stringify({
        type: "restart"
      }));
    }
  });
}

function minimize_application(){
  Swal.fire({
    title: "Are you sure you want to minimize?",
    text: "Rod Loader and Drive will be Stopped",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "green",
    cancelButtonText: "No",
    confirmButtonText: "Yes",
  }).then(function(result){
    // stop rod loader and drive
    button_pressed_events("B-11");
    button_pressed_events("B-19");
    if (result.isConfirmed) {
      socket.send(JSON.stringify({
        type: "minimize"
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
  else if(settings["password input toggles control"]){
    socket.send(JSON.stringify({
      type: "turn on control"
    }));
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

  if(settings["password input toggles control"]){
    socket.send(JSON.stringify({
      type: "turn off control"
    }));
  }

  button_special_logic("B-06");
  update_button_styles(latchButtons);
  update_button_styles(toggleButtons);
}

function button_pressed_pre_checks(button){
  if(button === "B-05") return true;
  if(!buttonStates["B-05"]){
    if(buttonStates["B-01"] || button === "B-01" || 
    button === "B-49" || button === "B-50"){
      return true;
    } else return false;
  } 
  else return false; 
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
    else if(pushButtons.includes(button)){
      buttonStates[button] = 1;
    }

    button_special_logic(button); 
    update_button_styles(latchButtons);
    update_button_styles(toggleButtons);
  }
  show_button_id(button); // remove later, used for developing purposes
}

// function is only called when latch or toggle button is pressed
function push_button_released_events(button){
  buttonStates[button] = 0;
}

function get_user_inputs(){
  // check_push_buttons();
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

// create event listeners for latch and toggle buttons
function create_event_listeners(inputType, buttonType){
  buttonType.forEach(function(button){
    document.getElementById(button).addEventListener(inputType, function() {
      button_pressed_events(this.id);
    });

    if(pushButtons.includes(button)){
      document.getElementById(button).addEventListener(settings["push release type"], function() { // when released
        push_button_released_events(this.id);
      });
      document.getElementById(button).addEventListener(settings["push move type"], function() { // when moved off button while pressed
        push_button_released_events(this.id);
      });
    }
  });
} 

initial_checks();
create_event_listeners(settings["input type"], latchButtons);
create_event_listeners(settings["input type"], toggleButtons);
create_event_listeners(settings["input type"], pushButtons);


document.getElementById("password").addEventListener(settings["input type"], function(){
  show_virtual_keyboard();
});
