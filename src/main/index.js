'use strict';

import { app, BrowserWindow, ipcMain } from 'electron';
const path = require('path');
// const getPort = require('get-port');

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    useContentSize: false,
    resizable: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      webviewTag: true
    }
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // 添加 Chrome 拓展
  BrowserWindow.addExtension(path.join(process.cwd(), 'extensions/emp-devtools'));
}

(async () => {
  // 远程调试
  // const port = await getPort();
  const port = 9222;
  app.commandLine.appendSwitch('remote-debugging-port', `${port}`);
  process.env.EMP_REMOTE_DEBUGGING_PORT = port;
  // 关闭安全警告
  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
})();

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('window-max', () => {
  mainWindow.setResizable(true);
  mainWindow.maximize();
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
