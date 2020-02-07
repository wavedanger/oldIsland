import {
  KeywordModel
} from 'keyword.js'
import {
  bookModel
} from '../../models/book.js'
let keyword_model = new KeywordModel()
let book_model = new bookModel()
import {
  paginationBev
} from '../behaviors/pagination.js'
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: function(n) {
        this.loadMore()
      }
    }
  },
  // observers:{
  //   'more':function(more){
  // this.loadMore()
  //   }
  // },

  /**
   * 组件的初始数据
   */
  data: {
    historyKeys: [],
    hotKeys: [],
    searching: false,
    q: '',
    loadingCenter:false,
    // loading: false,
    // hasmore: false,
    // total: null,
    // dataArray: []
  },

  attached: function() {
    this.setData({
      historyKeys: keyword_model.getHistoryTag()
    })
    keyword_model.getHotTag()
      .then((res) =>
        this.setData({
          hotKeys: res.hot
        })
      )
  },

  /**
   * 组件的方法列表
   * 
   */
  methods: {
    onCancel: function(event) {
      this.triggerEvent('cancel', {}, {})
    },

    onDelete: function(event) {
      this.initPagination()
      this.setData({
        q: '',
        searching: false
      })
    },

    onConfirm: function(event) {
      this.initPagination()
      this._showLoadingCenter()
      let search = event.detail.value || event.detail.text
      this.setData({
        q: search,
        searching: true
      })
      book_model.searchBook({
        q: search
      }).then((res) => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        keyword_model.addToHistory(search)
        this.setData({
          historyKeys: keyword_model.getHistoryTag()
        })
        this._hideLoadingCenter()
      })
    },
    loadMore: function() {
      if (!this.data.q) {
        return
      }
      // 保证每次只请求一次，判断请求是否完成
      if (this.isLocked()) {
        return
      }
      if(this.hasMore()){
       this.locked()
        book_model.searchBook({
          q: this.data.q,
          start: this.getCurrentStart()
        }).then((res) => {
          this.setMoreData(res.books)
         this.unlocked()
        },()=>{
          this.unlocked()
        })
      }
    },
    _showLoadingCenter(){
      this.setData({
        loadingCenter:true
      })
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },
    // loadMore: function() {
    //   if (this.data.dataArray.length == 0) {
    //     return
    //   }
    //   if (!this.data.hasmore) {
    //     return
    //   }
    //   if (this.data.loading) {
    //     return
    //   }
    //   this.setData({
    //     loading: true
    //   })
    //   let length = this.data.dataArray.length
    //   let total = this.data.total
    //   if (length >= total) {
    //     // console.log("nomore")
    //     this.setData({
    //       hasmore: false,
    //       loading: false
    //     })
    //   } else {
    //     book_model.searchBook({
    //       q: this.data.q,
    //       start: length
    //     }).then((res) => {
    //       // console.log("more")
    //       let moreDataArray = this.data.dataArray.concat(res.books)
    //       this.setData({
    //         dataArray: moreDataArray,
    //         hasmore: true,
    //         loading: false
    //       })
    //     })
    //   }
    // }
  }
})