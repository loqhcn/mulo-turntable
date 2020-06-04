## vue转盘抽奖活动插件


## demo1

<image alt="img" src="http://qiniu1.loqh.cn/mulo-turntable-1.png">

## demo2

<image alt="img" src="http://qiniu1.loqh.cn/mulo-turntable-2.png">




## 使用

```cmd

npm i mulo-imgcode -S

```

> 引入

```javascript
import MuloTurntable from 'mulo-turntalbe'
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

```

## 样式

目前基于rem 100%=18.75的标准;