// components/nav/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String
    },
    lastest:{
      type:Boolean
    },
    first:{
      type:Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftImgSrc:"images/triangle@left.png",
    rightImgSrc: "images/triangle@right.png",
    disLeftImgSrc: "images/triangle.dis@left.png",
    disRightImgSrc: "images/triangle.dis@right.png",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft:function(event){
      if(!this.properties.lastest){
        this.triggerEvent("left", {}, {})
      }
    },
    onRight:function(event){
      if(!this.properties.first){
        this.triggerEvent("right", {}, {})
      }
    }
  }
})
