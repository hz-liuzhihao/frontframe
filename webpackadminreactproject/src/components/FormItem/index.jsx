import React, { PureComponent } from 'react';
import { Form, Select, Input } from 'antd';
import CropperImageUpload from '../CropperImageUpload';
import InputLimit from '../InputLimit';
import { debounce } from '../../utils/common';
import InputVeriCode from '../InputVeriCode';

/**
 * 普通表单包装器
 * @param {*} Wrapper 
 * @param {*} args 
 * @returns 
 */
export function SimpleFormWrapper(Wrapper, args) {
  return function (props) {
    const { rules: arules = [] } = args || {};
    const { decorate, wrapperProps = {}, rules = [], initialValue, children, required, requiredMessage, label, style, className } = props;
    return <Form.Item style={style} className={className} required={required} name={decorate} initialValue={initialValue} validateFirst label={label} rules={[
      {
        required: required,
        whitespace: true,
        message: requiredMessage || `${label || ''}不能为空`
      },
      ...rules,
      ...arules
    ]}>
      <Wrapper {...wrapperProps}>
        {children}
      </Wrapper>
    </Form.Item>
  }
}

/**
 * 级联选择表单包装器高阶表单组件
 * 上一级影响下一级的选择列表
 * @param {*} Wrapper 
 * @param {*} args 
 */
export function CascadeFormWrapper(Wrapper, args) {
  return class CascadeForm extends PureComponent {

    constructor(props) {
      super(props);
      this.state = {};
      this.valueMap = {};
      this.resultCache = [];
    }

    componentDidMount() {
      this.loadMain();
    }

    /**
     * 第一次加载主列表
     */
    loadMain = () => {
      const { metaDatas = [], onChange } = this.props;
      const { dictKey, decorate } = metaDatas[0] || {};
      if (typeof onChange == 'function') {
        // 第一个参数为空时表示请求顶级数据列表
        const result = onChange(null, dictKey);
        const changeState = (options) => {
          if (options instanceof Array) {
            if (!this.resultCache[dictKey]) {
              this.resultCache[dictKey] = {};
            }
            this.resultCache[dictKey] = options;
            // 重置剩下几个的下拉列表
            this.setState({
              [decorate]: options,
              [`${decorate}Loading`]: false
            });
          }
        }
        if (result && result.then) {
          result.then(changeState)
        } else {
          changeState(result);
        }
      }
    }



    /**
     * 当进行搜索时
     * @param {*} value 
     * @param {*} dictKey 
     * @param {*} index 
     * @returns 
     */
    doSearch = (value, dictKey, index) => {
      const { onSearch, metaDatas = [] } = this.props;
      const { decorate: parentDecorate } = metaDatas[index - 1] || {};
      const parentValue = this.valueMap[parentDecorate];
      if (index > 0 && !parentValue) {
        return;
      }
      const { decorate } = metaDatas[index];
      const resultCache = this.resultCache[dictKey];
      // 当搜索关键字为空时,将第一次的缓存列表加进去
      if (value == null || value.trim() == '') {
        this.setState({
          [decorate]: index == 0 ? resultCache || [] : (resultCache || {})[parentValue] || []
        });
        return;
      }
      // 搜索结果不记录到缓存中,只有列表才记到缓存中
      if (typeof onSearch == 'function') {
        this.setState({
          [`${decorate}Loading`]: true
        });
        const result = onSearch(value, dictKey, parentValue);
        if (result && result.then) {
          result.then(options => {
            if (options instanceof Array) {
              this.setState({
                [decorate]: options,
                [`${decorate}Loading`]: false
              });
            } else {
              this.setState({
                [`${decorate}Loading`]: false
              });
            }
          });
        } else {
          if (result instanceof Array) {
            this.setState({
              [decorate]: result,
              [`${decorate}Loading`]: false
            });
          } else {
            this.setState({
              [`${decorate}Loading`]: false
            });
          }
        }
      }
    }

    /**
     * 当某一列发生修改时
     * @param {*} value 
     * @param {*} index 
     * @returns 
     */
    doChange = (value, index) => {
      const { onChange, metaDatas = [], formRef = {} } = this.props;
      const { decorate } = metaDatas[index];

      // 如果是最后一个元素value修改了不管
      if (index == metaDatas.length - 1 || value == this.valueMap[decorate]) {
        return;
      }
      this.valueMap[decorate] = value;
      const remains = metaDatas.slice(index + 1);
      const nextItem = metaDatas[index + 1] || {};
      const { dictKey, decorate: nextDecorate } = nextItem;
      const changeState = (options) => {
        if (options instanceof Array) {
          if (!this.resultCache[dictKey]) {
            this.resultCache[dictKey] = {};
          }
          this.resultCache[dictKey][value] = options;
          const currentState = {};
          // 请求完成后将剩下的几个选项的数据置为空
          remains.forEach(item => {
            const { current } = formRef;
            const { decorate } = item || {};
            if (current) {
              current.setFieldsValue({ [decorate]: null });
            }
            currentState[decorate] = [];
          });
          // 重置剩下几个的下拉列表
          this.setState({
            ...currentState,
            [nextDecorate]: options,
            [`${nextDecorate}Loading`]: false
          });
        } else {
          this.setState({
            [`${nextDecorate}Loading`]: false
          });
        }
      }
      const resultCache = this.resultCache[dictKey] || {};
      if (resultCache[value] instanceof Array) {
        changeState(resultCache[value]);
        return;
      }
      if (typeof onChange == 'function') {
        const result = onChange(value, dictKey);
        this.setState({
          [`${nextDecorate}Loading`]: true
        });
        if (result && result.then) {
          result.then(changeState)
        } else {
          changeState(result)
        }
      }
    }

    render() {
      const { } = args || {};
      const { metaDatas = [], label, required } = this.props;
      return <Form.Item required={required} label={label}>
        {metaDatas.map((metaData, i) => {
          const { decorate, wrapperProps = {}, rules = [], initialValue, children, required, requiredMessage, dictKey } = metaData || {};
          const { showSearch } = wrapperProps || {};
          if (showSearch) {
            wrapperProps.onSearch = debounce((value) => {
              this.doSearch(value, dictKey, i);
            }, 1000);
          };
          return <Form.Item required={required} key={decorate} name={decorate} initialValue={initialValue} validateFirst rules={[
            {
              required: required,
              message: requiredMessage || `${label}不能为空`
            },
            ...rules
          ]}>
            <Wrapper {...wrapperProps} loading={this.state[`${decorate}Loading`]} options={this.state[decorate] || []} onChange={(value) => this.doChange(value, i)}>
              {children}
            </Wrapper>
          </Form.Item>
        })}
      </Form.Item>
    }
  }
}

/**
 * 上传图片表单组件
 */
export const FormCropperUpload = SimpleFormWrapper(CropperImageUpload);

/**
 * 输入表单组件
 */
export const FormInputLimit = SimpleFormWrapper(InputLimit);

/**
 * 级联选择组件
 */
export const FormCasSelect = CascadeFormWrapper(Select);

/**
 * 手机号表单组件
 */
export const FormPhone = SimpleFormWrapper(InputLimit, {
  rules: [
    {
      pattern: '^[1][3,5,7,8][0-9]\\d{8}$',
      message: '手机号码格式不正确'
    }
  ]
});

/**
 * 密码表单组件
 */
export const FormPassword = SimpleFormWrapper(InputLimit, {
  rules: [
    {
      min: 8,
      max: 26,
      message: '密码必须在8~26位之间'
    }
  ]
});

/**
 * 输入验证码组件
 */
export const FormVeriCode = SimpleFormWrapper(InputVeriCode, {
  rules: [
    {
      min: 4,
      max: 6,
      message: '验证码在4~6位之间'
    }
  ]
});