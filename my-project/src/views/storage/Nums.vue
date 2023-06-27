<template>
  <div>
    <el-row>
      <el-col
        id="shuju"
        style="width: 1290px; height: 300px; box-shadow: 0 0 8px #c0c0c0"
      >
      </el-col>
      <el-col
        id="main"
        style="width: 850px; height: 280px; margin-top: 30px"
        class="div1"
      >
      </el-col>
      <el-col
        class="div2"
        id="pie"
        style="width: 420px; height: 280px; margin-top: 30px"
      >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Nums",
  data() {
    return {};
  },
  methods: {
    line() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "各类产品销量",
        },
        tooltip: {},
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          data: ["电脑", "手机", "母婴", "家具", "服装", "食品"],
        },
        yAxis: {},
        series: [
          {
            name: "销售量",
            type: "bar",
            data: [50, 20, 36, 10, 10, 20],
          },
          /* {
            name: "销售额",
            type: "line",
            data: [53, 10, 16, 30, 50, 10],
          }, */
        ],
      });
    },
    pie() {
      var myPie = echarts.init(document.getElementById("pie"));
      var option;
      option = {
        title: {
          text: "产品销售比例",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}:{d}%",
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        legend: {
          orient: "系列名称",
          left: "left",
        },
        series: [
          {
            name: "产品销售比例",
            type: "pie",
            radius: "50%",
            data: [
              { value: 50, name: "电脑" },
              { value: 20, name: "手机" },
              { value: 36, name: "母婴" },
              { value: 10, name: "家具" },
              { value: 10, name: "服装" },
              { value: 20, name: "食品" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      option && myPie.setOption(option);
    },
    shuju() {
      var chartDom = document.getElementById("shuju");
      var myChart = echarts.init(chartDom);
      var option;
      setTimeout(function () {
        option = {
          title: {
            text: "每年产品销量",
            left: "left",
          },
          legend: {
            orient: "系列名称",
            left: "right",
          },
          tooltip: {
            trigger: "axis",
            showContent: false,
          },
          dataset: {
            source: [
              ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
              ["电脑", 56, 82, 88, 70, 53, 50],
              ["手机", 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
              ["母婴", 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
              ["家具", 25.2, 37.1, 41.2, 18, 33.9, 49.1],
              ["服装", 25.2, 37.1, 41.2, 18, 33.9, 49.1],
              ["食品", 25.2, 37.1, 41.2, 18, 33.9, 49.1],
            ],
          },
          xAxis: { type: "category" },
          yAxis: { gridIndex: 0 },
          grid: { top: "55%" },
          series: [
            {
              type: "bar",
              smooth: true,
              seriesLayoutBy: "row",
              emphasis: { focus: "series" },
            },
            {
              type: "bar",
              smooth: true,
              seriesLayoutBy: "row",
              emphasis: { focus: "series" },
            },
            {
              type: "bar",
              smooth: true,
              seriesLayoutBy: "row",
              emphasis: { focus: "series" },
            },
            {
              type: "bar",
              smooth: true,
              seriesLayoutBy: "row",
              emphasis: { focus: "series" },
            },
            {
              type: "bar",
              smooth: true,
              seriesLayoutBy: "row",
              emphasis: { focus: "series" },
            },
            {
              type: "bar",
              smooth: true,
              seriesLayoutBy: "row",
              emphasis: { focus: "series" },
            },
            {
              type: "pie",
              id: "pie",
              radius: "30%",
              center: ["50%", "25%"],
              emphasis: {
                focus: "self",
              },
              label: {
                formatter: "{b}: {@2012} ({d}%)",
              },
              encode: {
                itemName: "product",
                value: "2012",
                tooltip: "2012",
              },
            },
          ],
        };
        myChart.on("updateAxisPointer", function (event) {
          const xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            const dimension = xAxisInfo.value + 1;
            myChart.setOption({
              series: {
                id: "pie",
                label: {
                  formatter: "{b}: {@[" + dimension + "]} ({d}%)",
                },
                encode: {
                  value: dimension,
                  tooltip: dimension,
                },
              },
            });
          }
        });
        myChart.setOption(option);
      });
      option && myChart.setOption(option);
    },
  },
  mounted() {
    this.line();
    this.pie();
    this.shuju();
  },
};
</script>

<style scoped>
.div1 {
  box-shadow: 0 0 8px #c0c0c0;
  width: 100%;
}
.div2 {
  margin-left: 20px;
  width: 420px;
  height: 300px;
  box-shadow: 0 0 8px #c0c0c0;
}

/* .publicDiv {
  width: 200px;
  height: 150px;
  box-shadow: 0 0 8px #c0c0c0;
  margin: 20px 60px;
}
.el-icon-s-data{
  font-size: 23px;
  color: white;
  border-radius: 70%;
  background-color: skyblue;
  margin: 0 auto;
} */

/* .circle{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: skyblue;
} */
</style>