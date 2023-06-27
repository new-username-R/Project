<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->

      <el-input
        v-model="inputContent"
        class="searchinput"
        placeholder="请输入关键字进行查询"
        prefix-icon="el-icon-search"
      >
        <el-button slot="append" class="searchbtn" @click="searchput"
          >搜索</el-button
        >
      </el-input>

      <!-- 用户列表区 -->
      <el-table
        :data="
          tables[0].slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        border
        stripe
        style="width: 100%"
        height="430"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名" width="280">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="300">
        </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,8,5]"
        :page-size="pageSize"
        background
        layout="total,sizes,prev,pager,next,jumper"
        :total="count"
        class="fenye"
      >
      </el-pagination>
    </el-card>
    <el-dialog title="修改用户"></el-dialog>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      tableData: [
        {
          mobile: "12345678910",
          username: "赵光义",
          email: "2110884555@qq.com",
        },
        {
          mobile: "12345678911",
          username: "杨广",
          email: "2110884551@qq.com",
        },
        {
          mobile: "12345678912",
          username: "朱祁镇",
          email: "2110884515@qq.com",
        },
        {
          mobile: "12345678913",
          username: "秦桧",
          email: "2110884155@qq.cod",
        },
        {
          mobile: "12345678914",
          username: "赵高",
          email: "2110884255@qq.com",
        },
        {
          mobile: "12345678915",
          username: "李斯",
          email: "2110884552@qq.com",
        },
        {
          mobile: "12345678916",
          username: "李隆基",
          email: "2110884525@qq.com",
        },
        {
          mobile: "12345678917",
          username: "赵构",
          email: "2110884553@qq.com",
        },
        {
          mobile: "12345678918",
          username: "王恺",
          email: "2110884535@qq.com",
        },
        {
          mobile: "12345678919",
          username: "石崇",
          email: "2110884554@qq.com",
        },
        {
          mobile: "123456789199",
          username: "司马炎",
          email: "2110884545@qq.com",
        },
        {
          mobile: "123456789110",
          username: "胡亥",
          email: "2110884559@qq.com",
        },
      ],
      currentPage: 1,
      pageSize: 7,
      // currentPage: 1, //默认初始页
      // pagesize: 7, //每页默认显示的数据
      // pageCount: 0, //数据的总条数,如果数据是后端接口返回的，则此值需修改
      searchContent: "",
      inputContent: "",
    };
  },
  computed: {
    tables() {
      const search = this.searchContent;
      //当将input框清空时，使列表自动展示搜索前的完整数据，并返回至首页，防止叠加搜索
      if (this.inputContent == "") {
        this.searchContent = "";
        this.currentPage = 1;
        Number(this.tableData.length) % Number(this.pagesize) == 0
        return [this.tableData, (this.count = this.tableData.length)];
      }
      if (search !== "") {
        return [
          this.tableData.filter((dataNews) => {
            return Object.keys(dataNews).some((key) => {
              return String(dataNews[key]).toLowerCase().indexOf(search) > -1;
            });
          }),
          (this.count = this.tableData.filter((dataNews) => {
            return Object.keys(dataNews).some((key) => {
              return String(dataNews[key]).toLowerCase().indexOf(search) > -1;
            });
          }).length),
        ];
      }
      return [this.tableData, (this.count = this.tableData.length)];
    },
  },
  methods: {
    keyUp(e) {
      e.target.value = e.target.value.replace(
        /[`~!#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~!#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
        ""
      );
    },
    // 改变每页容纳的数据量
    handleSizeChange(val) {
      this.pageSize = val;
    },
    // //切换页码
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    searchput() {
      this.searchContent = this.inputContent;
      this.currentPage = 1;
    },
  },
};
</script>
  <style >
.el-table {
  margin-top: 10px;
}
.fenye {
  /* justify-content: center; */
  text-align: center;
  margin-top: 10px;
}
.searchinput {
  width: 300px;
}
</style>