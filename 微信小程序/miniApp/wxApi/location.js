// 定位经纬度
export default {

  openLocation(longitude, latitude, name, address) {
    // console.log(e)
    wx.openLocation({
      longitude: Number(longitude),
      latitude: Number(latitude),
      name: name,
      address: address
    })
  },

  //获取经纬度
  getLocation() {
    return new Promise((resolve, reject) => {
      wx.chooseLocation({//app.json有权限配置
        success(res) {
          // console.log(res)
          resolve(
            {
              hasLocation: true,
              location: this.formatLocation(res.longitude, res.latitude),
              locationAddress: res.address
            }
          );
        }
      });
    });
  },

  //处理经纬度
  formatLocation(longitude, latitude) {
    if (typeof longitude === 'string' && typeof latitude === 'string') {
      longitude = parseFloat(longitude)
      latitude = parseFloat(latitude)
    }

    longitude = longitude.toFixed(2)
    latitude = latitude.toFixed(2)

    return {
      longitude: longitude,//.toString().split('.'),
      latitude: latitude//.toString().split('.')
    }
  }

}