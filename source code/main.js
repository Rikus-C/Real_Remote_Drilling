require("./server.js");

const electron 					= require('electron');
const { app, BrowserWindow } 	= require("electron");
const Remote_Drilling 			= require("./backend/scripts/remote_drilling.js");

app.commandLine.appendSwitch('ignore-certificate-errors');
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true

let mainWindow;

function createWindow() 
{
	const displays 			= electron.screen.getAllDisplays();
	var {x,y,width,height} 	= displays[displays.length - 1].bounds;
	
	mainWindow 				= new BrowserWindow(
	{
		icon:'					frontend/control_panel/css/App_Logo.jpg',
		autoHideMenuBar: 		true,
		fullscreen: 			true,
		x,
		y,
		webPreferences: 
		{
			nodeIntegration: 		true,
		}
	});

	mainWindow.loadURL("http://localhost:3001");
	
	mainWindow.on("closed", function () 
	{
		mainWindow 				= null;
	});
}

app.on("ready", createWindow);

app.on("resize", function (e, x, y) 
{
	mainWindow.setSize(x, y);
});

app.on("window-all-closed", function () 
{
	if (process.platform !== "darwin") 
	{
		app.quit();
	}
});

app.on("activate", function () 
{
	if (mainWindow === null) 
	{
		createWindow();
	}
});

var Wait = setInterval(() => 
{
	if ((Remote_Drilling.Remote_Done_Loading === true)&&(typeof(mainWindow) !== 'undefined')) 
	{
		Remote_Drilling.Get_Main_Application(app, mainWindow);
		clearInterval(Wait);
	}
}, 10);











