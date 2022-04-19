const { ipcMain, dialog } = require('electron');

ipcMain.on('showDialog', (event, data) => {
    dialog.showMessageBox({
        title: '提示',
        message: data.message,
        type: 'info'
    });
});