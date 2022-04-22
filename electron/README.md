#electrondemo

# 开发目录

```
- .vscode
- common 主进程和渲染进程共同约定的逻辑
- main 主进程逻辑代码
- renderer 渲染进程逻辑代码
- src 渲染进程源代码，需要经过webpack打包后生成到renderer中
  - assets
  - build
  - components
  - error
  - i18n
  - layout
  - models
  - pages
  - route
  - services
  - template
.gitignore
.electrondemo.code-workspace
.gulpfile.js gulpfile任务文件
main.js electron入口文件
package.json 包管理文件
README.md
```

# 开发要点

## 文件路径

获取相对文件路径,使用 path.join 方法

## 主进程

主进程是从 main.js 开始执行，完全由 node 控制

### app

控制应用程序事件生命周期的模块

### BrowserWindow

创建和管理应用程序窗口的模块。

### api

1. 使用 process 全局 platform 属性来区分平台;

## 渲染进程

渲染进程在主进程中创建 BrowserWindow 时就创建了渲染进程

## 相关点

### 主进程渲染进程通信

在主进程中，通过 ipcMain 的 on 方法注册主进程钩子函数

```js
// event 事件
// 渲染进程传递过来的数据
ipcMain.on("事件名", function (event, data) {});
```

在渲染进程中，通过 ipcRenderer 的 send 方法触发钩子函数

```js
// data数据,支持复杂类型
ipcRenderer.send("事件名", data);
```

## 相关文档

```js
// https://www.jianshu.com/p/d005213283e3
// https://blog.csdn.net/Gabriel_wei/article/details/92589711
// https://www.jianshu.com/p/98237341a08e
```

[vscode task.json 和 launch.json 设置](https://blog.csdn.net/sinolover/article/details/120351921)

## 开发流程

先启动渲染进程开发环境再启动主进程开发环境

### 启动渲染进程开发环境

```bash
npm run render-server
```

### 启动主进程开发环境

- vscode

```bash
在vscode中的调试，点击调试
```

- npm

```bash
npm run dev
```
