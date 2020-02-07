import {
  KeywordModel
} from 'keyword.js'
import {
  bookModel
} from '../../models/book.js'
let keyword_model = new KeywordModel()
let book_model = new bookModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: function(n) {
        this._load_more()
      }
    }
  },
  // observers:{
  //   'more':function(more){
  // this._load_more()
  //   }
  // },

  /**
   * 组件的初始数据
   */
  data: {
    historyKeys: [],
    hotKeys: [],
    searching: false,
    dataArray: [],
    q: '',
    loading: false,
    hasmore: true
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
      this.setData({
        q: '',
        searching: false
      })
    },

    onConfirm: function(event) {
      let search = event.detail.value || event.detail.text
      this.setData({
        q: search,
        searching: true
      })
      book_model.searchBook({
        q: search
      }).then((res) => {
        // console.log(res.books)
        this.setData({
          dataArray: res.books
        })
        keyword_model.addToHistory(search)
        this.setData({
          historyKeys: keyword_model.getHistoryTag()
        })
      })
    },
    _load_more: function() {
      if (this.data.dataArray.length == 0) {
        return
      }
      if (!this.data.hasmore) {
        return
      }
      if (this.data.loading) {
        return
      }
      this.setData({
        loading: true
      })
      let length = this.data.dataArray.length
      book_model.searchBook({
        q: this.data.q,
        start: length
      }).then((res) => {
        if (length >= res.total) {
          // console.log("nomore")
          this.setData({
            hasmore: false,
            loading: false
          })
        } else {
          // console.log("more")
          let moreDataArray = this.data.dataArray.concat(res.books)
          this.setData({
            dataArray: moreDataArray,
            hasmore: true,
            loading: false
          })
        }
      })
    }


  }
})