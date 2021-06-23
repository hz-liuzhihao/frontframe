const menuConfig = [
  {
    path: '/',
    name: '欢迎使用'
  },
  {
    path: '/sysconfig',
    name: '系统设置',
    children: [{
      path: '/sysconfig/managedict',
      name: '字典管理'
    }]
  }
];

export default menuConfig;