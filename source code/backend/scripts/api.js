require("./modbus.js");
require("./websocket.js");

const Remote_Drilling = require("./remote_drilling.js");

/*Once Modbus connection to the drive is established, the Heartbeat will start*/
function Start_Connection_Heartbeat() { /*Redundency check to ensure modbus works before starting heartbeat*/
  var Check_Modbus = setInterval(() => { /*If modbus connection is successfully established*/
    if (Remote_Drilling.Modbus_Ready === true) { /*Start modbus heartbeat*/
      Remote_Drilling.Start_Connection_Heartbeat();

      /*Stop interval that checks if modbus connection is established*/
      clearInterval(Check_Modbus);
    }
  }, 10);
}

Start_Connection_Heartbeat();
