// pages/detail/detail.js
import {getDetailData,Goods,Shop} from '../../service/detail.js'
Page({
  data: {
    iid:null,
    titles:['商品','参数','评论','推荐'],
    goods:{},
    shop:{},
    detailInfo:{},
    topImages:[]
  },
  onLoad:function(options){
    // console.log(options)
    this.data.iid = options.iid
    this._getDetailData(this.data.iid)
  },


  
  // ------------------网络请求相关的函数----------------
  _getDetailData(iid){
    getDetailData(iid).then(res=>{
      console.log(res)
      let data = res.data.result
      let topimgs = data.itemInfo.topImages
      let goodsDetail = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      let shopDetail = new Shop(data.shopInfo)
      let detailInfo = data.detailInfo
      this.setData({
        //获取商品轮播图图片
        topImages:topimgs,
        // 获取商品数据
        goods:goodsDetail,
        shop:shopDetail,
        detailInfo:detailInfo
      })
    })
  }
})