import React from 'react';
import { SmileOutlined } from '@ant-design/icons';

const menuConfig = [
  {
    path: '/',
    name: '欢迎使用',
    icon: <SmileOutlined />,
  },
  {
    path: '/sysconfig',
    icon: <SmileOutlined />,
    name: '系统设置',
    children: [
      {
        path: '/sysconfig/managedict',
        icon: <SmileOutlined />,
        name: '字典管理',
      },
      {
        path: '/sysconfig/permissionmanage',
        icon: <SmileOutlined />,
        name: '权限管理',
      },
      {
        path: '/sysconfig/rolemanage',
        icon: <SmileOutlined />,
        name: '角色管理'
      }
    ],
  },
];

export default menuConfig;
