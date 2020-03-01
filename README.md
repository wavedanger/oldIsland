### 慕课网-纯正商业级应用-微信小程序开发实战
<details>
<summary>数据来源</summary>
  
[api接口文档](http://bl.7yue.pro/dev/index.html)

appkey：见config.js文件
</details>
<details>
<summary>开发记录</summary>

#### 组件说明
* 喜欢
  * 三个参数，点赞数(number)，只读(boolean)，喜欢(boolean)
  * 方法，处理点赞数和喜欢，并回调喜欢给父组件
* image按钮
  * button中提供slot
  * 两个参数，镂空(boolean)，open-type(String)
  * 方法，回调open-type拿到的数据，如bindgetuserinfo
* 导航条
  * 三个参数，接受三个参数，文本(String)，最新(Boolean)，最旧(Boolean)
  * 两个方法，返回左操作和右操作
  * 根据是否最新或者最旧来决定是否返回操作以及按钮的显隐
* 流行页面之电影，句子，音乐
  * 三者都共有参数两个，图片(String)，内容(String)，可用Behavior封装，音乐多了个播放路径(String)，播放名称(String)
  * 内容上音乐除了图片，内容，多了个播放按钮
  * 使用wx.getBackgroundAudioManager构建一个mplayer
  * 传入播放路径和名称用mplayer.play()来播放mplayer.pasue()来暂停
  * 维护一个data属性playing来控制播放按钮样式
  * 通过mplayer.play和mplayer.src等于当前页面歌曲src显示播放按钮,mplayer.pause显示暂停按钮
  * 通过mplayer.onPlay/onStop/onPause/onEnd来监听系统操作
* 加载点
  * css动画，原理为两个重叠的圆，动画为放大缩小无限次，只不过同样的时间另一个圆加了延迟
* 标签
  * 一个slot，接受+数字，例+20
  * 一个参数，文本(String)
  * 方法，点击返回标签文本，以便后续搜索的使用
* 遮罩层
  * 弹出框的背景
  * fixed+top0+width100+height100+opacity0.6+zindex99+background#000
* 搜索
  * 搜索框
    * auto-focus="true"自动聚焦
    * bind:confirm监听确认
  * 搜索标签
    * 热门
      * 接口数据，for遍历输出
    * 历史
      * 缓存数据，为数组，for遍历输出
      * 每搜索一次，就将结果unshift
      * 固定长度，超过就将最后一项删除，再unshift
      * 相同项用indexof判断，有则splice删除，再unshift
  * 搜索结果
    * 确认时应隐藏搜索标签，初始化搜索结果数据，显示loading，event.detail.value拿到数据
    * 点击标签时，event.detail.text拿到数据
    * 将拿到的数据保存并做为参数调用搜索接口
    * 保存搜索列表，总数，将搜索项保存到历史记录
    * 通过总数判断有无数据，无则显示无结果，隐藏loading
    * 有则遍历列表输出，隐藏loading
  * 加载更多
    * 监听页面onReachBottom，注意不是组件
    * 每次触底传递一个随机字符串，可用Math.ceil(Math.random()*35)为索引拿到以26个字母加10个数字的数组的随机字符串
    * 组件中observer监听随机字符串变化，调用loadmore方法
    * 为保证快速触底只请求一次，防止出现重复数据，我们需要在请求前加锁，请求后解锁，调用loadmore前判断是否有锁，
    锁可以通过定义一个Boolean判断
    * 请求前还需判断当然数组长度是否超过total，有则不请求
    * 而请求的开始索引注意是之前的数组长度
    * 请求后再concat之前数组拿到新数组
</details>
<details>
<summary>注意</summary>

#### 1. 组件的data与properties
属性名不能相同，否则data会被覆盖，因为小程序会将组件的data和properties会合并为同个js对象
#### 2. 不要在组件properties的observer中修改自身属性
改变自身属性会循环调用造成内存泄露
#### 3. 操作按钮点击区域过小
一是设计时可对按钮四周进行留白，二是前端加宽高，padding，以及其它css样式
#### 4. components组件有共同的属性
注册一个 behavior，接受一个 Object 类型的参数，由于behavior为多继承，所以要注意属性的相互覆盖。
#### 5.合理使用缓存
* 大部分页面资源并不需要实时更新，可以使用缓存。
* 可用固定前缀+唯一标志作为缓存Key。
* 再次请求资源时，先判断是否有对应缓存，否则再请求接口。
* 像文章图片文字可以使用缓存，而点赞数这种实时更新的就要实情况而定。
* 最后，使用缓存会产生更多的业务逻辑，仁者见仁。
#### 6.components不支持hidden？
实际组件会将hidden当成组件属性处理，所以我们需要将hidden当成属性处理，一样可以支持。
#### 7.hidden与wx:if使用场景
* 频繁切换用hidden反之用wx:if，类似于vue的v-if和v-show
* hidden不会触发组件的detached，但wxif会
#### 8.业务逻辑写在组件还是页面中
视情况而定，项目型组件可写在组件中，通用型组件写在页面中
#### 9.外部修改组件样式的方式
* 属性，当作内联style，较为麻烦
* slot，外部可设置slot样式
* hack，需要知道组件内部标签
* externalClasses，将外部样式当做属性传递，但与组件内同位置样式优先级不确定，但我们可以用!important强制提升
#### 10.wxs
* 小程序内置js，语法类似于es5
* 可用做过滤器
#### 11.setData与直接赋值的区别
* 需要与wxml交互时用this.setData({key:value})，不需要时可用this.data.key=value
#### 12.open-data的border-radius无效
* 外部加view再用border-radius和overflow:hidden
</details>

<details>
<summary>靓仔靓女有事请联系我</summary>

<weibinhong2018@163.com>
</details>
