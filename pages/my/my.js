import {
  classicModel
} from "../../models/classic.js"
import {
  bookModel
} from "../../models/book.js"
const book_model = new bookModel()
const classic_model = new classicModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    userInfo: [],
    myBooksCount: 0,
    classics:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.onUserAuthorized()
    this.getMyBooksCount()
  },
  onGetUserInfo: function(event) {
    // console.log(event)
    let userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
    }
  },
  onUserAuthorized: function(event) {
    wx.getSetting({
      success: data => {
        if (data.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                userInfo: data.userInfo,
                hasUserInfo: true
              })
            }
          })
        }
      }
    })
  },
  onJumpToAbout: function() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  onStudy: function() {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },
  getMyBooksCount: function() {
    book_model.getFavorCount()
      .then(res => {
        this.setData({
          myBooksCount:res.count
        })
      })
  },
  getMyFavorClassics:function(){
    classic_model.getMyFavor(res=>{
      this.setData({
        classics:res
      })
    })
  },
  onPreviewTap: function (event){
    wx.navigateTo({
      url: '/pages/classic-detail/index?cid=' + event.detail.cid + '&type=' + event.detail.type
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getMyFavorClassics()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})