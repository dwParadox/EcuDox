require('v8-compile-cache');

const {app, BrowserWindow} = require('electron')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800, // 800
    height: 480, // 480
    frame: false,
    //kiosk: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('index.html')

  //mainWindow.webContents.on('dom-ready', (event)=> {
  //  let css = '* { cursor: none !important; }';
  //  mainWindow.webContents.insertCSS(css);
  //});

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
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
