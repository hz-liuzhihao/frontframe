import React from 'react';
import { connect } from 'dva';
import { PAGE_CONFIG } from '../../utils/config';
import { Carousel, Image } from 'antd';
import styles from './index.less';

/**
 * 主页
 */
function GoodDetail(props) {
  const { data = {} } = props;
  const { skuName, imageList = [], propCode, wareQD, comments, image, contentDesc, relatedProducts, productFeatures, authorDesc } = data;
  return (<div className={styles.container}>
    <Carousel>
      {
        imageList.map(item => {
          return <Image src={item} />
        })
      }
    </Carousel>
    <div className={styles.contentContainer}>
      <div className={styles.skuName}>{skuName}</div>
    </div>
  </div>);
}

function mapStateToProps(state) {
  return {
    ...state[PAGE_CONFIG.goodDetail],
    loading: state.loading
  };
}

export default connect(mapStateToProps)(GoodDetail);