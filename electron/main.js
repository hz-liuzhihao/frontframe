const { app, BrowserWindow, Menu } = require("electron");
const path = require('path');
require("./main_process/dialog");

let mainWindow = null;

const createWindow = function () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  mainWindow.loadFile("index.html");

  mainWindow.openDevTools();

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
};

// 当所有窗口被关闭了,退出
app.on("window-all-closed", function () {
  if (process.platform != "darwin") {
    app.quit();
  }
});

// 完成了初始化并且准备创建浏览器窗口的时候
app.on("ready", function () {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
  });
});
