import React, { PureComponent } from 'react';
import CropperImageUpload from '../../components/CropperImageUpload';
import { connect } from 'dva';
import { PAGE_CONFIG } from '../../utils/config';

class Wrap extends PureComponent {

  render() {
    return <div>
      <CropperImageUpload
        isCrop
        placeholder="建议200x200大小"
        multiple
        listType="picture-card"
      >
        上传文件
      </CropperImageUpload>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    ...state[PAGE_CONFIG.wrap],
    loading: state.loading
  };
}

export default connect(mapStateToProps)(Wrap);