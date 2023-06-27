<template>
  <div>
    <template>
      <el-card >
        <el-tabs v-model="activeName">
          <el-tab-pane label="已上架商品 " name="first">
            <template>
              <div> 
                <el-row>
                  <el-input v-model="inputContent1" placeholder="请输入商品名称、商品详情、商品分类、商品价格等进行搜索" prefix-icon="el-icon-search"
                    style="width: 380px; margin-right: 5px; font-size: 12px"></el-input>
                  <el-button type="primary" style="height: 40px" @click="searchput1"><i
                      class="el-icon-search" /></el-button>
                </el-row>
              </div>
              <el-table height="480" :data="tables1[0].slice(
                (currentPage1 - 1) * pagesize1,
                currentPage1 * pagesize1
              )
                " border style="width: 100%; margin-top: 7px" :header-cell-style="{ textAlign: 'center' }"
                :cell-style="{ textAlign: 'center', padding: '0' }" :row-style="{ height: '55px' }">
                <el-table-column label="序号" type="index" width="60">
                </el-table-column>
                <el-table-column label="商品名称" prop="name">
                </el-table-column>
                <el-table-column label="商品详情" prop="desc">
                </el-table-column>
                <el-table-column label="商品分类" prop="type">
                </el-table-column>
                  <el-table-column label="商品价格" prop="price" >
                  <template slot-scope="ShelvesData" prop="price"   >
                    {{ ShelvesData.row.price }}<span style="font-size: 12px;"> 元/件</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="ShelvesRow(scope.$index, scope.row)">下架</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination ref="down" @size-change="handleSizeChange1" @current-change="handleCurrentChange1"
                :pager-count="7" :current-page="currentPage1" :page-sizes="[10, 8, 5]" :page-size="pagesize1"
                layout="total, sizes, prev, pager, next, jumper"
                :total="ShelvesData.length > 0 ? ShelvesData.length : null" background
                style="float: right; margin: 15px 0">
              </el-pagination>
            </template>
          </el-tab-pane>
          <el-tab-pane label="已下架商品" name="second">
            <template>
              <div>
                <el-row>
                  <el-input v-model="inputContent2" placeholder="请输入商品名称、商品详情、商品分类、商品价格等进行搜索" prefix-icon="el-icon-search"
                    style="width: 380px; margin-right: 5px; font-size: 12px"></el-input>
                  <el-button type="primary" style="height: 40px" @click="searchput2"><i
                      class="el-icon-search" /></el-button>
                </el-row>
              </div>
              <el-table height="480" :data="tables2[0].slice(
                (currentPage2 - 1) * pagesize2,
                currentPage2 * pagesize2
              )
                " border style="width: 100%; margin-top: 7px" :header-cell-style="{ textAlign: 'center' }"
                :cell-style="{ textAlign: 'center', padding: '0' }" :row-style="{ height: '55px' }">
                <el-table-column label="序号" type="index" width="60"></el-table-column>
                <el-table-column label="商品名称" prop="name">
                </el-table-column>
                <el-table-column label="商品详情" prop="desc">
                </el-table-column>
                <el-table-column label="商品分类" prop="type">
                </el-table-column>
                <el-table-column label="商品价格" prop="price">
                  <template slot-scope="TakedownData" prop="price">
                    {{ TakedownData.row.price }}<span style="font-size: 12px;"> 元/件</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="TakedownRow(scope.$index, scope.row)">上架</el-button>
                    <el-button size="mini" type="danger" @click="DeleteRow(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :pager-count="7"
                :current-page="currentPage2" :page-sizes="[10, 8, 5]" :page-size="pagesize2"
                layout="total, sizes, prev, pager, next, jumper"
                :total="TakedownData.length > 0 ? TakedownData.length : null" background
                style="float: right; margin: 15px 0">
              </el-pagination>
            </template>
          </el-tab-pane>
          <el-tab-pane label="上架商品" name="third">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="商品名称" prop="name">
                <el-input v-model="ruleForm.name" style="width: 500px"></el-input>
              </el-form-item>
              <el-form-item label="商品类型" prop="type">
                <el-checkbox-group v-model="ruleForm.type">
                  <el-checkbox label=" 母婴 " name="type"></el-checkbox>
                  <el-checkbox label=" 数码 " name="type"></el-checkbox>
                  <el-checkbox label=" 户外用品 " name="type"></el-checkbox>
                  <el-checkbox label=" 休闲食品 " name="type"></el-checkbox>
                  <el-checkbox label=" 品牌服饰 " name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="商品价格" prop="price">
                <el-input v-model="ruleForm.price" style="width: 500px">
                  <span slot="suffix">元</span>
                </el-input>
              </el-form-item>
              <el-form-item label="商品简介" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc" style="width: 500px"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </template>
  </div>
</template>
<script>
export default {
  name: "Manage",
  data() {
    return {
      ruleForm: {
        name: "",
        type: [],
        price: "",
        desc: "",
      },
      rules: {
        name: [
          {
            required: true,
            pattern: /^[\u4e00-\u9fa50-9A-Za-z]*$/,
            message: "商品名称只能为数字、字母、中文及其三者混合",
            trigger: "blur",
          },
        ],
        type: [{ required: true, message: "类型必选", trigger: "blur" }],
        price: [
          {
            required: true,
            pattern: /^[0-9]+\.?[0-9]*$/,
            message: "价格只能为数字且合法",
            trigger: "blur",
          },
          {
            max: 8,
            message: "价格最长为8位数",
            trigger: "blur",
          },
          {
            min: 1,
            message: "至少为1位数",
            trigger: "blur",
          },
        ],
      },
      activeName: "first",
      //下架
      searchContent1: "",
      inputContent1: "",
      currentPage1: 1, //默认初始页
      pagesize1: 10, //每页默认显示的数据
      pageCount1: 0,
      // 上架
      searchContent2: "",
      inputContent2: "",
      currentPage2: 1, //默认初始页
      pagesize2: 10, //每页默认显示的数据
      pageCount2: 0,

      ShelvesData: [
        {
          name: "三只松鼠",
          desc: "大礼包",
          type: ["休闲食品"],
          price: "186",
        },
        {
          name: "蒸汽眼罩",
          desc: "眼睛护眼仪润眼仪眼部按摩器雾化",
          type: ["数码"],
          price: "339",
        },
        {
          name: "洗衣机",
          desc: "10公斤滚筒家用全自动洗衣机",
          type: ["数码"],
          price: "6999",
        },
      ],
      TakedownData: [
        {
          name: "微单相机",
          desc: "Sony/索尼 Alpha7C 索尼全画幅微单相机ILCE-A7C",
          type: ["数码"],
          price: "13019",
        },
      ],
    };
  },
  
  methods: {
    stateFormat(row, column, cellValue) {
			cellValue += '';
			if (!cellValue.includes('.')) cellValue += '.';
			return cellValue.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
				return $1 + ',';
			}).replace(/\.$/, '');
		},
    //上架
    searchput1() {
      this.searchContent1 = this.inputContent1;
      this.currentPage1 = 1;
    },
    // 分页器
    handleSizeChange1(size) {
      this.pagesize1 = size;
    },
    handleCurrentChange1(currentPage1) {
      this.currentPage1 = currentPage1;
    },
    //下架

    searchput2() {
      this.searchContent2 = this.inputContent2;
      this.currentPage2 = 1;
    },
    // 分页器
    handleSizeChange2(size) {
      this.pagesize2 = size;
    },
    handleCurrentChange2(currentPage2) {
      this.currentPage2 = currentPage2;
    },

    ShelvesRow(index, row) {
      this.$confirm("是否下架该商品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "下架成功!",
          });
          return (
            this.TakedownData.unshift(
              this.ShelvesData[this.ShelvesData.indexOf(row)]
            ),
            this.ShelvesData.splice(this.ShelvesData.indexOf(row), 1)
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消下架",
          });
        });
    },
    TakedownRow(index, row) {
      this.$confirm("是否上架该商品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "上架成功!",
          });
          return (
            this.ShelvesData.unshift(
              this.TakedownData[this.TakedownData.indexOf(row)]
            ),
            this.TakedownData.splice(this.TakedownData.indexOf(row), 1)
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消上架",
          });
        });
    },
    DeleteRow(index, row) {
      this.$confirm("是否删除该商品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          return this.TakedownData.splice(this.TakedownData.indexOf(row), 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "删除已被取消",
          });
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ShelvesData.unshift({ ...this.ruleForm });
          this.$message({ message: "上架成功", type: "success" });
          this.ruleForm.name = "";
          this.ruleForm.desc = "";
          this.ruleForm.type = [];
          this.ruleForm.price = "";
        } else {
          this.$message({ message: "上架失败", type: "error" });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },

  computed: {
    //下架商品搜索功能
    tables1() {
      const search = this.searchContent1;
      //当将input框清空时，使列表自动展示搜索前的完整数据，并返回至首页，防止叠加搜索
      if (this.inputContent1 == "") {
        this.searchContent1 = "";
        // this.currentPage1 = 1;
        return [this.ShelvesData];
      }
      if (search !== "") {
        return [
          this.ShelvesData.filter((dataNews) => {
            return Object.keys(dataNews).some((keys) => {
              return String(dataNews[keys]).indexOf(search) !== -1;
            });
          }),
        ];
      }
      return [this.ShelvesData];
    },
    //上架商品搜索功能
    tables2() {
      const search = this.searchContent2;
      //当将input框清空时，使列表自动展示搜索前的完整数据，并返回至首页，防止叠加搜索
      if (this.inputContent2 == "") {
        this.searchContent2 = "";
        Number(this.TakedownData.length) % Number(this.pagesize2) == 0
          ? (this.currentPage2 = 1)
          : null;
        return [this.TakedownData];
      }
      if (search !== "") {
        return [
          this.TakedownData.filter((dataNews) => {
            return Object.keys(dataNews).some((keys) => {
              return String(dataNews[keys]).indexOf(search) !== -1;
            });
          }),
        ];
      }
      return [this.TakedownData];
    },
  },
};
</script>
<style scoped></style>