import {
  HTTP
} from "../../utils/util-p.js"
class KeywordModel extends HTTP {
  key = "historyTag"
  maxLength = 10
  getHotTag() {
    return this.request({
      url:"/book/hot_keyword"
    })
  }
  getHistoryTag() {
    let keywords = wx.getStorageSync(this.key)
    if (!keywords) {
      return []
    }
    return keywords
  }
  addToHistory(keyword) {
    if (!keyword) {
      return
    }
    let keywords = this.getHistoryTag()
    let index = keywords.indexOf(keyword)
    let length = keywords.length
    if (index == -1) {
      if (length >= this.maxLength) {
        keywords.pop()
      }
      keywords.unshift(keyword)
    } else {
      keywords.splice(index, 1)
      keywords.unshift(keyword)
    }
    wx.setStorageSync(this.key, keywords)
  }
}

export {
  KeywordModel
}