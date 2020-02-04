import {
  HTTP
} from "../utils/util-p.js"
class bookModel extends HTTP{
  getHotList(){
    return this.request({
      url:"/book/hot_list"
    })
  }
  getFavorCount(){
    return this.request({
      url:"/book/favor/count"
    })
  }
  getDetail(bid){
    return this.request({
      url:`/book/${bid}/detail`
    })
  }
  getLikeStatus(bid){
    return this.request({
      url:`/book/${bid}/favor`
    })
  }
  getShortComments(bid){
    return this.request({
      url: `/book/${bid}/short_comment`
    })
  }
}
export{
  bookModel
}