### 慕课网-纯正商业级应用-微信小程序开发实战
<details>
<summary>数据来源</summary>
  
[api接口文档](http://bl.7yue.pro/dev/index.html)

appkey：见config.js文件
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
</details>

<details>
<summary>靓仔靓女有事请联系我</summary>

<weibinhong2018@163.com>
</details>
