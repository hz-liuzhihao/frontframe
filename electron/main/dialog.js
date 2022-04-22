const { ipcMain, dialog, nativeImage } = require("electron");
const { EventMap } = require("../common/event");
const path = require("path");

ipcMain.on(EventMap.showDialog, (event, data) => {
  dialog.showMessageBox({
    title: "提示",
    message: data.message,
    icon: nativeImage.createFromPath(
      path.join(__dirname, "../resources/icon.png")
    ),
    type: "info",
  });
});
