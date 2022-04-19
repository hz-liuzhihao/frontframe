const { app, BrowserWindow, Menu } = require("electron");
require("./main_process/dialog");

let mainWindow = null;

// 当所有窗口被关闭了,退出
app.on("window-all-closed", function () {
  if (process.platform != "darwin") {
    app.quit();
  }
});

// 完成了初始化并且准备创建浏览器窗口的时候
app.on("ready", function () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL("file://" + __dirname + "/index.html");

  mainWindow.openDevTools();

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  // mainWindow.setProgressBar(0.5);
});

// https://www.jianshu.com/p/d005213283e3
// https://blog.csdn.net/Gabriel_wei/article/details/92589711
// https://www.jianshu.com/p/98237341a08e
