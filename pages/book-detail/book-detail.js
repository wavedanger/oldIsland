import {
  bookModel
} from "../../models/book.js"
import {
  likeModel
} from "../../models/like.js"
const book_model = new bookModel()
const like_model = new likeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: {},
    comments: [],
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '',
    })
    const bid = options.bid
    const getDetail = book_model.getDetail(bid)
    const getLikeStatus = book_model.getLikeStatus(bid)
    const getShortComments = book_model.getShortComments(bid)
    Promise.all([getDetail, getLikeStatus, getShortComments])
    .then((res)=>{
      this.setData({
        book:res[0],
        likeCount: res[1].fav_nums,
        likeStatus: res[1].like_status,
        comments: res[2].comments
      })
      wx.hideLoading()
    })
    // book_model.getDetail(bid)
    //   .then((res) => {
    //     this.setData({
    //       book: res
    //     })
    //   })
    // book_model.getLikeStatus(bid)
    //   .then((res) => {
    //     this.setData({
    //       likeCount: res.fav_nums,
    //       likeStatus: res.like_status
    //     })
    //   })
    // book_model.getShortComments(bid)
    //   .then((res) => {
    //     this.setData({
    //       comments: res.comments
    //     })
    //   })
  },
  onLike: function(event) {
    let behavior = event.detail.behavior
    let bookId = this.data.book.id
    let category = 400
    like_model.like(behavior, bookId, category)
  },
  onFakePost: function() {
    this.setData({
      posting: true
    })
  },
  onCancel: function() {
    this.setData({
      posting: false
    })
  },
  onPost: function(event) {
    const comment = event.detail.text||event.detail.value
    console.log(comment)
    if (!comment) {
      return
    }
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }
    book_model.postComment(this.data.book.id, comment)
      .then(() => {
        wx.showToast({
          title: '+ 1',
          icon: "none"
        })
        this.data.comments.unshift({
          content: comment,
          nums: 1
        })
        this.setData({
          comments: this.data.comments,
        })
      })
    this.setData({
      posting: false
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