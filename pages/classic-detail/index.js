import {
  classicModel
} from "../../models/classic.js"
import {
  likeModel
} from "../../models/like.js"
let classic_model = new classicModel()
let like_model = new likeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    lastest: true,
    first: false,
    likeStatus: false,
    likeCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cid = options.cid
    let type = options.type
    classic_model.getById(cid, type, (data) => {
      this._getClassicLikeStatus(data.id, data.type)
      this.setData({
        classicData: data
      })
    })
  },
  onLike: function (event) {
    let behavior = event.detail.behavior
    let artId = this.data.classicData.id
    let category = this.data.classicData.type
    like_model.like(behavior, artId, category)
  },
  // onNext: function (event) {
  //   this._updateClassic("next")
  // },
  // onPrev: function (event) {
  //   this._updateClassic("previous")
  // },
  // _updateClassic(previousOrNext) {
  //   let currentIndex = this.data.classicData.index
  //   classic_model.getClassic(currentIndex, previousOrNext, (res) => {
  //     this.setData({
  //       classicData: res,
  //       first: classic_model.isFirst(res.index),
  //       lastest: classic_model.isLastest(res.index)
  //     })
  //     this._getClassicLikeStatus(res.id, res.type)
  //   })
  // },
  _getClassicLikeStatus(id, type) {
    like_model.getClassicLikeStatus(id, type, (res) => {
      this.setData({
        "likeStatus": res.like_status,
        "likeCount": res.fav_nums
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})