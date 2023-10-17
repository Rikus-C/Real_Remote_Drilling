const settings = require("./backend/settings/comms_settings.json");
const get_app_api = require("./backend/scripts/functionality/utilities.js").get_app_api;

if (settings["plc connection type"] === "ipv4"){
  require("./backend/scripts/communication/plc_tcp_receiver_v4.js");
}
else if (settings["plc connection type"] === "ipv6"){
  require("./backend/scripts/communication/plc_tcp_receiver_v6.js");
}

require("./backend/scripts/communication/websocket_receiver.js");
require("./backend/scripts/functionality/watchdog.js");
require("./backend/scripts/functionality/ping_loop.js");
require("./backend/scripts/functionality/input_loop.js");
require("./backend/scripts/functionality/feedback_loop.js");
require("./backend/scripts/functionality/startup_connection");

const {app, BrowserWindow} = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    // width: 500,
    // height: 500,
    fullscreen: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile("./frontend/panel.html");
  get_app_api(app, win);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


