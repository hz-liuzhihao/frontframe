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
    <div className={styles.titleContainer}>
      <div className={styles.title}>{title}</div><div className={styles.time}>{time}</div>
    </div>
    <div className={styles.contentContainer}>
      {content.map(item => {
        const { type, value } = item || {};
        if (item.type == 0) {
          return <div className={styles.content}>
            {value}
          </div>
        } else {
          return <div className={styles.imgContainer}>
            {value.map(img => {
              return <div className={styles.imgItem}>
                <Image src={img} />
              </div>
            })}
          </div>
        }
      })}
    </div>
    <div className={styles.commentContainer}>
      <div className={styles.comment}>
        打开APP发表对文章的评论
      </div>
    </div>
  </div>);
}

function mapStateToProps(state) {
  return {
    ...state[PAGE_CONFIG.articleDetail],
    loading: state.loading
  };
}

export default connect(mapStateToProps)(ArticleDetail);