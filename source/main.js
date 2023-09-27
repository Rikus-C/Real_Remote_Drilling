require("./backend/scripts/functionality/watchdog.js");
require("./backend/scripts/communication/plc_tcp_receiver.js");
require("./backend/scripts/communication/websocket_receiver.js");

const {app, BrowserWindow} = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: true,
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
