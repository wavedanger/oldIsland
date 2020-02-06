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
  postComment(bid,content){
    return this.request({
      url:'/book/add/short_comment',
      method:"POST",
      data:{
        book_id:bid,
        content:content
      }
    })
  }
}
export{
  bookModel
}