import {
  classicBeh
} from "../classic-beh.js"
let mPlayer = wx.getBackgroundAudioManager()
Component({
  behaviors: [classicBeh],
  properties: {
    src:{
      type:String
    },
    title:{
      type:String
    }
  },
  attached:function(event){
    this._recoverPlaying()
    this._monitorSwitch()
  },
  detached:function(event){
    // mPlayer.stop()
  },
  data: {
    playSrc:"images/player@playing.png",
    waitSrc:"images/player@waitting.png",
    playing:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function(){
      mPlayer.src=this.properties.src
      mPlayer.title = this.properties.title
      if(this.data.playing){
        this.setData({
          playing:false
        })
        mPlayer.pause()
      }else{
        this.setData({
          playing: true
        })
        mPlayer.play()
      }
    },
    _recoverPlaying:function(){
      if(mPlayer.paused){
        this.setData({
          playing:false
        })
        return
      }
      if (mPlayer.play && mPlayer.src==this.properties.src){
        this.setData({
          playing: true
        })
      }
    },
    _monitorSwitch:function(){
      mPlayer.onPlay(()=>{
        this._recoverPlaying()
      })
      mPlayer.onPause(() => {
        this._recoverPlaying()
      })
      mPlayer.onStop(() => {
        this._recoverPlaying()
      })
      mPlayer.onEnded(() => {
        this._recoverPlaying()
      })
    }
  }
})
