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
      }
    })
  }
  getClassic(index, PreviousOrNext, callback) {
    this.request({
      url: "/classic/" + index + "/" + PreviousOrNext,
      success: (res) => {
        callback(res)
      }
    })
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
}
export {
  classicModel
}