const fs = require('fs')
const moment = require('moment');

var Logger = {};

/*Write data log to file*/
Logger.WriteLogs = function (Data, Destination) {
  Data = Data + ";" + moment().format('YYYY-MM-DD HH:mm:ss') + "\r\n";
  if (Destination === 1) {
    fs.appendFile("Logs.txt", Data, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } else if (Destination === 2) {
    fs.appendFile("Errors.txt", Data, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } else {
    fs.appendFile("Unexpected.txt", Data, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}

module.exports = Logger;
