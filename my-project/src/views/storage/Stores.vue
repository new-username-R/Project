<template>
  <div>
    <el-card>
      <div>
        <!-- 搜索功能 -->
        <el-row>
          <el-input
            v-model="inputContent"
            placeholder="请输入货物编号或者货物名称进行搜索"
            prefix-icon="el-icon-search"
            style="width: 360px; margin-right: 5px"
          ></el-input>

          <el-button type="primary" style="height: 40px" @click="searchput"
            >搜索</el-button
          >

          <!-- 新增按钮 -->
          <el-button
            type="success"
            @click="adds()"
            style="float: right; height: 40px"
            >+ 新增</el-button
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
        style="width: 100%; margin-top: 7px; font-size: 15px"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center', padding: '0' }"
        :row-style="{ height: '55px' }"
      >
        <el-table-column type="index" width="40"> </el-table-column>
        <!-- 这个为序号 -->
        <el-table-column prop="number" label="货物编号" width="85">
        </el-table-column>
        <el-table-column prop="name" label="货物名称" width="230">
        </el-table-column>
        <el-table-column prop="huozhu" label="货主" width="80">
        </el-table-column>
        <el-table-column prop="kucun" label="库存" width="70">
        </el-table-column>
        <el-table-column prop="cangku" label="仓库" width="80">
        </el-table-column>
        <el-table-column prop="state" label="库存状态" width="80">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.state === '有货'"
              >有货</el-tag
            >
            <el-tag type="danger" v-else-if="scope.row.state === '无货'"
              >无货</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="xianyou" label="现有量" width="85">
        </el-table-column>
        <el-table-column prop="zhanyong" label="订单占用量" width="95">
        </el-table-column>
        <el-table-column prop="suoding" label="库存锁定量" width="95">
        </el-table-column>
        <el-table-column prop="keyong" label="可销售量" width="95">
        </el-table-column>
        <el-table-column label="操作">
          <!-- 让弹框显示 -->
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="sets(scope.row)"
              style="height: 40px"
              >修改</el-button
            >
            <el-button
              type="danger"
              @click="removes(scope.row)"
              style="height: 40px"
              >删除</el-button
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

      <!-- 新增输入框 -->
      <el-dialog
        title="新增库存"
        :visible.sync="el_show"
        width="50%"
        @keydown.native="keydown($event)"
      >
        <el-form
          :inline="true"
          label-width="80px"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item label="货物编号" prop="number">
            <el-input
              placeholder="请输入货物编号"
              v-model="ruleForm.number"
              :label-width="formLabelWidth"
            ></el-input>
          </el-form-item>
          <el-form-item label="货物名称" prop="name">
            <el-input
              placeholder="请输入货物名称"
              v-model="ruleForm.name"
              :label-width="formLabelWidth"
            ></el-input>
          </el-form-item>
          <el-form-item label="货主" prop="huozhu">
            <el-input
              placeholder="请输入货主名称"
              v-model="ruleForm.huozhu"
              :label-width="formLabelWidth"
            ></el-input>
          </el-form-item>
          <el-form-item label="库存" prop="kucun">
            <el-input
              v-model="ruleForm.kucun"
              placeholder="请输入库存数量"
              :label-width="formLabelWidth"
              onkeyup="value=value.replace(/[^\d]+/g,'')"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="仓库" prop="cangku">
            <el-input
              v-model="ruleForm.cangku"
              placeholder="请输入仓库名称"
              :label-width="formLabelWidth"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="库存状态" prop="state">
            <el-select
              v-model="ruleForm.state"
              placeholder="请选择库存状态"
              :label-width="formLabelWidth"
              style="width: 205px"
            >
              <el-option label="有货" value="有货"></el-option>
              <el-option label="无货" value="无货"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="现有数量" prop="xianyou">
            <el-input
              v-model="ruleForm.xianyou"
              placeholder="请输入现有数量"
              :label-width="formLabelWidth"
              onkeyup="value=value.replace(/[^\d]+/g,'')"
            >
            </el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="pushs()">新 增</el-button>
          <el-button @click="err()">取 消</el-button>
        </div>
      </el-dialog>

      <!-- 修改输入框 -->
      <el-dialog
        title="修改"
        :visible.sync="el_xiu"
        @keydown.native="keydown($event)"
      >
        <el-form
          :inline="true"
          label-width="80px"
          :model="newtable"
          :rules="rules"
          ref="newtable"
        >
          <el-form-item
            label="货物编号"
            :label-width="formLabelWidth"
            prop="number"
          >
            <el-input
              placeholder="请输入货物编号"
              v-model="newtable.number"
              style="width: 205px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="货物名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input
              placeholder="请输入货物名称"
              v-model="newtable.name"
              style="width: 205px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="货主"
            :label-width="formLabelWidth"
            prop="huozhu"
          >
            <el-input
              placeholder="请输入货主名称"
              v-model="newtable.huozhu"
              style="width: 205px"
            ></el-input>
          </el-form-item>
          <el-form-item label="库存" :label-width="formLabelWidth" prop="kucun">
            <el-input
              v-model="newtable.kucun"
              placeholder="请输入库存数量"
              style="width: 205px"
              onkeyup="value=value.replace(/[^\d]+/g,'')"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="仓库"
            :label-width="formLabelWidth"
            prop="cangku"
          >
            <el-input
              v-model="newtable.cangku"
              placeholder="请输入仓名称"
              style="width: 205px"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="库存状态"
            :label-width="formLabelWidth"
            prop="state"
          >
            <el-select
              v-model="newtable.state"
              placeholder="请选择库存状态"
              style="width: 205px"
            >
              <el-option label="有货" value="有货"></el-option>
              <el-option label="无货" value="无货"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="现有数量"
            :label-width="formLabelWidth"
            prop="xianyou"
          >
            <el-input
              v-model="newtable.xianyou"
              placeholder="请输入现有数量"
              style="width: 205px"
              onkeyup="value=value.replace(/[^\d]+/g,'')"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="订单占用量"
            :label-width="formLabelWidth"
            prop="zhanyong"
          >
            <el-input
              v-model="newtable.zhanyong"
              placeholder="请输入订单占用量"
              style="width: 205px"
              onkeyup="value=value.replace(/[^\d]+/g,'')"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="库存锁定量"
            :label-width="formLabelWidth"
            prop="suoding"
          >
            <el-input
              v-model="newtable.suoding"
              placeholder="请输入库存锁定量"
              style="width: 205px"
              onkeyup="value=value.replace(/[^\d]+/g,'')"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="可销售量"
            :label-width="formLabelWidth"
            prop="keyong"
          >
            <el-input
              v-model="newtable.keyong"
              placeholder="请输入可销售量"
              style="width: 205px"
              onkeyup="value=value.replace(/[^\d]+/g,'')"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="trueset()">修 改</el-button>
          <el-button @click="xg_err()">取 消</el-button>
        </div>
      </el-dialog>
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
      tableData: [
        {
          id: 0,
          number: "111",
          name: "iphone13ProMax远峰蓝1TB",
          kucun: 1000,
          huozhu: "html",
          cangku: "洛阳",
          state: "无货",
          xianyou: 200,
          zhanyong: 300,
          suoding: 300,
          keyong: 200,
        },
        {
          id: 1,
          number: "222",
          name: "联想拯救者R7000P",
          kucun: 700,
          huozhu: "css",
          cangku: "洛阳",
          state: "有货",
          xianyou: 300,
          zhanyong: 300,
          suoding: 300,
          keyong: 200,
        },
        {
          id: 2,
          number: "333",
          name: "雀巢咖啡",
          kucun: 600,
          huozhu: "js",
          cangku: "洛阳",
          state: "有货",
          xianyou: 400,
          zhanyong: 300,
          suoding: 300,
          keyong: 200,
        },
        {
          id: 3,
          number: "444",
          name: "宏碁暗影骑士擎",
          kucun: 900,
          huozhu: "vue",
          cangku: "深圳",
          state: "有货",
          xianyou: 50,
          zhanyong: 300,
          suoding: 300,
          keyong: 200,
        },
        {
          id: 4,
          number: "555",
          name: "联想拯救者Y9000K",
          kucun: 100,
          huozhu: "node",
          cangku: "郑州",
          state: "无货",
          xianyou: 100,
          zhanyong: 300,
          suoding: 300,
          keyong: 200,
        },
        {
          id: 5,
          number: "666",
          name: "airpods pro",
          kucun: 10000,
          huozhu: "jquery",
          cangku: "南阳",
          state: "无货",
          xianyou: 300,
          zhanyong: 300,
          suoding: 300,
          keyong: 200,
        },
        {
          id: 6,
          number: "777",
          name: "华为耳机",
          kucun: 1000,
          huozhu: "react",
          cangku: "深圳",
          state: "有货",
          xianyou: 1000,
          zhanyong: 300,
          suoding: 300,
          keyong: 200,
        },
        {
          id: 7,
          number: "888",
          name: "华为耳机",
          kucun: 800,
          huozhu: "react",
          cangku: "深圳",
          state: "有货",
          xianyou: 200,
          zhanyong: 300,
          suoding: 300,
          keyong: 200,
        },
        {
          id: 8,
          number: "999",
          name: "华为耳机",
          kucun: 400,
          huozhu: "react",
          cangku: "深圳",
          state: "有货",
          xianyou: 200,
          zhanyong: 300,
          suoding: 300,
          keyong: 200,
        },
        {
          id: 9,
          number: "1010xv",
          name: "华为耳机",
          kucun: 500,
          huozhu: "react",
          cangku: "深圳",
          state: "有货",
          xianyou: 200,
          zhanyong: 300,
          suoding: 300,
          keyong: 200,
        },
      ],
      el_show: false,
      el_xiu: false,

      //新增弹窗默认值
      number: "",
      name: "",
      huozhu: "",
      kucun: "",
      cangku: "",
      state: "",
      xianyou: "",

      newtable: {
        number: "",
        name: "",
        huozhu: "",
        kucun: "",
        cangku: "",
        state: "",
        xianyou: "",
        zhanyong: "",
        suoding: "",
        keyong: "",
      }, //修改内容暂存区
      formLabelWidth: "120px",
      newid: 0, //存储点击的id

      //新增表单验证
      ruleForm: {
        number: "",
        name: "",
        huozhu: "",
        kucun: "",
        cangku: "",
        state: "",
        xianyou: "",
      },
      rules: {
        number: [
          { required: true, trigger: "blur", message: "请输入货物编号" },
          { min: 3, message: "长度最少在3个字符", trigger: "blur" },
          { pattern: "^[0-9a-zA-Z_]", message: "请输入正确的货物编号" },
        ],
        name: [
          { required: true, message: "请输入货物名称", trigger: "blur" },
          { min: 3, message: "长度最少在3个字符", trigger: "blur" },
          {
            pattern: "^[\u4E00-\u9FA5A-Za-z0-9]+$",
            message: "请输入正确的货物名称",
          },
        ],
        huozhu: [
          { required: true, message: "请输入货主名称", trigger: "blur" },
          {
            pattern: "^[\u4E00-\u9FA5A-Za-z0-9]+$",
            message: "请输入正确的货主名称",
          },
        ],
        kucun: [
          { required: true, message: "请输入当前库存数量", trigger: "blur" },
          // { pattern: "^[0-9]*$", message: "请输入正确的数量" },
        ],
        cangku: [
          { required: true, message: "请输入仓库名称", trigger: "blur" },
          { pattern: "^[\u4e00-\u9fa5]{0,}$", message: "请输入正确的仓库名称" },
        ],
        state: [
          { required: true, message: "请选择库存状态", trigger: "change" },
        ],
        xianyou: [
          { required: true, message: "请输入当前现有数量", trigger: "blur" },
          // { pattern: "^[0-9]*$", message: "请输入正确的数量" },
        ],
        zhanyong: [
          { required: true, message: "请输入当前订单占有量", trigger: "blur" },
          // { pattern: "^[0-9]*$", message: "请输入正确的数量" },
        ],
        suoding: [
          { required: true, message: "请输入库存锁定数量", trigger: "blur" },
          // { pattern: "^[0-9]*$", message: "请输入正确的数量" },
        ],
        keyong: [
          { required: true, message: "请输入当前可销售量", trigger: "blur" },
          // { pattern: "^[0-9]*$", message: "请输入正确的数量" },
        ],
      },
    };
  },
  methods: {
    //搜索点击事件
    searchput() {
      this.searchContent = this.inputContent;
    },

    //新增让弹框显示
    adds() {
      this.el_show = true;
    },

    //取消让弹框隐藏
    err() {
      this.el_show = false;
    },

    //删除某条信息
    removes(v) {
      this.newid = this.tableData.findIndex((item) => {
        return item.id == v.id;
      });
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.tableData.splice(this.newid, 1); //删除代码
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //新增
    pushs() {
      if (
        !this.ruleForm.number ||
        !this.ruleForm.name ||
        !this.ruleForm.huozhu ||
        !this.ruleForm.kucun ||
        !this.ruleForm.cangku ||
        !this.ruleForm.state ||
        !this.ruleForm.xianyou
      ) {
        this.$message.error("请输入全部内容");
        return;
      }
      //使用map方法获取到id的最大值
      let ids =
        Math.max(
          ...this.tableData.map(function (item) {
            return item.id;
          })
        ) + 1;
      this.tableData.push({
        number: this.ruleForm.number,
        name: this.ruleForm.name,
        kucun: this.ruleForm.kucun,
        huozhu: this.ruleForm.huozhu,
        cangku: this.ruleForm.cangku,
        state: this.ruleForm.state,
        xianyou: this.ruleForm.xianyou,
        zhanyong: this.ruleForm.zhanyong,
        suoding: this.ruleForm.suoding,
        keyong: this.ruleForm.keyong,
        id: ids,
      });
      this.searchtableData = this.tableData; //绑定搜索框初始数据
      this.$message({
        message: "创建成功",
        type: "success",
      });
      (this.number = ""),
        (this.name = ""),
        (this.kucun = ""),
        (this.huozhu = ""),
        (this.cangku = ""),
        (this.state = ""),
        (this.xianyou = ""),
        (this.zhanyong = ""),
        (this.suoding = ""),
        (this.keyong = ""),
        (this.el_show = false);
    },

    //修改
    //弹出框 显示
    sets(val) {
      this.el_xiu = true;
      this.newtable = {
        number: val.number,
        name: val.name,
        kucun: val.kucun,
        huozhu: val.huozhu,
        cangku: val.cangku,
        state: val.state,
        xianyou: val.xianyou,
        zhanyong: val.zhanyong,
        suoding: val.suoding,
        keyong: val.keyong,
        id: val.id,
      };
    },
    xg_err() {
      this.el_xiu = false;
    },
    //保存修改
    trueset() {
      if (
        !this.newtable.number ||
        !this.newtable.name ||
        !this.newtable.huozhu ||
        !this.newtable.kucun ||
        !this.newtable.cangku ||
        !this.newtable.state ||
        !this.newtable.xianyou ||
        !this.newtable.zhanyong ||
        !this.newtable.suoding ||
        !this.newtable.keyong
      ) {
        this.$message.error("修改后的内容不可以为空");
        return;
      }
      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].id == this.newtable.id) {
          this.tableData[i].number = this.newtable.number;
          this.tableData[i].name = this.newtable.name;
          this.tableData[i].kucun = this.newtable.kucun;
          this.tableData[i].huozhu = this.newtable.huozhu;
          this.tableData[i].cangku = this.newtable.cangku;
          this.tableData[i].state = this.newtable.state;
          this.tableData[i].xianyou = this.newtable.xianyou;
          this.tableData[i].zhanyong = this.newtable.zhanyong;
          this.tableData[i].suoding = this.newtable.suoding;
          this.tableData[i].keyong = this.newtable.keyong;
          this.tableData[i].id = this.newtable.id;
          this.el_xiu = false;
        }
      }
    },
    // 分页器
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    //禁止表单输入空格
    keydown(e) {
      if (e.keyCode == 32) {
        e.returnValue = false;
      }
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


<style scoped>
</style>
 
 
 
 
 
 
 