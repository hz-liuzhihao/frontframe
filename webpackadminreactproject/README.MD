# webpack 打包工具+antd 组件库+dva 数据管理

## 目录

```bash
- build 打包脚本 dev开发环境打包脚本 pro线上环境打包脚本
- dist 打包后的文件
- mock mock数据
- public 入口文件的模板
- src 源代码
  - assets 资源文件,可在代码中直接导入
  - bcomponents 业务组件
  - components 公用组件包含业务组件
  - layout 布局组件,包括基础布局和安全布局
  - models 应用数据管理层
  - config 应用配置数据
  - pages 应用页面
    - 页面名称...
      - index.jsx 页面结构
      - index.less 页面样式
      - model.js 页面数据层
      - service.js 页面设计的接口层
  - services 应用数据通用接口
  - utils 应用工具包
  - index.css 应用全局样式
  - index.js 应用打包入口文件
  - router.js 应用路由文件
- .babelrc babel配置
- .editorconfig 编辑器配置
- .eslintignore eslint忽略文件
- .eslintrc eslint配置
- .gitignore 忽略文件
- .prettierignore 忽略格式化的文件
- .prettierrc.js 格式化配置
- commitlint.config.js commit拦截配置
- package.json 项目包管理
- README.MD 开发文档
```

## 开发内容分类

### 资源

将照片,视频,音频等静态资源放入 assets 目录中

### 组件

1. 在 components 新建组件 - 基础组件,业务组件
2. 组件以目录隔开,如 tree 组件

```
- components
  - Tree
    - index.jsx (不允许包装业务层数据)
    - index.css
    - index.less
  - BusinessOne
    - index.jsx (可以使用dva connect包装)
    - index.css
    - index.less
```

3. 组件开发规范

- 完全受控组件

直接使用 props 数据,不能在内部产生自己的状态（如图表组件,展示组件）

- 非完全受控组件

内部有自己的状态，尤其是状态还是通过 props 获取,必须在状态中保留一份最初的 props,统一命名为 state.initProps.xx,至于使用者需要判断初始状态还是修改后状态的改变来决定更新 state,根据使用者的需求决定

### 布局

作为部分页面的公共容器,提高代码的复用性

如，基础布局容器,安全控制容器等其他

### 全局数据层

全局数据的容器,如用户数据,安全数据等

### 页面

业务页面开发,只关注业务逻辑,其他逻辑交给外面处理,提高业务的开发速度

创建一个页面

```bash
- pages
  - Home
    - index.jsx
    - index.less
    - index.css
    - model.js
    - service.js
```

### 全局接口

全局数据层的接口汇总

### 工具包

为提高业务开发,所抽离的代码,提高业务间相同逻辑代码的高可用性

## 依赖说明

react-cropper 图片裁剪

Upload 数据合并

```ts
interface {
    // id
    uid: string;
    size?: number;
    // 别名
    name: string;
    // 文件名
    fileName?: string;
    lastModified?: number;
    lastModifiedDate?: Date;
    // 图片url
    url?: string;
    // 上传状态
    status?: UploadFileStatus;
    percent?: number;
    // 缩略图url
    thumbUrl?: string;
    originFileObj?: RcFile;
    response?: T;
    error?: any;
    linkProps?: any;
    // 文件类型
    type?: string;
    xhr?: T;
    // 预览url
    preview?: string;
}
```

## 开发规范

路由名全部小写

## 模板

```js
import { PAGE_CONFIG } from '../../utils/config';

export default {
  namespace: PAGE_CONFIG.roleManage,
  state: {},
  reducers: {},
  effects: {},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {});
    },
  },
};
```
