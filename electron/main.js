const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
require("./main/dialog");

let mainWindow = null;

const createWindow = function () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "./build/icons/1024x1024.png",
    webPreferences: {
      nodeIntegration: true,
      // 是否禁用上下文隔离
      contextIsolation: false,
      preload: path.join(__dirname, "main/preload.js"),
      webSecurity: false,
    },
  });

  if (process.env.NODE_ENV == "development") {
    mainWindow.loadURL("http://localhost:3333");
    mainWindow.openDevTools();
  } else {
    mainWindow.loadFile("./renderer/index.html");
  }

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
