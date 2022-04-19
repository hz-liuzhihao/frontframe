const { ipcMain, dialog } = require("electron");
const { EventMap } = require("../common/event");

ipcMain.on(EventMap.showDialog, (event, data) => {
  dialog.showMessageBox({
    title: "提示",
    message: data.message,
    type: "info",
  });
});
