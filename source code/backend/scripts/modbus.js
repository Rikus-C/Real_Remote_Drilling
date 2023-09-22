const net = require("net");
const Remote_Drilling = require('./remote_drilling.js');
const Remote_Drilling_Settings = require('../settings/remote_drilling_settings.json');
const Logger = require('./logger.js');

const HOST = Remote_Drilling_Settings["Drive IP"];
const PORT = Remote_Drilling_Settings["Drive PORT"];

const Modbus = {};

Modbus.Client = new net.Socket();
Modbus.Server = net.createServer(Modbus.Create_Server);

/*Set-Up the Modbus client instance*/
Modbus.Client.connect(PORT, HOST, () => {});

/*For now this is not being used*/
Modbus.Client.on('error', function (err) {});

/*[1.1] Used to send pre-defined Modbus frames to the drive*/
Modbus.Send_Frame = function (Frame_Info) {
  setTimeout(function () { /*Assemble the desired mobus frame then send it over the network*/
    Modbus.Client.write(Remote_Drilling.Assemble_CT_Modbus_Frame(Frame_Info));
  }, 1);
}

/*[1.2] When a response is received from the drive*/
Modbus.Client.on('data', (res) => {
  setTimeout(function () {
    try {
      Remote_Drilling.Read_Modbus_Frame(res);
    } catch (error) {
      Logger.WriteLogs("Unexpected modbus request fail, typically on startup", 3);
    }
  }, 1);
});

Remote_Drilling.Update_Modbus(Modbus);

module.exports = Modbus;
