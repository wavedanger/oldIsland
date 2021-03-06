import { HTTP } from "../utils/util.js"
class likeModel extends HTTP{
  like(behavior,artId,category){
    this.request({
      url: behavior == "like" ? "/like" :"/like/cancel",
      method:"POST",
      data:{
        "art_id": artId,
        "type": category
      }
    })
  }
  getClassicLikeStatus(artId,category,callback){
    this.request({
      url: `/classic/${category}/${artId}/favor`,
      method:"GET",
      success:(res)=>{
        callback(res)
      }
    })
  }
}
export { likeModel}