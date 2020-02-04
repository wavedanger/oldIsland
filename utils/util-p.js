import {
  config
} from "../config.js"
const tips = {
  1: "出现了某些错误",
  1005: "不正确的开发者key"
}
class HTTP {
  request({url,data={},method="GET"}){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: config.base_url + url,
        method: method,
        data: data,
        header: {
          "Content-Type": "application/json",
          "appkey": config.appkey
        },
        success: (res) => {
          let code = res.statusCode.toString()
          if (code.startsWith("2")) {
            resolve(res.data)
          } else {
            reject()
            let error_code = res.data.error_code
            this._error_code(error_code)
          }
        },
        fail: (err) => {
          reject()
          this._error_code("1")
        }
      })
    })
  }
  _error_code(error_code) {
    if (!error_code) {
      error_code = 1
    }
    let tip = tips[error_code]
    wx.showToast({
      title: tip ? tips[error_code]:tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}
export {
  HTTP
}