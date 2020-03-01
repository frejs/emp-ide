'use strict';

import { screen, app, BrowserWindow, BrowserView, ipcMain, webContents } from 'electron';
const path = require('path');
const getPort = require('get-port');

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
}

let mainWindow;
let devtoolsView;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow () {
  let size = screen.getPrimaryDisplay().workAreaSize;
  let width = size.width;
  let height = size.height;

  // Workbench Window
  mainWindow = new BrowserWindow({
    width,
    height,
    useContentSize: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      webviewTag: true,
      plugins: true
    }
  });
  mainWindow.maximize();
  mainWindow.loadURL(winURL);

  // Devtools View
  devtoolsView = new BrowserView({
    webPreferences: {
      preload: path.join(__static, 'devtools-preload.js')
    }
  });
  mainWindow.setBrowserView(devtoolsView);
  devtoolsView.setBounds({
    x: 330,
    y: 100,
    width: width - 330,
    height: height - 100
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // 添加 Chrome 拓展
  BrowserWindow.addDevToolsExtension(path.join(process.cwd(), 'extensions/emp-devtools'));
}

(async () => {
  // 远程调试
  const port = await getPort();
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

ipcMain.on('initialized', (event, message) => {
  const container = webContents.getAllWebContents().find((item) => {
    return item.getURL().includes(message.url);
  });
  if (container) {
    container.setDevToolsWebContents(devtoolsView.webContents);
    container.debugger.attach();
    container.openDevTools();
    // 向 DevTools WebView 中 注入 JS 脚本
    devtoolsView.webContents.executeJavaScript(`
      window.initDevTools && window.initDevTools();
    `);
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
