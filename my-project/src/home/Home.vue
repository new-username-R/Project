<template>
  <div>
    <el-card style=" width: 100%; height: calc(85vh);overflow-y: scroll;">
      <el-row gutter="20" type="absolute"  >

        <!-- 第一层 -->
        <!-- 个人 -->
        <el-col :span="4" style="width: 420px; height: 280px; box-shadow: 0 0 8px #c0c0c0">
          <div class="t-card">
            <img src="https://img1.baidu.com/it/u=1416242903,2142094933&fm=253&fmt=auto&app=138&f=JPEG?w=595&h=381" alt />
            <div class="t-cardb">
              <p class="name">{{ save.name }}</p>
              <p class="name1">{{ type }}</p>
            </div>
          </div>
          <div class="b-card" style="text-indent: 2em;">
            <p>
              登录时间：
              <span> {{ nowYear }}.{{ nowMouth }}.{{ nowDate }} </span>
            </p>
            <p>
              登录地点：
              <span>洛阳</span>
            </p>
          </div>
        </el-col>

        <!-- 产品分类动态环状图 -->
        <el-col :span="4" class="div2" id="div2" style="width: 240px; height: 280px">
          <div>
            <h1 style="
              font-size: 18px;
              font-weight: bold;
              text-align: center;
              margin-top: 10px;
            ">
              各地每日销量
            </h1>
            <dv-active-ring-chart :config="config" style="width:200px;height:200px;margin: 35px auto;fo" />
          </div>
        </el-col>

        <!-- 产品分类折线图 -->
        <el-col :span="4" class="div2" id="main" style="width: 590px; height: 280px;" >
        </el-col>

        <!-- 第二层 -->
        <!-- 销量柱状图 -->
        <el-col :span="4" id="zhu" style="
          width: 420px;
          height: 280px;
          box-shadow: 0 0 8px #c0c0c0;
          margin-top: 20px;
        ">
        </el-col>

        <!-- 库存饼图 -->
        <el-col :span="4" id="pie" style="
          width: 390px;
          height: 280px;
          box-shadow: 0 0 8px #c0c0c0;
          margin-top: 20px;
          margin-left: 20px;
        ">
        </el-col>

        <!-- 胶囊图 -->
        <el-col :span="4" style="
          width: 440px;
          height: 280px;
          box-shadow: 0 0 8px #c0c0c0;
          margin-top: 20px;
          margin-left: 20px;
        ">
          <h1 style="
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            margin-top: 10px;
          ">
            各地订单详情
          </h1>
          <dv-capsule-chart :config="capsule" style="width: 400px; height: 220px; color: black" />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {
      config: {
        radius: "80%",
        activeRadius: "85%",
        data: [
          {
            name: "周口",
            value: 55,
          },
          {
            name: "南阳",
            value: 120,
          },
          {
            name: "西峡",
            value: 78,
          },
          {
            name: "驻马店",
            value: 66,
          },
          {
            name: "新乡",
            value: 80,
          },
        ],
        digitalFlopStyle: {
          fontSize: 30,
          fill: "black",
        },
        showOriginValue: true,
      },
      capsule: {
        data: [
          {
            name: "深圳",
            value: 1670,
          },
          {
            name: "杭州",
            value: 1230,
          },
          {
            name: "南阳",
            value: 1180,
          },
          {
            name: "洛阳",
            value: 1002,
          },
          {
            name: "郑州",
            value: 999,
          },
        ],
        colors: ["#e062ae", "#fb7293", "#e690d1", "#32c5e9", "#96bfff"],
        unit: "件",
        showValue: true,
      },
      nowYear: "",
      nowMouth: "",
      nowDate: "",
      nowWeek: "",
    };
  },
  computed: {
    ...mapState(["save"]),
    type() {
      return this.$store.state.save.adio == 1 ? "超级管理员" : "基础管理员";
    },
  },
  methods: {
    line() {
      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        title: {
          text: "各产品销量",
          left: "left",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["电脑", "手机", "母婴", "家具", "服装", "食品"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "电脑",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "手机",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "母婴",
            type: "line",
            stack: "Total",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "家具",
            type: "line",
            stack: "Total",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "服装",
            type: "line",
            stack: "Total",
            data: [923, 664, 621, 523, 243, 587, 754],
          },
          {
            name: "食品",
            type: "line",
            stack: "Total",
            data: [999, 544, 656, 123, 543, 987, 654],
          },
        ],
      };
      option && myChart.setOption(option);
    },
    zhu() {
      var chartDom = document.getElementById("zhu");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        title: {
          text: "今日营业额",
          left: "center",
        },
        tooltip: {},
        xAxis: {
          // type: "category",
          data: ["电脑", "手机", "母婴", "家具", "服装", "食品"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "今日营业额",
            data: [3202, 4001, 3523, 5833, 6170, 4001],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
    pie() {
      var chartDom = document.getElementById("pie");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        title: {
          text: "库存",
          left: "left",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: { show: true },
          },
        },
        // series: [
        //   {
        //     name: "库存剩余量",
        //     type: "pie",
        //     radius: [50, 130],
        //     center: ["50%", "50%"],
        //     roseType: "radius",
        //     itemStyle: {
        //       borderRadius: 5,
        //     },
        //     label: {
        //       show: false,
        //     },
        //     data: [
        //       { value: 80, name: "电脑" },
        //       { value: 70, name: "手机" },
        //       { value: 66, name: "母婴" },
        //       { value: 54, name: "家具" },
        //       { value: 33, name: "服装" },
        //       { value: 20, name: "食品" },
        //     ],
        //     emphasis: {
        //       itemStyle: {
        //         shadowBlur: 10,
        //         shadowOffsetX: 0,
        //         shadowColor: "rgba(0, 0, 0, 0.5)",
        //       },
        //     },
        //   },
        // ],
        series: [
          {
            name: '库存剩余量',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: true,
              fontSize: 9,
              formatter(param) {
                // correct the percentage
                return param.name + ' (' + param.percent * 2 + '%)';
              }
            },
            emphasis: {
              label: {
                show: true,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true,
            },
            data: [
              { value: 80, name: "电脑" },
              { value: 70, name: "手机" },
              { value: 66, name: "母婴" },
              { value: 54, name: "家具" },
              { value: 33, name: "服装" },
              { value: 20, name: "食品" },
            ]
          }
        ]
      };

      option && myChart.setOption(option);
    },

    //获取系统时间
    getdate() {
      const year = new Date().getFullYear();
      const mounth =
        new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1;
      const date =
        new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate();
      const week = new Date().getDay();
      if (week === 1) {
        this.nowWeek = "星期一";
      } else if (week === 2) {
        this.nowWeek = "星期二";
      } else if (week === 3) {
        this.nowWeek = "星期三";
      } else if (week === 4) {
        this.nowWeek = "星期四";
      } else if (week === 5) {
        this.nowWeek = "星期五";
      } else if (week === 6) {
        this.nowWeek = "星期六";
      } else if (week === 27) {
        this.nowWeek = "星期日";
      }
      this.nowYear = year;
      this.nowMouth = mounth;
      this.nowDate = date;
    },
  },
  mounted() {
    this.line();
    this.zhu();
    this.pie();
    this.getdate();
  },
};
</script>

<style scoped lang="less" scoped>
dv-active-ring-chart {
  color: #666;
}

#div2 {
  background-color: #c0c0c0;
}

.div2 {
  margin-left: 20px;
  width: 420px;
  height: 300px;
  box-shadow: 0 0 8px #c0c0c0;
  // background-color: #c0c0c0;
}

.t-card {
  display: flex;
  align-items: center;

  img {
    margin-top: 15px;
    margin-left: 15px;
    margin-right: 20px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .t-cardb {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .name1 {
      color: #999;
    }
  }
}

.b-card {
  margin-top: 10px;
  border-top: 1px solid #999;

  p {
    padding-top: 10px;
    line-height: 28px;
    font-size: 16px;
    color: #999;

    span {
      color: #666;
      margin-left: 70px;
    }
  }
}</style>
