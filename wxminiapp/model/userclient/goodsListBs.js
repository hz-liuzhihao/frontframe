//消费者端, 商品列表数据处理
import action from '../../http/action';
import config from '../../utils/configInfo';
import notifaction from '../../utils/notifaction'

export default {


  //根据团长获取商品列表
  getGoodsBytuan(currPageNo, tuanId, isRefresh, top, that) {

    action.getGoodsListByTuan(currPageNo, config.pageSize, tuanId).then((res) => {
      if (res !== undefined && res.errorCode !== undefined) {
        if (res.errorCode === 0 && res.data) {
          //无数据
          if (res.data.success) {
            this.emptyDeal(that, false, true);
          } else {
            if (typeof res.data.datas !== 'undefined') {
              this.emptyDeal(that, false, top ? false : true);
            } else {
              //有数据
              const list = res.data.datas.map((item) => {

                return this.dealData(item);
              });


              if (top) {
                if (that.data.goodsList.length) {
                  this.resetData(that);
                }
                that.setData({ loadStatus: 1 });

                that.$spliceData({
                  'goodsList': [1, 0, ...list]
                });
              } else {
                //分页数据合并
                this.$spliceData({
                  'goodsList': [that.data.goodsList.length, 0, ...list]
                });
              }

              //处理分页
              if (that.data.pageSize === res.data.datas.length) {
                that.setData({
                  curPageNum: that.data.curPageNum + 1,
                  isNoMoreData: false,
                  loadMoreStatus: 'NONE'
                });
              } else {
                this.emptyDeal(that, false, true);
              }
            }
          }
        } else if (res.errorCode !== 0) {
          this.emptyDeal(that, true, false);
        }

        //停止顶部刷新和进度条
        if (top) {
          if (isRefresh) {
            setTimeout(() => {
              wx.stopPullDownRefresh({
                success: (res) => { },
              })
            }, 1000);
          }

          that.data.isRefreshing = false;


        } else {
          that.data.isLoading = false;
        }

        //因此进度条
        notifaction.hideLoader();
      }
    });
  },

  resetData(that) {
    that.setData({
      goodsList: []
    });
  },


  emptyDeal(that, isError, isComplate) {
    if (!isComplate) {
      this.resetData(that)
    }

    let goodsList = that.data.goodsList.length;
    if (!isError && !goodsList) {
      that.setData({
        loadStatus: -1,
        emptyConfig: {
          emptyIcon: '/image/common/cgy_logo.jpg',
          emptyTitle: '暂无数据',
          emptyDes: '啊哦~该团长还没开始带货,看看其他团长吧',
          emptyButtonText: '',
          tapAction: ''
        },
      });
    } else if (isError && !goodsList) {
      that.setData({
        loadStatus: -1,
        emptyConfig: {
          emptyIcon: '/image/common/cgy_logo.jpg',
          emptyTitle: '',
          emptyDes: '啊哦~数据去火星溜达去拉,请稍后再试试吧',
          emptyButtonText: '重试',
          tapAction: 'onDataLoad'
        },
      });
    }

    //分页状态
    if (!goodsList) {
      that.setData({
        loadMoreStatus: 'NONE'
      });
    } else {
      that.setData({
        loadMoreStatus: 'COMPLETED'
      });
    }

    //已到底
    that.data.isNoMoreData = true;
  }

}