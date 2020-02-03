import {
  HTTP
} from "../utils/util.js"
class classicModel extends HTTP {
  getLatest(callback) {
    this.request({
      url: "/classic/latest",
      success: (res) => {
        // console.log(res)
        callback(res)
        this._setLastestIndex(res.index)
        wx.setStorageSync(this._getClassicKey(res.index), res)
      }
    })
  }
  getClassic(index, PreviousOrNext, callback) {
    let key = PreviousOrNext == 'next' ? this._getClassicKey(index + 1) : this._getClassicKey(index-1)
    let classic=wx.getStorageSync(key)
    if(!classic){
      this.request({
        url: "/classic/" + index + "/" + PreviousOrNext,
        success: (res) => {
          callback(res)
          wx.setStorageSync(key, res)
        }
      })
    }else{
      callback(classic)
    }
  }
  isLastest(index) {
    let lastestIndex = this._getLastestIndex()
    return index == lastestIndex ? true : false
  }
  isFirst(index) {
    return index == 1 ? true : false
  }
  _setLastestIndex(index) {
    wx.setStorageSync("lastestIndex", index)
  }
  _getLastestIndex() {
    let lastestIndex = wx.getStorageSync("lastestIndex")
    return lastestIndex
  }
  _getClassicKey(index){
    return "classic-"+index
  }
}
export {
  classicModel
}