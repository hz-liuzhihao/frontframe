
export default {

  //toast
  showToast(msg) {
    wx.showToast({
      title: msg
    })
  },
  showToastIcon(msg, icon) {
    wx.showToast({
      title: msg,//`创建失败 错误码: ${res.errCode}`,
      icon: icon //自带icon---none/loading/success
    })
  },
  showToastDuration(msg, duration = 2000) {
    wx.showToast({
      title: msg,
      duration: duration
    })
  },
  showToastMask(title, icon, duration = 2000) {
    wx.showToast({
      title: title,
      icon: icon,
      mask: true,
      duration,
    })
  },
  showToastCallBack(msg, duration = 2000, callback) {
    wx.showToast({
      title: msg,
      duration: duration,
      success() {
        callback();
      }
    })
  },
  hideToast() {
    wx.hideToast()
  },

  //model/alert
  showModal(title) {
    wx.showModal({
      title: title
    })
  },
  showModalNotitle(content) {
    wx.showModal({
      content: content
    })
  },
  showModalContent(title, content) {
    wx.showModal({
      title: title,
      content: content
    })
  },
  showModalnoCancel(title, content) {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false
    })
  },
  showModalConfirmTxt(title, content, firmText) {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      confirmText: firmText
    })
  },
  showModalBtnTxt(title, content, firmText, cancelText) {
    wx.showModal({
      title: title,
      content: content,
      confirmText: firmText,
      cancelText: cancelText
    })
  },
  showModalCallBack(title, content, callback) {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      success() {
        callback();
      }
    })

  },


  //loader
  showLoader() {
    wx.showLoading()
  },
  showLoadeTitle(title) {
    wx.showLoading({
      title: title
    })
  },
  hideLoader() {
    wx.hideLoading()
  },



  //dialog
  //  "mp-dialog": "weui-miniprogram/dialog/dialog"

  //actionsheet
  //"mp-actionSheet": "weui-miniprogram/actionsheet/actionsheet",
  showActionSheet(arrayItems = []) {
    return new Promise((resolve, reject) => {
      wx.showActionSheet({
        itemList: arrayItems, //['item1', 'item2', 'item3', 'item4']
        success(e) {
          resolve({ 'index': e.tapIndex });
        }
      })
    });

  }


}