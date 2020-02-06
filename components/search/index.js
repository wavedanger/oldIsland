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
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    historyKeys: [],
    hotKeys: [],
    searching: false,
    dataArray: [],
    q: '',
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
        console.log(res.books)
        this.setData({
          dataArray: res.books
        })
        keyword_model.addToHistory(search)
      })
    }


  }
})