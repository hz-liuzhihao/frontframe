import React from 'react';
import { connect } from 'dva';
import { PAGE_CONFIG } from '../../utils/config';
import styles from './index.less';
import { Image } from 'antd';

/**
 * 主页
 */
function ArticleDetail(props) {
  const { data = {} } = props;
  const { title, time, content = [] } = data;
  return (<div className={styles.container}>
    <div>
      <div>{title}</div><div>{time}</div>
    </div>
    <div>
      {content.map(item => {
        const { type, value } = item || {};
        if (item.type == 0) {
          return <div>
            {value}
          </div>
        } else {
          return <div>
            {value.map(img => {
              return <div>
                <Image src={img} />
              </div>
            })}
          </div>
        }
      })}
    </div>
    <div></div>
  </div>);
}

function mapStateToProps(state) {
  return {
    ...state[PAGE_CONFIG.articleDetail],
    loading: state.loading
  };
}

export default connect(mapStateToProps)(ArticleDetail);