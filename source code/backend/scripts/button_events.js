const Frame = require('../data/panel_data/ct_modbus_frames.json');
const Logger = require('./logger.js');

var Updated_Frame = Frame["Send_Command_To_Drive"];
var Button = {};

Button.Info = require('../data/panel_data/button_information.json');

let Modbus;
let Websocket;

var Press_Delays = 200;

Button.Newest_Drive_IO_State_Data = [];

/*[S] Import Modbus functions to this script*/
Button.Update_Mobus = function (Main_Modbus) {
  Modbus = Main_Modbus;
}

/*[S] Import Websocket functions to this script*/
Button.Update_Websocket = function (Main_Websocket) {
  Websocket = Main_Websocket;
}

/*[1.2] Updates the buttons depending on the drive's input and output states*/
Button.Update_Frontend_Data = function (Drive_IO_State, Drive_IO_Possible) { /*Get bits from words*/
  var Drive_IO_State_Bits = Convert_To_Bits(Drive_IO_State, "IO_State");
  var Drive_IO_Possible_Bits = Convert_To_Bits(Drive_IO_Possible, "IO_Possible");

  Object.keys(Button.Info).forEach((button) => {
    var newSkin = 0;

    /*Initialise button to default off skin*/
    newSkin = 0;

    /*Check if button is active*/
    var Button_Drive_IO_State_Active = parseInt(Drive_IO_State_Bits[Button.Info[button].Drive_IO_State_Location[0]][15 - Button.Info[button].Drive_IO_State_Location[1]]);

    /*If button is active on drive side set skin to 1*/
    if (Button_Drive_IO_State_Active === 1) {
      newSkin = 1;
    }
    /*Else if button is not active, check if the possibility of it becoming active now exists*/ else if (Button.Info[button].Drive_IO_Possible_Location.length === 2) {
      var Button_Drive_IO_Possible_Active = parseInt(Drive_IO_Possible_Bits[Button.Info[button].Drive_IO_Possible_Location[0]][15 - Button.Info[button].Drive_IO_Possible_Location[1]]);

      // console.log(Drive_IO_Possible_Bits);
      /*If the possibility is active now display the flicker*/
      if (Button_Drive_IO_Possible_Active === 1) {
        newSkin = 2;
      }
    }

    /*Set skin*/
    Button.Info[button].Skin = newSkin;
  });

  Button.Update();
}

/*[1.2] Convert Drive IO to Bits*/
function Convert_To_Bits(Machine_Data, Type) {
  if (Type === "IO_State") {
    var Bits = [
      Machine_Data[0].toString(2),
      Machine_Data[1].toString(2),
      Machine_Data[2].toString(2),
      Machine_Data[3].toString(2),
      Machine_Data[4].toString(2)
    ];
  } else if (Type === "IO_Possible") {
    var Bits = [
      Machine_Data[0].toString(2),
      Machine_Data[1].toString(2)
    ];
  }

  Bits.forEach((bits, index) => {
    for (var x = 0; x < 16 - bits.length; x++) { /*add 0's to ensure word length is correct*/
      Bits[index] = "0" + Bits[index];
    }
  });

  return Bits;
}

/*[1.2] Send new button states to the frontend so the user can visually see the button states*/
Button.Update = function () {
  Websocket.Send(JSON.stringify({Type: 'Info', Data: Button.Info}));
}

/*[2.3] Determines function to be used based on button pressed*/
Button.Pressed = {
  /*Remote Drilling Unlock*/
  "B-01": function (Button_ID, action) {
    Button.Unlock_Pressed(Button_ID);
  },
  /*Remote Drilling Lock*/
  "B-02": function (Button_ID, action) {
    Button.Lock_Pressed(Button_ID);
  },
  /*Left Second Button*/
  "B-03": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Right Second Button*/
  "B-04": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*E-Stop Button*/
  "B-05": function (Button_ID, action) {
    Button.Toggle_E_Stop_Button(Button_ID);
  },
  /*RF Button*/
  "B-06": function (Button_ID, action) {
    Button.Turn_Off_Multiple_Turn_On_One(['B-07', 'B-08', 'B-09', Button_ID]);
  },
  /*RR Button*/
  "B-07": function (Button_ID, action) {
    Button.Turn_Off_Multiple_Turn_On_One(['B-06', 'B-08', 'B-09', Button_ID]);
  },
  /*MU Button*/
  "B-08": function (Button_ID, action) {
    Button.Turn_Off_Multiple_Turn_On_One(['B-06', 'B-07', 'B-09', Button_ID]);
  },
  /*BO Button*/
  "B-09": function (Button_ID, action) {
    Button.Turn_Off_Multiple_Turn_On_One(['B-06', 'B-07', 'B-08', Button_ID]);
  },
  /*Rod Loader ON*/
  "B-10": function (Button_ID, action) {
    Button.Turn_Off_Multiple_Turn_On_One(['B-11', Button_ID]);
  },
  /*Rod Loader OFF*/
  "B-11": function (Button_ID, action) {
    Button.Turn_Off_Multiple_Turn_On_One(['B-10', Button_ID]);
  },
  /*Hydraulics Start Button*/
  "B-12": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Hydraulics Stop Button*/
  "B-13": function (Button_ID, action) {
    Button.Hold_Active_High(Button_ID, action);
  },
  /*Drive Start Button*/
  "B-14": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Pilot Button*/
  "B-15": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Ream Button*/
  "B-16": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Lube Start Button*/
  "B-17": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Lube Stop Button*/
  "B-18": function (Button_ID, action) {
    Button.Hold_Active_High(Button_ID, action);
  },
  /*Drive Stop Button*/
  "B-19": function (Button_ID, action) {
    Button.Hold_Active_High(Button_ID, action);
  },
  /*Pulling Button*/
  "B-20": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Lowering Button*/
  "B-21": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Gear Low Button*/
  "B-22": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Gear High Button*/
  "B-23": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Manual Mode Button*/
  "B-24": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Semi-Auto Mode Button*/
  "B-25": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Auto Mode Button*/
  "B-26": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Thrust Up Button*/
  "B-27": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Thrust Down Button*/
  "B-28": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*RPM Up Button*/
  "B-29": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*RPM Down Button*/
  "B-30": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Rod Loader Manual Button*/
  "B-31": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Rod Loader Auto Button*/
  "B-32": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Rod Loader Clamp Button*/
  "B-33": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Rod Loader In Button*/
  "B-34": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Rod Loader Unclamp Button*/
  "B-35": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Rod Loader Out Button*/
  "B-36": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  "B-37": function (Button_ID, action)
  /*Fast Up Button*/
  {
    Button.Hold_Active_Low(Button_ID, action);
  },
  "B-38": function (Button_ID, action)
  /*Fast Down Button*/
  {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Slow Up Button*/
  "B-39": function (Button_ID, action) { /*B-39 and B-40 needs to be toggled, when B-39 is off B-40 must be on and vice versa*/
    Button.Turn_Off_Multiple_Toggle_One(['B-40', Button_ID]);
  },
  /*Slow Down Button*/
  "B-40": function (Button_ID, action) { /*B-39 and B-40 needs to be toggled, when B-39 is off B-40 must be on and vice versa*/
    Button.Turn_Off_Multiple_Toggle_One(['B-39', Button_ID]);
  },
  /*Top Spanner Up Button*/
  "B-41": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Top Spanner Down Button*/
  "B-42": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Bottom Spanner Up Button*/
  "B-43": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Bottom Spanner Down Button*/
  "B-44": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Rod Up Button*/
  "B-45": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Rod Down Button*/
  "B-46": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Spare Button A*/
  "B-47": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  },
  /*Spare Button B*/
  "B-48": function (Button_ID, action) {
    Button.Hold_Active_Low(Button_ID, action);
  }
};

/*[2.3] Unlock Application*/
Button.Unlock_Pressed = function () {
  Button.Turn_Off_Single_Button('B-02');

  setTimeout(() => {
    Button.Turn_On_Single_Button('B-01');
  }, 200);

  if (Button.Info["B-01"].Skin === 1) {
    Logger.WriteLogs("Unlocked pressed when unlocked", 3);
  }
}

/*[2.3] Lock Application*/
Button.Lock_Pressed = function () {
  Button.Turn_Off_Single_Button('B-01');

  setTimeout(() => {
    Button.Turn_On_Single_Button('B-02');
  }, 200);

  if (Button.Info["B-02"].Skin === 1) {
    Logger.WriteLogs("Locked pressed when locked", 3);
  }
}

/*[2.3] Active Low if held goes high*/
Button.Hold_Active_Low = function (Button_ID, action) {
  if (Button.Info["B-01"].Skin === 1) {
    if (action === "down") {
      Button.Turn_On_Single_Button(Button_ID);
    } else if (action === "up") {
      Button.Turn_Off_Single_Button(Button_ID);
    }
  } else {
    Logger.WriteLogs("Hold_Active_Low pressed when locked", 3);
  }
}

/*[2.3] Active High if held goes low*/
Button.Hold_Active_High = function (Button_ID, action) {
  if (Button.Info["B-01"].Skin === 1) {
    if (action === "down") {
      Button.Turn_Off_Single_Button(Button_ID);
    } else if (action === "up") {
      Button.Turn_On_Single_Button(Button_ID);
    }
  } else {
    Logger.WriteLogs("Hold_Active_Low pressed when locked", 3);
  }
}

/*[2.3] Toggle E-Stop*/
Button.Toggle_E_Stop_Button = function (Button_ID) {
  var Bits = Convert_To_Bits(Button.Newest_Drive_IO_State_Data, 'IO_State');
  var r = Button.Info[Button_ID].Drive_IO_State_Location[0];
  var b = 15 - Button.Info[Button_ID].Drive_IO_State_Location[1];

  if (Bits[r][b] === "1") {
    Bits[r] = Bits[r].substring(0, b) + "0" + Bits[r].substring(b + 1);
  } else {
    Bits[r] = Bits[r].substring(0, b) + "1" + Bits[r].substring(b + 1);
  } Button.Populate_And_Send_Frame(Updated_Frame, Bits);
}

/*[2.3] Switches off array of buttons off and switches last on one: 	0,1,0,0 => 0,0,0,0 => 0,0,0,1*/
Button.Turn_Off_Multiple_Turn_On_One = function (Buttons) {
  if (Button.Info["B-01"].Skin === 1) {
    var Wait = Press_Delays;
    Buttons.forEach((button_id, index) => {
      setTimeout(() => { /*Turn off all buttons in array, except last button*/
        if (index !== Buttons.length - 1) {
          Button.Turn_Off_Single_Button(button_id);
        } else {
          Button.Turn_On_Single_Button(button_id);
        }
      }, Wait);

      Wait = Wait + Press_Delays;
    });
  } else {
    Logger.WriteLogs("Turn_Off_Multiple_Turn_On_One pressed when locked", 3);
  }
}

/*[2.3] Switches off array of buttons off and toggle last one: 			0,1,0,0 => 0,0,0,1 OR 0,0,0,1 => 0,0,0,0*/
Button.Turn_Off_Multiple_Toggle_One = function (Buttons) {
  if (Button.Info["B-01"].Skin === 1) {
    var Wait = Press_Delays;
    Buttons.forEach((button_id, index) => {
      setTimeout(() => {
        if (index === Buttons.length - 1) {
          if (Button.Info[button_id].Skin !== 1) {
            Button.Turn_On_Single_Button(button_id);
          } else {
            Button.Turn_Off_Single_Button(button_id);
          }
        } else {
          Button.Turn_Off_Single_Button(button_id);
        }
      }, Wait);

      Wait = Wait + Press_Delays;
    });
  } else {
    Logger.WriteLogs("Turn_Off_Multiple_Toggle_One pressed when locked", 3);
  }
}

/*[2.3] Turn on Single button if unlocked*/
Button.Turn_On_Single_Button = function (Button_ID) {
  var Bits = Convert_To_Bits(Button.Newest_Drive_IO_State_Data, 'IO_State');
  var r = Button.Info[Button_ID].Drive_IO_State_Location[0];
  var b = 15 - Button.Info[Button_ID].Drive_IO_State_Location[1];
  Bits[r] = Bits[r].substring(0, b) + "1" + Bits[r].substring(b + 1);

  Button.Populate_And_Send_Frame(Updated_Frame, Bits);
}

/*[2.3] Turn off Single button if unlocked*/
Button.Turn_Off_Single_Button = function (Button_ID) {
  var Bits = Convert_To_Bits(Button.Newest_Drive_IO_State_Data, 'IO_State');
  var r = Button.Info[Button_ID].Drive_IO_State_Location[0];
  var b = 15 - Button.Info[Button_ID].Drive_IO_State_Location[1];
  Bits[r] = Bits[r].substring(0, b) + "0" + Bits[r].substring(b + 1);

  Button.Populate_And_Send_Frame(Updated_Frame, Bits);
}

/*[2.3] Used to write data into blank Modbus frame*/
Button.Populate_And_Send_Frame = function (Updated_Frame, Bits) {
  var count = 0;

  Bits.forEach((Register) => {
    var Hex_Register = parseInt(Register, 2).toString(16);

    while (Hex_Register.length < 4) {
      Hex_Register = "0" + Hex_Register;
    }

    if (count === 0) {
      Updated_Frame.Data.D1_H = parseInt(Hex_Register.substring(0, 2), 16);
      Updated_Frame.Data.D1_L = parseInt(Hex_Register.substring(2, 4), 16);
    } else if (count === 1) {
      Updated_Frame.Data.D2_H = parseInt(Hex_Register.substring(0, 2), 16);
      Updated_Frame.Data.D2_L = parseInt(Hex_Register.substring(2, 4), 16);
    } else if (count === 2) {
      Updated_Frame.Data.D3_H = parseInt(Hex_Register.substring(0, 2), 16);
      Updated_Frame.Data.D3_L = parseInt(Hex_Register.substring(2, 4), 16);
    } else if (count === 3) {
      Updated_Frame.Data.D4_H = parseInt(Hex_Register.substring(0, 2), 16);
      Updated_Frame.Data.D4_L = parseInt(Hex_Register.substring(2, 4), 16);
    } else if (count === 4) {
      Updated_Frame.Data.D5_H = parseInt(Hex_Register.substring(0, 2), 16);
      Updated_Frame.Data.D5_L = parseInt(Hex_Register.substring(2, 4), 16);
    }

    count++;
  });

  Logger.WriteLogs(Updated_Frame, 1);
  Modbus.Send_Frame(Updated_Frame);
}

module.exports = Button;
