<template>
  <div>
    <el-card>
      <div>
        <el-row>
          <el-input
            v-model="inputContent"
            placeholder="请输入姓名、省、市、邮编等进行搜索"
            prefix-icon="el-icon-search"
            style="width: 360px; margin-right: 5px"
          ></el-input>
          <el-button type="primary" style="height: 40px" @click="searchput"
            >搜索</el-button
          >
        </el-row>
      </div>
      <!-- 表格 -->
      <el-table
        height="489"
        :data="
          tables[0].slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        border
        style="width: 100%; margin-top: 7px"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center', padding: '0' }"
        :row-style="{ height: '55px' }"
      >
        <el-table-column type="index" width="40"> </el-table-column>
        <!-- 这个为序号 -->
        <el-table-column label="时间" prop="date"> </el-table-column>
        <el-table-column label="姓名" prop="name"> </el-table-column>
        <el-table-column label="省份" prop="province"> </el-table-column>
        <el-table-column label="市区" prop="city"> </el-table-column>
        <el-table-column label="地址" prop="address"> </el-table-column>
        <el-table-column label="邮编" prop="zip"> </el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <span>操作</span>
          </template>
          <template align="right" slot-scope="scope">
            <el-button
              type="text"
              @click="
                (centerDialogVisible = true),
                  handleEdit(scope.$index, scope.row)
              "
              >详 情</el-button
            >
            <el-dialog
              title="订单详情"
              :visible.sync="centerDialogVisible"
              width="50%"
              center
              style="margin-left: 140px"
            >
              <span>
                <div>
                  <div style="line-height: 30px; color: black">
                    <div>时间:{{ time }}</div>
                    <div>姓名:{{ name }}</div>
                    <div>地址:{{ address }}</div>
                  </div>
                  <div style="color: black">
                    运输进度:
                    <div style="margin-left: 80px" class="block">
                      <el-timeline>
                        <el-timeline-item
                          v-for="(activity, index) in activities"
                          :key="index"
                          :icon="activity.icon"
                          :type="activity.type"
                          :color="activity.color"
                          :size="activity.size"
                          :timestamp="activity.timestamp"
                        >
                          {{ activity.content }}
                        </el-timeline-item>
                      </el-timeline>
                    </div>
                  </div>
                </div>
              </span>
              <span slot="footer" class="dialog-footer">
                <el-button
                  style="
                    border: 1px solid rgb(105, 99, 99);
                    width: 90px;
                    height: 40px;
                    text-align: center;
                  "
                  @click="centerDialogVisible = false"
                  >取 消</el-button
                >
                <el-button
                  style="
                    border: 1px solid rgb(105, 99, 99);
                    width: 90px;
                    height: 40px;
                    text-align: center;
                  "
                  type="primary"
                  @click="centerDialogVisible = false"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删 除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :pager-count="7"
        :current-page="currentPage"
        :page-sizes="[10, 8, 5]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length > 0 ? tableData.length : null"
        background
        style="float: right; margin: 15px 0"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      searchContent: "",
      inputContent: "",
      currentPage: 1, //默认初始页
      pagesize: 10, //每页默认显示的数据
      pageCount: 0,

      name: "",
      time: "",
      address: "",
      centerDialogVisible: false,
      search: "",
      activities: [
        {
          content: "已发货",
          timestamp: "2018-04-12 20:46",
          size: "large",
          type: "primary",
          icon: "el-icon-more",
        },
        {
          content: "运输中",
          timestamp: "2018-04-03 20:46",
          color: "#0bbd87",
        },
        {
          content: "已送达",
          timestamp: "2018-04-03 20:46",
          size: "large",
        },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "张三",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 214124,
        },
        {
          date: "2016-05-02",
          name: "李四",
          province: "杭州",
          city: "西湖区",
          address: "杭州市西湖区金沙江路 1518 弄",
          zip: 234215,
        },
        {
          date: "2016-05-02",
          name: "王二",
          province: "北京",
          city: "鼓楼区",
          address: "北京市鼓楼区金沙江路 1518 弄",
          zip: 753635,
        },
        {
          date: "2016-05-02",
          name: "丁林波",
          province: "濮阳",
          city: "庆丰区",
          address: "濮阳市庆丰区金沙江路 1518 弄",
          zip: 957314,
        },
        {
          date: "2016-05-02",
          name: "孙凡哭",
          province: "新乡",
          city: "普陀区",
          address: "新乡市普陀区金沙江路 1518 弄",
          zip: 625424,
        },
        {
          date: "2016-05-02",
          name: "小刚",
          province: "珠海",
          city: "普陀区",
          address: "珠海市普陀区金沙江路 1518 弄",
          zip: 245625,
        },
        {
          date: "2016-05-02",
          name: "小花",
          province: "深圳",
          city: "普陀区",
          address: "深圳市普陀区金沙江路 1518 弄",
          zip: 888664,
        },
        {
          date: "2016-05-02",
          name: "高维意",
          province: "青岛",
          city: "普陀区",
          address: "青岛市普陀区金沙江路 1518 弄",
          zip: 455255,
        },
        {
          date: "2016-05-02",
          name: "于乾坤",
          province: "哈尔滨",
          city: "普陀区",
          address: "哈尔滨市普陀区金沙江路 1518 弄",
          zip: 444562,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "南京",
          city: "普陀区",
          address: "南京市普陀区金沙江路 1518 弄",
          zip: 552542,
        },
        {
          date: "2016-05-02",
          name: "叔丁醇",
          province: "洛阳",
          city: "洛龙区",
          address: "洛阳市洛龙区金沙江路 1518 弄",
          zip: 325535,
        },
        {
          date: "2016-05-02",
          name: "王道明",
          province: "开封",
          city: "鼓楼区",
          address: "开封市鼓楼区金沙江路 1518 弄",
          zip: 553252,
        },
      ],
    };
  },
  methods: {
    handleEdit(index, row) {
      (this.name = row.name),
        (this.time = row.date),
        (this.address = row.address);
    },

    handleDelete(index, row) {
      this.$confirm("此操作将永久删除这条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          return this.tableData.splice(this.tableData.indexOf(row), 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //搜索点击事件
    searchput() {
      this.searchContent = this.inputContent;
      this.currentPage = 1;
    },
    // 分页器
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
  },
  computed: {
    //搜索功能
    tables() {
      const search = this.searchContent;
      //当将input框清空时，使列表自动展示搜索前的完整数据，并返回至首页，防止叠加搜索
      if (this.inputContent == "") {
        this.searchContent = "";
        // this.currentPage = 1;
        Number(this.tableData.length) % Number(this.pagesize) == 0
          ? (this.currentPage = 1)
          : null;
        return [this.tableData];
      }
      if (search !== "") {
        return [
          this.tableData.filter((dataNews) => {
            return Object.keys(dataNews).some((keys) => {
              return String(dataNews[keys]).indexOf(search) !== -1;
            });
          }),
        ];
      }
      return [this.tableData];
    },
  },
};
</script>


<style scoped></style>
 
 
 
 
 
 
 