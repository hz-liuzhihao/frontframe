import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import InputLimit from '../InputLimit';
import { countDown } from '../../utils/common';
import styles from './index.less';

/**
 * 验证码组件
 * @param {*} props 
 * @returns 
 */
export default function InputVeriCode(props) {

  const { count, onGetVerCode, ...inputLimitProps } = props;

  const [con, setCon] = useState(0);
  const [isFirst, setFirst] = useState(true);
  const isCounting = con > 0;

  const doClick = useCallback(() => {
    onGetVerCode().then((success) => {
      if (success) {
        countDown((curCon) => {
          setCon(curCon);
          setFirst(false);
        }, count);
      }
    })
  }, [onGetVerCode]);

  return <InputLimit {...inputLimitProps} suffix={<div className={isCounting ? styles.count : styles.noCount} onClick={() => !isCounting && doClick()}>
    {isCounting ? `${con}秒后重新获取` : isFirst ? '获取验证码' : '重新获取验证码'}
  </div>} />
}

InputVeriCode.propTypes = {
  count: propTypes.number,
  onGetVerCode: propTypes.func,
}

InputVeriCode.defaultProps = {
  count: 60
}