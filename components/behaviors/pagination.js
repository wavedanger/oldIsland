let paginationBev = Behavior({
  properties: {

  },
  data: {
    dataArray: [],
    total:null,
    noResult:false
  },

  methods: {
    setMoreData: function (dataArray) {
      let temp = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: temp
      })
    },
    setTotal:function(total){
      if(total==0){
        this.setData({
          noResult:true
        })
      }
      this.setData({
        total:total
      })
    },
    hasMore: function () {
     if(this.data.dataArray.length>=this.data.total){
       return false
     }else{
       return true
     }
    },

    getCurrentStart: function () {
      return this.data.dataArray.length
    },

    initPagination: function () {
      this.setData({
        dataArray: [],
        total:null,
        noResult:false
      })
    }
  }
})


export {
  paginationBev
}