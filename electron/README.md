#electrondemo

## 主进程

主进程是从main.js开始执行，完全由node控制

### app

控制应用程序事件生命周期的模块

### BrowserWindow

创建和管理应用程序窗口的模块。

### api

1. 使用process全局platform属性来区分平台;

## 渲染进程

渲染进程在主进程中创建BrowserWindow时就创建了渲染进程


## 相关点

### 主进程渲染进程通信

在主进程中，通过ipcMain的on方法注册主进程钩子函数
```js
// event 事件
// 渲染进程传递过来的数据
ipcMain.on('事件名', function(event, data) {});
```

在渲染进程中，通过ipcRenderer的send方法触发钩子函数
```js
// data数据,支持复杂类型
ipcRenderer.send('事件名', data);
```

## 相关文档

```js
// https://www.jianshu.com/p/d005213283e3
// https://blog.csdn.net/Gabriel_wei/article/details/92589711
// https://www.jianshu.com/p/98237341a08e
```