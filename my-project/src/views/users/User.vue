<template>
  <div>
    <el-card style=" width: 100%; height: calc(85vh)">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户信息" name="first">
          <el-radio-group v-model="size" label="">

          </el-radio-group>

          <el-descriptions class="margin-top" :column="3" :size="size" border>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                用户名
              </template>
              <span v-show="!NameState.IsShow" ref="span" v-text="save.name"></span>
              <input v-show="NameState.IsShow" style="width: 200px; height: 30px" maxlength="10" minlength="3" type="text"
                ref="input" :value="save.name" prop="name" @blur="ChangeNameBlur(NameState)" />
              <i v-show="!NameState.IsShow" style="margin-left: 30px" class="el-icon-edit"
                @click="ChangeName(NameState)"></i>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-s-custom"></i>
                账号
              </template>
             <span v-show="!UserState.IsShow" ref="span" v-text="save.user"></span>
              <input v-show="UserState.IsShow" style="width: 200px; height: 30px" maxlength="10" minlength="3" type="text"
                ref="input1" :value="save.user" @blur="ChangeUserBlur(UserState)" />
              <i v-show="!UserState.IsShow" style="margin-left: 30px" class="el-icon-edit"
                @click="ChangeTel(UserState)"></i>
            </el-descriptions-item>
            <!-- <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-location-outline"></i>
                居住地
              </template>
              苏州市
            </el-descriptions-item> -->
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-tickets"></i>
                用户类型
              </template>
              <el-tag size="small">{{ type }}</el-tag>
            </el-descriptions-item>
            <!-- <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                联系地址
              </template>
              江苏省苏州市吴中区吴中大道 1188 号
            </el-descriptions-item> -->
          </el-descriptions>
          
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="second">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" style="width: 300px" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" style="width: 300px" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "User",
  computed: {
    ...mapState(["save"]),
    type() {
      return this.$store.state.save.adio == 1 ? "超级管理员" : "基础管理员";
    },
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      activeName: "first",
      NameState: { IsShow: false },
      UserState: { IsShow: false },
      EmlState: { IsShow: false },
      ruleForm: {
        pass: "",
        checkPass: "",
      },
      rules: {
        pass: [
          {
            min: 3,
            max: 10,
            message: "密码长度为3至10个数字或字母或二者组合",
            trigger: "blur",
          },
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: "密码只能为数字或字母或二者组合",
          },
          { validator: validatePass2, trigger: "blur" },
        ],
        checkPass: [
          {
            min: 3,
            max: 10,
            message: "密码长度为3至10个数字或字母或二者组合",
            trigger: "blur",
          },
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: "密码只能为数字或字母或二者组合",
          },
          { validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ChangeName(NameState) {
      this.$set(NameState, "IsShow", true);
      this.$nextTick(function () {
        this.$refs.input.focus();
      });
    },
    ChangeNameBlur(NameState) {
      this.$set(NameState, "IsShow", false);
      var UserReg = /^[\u4e00-\u9fa50-9A-Za-z]+$/;
      UserReg.test(this.$refs.input.value)
        ? this.$store.dispatch("updataname", this.$refs.input.value)
        : this.$message({
          message: "用户名不能包含空格、空、特殊符号",
          type: "error",
        });
    },
    ChangeTel(UserState) {
      this.$set(UserState, "IsShow", true);
      this.$nextTick(function () {
        this.$refs.input1.focus();
      });
    },
    ChangeUserBlur(UserState) {
      this.$set(UserState, "IsShow", false);
      var NumReg = /^\d+$/;
      NumReg.test(this.$refs.input1.value)
        ? this.$store.dispatch("updatauser", this.$refs.input1.value)
        : this.$message({
          message: "账号只能为纯数字",
          type: "error",
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch("updatapassword", this.ruleForm.pass);
          this.$message({ message: "修改成功", type: "success" });
          this.ruleForm.pass = "";
          this.ruleForm.checkPass = "";
        } else {
          this.$message({ message: "修改失败", type: "error" });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
