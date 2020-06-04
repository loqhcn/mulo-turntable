## vue转盘抽奖活动插件


## demo1

<img alt="img" src="http://qiniu1.loqh.cn/mulo-turntable-1.png"/>

## demo2

<img alt="img" src="http://qiniu1.loqh.cn/mulo-turntable-2.png"/>




## 使用

```cmd

npm i mulo-imgcode -S

```

> 引入

```javascript
import MuloTurntable from 'mulo-turntalbe'
import 'mulo-turntalbe/lib/index.css'
Vue.use(MuloTurntable)
// or
vue.component(MuloTurntable.name,MuloTurntable);
```

```html

<template>
  <div>
    <!-- 
      
      rules {Array<Rule>} 规则
      bgc {ColorValue} 默认背景色, 如果使用比例分配大小, 存在超过180度的扇形时必须设置
      @begin {Function} 点击开始按钮时触发
      @end {Function} 动画播放完成后的回调
      rule-size-type { 'identical' | 'ratio' }  identical:平均大小, ratio:通过ratio值分配扇形大小
      turns {Int} 追加旋转圈数
      duration {Int} 动画持续时间,单位:秒
      
    -->
    <mulo-turntable
      ref="turntable"
      :rules="rules"
      bgc="green"
      @begin="begin"
      @end="end"
      rule-size-type="identical"
      :turns="10"
      :duration="5"
    ></mulo-turntable>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  created() {},
  mounted() {},
  data() {
    return {
      rules: [
        {
          title: "一等奖",
          img: "/xiaolian.png",
          ratio: 20,
          backgroundColor: "pink"
        },
        {
          title: "二等奖",
          img: "/xiaolian.png",
          ratio: 10,
          backgroundColor: "#ffc107"
        },
        {
          title: "三等奖",
          img: "/xiaolian.png",
          ratio: 70,
          backgroundColor: "green"
        }
      ]
    };
  },
  methods: {
    //点击开始按钮
    begin(data) {
      //中奖的选项的索引
      let awardIndex = 1;
      //开始
      data.begin && data.begin(awardIndex);
    },
    //动画播放完成
    end(data) {
      let { awardIndex } = data;

      alert(`恭喜获得${this.rules[awardIndex].title}`);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

```

## cdn使用示例
```html

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>测试</title>
</head>

<body>
    <div id="app">
        <mulo-turntable ref="turntable" :rules="rules" bgc="green" @begin="begin" @end="end" rule-size-type="identical"
            :turns="10" :duration="5"></mulo-turntable>
    </div>
    <link rel="stylesheet" href="https://unpkg.com/mulo-turntable/lib/index.css">
    <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.js"></script>
    <script src="https://unpkg.com/mulo-turntable"></script>

    <script>
        var vm = new Vue({
            el: '#app',
            data() {
                return {
                    rules: [
                        {
                            title: "一等奖",
                            img: "http://qiniu1.loqh.cn/xiaolian.png",
                            ratio: 20,
                            backgroundColor: "pink"
                        },
                        {
                            title: "二等奖",
                            img: "http://qiniu1.loqh.cn/xiaolian.png",
                            ratio: 10,
                            backgroundColor: "#ffc107"
                        },
                        {
                            title: "三等奖",
                            img: "http://qiniu1.loqh.cn/xiaolian.png",
                            ratio: 70,
                            backgroundColor: "green"
                        }
                    ]
                };
            },
            methods: {
                //点击开始按钮
                begin(data) {
                    //中奖的选项的索引
                    let awardIndex = 1;
                    //开始
                    data.begin && data.begin(awardIndex);
                },
                //动画播放完成
                end(data) {
                    let { awardIndex } = data;

                    alert(`恭喜获得${this.rules[awardIndex].title}`);
                }
            }
        })
    </script>
</body>

</html>

```

## 样式

目前基于rem 100%=18.75的标准;