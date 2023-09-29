const settings = require("./backend/settings/comms_settings.json");

if (settings["plc connection type"] === "ipv4"){
  require("./backend/scripts/communication/plc_tcp_receiver_v4.js");
}
else if (settings["plc connection type"] === "ipv6"){
  require("./backend/scripts/communication/plc_tcp_receiver_v6.js");
}

require("./backend/scripts/communication/websocket_receiver.js");
require("./backend/scripts/functionality/watchdog.js");
require("./backend/scripts/functionality/plc_loop.js");
require("./backend/scripts/functionality/feedback_loop.js");

const {app, BrowserWindow} = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 500,
    fullscreen: false,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("./frontend/panel.html");
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
