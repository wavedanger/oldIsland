import {
  config
} from "../config.js"
const tips = {
  1: "出现了某些错误",
  1005: "不正确的开发者key"
}
class HTTP {
  request(params) {
    if (!params.method) {
      params.method = "GET"
    }
    wx.request({
      url: config.base_url+params.url,
      method:params.method,
      data:params.data,
      header:{
        "Content-Type":"application/json",
        "appkey":config.appkey
      },
      success:(res)=>{
        let code=res.statusCode.toString()
        if(code.startsWith("2")){
          params.success&&params.success(res.data)
        }else{
          let error_code=res.data.error_code
          this._error_code(error_code)
        }
      },
      fail:(err)=>{
        this._error_code("1")
      }
    })
  }
  _error_code(error_code) {
    if (!error_code) {
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}
export {
  HTTP
}