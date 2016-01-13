'use strict';
const exec = require('child_process').exec;
const electron = require('electron');
const app = require('app');
const BrowserWindow = require('browser-window');
console.log(app);

// Launch Ethereum Node

var Geth = exec('/usr/local/bin/geth --testnet', {maxBuffer: 1024*600}, function(error, stdout, stderr){
	console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});


// report crashes to the Electron project
// require('crash-reporter').start();

// // adds debug features like hotkeys for triggering dev tools and reload
// require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	Geth.kill();
	mainWindow = null;
}

function createMainWindow() {
	const win = new BrowserWindow({
		width: 1400,
		height: 800
	});

	win.loadURL(`file://${__dirname}/app/index.html`);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		Geth.kill();
		app.quit();
	}
});

// app.on('activate-with-no-open-windows', () => {
// 	if (!mainWindow) {
// 		mainWindow = createMainWindow();
// 	}
// });

app.on('ready', () => {
	mainWindow = createMainWindow();
	mainWindow.webContents.openDevTools();
});
