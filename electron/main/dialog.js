const { ipcMain, dialog, nativeImage } = require("electron");
const { EventMap } = require("../common/event");

ipcMain.on(EventMap.showDialog, (event, data) => {
  dialog.showMessageBox({
    title: "提示",
    message: data.message,
    icon: nativeImage.createFromPath("../public/icon.png"),
    type: "info",
  });
});
