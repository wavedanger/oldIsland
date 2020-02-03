<details>
<summary>数据来源</summary>
* [api接口文档](http://bl.7yue.pro/dev/index.html)
* appkey：见config.js文件
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
</details>

<details>
<summary>靓仔靓女有事请联系我</summary>

<weibinhong2018@163.com>
</details>