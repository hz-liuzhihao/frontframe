
Component({
  /**
   * 组件的属性列表,属性type必填否则报错
   */
  properties: {
    loadMoreStatus: {
      type: String,
      value: 'NONE'
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    loadingComplete: '已加载全部',
    loadMore: {
      show: false,
      noMore: false,
      loading: '加载中...',
      loadingComplete: '已加载全部',
    },
    state: {
      'NONE': {
        show: false,
        noMore: false,
        loading: ''
      },
      'LOADING': {
        show: true,
        noMore: false,
        loading: '加载中...'
      },
      'COMPLETE': {
        show: true,
        noMore: true,
        loading: '加载完成'
      }
    }

  },

  lifetimes: {

    attached() {
      this.changedState()
    },

    detached() {

    },

  }
  ,

  /**
   * 组件的方法列表
   */
  methods: {

    changedState() {
      let state = this.data.loadMoreStatus ? this.data.loadMoreStatus.toUpperCase() : ''
      this.setData({
        loadMore: this.data.state[state]
      });
    }

  }
})
