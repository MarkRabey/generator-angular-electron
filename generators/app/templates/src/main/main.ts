import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

let mainWindow: Electron.BrowserWindow;
const isDevMode = process.execPath.match(/[\\/]electron/) && process.env.NODE_ENV !== 'production';

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    show: false
  });

  // and load the index.html of the app.
  if (isDevMode) {
    mainWindow.loadURL('http://localhost:4200');
    // Open the DevTools.
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '..', 'renderer', 'index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
