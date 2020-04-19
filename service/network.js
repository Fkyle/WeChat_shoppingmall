import {baseURL} from './config.js'


export default function(options){
  // resolve\reject 都是回调函数
  return new Promise((resolve,reject)=>{
    wx.request({
      url: baseURL + options.url,
      method:options.method || 'get',
      data:options.data || {},
      success:resolve,
      fail:reject
    })
  })
}