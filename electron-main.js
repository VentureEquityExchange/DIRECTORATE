'use strict';

const electron = require('electron');
const app = require('app');
const BrowserWindow = require('browser-window');

// Launch Ethereum Node

const Geth = require('child_process').spawn('/usr/local/bin/geth', ['--testnet']);

Geth.stderr.setEncoding('utf8');

Geth.stdout.on('data', function (data) {
  console.log(data);
});

Geth.stderr.on('data', function (data) {
  console.log(data);
});

Geth.on('close', function (code) {
    console.log('Ethereum process exited with code ' + code);
});


// report crashes to the Electron project
require('crash-reporter').start();

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
		width: 1600,
		height: 800
	});

  win.setFullScreen(true)
	win.loadURL(`file://${__dirname}/index.html`);
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
