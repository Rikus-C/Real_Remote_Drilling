// const {execFile } 	= require('child_process');
const Frame = require('../data/panel_data/ct_modbus_frames.json');
const Button = require('./button_events.js');
const Logger = require('./logger.js');

let Modbus;
let Main_Window;
let Error_Timer;
let Main_Application;

var Update_Rate = 100;
var Heartbeat_Rate = 200;
var Heartbeat_Pulse = 50;
var Failure_Wait_Time = 1000;
var Start_Up_Failed = true;
var Error_Being_Fixed = false;

/*Cycle completed and ready to start again*/
var Ready_To_Request_Drive_IO = true;
var Remote_Drilling = {};

/*Flag for allowing modbus access on this script*/
Remote_Drilling.Modbus_Ready = false;

/*[S] Allow interfacing with main window that electron app is running in*/
Remote_Drilling.Get_Main_Application = function (Original_App, Original_Win) {
  Main_Application = Original_App;
  Main_Window = Original_Win;
}

/*[S] Import Modbus functions to this script from Modbus.js*/
Remote_Drilling.Update_Modbus = function (Main_Modbus) {
  Modbus = Main_Modbus;
  Button.Update_Mobus(Main_Modbus);
  Remote_Drilling.Modbus_Ready = true;
}

/*[S] Import Websocket functions to this script from Websocket.js*/
Remote_Drilling.Update_Websocket = function (Main_Websocket) {
  Websocket = Main_Websocket;
  Button.Update_Websocket(Main_Websocket);
}

/*[S] Ensures that if no connection is present on start-up the application will close*/
Remote_Drilling.Test_Start_Up_Connection = function () { /*Allows time for modbus module to initiate*/
  setTimeout(() => {
    Modbus.Send_Frame(Frame.Test_Connection_At_Start_Up);

    /*Give time for connection test packet to return*/
    setTimeout(() => { /*If there is no connection between control box and drive*/
      if (Start_Up_Failed === true) {
        Remote_Drilling.Exit();
      }
    }, 500);
  }, 500);
}

/*[S] Called when heartbeat is ready to start, then sets an iterval event showing comms are healthy*/
Remote_Drilling.Start_Connection_Heartbeat = function (State) { /*Interval between heartbeat "pulses"*/
  setInterval(() => {
    Modbus.Send_Frame(Frame.Heartbeat_High);

    /*How long the "pulse" should be high*/
    setTimeout(() => {
      Modbus.Send_Frame(Frame.Heartbeat_Low);
    }, Heartbeat_Pulse);
  }, Heartbeat_Rate);
}

/*[1.1] Requests the Drive_IO_State and initiates the Error checker*/
Remote_Drilling.Get_Drive_IO = function () { /*Loops at a fixed interval*/
  var Get_IO = setInterval(() => {
    if (Ready_To_Request_Drive_IO === true) {
      Error_Being_Fixed = false;
      clearTimeout(Error_Timer);
      Ready_To_Request_Drive_IO = false;
      Modbus.Send_Frame(Frame.Get_Drive_IO_State);
    } else {
      Check_For_Crash();
    }
  }, Update_Rate);
}

/*[1.1] Checks for main loop failure*/
function Check_For_Crash() {
  if (Error_Being_Fixed === false) {
    Error_Being_Fixed = true;

    Error_Timer = setTimeout(() => {
      Logger.WriteLogs("No packet received within Failure_Wait_Time", 2);
      Ready_To_Request_Drive_IO = true;
      clearTimeout(Error_Timer);
    }, Failure_Wait_Time);
  }
}

/*[1.1/2.3] Formats the Modbus frame so that the Mentor MP drive can understand it (bitarray)*/
Remote_Drilling.Assemble_CT_Modbus_Frame = function (Frame_Info) {
  var Register_High = [];
  var Register_Low = [];
  var Register_H = "";
  var Register_L = "";
  var Combined = 0;

  let Current_Frame;

  /*If frame type has a standard header*/
  if (Frame_Info.Function_Code !== 16) { /*Assign required header space (10 bytes + enough bytes for all data)*/
    Current_Frame = Buffer.alloc(10 + Object.getOwnPropertyNames(Frame_Info.Data).length);
  } else { /*Assign required header space (13 bytes + enough bytes for all data)*/
    Current_Frame = Buffer.alloc(13 + Object.getOwnPropertyNames(Frame_Info.Data).length);
  }

  /*If frame Parameter's hex value needs a 0 added to ensure its lentgh is 2 characters long*/
  if (Frame_Info.Parameter.toString().length < 2) {
    /*Add 0 to hex value ex. 0xf -> 0x0f*/
    /*Then combine the Menun value to the Parameter value to create the drive address*/
    Combined = parseInt(Frame_Info.Menu.toString() + "0" + Frame_Info.Parameter.toString()).toString(16);
  } else {
    /*Parameters's hex value is allready 2 characters long ex. 0x7f*/
    /*Then combine the Menun value to the Parameter value to create the drive address*/
    Combined = parseInt(Frame_Info.Menu.toString() + Frame_Info.Parameter.toString()).toString(16);
  }

  /*Insert address of drive to a high and low register*/
  for (var c = Combined.length - 1; c >= 0; c--) {
    if (c >= Combined.length - 2) {
      Register_Low.unshift(Combined[c]);
    } else {
      Register_High.unshift(Combined[c]);
    }
  }

  Register_High.forEach((item) => {
    Register_H = Register_H + item
  });

  Register_Low.forEach((item) => {
    Register_L = Register_L + item
  });

  /*Assemble final frame*/
  Current_Frame.writeUInt16BE(Frame_Info.Transaction_ID, 0);
  Current_Frame.writeUInt16BE(Frame_Info.Protocol_ID, 2);
  Current_Frame.writeUInt16BE(Frame_Info.Length, 4);
  Current_Frame.writeUInt8(Frame_Info.Unit_ID, 6);
  Current_Frame.writeUInt8(Frame_Info.Function_Code, 7);
  Current_Frame.writeUInt8(parseInt(Register_H, 16), 8);
  Current_Frame.writeUInt8(parseInt(Register_L, 16) - 1, 9);

  /*If frame does not require a special header*/
  if (Frame_Info.Function_Code !== 16) {
    var count = 10;
  } else {
    var count = 13;
    Current_Frame.writeUInt8(Frame_Info.Register_Quntity_H, 10);
    Current_Frame.writeUInt8(Frame_Info.Register_Quntity_L, 11);
    Current_Frame.writeUInt8(Frame_Info.Byte_Count, 12);
  }

  Object.getOwnPropertyNames(Frame_Info['Data']).forEach((element) => {
    Current_Frame.writeUInt8(Frame_Info['Data'][element], count);
    count ++;
  });

  console.log(Current_Frame);
  return new Uint8Array(Current_Frame);
}

/*[1.2] Extract data from the raw modbus frame and put it in an array, also get the Transaction ID from the
frame and add it with the data so one can determine what must be done with the data*/
Remote_Drilling.Read_Modbus_Frame = function (Frame) {
  var Data = [];
  var Transaction_ID = Frame[1];

  /*If response from drive is data*/
  if (Frame[7] === 3) { /*If data is actually present in the frame*/
    if (Frame.length >= 9) { /*Merge 2 bytes to one word*/
      for (var x = 9; x < Frame.length; x = x + 2) { /*Ensure lower byte format of 16 bit word ex 0xf -> 0x0f*/
        if (Frame[x + 1].toString(16).length < 2) { /*Format to add 0 if needed, value lower than 16 (10x16) ex. 0xf -> 0x0f*/
          Data.push(parseInt((Frame[x].toString(16) + "0" + Frame[x + 1].toString(16)), 16));
        } else {
          Data.push(parseInt((Frame[x].toString(16) + Frame[x + 1].toString(16)), 16));
        }
      }
      Remote_Drilling.Update_Data(Data, Transaction_ID);
    } else {
      Logger.WriteLogs("Faulty data received error", 2);
    }
  } else {
    Remote_Drilling.Update_Data(Data, Transaction_ID);
  }
}

/*[1.2] Checks transaction IDs of incoming modbus signals to determine what must be done with the data*/
Remote_Drilling.Update_Data = function (Data, Transaction_ID) { /*If Drive_IO_State data is successfully received*/
  if (Transaction_ID === 11) { /*Temporarily store received Drive_IO_State data*/
    Drive_IO_State = Data;

    /*Update the registers on the drive*/
    Button.Newest_Drive_IO_State_Data = Drive_IO_State;

    /*Request for Drive_IO_Possible data*/
    Modbus.Send_Frame(Frame.Get_Drive_IO_Possible);
  }
  /*If Drive_IO_Possible data is successfully received*/ else if (Transaction_ID === 22) { /*Temporarily store received Drive_IO_Possible data*/
    Drive_IO_Possible = Data;

    /*Update the frontend for the user*/
    Button.Update_Frontend_Data(Drive_IO_State, Drive_IO_Possible);
  }
  /*If connection to drive on start-up is healthy*/ else if (Transaction_ID === 77) { /*Presents application from closing*/
    Start_Up_Failed = false;
  }
}

/*[1.4/2.3] Extract data from websocket frame and sends it to the right function*/
Remote_Drilling.Read_Websocket_Frame = function (Raw_Data) {
  var Msg = JSON.parse(Raw_Data);

  if (Msg.Type === 'Done_Updating') {
    Ready_To_Request_Drive_IO = true;
  } else if (Msg.Type === 'Button_Pressed') {
    Button.Pressed[Msg.B_ID](Msg.B_ID, Msg.Action);
  } else if (Msg.Type === 'Exit') {
    Remote_Drilling.Exit();
  } else if (Msg.Type === 'Reload') {
    Remote_Drilling.Reload();
  } else if (Msg.Type === 'Minimize') {
    Remote_Drilling.Minimize();
  } else {
    Logger.WriteLogs("Unexpected websocket error", 3);
  }
}

/*[2.3/S] Closes the application*/
Remote_Drilling.Exit = function () {
  //process.stdout.write('\033c');
  console.log("*****************************");
  console.log("Program has been closed");
  console.log("You can now close this window");
  console.log("*****************************");
  Main_Application.exit();
}

/*[2.3] Refresheds the application for when it stalled*/
Remote_Drilling.Reload = function () {
  Modbus.Send_Frame(Frame.Watchdog_Reset_High);
  setTimeout(() => {
    Modbus.Send_Frame(Frame.Watchdog_Reset_Low);
  }, 400);
  setTimeout(() => {
    Main_Window.reload();
  }, 500);
}

/*[2.3] Minimizes the application*/
Remote_Drilling.Minimize = function () {
  //process.stdout.write('\033c');
  console.log("************************");
  console.log("Program is still running");
  console.log("Do NOT close this window");
  console.log("************************");
  Main_Window.minimize();
}

/*Used for initiating some functions outside the scope of this file*/
Remote_Drilling.Remote_Done_Loading = true;

/*Ensure a valid connection is present to drive before starting application*/
Remote_Drilling.Test_Start_Up_Connection();

/*Start remote drilling application*/
Remote_Drilling.Get_Drive_IO();

module.exports = Remote_Drilling;
