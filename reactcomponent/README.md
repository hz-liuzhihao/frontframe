# react组件脚手架

## 发布配置

```
main: "dist/*.js" - 文件入口
files: ["dist"] - 需要发布到npm的文件列表
```

## 命令

npm run start 启动本地预览
npm run dev 同npm run start
npm run pub 进行发布
npm run build 构建发布内容

## 依赖介绍

webpack - 编译工具主程序
webpack-cli - 编译工具脚手架
webpack-dev-server 编译运行工具
webpack-node-externals - 避免在编译期间node_modules中的错误
css-loader - 处理css的工具
style-loader - 处理内联样式
html-webpack-plugin - 处理html的工具
less - less预处理工具
less-loader - less预处理工具
mini-css-extract-plugin - 将css分割成独立文件
clean-webpack-plugin - 清理之前编译的文件
react - 开发react组件
babel-loader - 转移jsx
optimize-css-assets-webpack-plugin - 压缩css的插件