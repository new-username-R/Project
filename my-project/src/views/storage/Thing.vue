<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="9">
          <!-- 搜索框 -->
          <el-input
            placeholder="请输入内容"
            class="searchinput"
            size="mudium"
            v-model="inputContent"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              class="searchbtn"
              @click="searchput"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <div class="downTree">
        <tree-table
          class="treeTable"
          style="font-size: 15px"
          :data="
            tables[0].slice(
              (currentPage - 1) * pagesize,
              currentPage * pagesize
            )
          "
          :columns="columns"
          :selection-type="false"
          :expand-type="false"
          border
          :show-row-hover="false"
          height="400"
        >
          <!-- 是否有效 -->
          <template slot="isok" slot-scope="scope">
            <i
              class="el-icon-success"
              v-if="scope.row.cat_deleted === false"
              style="color: green"
            ></i>
            <i class="el-icon-error" v-else style="color: red"></i>
          </template>
          <!-- 排序 -->
          <template slot="order" slot-scope="scope">
            <el-tag size="medium" v-if="scope.row.cat_level === 0">一级</el-tag>
            <el-tag
              size="medium"
              type="success"
              v-else-if="scope.row.cat_level === 1"
              >二级</el-tag
            >
            <el-tag size="medium" type="warning" v-else>三级</el-tag>
          </template>
        </tree-table>
      </div>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @:current-change="handleCurrentChange"
        :page-sizes="[1, 3, 5, 7]"
        :current-page.sync="currentPage"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="catelist.length > 0 ? catelist.length : null"
        background
        text-align="center"
      >
      </el-pagination>
    </el-card>
  </div>
</template> 
<script>
export default {
  name: "Thing",
  data() {
    return {
      currentPage: "", //默认初始页
      pagesize: 7, //每页默认显示的数据
      searchContent: "",
      inputContent: "",
      // 1：表格里面的内容
      //为tree-table指定列的定义---colums对象的定义为table指定列的定义
      columns: [
        { label: "分类名称", prop: "cat_name" },
        {
          label: "是否有效",
          // 表示将当前列定义为模板列
          type: "template",
          // 表示当前这一列使用的模板名称
          template: "isok",
        },
        { label: "排序", type: "template", template: "order" },
      ],
      // 表格里面的响应数据
      catelist: [
        {
          cat_name: "居家用品",
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_name: "厨具",
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_name: "烹饪锅具",
                  cat_pid: 2,
                  cat_level: 3,
                  cat_deleted: false,
                },
                {
                  cat_name: "水具酒具",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "砂锅",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "厨房置物架",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "茶具",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
              ],
            },
          ],
        },
        {
          cat_name: "电脑办公",
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_name: "电脑整体",
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_name: "游戏本",
                  cat_pid: 2,
                  cat_level: 3,
                  cat_deleted: false,
                },
                {
                  cat_name: "笔记本",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "平板电脑",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "台式机",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "一体机",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
              ],
            },
          ],
        },
        {
          cat_name: "医药保健",
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_name: "中西药品",
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_name: "感冒咳嗽",
                  cat_pid: 2,
                  cat_level: 3,
                  cat_deleted: false,
                },
                {
                  cat_name: "补气养血",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "止痛镇痛",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "眼科用药",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "口腔用药",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
              ],
            },
          ],
        },
        {
          cat_name: "图书",
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_name: "经管励志",
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_name: "管理",
                  cat_pid: 2,
                  cat_level: 3,
                  cat_deleted: false,
                },
                {
                  cat_name: "金融",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "经济",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "市场营销",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "投资",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
              ],
            },
          ],
        },
        {
          cat_name: "服饰",
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_name: "女装",
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_name: "当季热卖",
                  cat_pid: 2,
                  cat_level: 3,
                  cat_deleted: false,
                },
                {
                  cat_name: "新品推荐",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "时尚套装",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "卫衣",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "半身裙",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
              ],
            },
          ],
        },
        {
          cat_name: "美妆",
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_name: "面部护肤",
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_name: "礼盒",
                  cat_pid: 2,
                  cat_level: 3,
                  cat_deleted: false,
                },
                {
                  cat_name: "美白",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "防晒",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "洁面",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "眼霜",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
              ],
            },
          ],
        },
        {
          cat_name: "母婴",
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_name: "童车童床",
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_name: "安全座椅",
                  cat_pid: 2,
                  cat_level: 3,
                  cat_deleted: false,
                },
                {
                  cat_name: "婴儿推车",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "婴儿床",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "摇椅",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "餐椅",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
              ],
            },
          ],
        },
        {
          cat_name: "个护清洁",
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_name: "身体护理",
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_name: "花露水",
                  cat_pid: 2,
                  cat_level: 3,
                  cat_deleted: false,
                },
                {
                  cat_name: "沐浴露",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "香皂",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "洗手液",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "护发素",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
              ],
            },
          ],
        },
        {
          cat_name: "生活",
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_name: "演出票务",
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_name: "电影票",
                  cat_pid: 2,
                  cat_level: 3,
                  cat_deleted: false,
                },
                {
                  cat_name: "音乐会",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "话剧歌剧",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "体育赛事",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "舞蹈芭蕾",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
              ],
            },
          ],
        },
        {
          cat_name: "户外",
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_name: "骑行运动",
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_name: "公路车",
                  cat_pid: 2,
                  cat_level: 3,
                  cat_deleted: false,
                },
                {
                  cat_name: "山地车",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "折叠车",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "骑行服",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "穿戴装备",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
              ],
            },
          ],
        },
        {
          cat_name: "个护清洁",
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_name: "身体护理",
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_name: "花露水",
                  cat_pid: 2,
                  cat_level: 3,
                  cat_deleted: false,
                },
                {
                  cat_name: "沐浴露",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "香皂",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "洗手液",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_name: "护发素",
                  cat_pid: 1,
                  cat_level: 2,
                  cat_deleted: false,
                },
              ],
            },
          ],
        },
      ],
      //2：点击按钮，展示添加分类的对话框
      addCateDialogVisible: false, //控制添加分类对话框的显示
      // 控制添加分类对话框的显示与隐藏

      //3： 添加分类的表单数据对象
      addcateform: {
        // 将要添加的分类的名称
        cat_name: "",
        // 父级分类的id
        cat_pid: 0,
        // 分类的等级，默认添加为一级等级
        cat_level: 0,
        // 是否有效
        cat_deleted: false,
      },
      // 添加分类表单的验证规则对象
      addcateformrules: {
        cat_name: [
          {
            required: true,
            message: "请选分类名称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  //5：搜索
  computed: {
    tables() {
      const search = this.searchContent;
      //当将input框清空时，使列表自动展示搜索前的完整数据，并返回至首页，防止叠加搜索
      if (this.inputContent == "") {
        this.searchContent = "";
        this.currentPage = 1;
        return [this.catelist, (this.count = this.catelist.length)];
      }
      if (search !== "") {
        return [
          this.catelist.filter((dataNews) => {
            return Object.keys(dataNews).some((key) => {
              return String(dataNews[key]).toLowerCase().indexOf(search) > -1;
            });
          }),
          (this.count = this.catelist.filter((dataNews) => {
            return Object.keys(dataNews).some((key) => {
              return String(dataNews[key]).toLowerCase().indexOf(search) > -1;
            });
          }).length),
        ];
      }
      return [this.catelist, (this.count = this.catelist.length)];
    },
  },
  // 4：分页功能
  // 切换页码
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
    },
    // 改变每页容纳的数量
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    // 搜索
    searchput() {
      this.searchContent = this.inputContent;
    },
  },
};
</script>
<style scoped>
.treeTable {
  margin-top: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 12px 0 RGBA(0, 0, 0, 0.1);
}
.downTree {
  height: 400px;
  display: block;
  overflow-y: scroll;
  font-size: 20px;
}
</style>
