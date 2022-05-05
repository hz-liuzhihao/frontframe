# liuframe

# 目录介绍

- customwebreact
- customwebvue
  
> 自定义react主分结构框架,web-base公共组件逻辑,web_design基于公共组件延伸的第三方定制化业务,web_render基于公共组件延伸的第三方定制化业务。该框架适用于对外提供服务的公司，具有一个公共系统，但是有一些客户需要的定制化比较高，这是后可以依赖于web_base马上做出扩展,适配第三方企业

- customwebreactjsts

> js,ts混合开发,在开发过程中,有时候希望公共组件和逻辑走ts这种规范且抽象的编程，而页面这种直接对外的又想快速开发，因为页面只是为了看，所以为了满足这种开发场景，增加页面的产出效率，以及组件的共同维护，而产出的一种框架，后期待公共组件稳定，可以独立成一个仓库管理。

- dvaproject

> 以dva为数据管理的react框架开发，开箱式，解决企业pc端开发。

- electron

> pc端跨平台开发，利用nodejs的跨平台和浏览器内核跨平台的性质而应运而生，解决企业应用依赖于平台底层api，且又想跨平台，解决开发成本的选择。如IM即时通讯，vpn工具等等。

- flutterapp

> 移动端跨平台，虽然flutter扬言是所有都要跨平台，但是目前我仅仅觉得它的移动端跨平台较完善，解决企业节约开发成本并且易于后期维护的问题。如果企业开发的移动端应用不大量依赖底层api，是可以考虑的，依赖底层api，也没有关系，编写对应的flutter_plugin即可。

- gulptsproject

> 目前框架并不成熟，还不能拿来直接用，暂做对gulp的研究，gulp比webpack自由度更大，但需要自己去处理依赖关系，及合并原则。

- tsproject

> 纯js项目，使用于大型的开源项目，手撸代码，比如我写的一个(RichSheet)[https://hz-liuzhihao.github.io/RichSheet/example/dist/]

- uniappproject

> uniappproject开箱式框架，与uniapp大差不差，主要解决企业的小程序跨平台问题和小程序的后期维护成本和开发成本。uniapp虽然也可以做原生开发，但是我觉得原生开发还是flutter最优,无论从性能还是后期的发展来看。

- vuecliproject

> vuecli自己对外提供的框架，开箱式，可以直接使用。

- webpackadminreactproject

> 一款中后台管理框架，使用antd来解决企业中后台管理框架。

- webpackreacth5project

> 一款reacth5框架，主要在屏幕上做了像素适配，采用了750设计稿的标准，应用内px以750进行划分。解决企业的运营界面产出。

- webpackreactpch5project

> 这个是两边留白中间是一个手机大小的h5，最终尺寸通过容器高度确定，解决企业一些功能的h5透出，并在pc端也有移动端的体验。

- webpackreactproject

> 纯webpack react项目脚手架

- webpacktsproject

> 纯webpack typescript脚手架

- webpackvueproject

> 纯webpack vue脚手架

- wxminiapp

> 微信开发脚手架，解决企业不做小程序跨端时，使用微信小程序原生开发