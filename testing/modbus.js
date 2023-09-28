const modbus_frames = require("./modbus_frames.json");

function to_word(value) {
  const msb = (value >> 8) & 0xFF;
  const lsb = value & 0xFF;
  return [msb, lsb];
}

function to_1D_list(array){
  var array_1D = [];
  array.forEach(function(subArray){
    if(subArray.length > 1){
      subArray.forEach(function(value){
        array_1D.push(value);
      });
    } else array_1D.push(subArray);
  });
  return array_1D;
}

function word_to_decimal(wordValue) {
  const msb = wordValue[0];
  const lsb = wordValue[1];
  const decimalValue = (msb << 8) | lsb;
  return decimalValue;
}

function create_modbus_frame(frame_info){
  var frame = [];
  frame.push(to_word(frame_info["transaction id"]));
  frame.push(to_word(frame_info["protocol id"]));
  frame.push(to_word(frame_info["length"]));
  frame.push(frame_info["unit code"]);
  frame.push(frame_info["function code"]);
  frame.push(to_word(frame_info["register"]));
  
  frame_info["data"].forEach(function(value){
    frame.push(to_word(value));
  });
  return Buffer.from(to_1D_list(frame));
}

function read_modbus_frame(raw){
  var drive_message = {};
  drive_message["transaction id"] = word_to_decimal([raw[0], raw[1]]);
  var data_length = word_to_decimal([raw[4], raw[5]]) - 4;

  if(raw.length > 10){
    drive_message.data = [];
    for(var x = 10; x <= data_length + 8; x += 2){
      drive_message.data.push(word_to_decimal(raw[x], raw[x+1]));
    }
  }

  return drive_message;
}

console.log("modbus frame:\n");
console.log(create_modbus_frame(modbus_frames["watchdog high"]));
console.log("\n\ndata from reposne:\n");
console.log(read_modbus_frame(Array.from(create_modbus_frame(modbus_frames["watchdog high"]))));
// read_modbus_frame(Array.from(create_modbus_frame(modbus_frames["watchdog high"])));

module.exports = {
  create_modbus_frame, 
  read_modbus_frame
};
