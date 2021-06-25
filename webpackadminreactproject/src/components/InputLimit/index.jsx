import React from "react";
import { Input } from 'antd';
import PropTypes from 'prop-types';
import styles from './index.less';

const TextArea = Input.TextArea;
const Password = Input.Password;

/**
 * 输入限制提示组件
 * @param {*} props 
 * @returns 
 */
export default function InputLimit(props) {
  const { maxLength, value } = props;
  const { showTip, inputType, ...inputProps } = props;
  const valueLength = (value && value.length) || 0;
  let InputComp;
  switch (inputType) {
    case 'textarea':
      InputComp = TextArea;
      break;
    case 'password':
      InputComp = Password;
      break;
    default:
      InputComp = Input;
      break;
  }
  return <div className={styles.container}>
    <InputComp {...inputProps} />
    {showTip && (<div className={styles.length}>
      <span className={styles.valueLength}>{valueLength}</span>
      <span className={styles.separated}>/</span>
      <span className={styles.maxLength}>{maxLength || '无限制'}</span>
    </div>)}
  </div>
}

InputLimit.propTypes = {
  showTip: PropTypes.bool,
  inputType: PropTypes.string
}

InputLimit.defaultProps = {
  showTip: true,
  inputType: 'text'
}