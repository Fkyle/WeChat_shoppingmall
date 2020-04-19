// components/f-goods-item/f-goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodItem:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    iid:null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(e){
      // console.log(e)
      this.setData({
        iid:e.currentTarget.dataset.iid
      })
      // console.log('/pages/detail/detail?iid='+this.data.iid)
      wx.navigateTo({
        url: '/pages/detail/detail?iid='+this.data.iid,
      })
    }
  }
})
