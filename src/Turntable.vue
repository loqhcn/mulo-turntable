<template>
  <div class="mulo-turntable">
    <div
      class="turntable-main"
      :style="{transform:'rotate('+rotateDeg+'deg)','background-color':bgc,transition:'all '+this.duration+'s'}"
    >
      <div class="turntable-award">
        <div
          class="turntable-award-item"
          v-for="(li,index) in rules"
          :key="index"
          :style="{transform:'rotate('+position(index)+'deg)',color:'red'}"
        >
          <div
            class="award-item-bgline"
            :class="{'award-item-bgline-big':itemLinePosition(index)>180,'award-item-bgline-180':itemLinePosition(index)==180}"
            :style="   {transform:'rotate('+itemLinePosition(index)/2+'deg) '  +( itemLinePosition(index)<180?'skewY('+(90-itemLinePosition(index) )+'deg)':'' ) +' scale(30)','background-color':(li.backgroundColor) }"
          ></div>
          <div class="award-info">
            <div class="award-title">{{li.title}}</div>
            <img class="award-img" :src="li.img" alt="奖品" srcset />
          </div>
        </div>
      </div>
      <div class="turntable-bg"></div>
    </div>
    <div @click="clickBegin" class="turntable-start-btn">
      <div class="turntable-start-btn-text">Go!</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "mulo-turntable",
  created() {},
  data() {
    return {
      //通过概率计算结果的概率字段
      probabilityField: "probability",
      //转盘旋转的度数 deg
      rotateDeg: 0,
      awardIndex: 0
    };
  },
  computed: {
    totalRatio() {
      let ratio = 0;
      this.rules.forEach((li, index) => {
        ratio += li.ratio;
      });
      return ratio;
    }
  },
  props: {
    ratioField: {
      type: String,
      default: "ratio"
    },
    //identical  一样 ratio分配显示大小
    ruleSizeType: {
      type: String,
      default: "ratio"
    },
    //基础背景色 用于存在超过180度的默认块
    bgc: {
      type: String,
      default: "green"
    },
    //显示背景色块
    showBg: {
      type: Boolean,
      default: true
    },
    //指针指向度数
    pointDeg: {
      type: Number,
      default: 90
    },
    duration: {
      type: Number,
      default: 5
    },
    rules: {
      type: Array,
      default: () => {
        return [
          {
            title: "一等奖",
            img: "/xiaolian.png",
            ratio: 5,
            backgroundColor: "blue"
          },
          {
            title: "二等奖",
            img: "/xiaolian.png",
            ratio: 15
          },
          {
            title: "三等奖",
            img: "/xiaolian.png",
            ratio: 80,
            backgroundColor: "pink"
          }
        ];
      }
    }
  },
  methods: {
    /**
     * 开始转盘
     *
     * @param {Int | Bool<false>} index 项目列表 rules的index
     *
     *
     */
    begin(index) {
      this.awardIndex = index;
      let rule = this.rules[index];
      let position = this.position(index);
      //转到方向和值是相反的
      position = 360 - position;

      let rotateDeg =
        this.rotateDeg + 360 * 10 + position + (360 - (this.rotateDeg % 360));
      //随机偏移角度
      let size = this.itemLinePosition(index);
      if ((size - 4) / 2 >= 2) {
        //偏离值
        let offsetValue = this.randomNum(0, (size - 4) / 2);
        let isNegativeNumber = this.randomNum(0, 1);
        if (isNegativeNumber == 1) {
          offsetValue = 0 - offsetValue;
        }
        rotateDeg += offsetValue;
      }
      this.rotateDeg = rotateDeg;
      setTimeout(() => {
        this.end();
      }, this.duration * 1000);
    },
    /**
     *
     */
    end() {
      this.$emit("end", {
        rotateDeg: this.rotateDeg,
        awardIndex: this.awardIndex
      });
    },
    /**
     * 开始按钮点击事件
     * 点击开始开始按钮,交给
     *
     */
    clickBegin() {
      this.$emit("begin", {
        begin: this.begin
      });
    },
    //生成从minNum到maxNum的随机数
    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
          break;
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
          break;
        default:
          return 0;
          break;
      }
    },
    /**
     * 计算偏移角度
     */
    position(index) {
      //平均大小
      if (this.ruleSizeType == "identical") {
        return this.getIdentical(index);
      }
      //按照比率值分配大小
      if (this.ruleSizeType == "ratio") {
        return this.lastRatio(index);
      }
    },
    /**
     * 前面的角度占用
     * 通过比率设置角度, 第一个总是平着摆放, 其他的蔓延
     *
     * @return {BeforeDeg} 前面的度数
     */
    lastRatio($index) {
      let deg = 0;
      for (let index = 0; index < $index; index++) {
        let ruleDeg =
          360 * (this.rules[index][this.ratioField] / this.totalRatio);

        deg += index == 0 ? ruleDeg : ruleDeg;
      }
      //当前原型所占度数
      return deg + this.itemLinePosition($index) / 2;
    },
    /**
     * 一个规则的偏移度
     *
     */
    getIdentical(index) {
      let num = this.rules.length;
      if (!num) {
        return 0 + this.itemLinePosition(index) / 2;
      }
      let one = 360 / num;
      return index * one + this.itemLinePosition(index) / 2;
    },
    /**
     * 元素占用的弧度
     *
     */
    itemLinePosition(index) {
      if (this.ruleSizeType == "ratio") {
        return 360 * (this.rules[index][this.ratioField] / this.totalRatio);
      }

      let num = this.rules.length;
      if (!num) {
        return 0;
      }
      let one = 360 / num;
      return one;
    }
  }
};
</script>

<style lang="scss">
.mulo-turntable {
  width: 16rem;
  height: 16rem;
  position: relative;
  //转盘主体
  .turntable-main {
    background-color: goldenrod;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    transition: all 1s;
    transition-timing-function: ease;
    > div {
      width: 100%;
      height: 100%;
      position: relative;
    }
    .turntable-award {
      // 奖品
      .turntable-award-item {
        width: 100%;
        height: 50%;
        text-align: center;
        left: 0;
        top: 0;
        position: absolute;
        transform-origin: center bottom;
        &:nth-last-child(2n) {
          .award-item-bgline {
            background: pink;
          }
        }
      }
      //标题
      .award-title {
        margin-top: 0.7rem;
        text-align: center;
        color: black;
      }
      .award-img {
        width: 1rem;
        height: 1rem;
        margin-top: 0.7rem;
      }
      .award-item-bgline {
        &.award-item-bgline-big {
          background-color: unset;
        }
        //取消skew让他变成长方形占位
        &.award-item-bgline-180 {
          margin-left: -100%;
        }

        top: 0;
        left: 0;
        margin-left: -50%;
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        background: green;
        content: "";
        transform-origin: right bottom;
      }
      .award-info {
        position: absolute;
        top: 0;
        left: 0%;
        width: 100%;
        text-align: center;
        top: 0;
      }
    }
  }
  $btnColor: yellow;
  .turntable-start-btn {
    border-radius: 50%;
    position: absolute;
    bottom: 50%;
    right: 50%;
    transform: translate(50%, 50%);
    background-color: $btnColor;
    text-align: center;
    width: 3rem;

    height: 3rem;
    &::before {
      content: "";
      position: absolute;
      top: -1rem;
      left: 50%;
      width: 0;
      height: 0;
      border-left: 1rem solid transparent;
      border-right: 1rem solid transparent;
      border-bottom: 3rem solid $btnColor;
      transform: translate(-50%);
    }
  }
  .turntable-start-btn-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>