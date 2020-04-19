// pages/home/home.js
import { getMultiData , getGoodsData} from '../../service/home.js'
const types = ['pop','new','sell']
const TOP_DISTANCE = 570
Page({
  data: {
    banners:[],
    recommends:[],
    titles:['新款','流行','精选'],
    goods:{
      'pop':{page:0,list:[]},
      'new':{page:0,list:[]},
      'sell':{page:0,list:[]}
    },
    currentType:'pop',
    showBackTop:false,
    isFixed:false,
    tabScrollTop:0
  },
  onLoad: function (options) {
    // 请求轮播图以及推荐的数据
    this._getMultiData()
    this._getGoodsData('pop')
    this._getGoodsData('sell')
    this._getGoodsData('new')
  },
  handleTabClick(event){
    // console.log(event)
    const index = event.detail.index
    const type = types[index]
    this.setData({
      // 把当前类型根据索引转化
      currentType:type
    })
  },
  // 下拉加载更多
  onReachBottom(){
    // console.log('页面滚动到底部')
    this._getGoodsData(this.data.currentType)
  },
  // 监听滚到什么位置，显示回到顶部
  onPageScroll(options){
    // 修改back-top属性
    const backFlag = options.scrollTop >= TOP_DISTANCE
    if(backFlag != this.data.showBackTop){
      this.setData({
        showBackTop:backFlag
      })
    }
    // 修改tab-control属性
    const topFlag = options.scrollTop >= this.data.tabScrollTop
    if(topFlag != this.data.isFixed){
      this.setData({
        isFixed:topFlag
      })
    }
  },
  handleImageLoad(){
    // console.log('图片加载完成')
    wx.createSelectorQuery().select("#tab-control").boundingClientRect(rect=>{
      // console.log(rect)
      this.data.tabScrollTop=rect.top
    }).exec()
  },
  // -------------------网络请求相关的函数---------------
  _getMultiData(){
    getMultiData().then(res=>{
      // console.log(res)
      // 存储所需要的数据
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;
      // 将数据存储到data里面中
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getGoodsData(type){
    // 1.获取页码,每执行一次+1
    const page = this.data.goods[type].page + 1
    // 2.发送网络请求
    getGoodsData(type,page).then(res =>{
      // console.log(res)
      // 2.1提取所需的数据
      const list = res.data.data.list
      // 2.2将数据设置到list中对应type类型里
      const oldList = this.data.goods[type].list
      oldList.push(...list)
      // 2.3将数据设置到data中的goods里对应type中
      const typeKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`
      this.setData({
        //必须加个【】来调用typeKey这个变量
        [typeKey]:oldList,
        [pageKey]:page
      })
    })
  }
})
