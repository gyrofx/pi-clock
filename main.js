const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const log = require('electron-log');
const Store = require('electron-store');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

console.debug = log.debug;
console.log = log.info;
console.warn = log.warn;
console.error = log.error;

console.log('Startup pi-clock');

const storeSchema = {
  mopidy: {
    host: {
      type: 'string',
      format: 'url',
      default: 'localhost',
    },
    port: {
      type: 'number',
      minimum: 1,
      default: 6680,
    },
  },
};

const store = new Store({ storeSchema });
console.log('main', 'Load config file from ', store.path);

const mopidyHost = store.get('mopidy.host', 'localhost');
const mopidyPort = store.get('mopidy.port', 6680);
console.log('main', 'mopidy.host: ', mopidyHost);
console.log('main', 'mopidy.port: ', mopidyPort);

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 480,
    fullscreen: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/pi-clock/index.html`),
      protocol: 'file:',
      slashes: true,
    })
  );

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on(log.transports.ipc.eventId, function(_, message) {
  log.transports.file(message);
});

ipcMain.on('config', function(event) {
  console.log('main', 'ipcMain.on: config');
  event.sender.send('config-response', {
    mopidy: {
      host: mopidyHost,
      port: mopidyPort,
    },
  });
});
