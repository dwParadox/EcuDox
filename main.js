require('v8-compile-cache');

const {app, BrowserWindow} = require('electron');
const VirtualKeyboard = require('electron-virtual-keyboard');

let mainWindow;
let vkb; 

function createWindow () {
  mainWindow = new BrowserWindow({
    title: 'AG6_INTERFACE',
    backgroundColor: '#000000',
    show: false,
    width: 800, // 800
    height: 480, // 480
    frame: false,
    //kiosk: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('index.html');

  //mainWindow.webContents.on('dom-ready', (event)=> {
  //  let css = '* { cursor: none !important; }';
  //  mainWindow.webContents.insertCSS(css);
  //});

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null
  });

  mainWindow.on('ready-to-show', function() {
    mainWindow.show();
    mainWindow.focus();
  });

  vkb = new VirtualKeyboard(mainWindow.webContents);
}

//app.disableHardwareAcceleration();
app.commandLine.appendSwitch('ignore-gpu-blacklist');

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
