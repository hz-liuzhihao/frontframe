import React, { PureComponent } from "react";
import Cropper from "react-cropper";
import { Upload, Modal, message } from 'antd';
import PropTypes from 'prop-types';
import styles from './index.less';
import { dataURLToBlob } from "../../utils/common";

/**
 * 上传图片组件
 */
export default class CropperImageUpload extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      cropperVisible: false,
      dataURL: null,
      currentFiles: [],
      fileList: []
    }
    this.imgRef = null;
  }

  static propTypes = {
    accept: PropTypes.string,
    directory: PropTypes.bool,
    disabled: PropTypes.bool,
    headers: PropTypes.object,
    listType: PropTypes.string,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    showUploadList: PropTypes.any,
    withCredentials: PropTypes.bool,
    isCrop: PropTypes.bool,
    fileSize: PropTypes.number,
    viewMode: PropTypes.number,
    previewWidth: PropTypes.number,
    aspectRatio: PropTypes.number,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any,
    name: PropTypes.string,
    showPreview: PropTypes.bool,
    showRemove: PropTypes.bool,
    showDownload: PropTypes.bool,
    onRemove: PropTypes.func,
  }

  static defaultProps = {
    accept: '.png,.jpg,.jpeg,.gif',
    viewMode: 1,
    previewWidth: 200,
    aspectRatio: 1,
    showPreview: true,
    showRemove: true,
    showDownload: false,
  }

  /**
   * 移除文件
   * @param {*} file 
   * @returns 
   */
  doRemove = (file) => {
    const { onRemove } = this.props;
    if (typeof onRemove === 'function') {
      return onRemove(file);
    }
    return true;
  }

  /**
   * 预览文件
   */
  doPreview = (file) => {
    console.log('预览');
  }

  doChange = ({file, fileList }) => {
    this.setState({
      fileList
    });
  }

  doDownload = () => {

  }

  doBeforeUpload = (file, fileList) => {
    const { fileSize, isCrop } = this.props;
    if (file) {
      if (file.size > fileSize) {
        message.error('上传文件大小太大');
        return false;
      }
      if (isCrop) {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          const { name } = file;
          const fileData = {
            resolve,
            reject,
            name
          };
          this.ureject = reject;
          this.uresolve = resolve;
          fileReader.onload = (e) => {
            fileData.dataURL = e.target.result;
            const { currentFiles } = this.state;
            this.setState({
              currentFiles: [...currentFiles, fileData],
              cropperVisible: true
            });
          }
          fileReader.readAsDataURL(file);
        });
      }
    }
    return Promise.resolve(file);
  }

  render() {
    const { children, accept, directory, disabled, headers, listType, value, viewMode, aspectRatio, previewWidth, placeholder, multiple, name, onChange } = this.props;
    const { cropperVisible, currentFiles = [] } = this.state;
    const fileData = currentFiles[0] || {};
    return <div>
      <Modal
        visible={cropperVisible}
        width={800}
        onOk={() => {
          const { imgRef } = this;
          const { currentFiles = [] } = this.state;
          const current = currentFiles[0];
          const { cropper } = imgRef || {};
          const { resolve, reject, name } = current || {};
          if (cropper) {
            const dataURL = cropper.getCroppedCanvas().toDataURL();
            const blob = dataURLToBlob(dataURL);
            resolve && resolve(blob);
          } else {
            message.error(`${name}裁剪失败`);
            reject && reject(false);
          }
          currentFiles.shift();
          if (currentFiles.length == 0) {
            this.setState({
              cropperVisible: false,
              currentFiles: []
            });
          } else {
            this.setState({
              currentFiles: [...currentFiles]
            });
          }
        }}
        okText="裁剪"
        onCancel={() => {
          const { currentFiles = [] } = this.state;
          const current = currentFiles[0] || {};
          const { reject } = current;
          // 当文件长度为0时,结束裁剪,并将当前裁剪文件置为空
          currentFiles.shift();
          if (currentFiles.length == 0) {
            this.setState({
              cropperVisible: false,
              currentFiles: []
            });
          } else {
            this.setState({
              currentFiles: [...currentFiles]
            });
          }
          reject && reject(false);
        }}
        title={`裁剪：${fileData.name || '无'}`}
      >
        <div className={styles.cropperContainer}>
          <Cropper
            className={styles.container}
            ref={ref => {
              this.imgRef = ref
            }}
            src={fileData.dataURL}
            guides={false}
            aspectRatio={aspectRatio}
            viewMode={viewMode}
            preview="#cropper-preview"
          />
          <div className={styles.right}>
            <div className={styles.preview} id="cropper-preview" style={{ width: `${previewWidth}px`, height: `${previewWidth / aspectRatio}px`, overflow: 'hidden' }}></div>
            {placeholder && (<p className={styles.placeholder}>{placeholder}</p>)}
          </div>
        </div>
      </Modal>
      <Upload
        name={name}
        accept={accept}
        directory={directory}
        disabled={disabled}
        headers={headers}
        listType={listType}
        beforeUpload={this.doBeforeUpload}
        fileList={value}
        onRemove={this.doRemove}
        onPreview={this.doPreview}
        onDownload={this.doDownload}
        multiple={multiple}
        onChange={onChange}
      >
        {children}
      </Upload>
    </div>
  }
}