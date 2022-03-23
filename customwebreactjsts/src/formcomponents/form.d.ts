/*
 * @Author: liuzhihao
 * @Date: 2022-02-22 16:43:41
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-02-24 10:24:39
 * 负责定义表单引擎相关接口
 */
import { Rule } from 'antd/lib/form';

interface FormItemProps {}

interface CompItemProps {
  /**
   * 输入长度大小,如何只能输入3-10个字符,则就是[3,10]
   */
  size?: number[];

  /**
   * 最小输入数
   */
  min?: number;

  /**
   * 最大输入数
   */
  max?: number;
}

/**
 * 表单组件
 */
export interface FormComponentInfo {
  /**
   * 组件类型
   */
  type: string;

  /**
   * 填写内容的字段名
   */
  key: string;

  /**
   * 初始值
   */
  initialValue?: any;

  /**
   * 表单属性,其他定制属性
   */
  fromProps?: FormItemProps;

  /**
   * 组件属性
   */
  compProps?: CompItemProps;

  /**
   * 标签
   */
  label: string;

  /**
   * 是否必填
   */
  isRequire: boolean;

  /**
   * 组件规则列表
   */
  rules?: Rule[];
}

/**
 * 表单信息
 */
export interface FormInfo {
  components: FormComponentInfo[];

  labelCol?: number;

  submitText?: string;
}

export interface Component {}

export interface ComponentMap {
  [key: string]: Function;
}

export interface JSONObject {
  [key: string]: any;
}
