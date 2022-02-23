/*
 * @Author: liuzhihao 
 * @Date: 2022-02-22 16:44:09 
 * @Last Modified by: liuzhihao
 * @Last Modified time: 2022-02-22 18:08:03
 * 表单工厂
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form } from 'antd';
import { RuleObject } from 'antd/lib/form';
import { ComponentMap, FormInfo, FormComponentInfo, JSONObject } from './form';
import { PageLoading } from '@ant-design/pro-layout';
import request from '../utils/request';
import FormInputPhone from './FormInputPhone';
import { FormLayout } from '../config/formConfig';
import { FormInputPassword } from './FormInputPassword/index';
import FormInputSwitch from './FormInputSwitch/index';

/**
 * 组件库
 */
const components: ComponentMap = {
  "inputphone": FormInputPhone,
  "inputpassword": FormInputPassword,
  "inputswitch": FormInputSwitch,
};

/**
 * 创建formitem组件
 * @param info 
 * @returns 
 */
function createFormItem(info: FormComponentInfo) {
  const { type } = info || {};
  const Component = components[type] as any;
  if (!Component) {
    return <div>不存在——{type}——类型的组件</div>;
  }
  // 由于组件每次渲染都会注入一些属性,为了不影响原有的元数据,将元数据序列化后再丢给控件
  const seriinfo = JSON.parse(JSON.stringify(info));
  return <Component key={info.key} info={seriinfo} />
}

// 提交接口定义
type Submit = (value: JSONObject) => void;

// 创建表单接口定义
interface ICreateForm {
  // 表单元数据信息
  formInfo: FormInfo;

  // 提交接口
  submit: Submit;
}

/**
 * 创建表单
 * 逻辑负责事项
 * 1. 负责创建表单;
 * 2. 可供其他组件扩展表单组件;
 * 3. 可供其他组件多层嵌套表单组件。
 * @param info 
 * @returns 
 */
export function createForm(info: ICreateForm): JSX.Element {
  const { formInfo, submit } = info;
  const { components, submitText = "提交", labelCol } = formInfo;
  let formLayout = FormLayout;
  if (labelCol) {
    formLayout = {
      wrapperCol: {
        span: 24 - labelCol
      },
      labelCol: {
        span: labelCol
      }
    };
  }

  function renderComponents(compsInfo: FormComponentInfo[]) {
    return compsInfo.map((item) => createFormItem(item));
  }

  return <Form {...formLayout} onFinish={submit}>
    {renderComponents(components)}
    <Form.Item wrapperCol={{ offset: formLayout.labelCol.span }}>
      <Button type="default" htmlType="submit">{submitText}</Button>
    </Form.Item>
  </Form>;
}

/**
 * 应用接口
 */
interface IFormApp extends BaseProps {
  /**
   * 表单模板id
   */
  formTemplateId: string;

  /**
   * 表单提交成功的钩子函数
   */
  submitSuccess: () => void;
}

/**
 * 表单组件应用
 * 应用负责事项
 * 1. 负责根据表单模板id获取表达模板json数据;
 * 2. 负责根据表单模板json数据渲染表单列表;
 * 3. 负责提交表单数据并向上级发出通知。
 */
function FormApp(props: IFormApp) {

  const { formTemplateId, submitSuccess } = props;

  const [info, setInfo] = useState<FormInfo>();

  // 获取form样式信息
  useEffect(function () {
    async function initForm() {
      // const data = await request('', {
      //   "id": formTemplateId
      // });
      // setInfo(data);
      setTimeout(() => {
        setInfo({
          components: [{
            type: 'inputphone',
            key: 'phone',
            fromProps: {},
            compProps: {},
            label: '名字',
            isRequire: true,
            rules: []
          }, {
            type: "inputpassword",
            key: 'password',
            fromProps: {},
            compProps: {},
            label: '密码',
            isRequire: true,
            rules: []
          }, {
            type: 'inputswitch',
            key: 'switch',
            fromProps: {},
            compProps: {},
            label: '开关',
            isRequire: true,
            rules: []
          }],
        });
      }, 1000);
    }
    initForm();
  }, [formTemplateId]);

  // 提交数据
  const submit = useCallback(async function (values) {
    // const result = await request('', { ...values });
    // if (result) {
    //   submitSuccess();
    // }
    console.log(values);
  }, [formTemplateId]);

  if (info) {
    // 调用渲染引擎
    return createForm({
      formInfo: info,
      submit
    });
  }
  return <PageLoading></PageLoading>;
}

// 表单引擎
export const FormEngine = React.memo(FormApp);
