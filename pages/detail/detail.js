// pages/detail/detail.js
import { getDetailData, getDetailRecommend, Goods, Shop, GoodsParams} from '../../service/detail.js'
const TOP_DISTANCE = 640
Page({
  data: {
    iid:null,
    titles:['商品','参数','评论','推荐'],
    goods:{},
    shop:{},
    detailInfo:{},
    topImages:[],
    isShowBackTop:false,
    paramsInfo:{},
    commentInfo:{},
    recommendInfo:[]
  },
  onLoad:function(options){
    // console.log(options)
    this.data.iid = options.iid
    this._getDetailData(this.data.iid)
    this._getDetailRecommend()
  },
  onPageScroll(options){
    // console.log(options)
    const backFlag = options.scrollTop  >= TOP_DISTANCE;
    if(backFlag != this.data.isShowBackTop){
      this.setData({
        isShowBackTop:backFlag
      })
    }
  },

  
  // ------------------网络请求相关的函数----------------
  _getDetailData(iid){
    getDetailData(iid).then(res=>{
      // console.log(res)
      let data = res.data.result
      let topimgs = data.itemInfo.topImages
      let goodsDetail = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      let shopDetail = new Shop(data.shopInfo)
      let detailInfo = data.detailInfo
      let paramsInfo = new GoodsParams(data.itemParams.info,data.itemParams.rule)
      let commentInfo = data.rate
      this.setData({
        //获取商品轮播图图片
        topImages:topimgs,
        // 获取商品数据
        goods:goodsDetail,
        // 获取店铺数据
        shop:shopDetail,
        // 获取买家秀
        detailInfo:detailInfo,
        // 获取码数
        paramsInfo:paramsInfo,
        // 获取评论信息
        commentInfo:commentInfo
      })
    })
  },
  _getDetailRecommend(){
    getDetailRecommend().then(res=>{
      console.log(res)
      this.setData({
        recommendInfo: res.data.data.list
      })
    })
  }
})