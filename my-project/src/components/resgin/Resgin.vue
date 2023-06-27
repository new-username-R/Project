<template>
  <div class="container">
    <el-form
      class="resgin_card"
      :inline="true"
      :model="form"
      label-width="90px"
      :rules="rules"
    >
      <h3 class="resgin_title">注册</h3>

      <el-form-item label="用户名称" prop="rname">
        <el-input
          maxlength="7"
          style="width: 210px"
          type="text"
          v-model="form.rname"
          placeholder="输入用户名,字符小于7"
        ></el-input>
      </el-form-item>

      <el-form-item label="设置账号" prop="ruser">
        <el-input
          maxlength="11"
          style="width: 210px"
          type="text"
          onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
          v-model="form.ruser"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>

      <el-form-item label="设置密码" prop="rpassword">
        <el-input
          style="width: 210px"
          maxlength="16"
          show-password
          v-model="form.rpassword"
          onkeyup="this.value=this.value.replace(/[^\w.]/g,'')"
          placeholder="密码字符大于7小于16"
        ></el-input>
      </el-form-item>
      <!--密码只能输入大小写字母、数字、小数点  -->
      <el-form-item label="确认密码" prop="epassword">
        <el-input
          @blur="onblur"
          maxlength="16"
          style="width: 210px"
          show-password
          v-model="form.epassword"
          onkeyup="this.value=this.value.replace(/[^\w.]/g,'')"
          placeholder="确认密码"
        ></el-input>
      </el-form-item>

      <el-form-item label="验 证 码" prop="rcaptcha">
        <el-input
          @blur="rcaptcha"
          style="width: 120px"
          v-model="form.rcaptcha"
          placeholder="请输入验证码"
          oninput="value=value.replace(/[^\d.]/g,'')"
        ></el-input>

        <!-- oninput="value=value.replace(/[^\d.]/g,'')"   使输入框只能输入数字 -->
      </el-form-item>

      <!-- 验证码 -->

      <p class="code" @click="createCode">{{ code }}</p>

      <!-- 管理员身份 -->

      <div class="resgin_radio">
        <el-radio v-model="radio" label="1" style="margin-right: 70px"
          >超级管理员</el-radio
        >

        <el-radio v-model="radio" label="2">基础管理员</el-radio>
      </div>

      <!-- 按钮 -->

      <div class="resgin_button">
        <el-button type="primary" style="margin-right: 70px" @click="sp"
          >确定注册</el-button
        >

        <el-button type="primary" @click="sq">返回登陆</el-button>
      </div>
    </el-form>

    <!-- <h1 @click="sq">返回登陆</h1> -->
  </div>
</template>

  

  <script>
export default {
  name: "Resgin",

  data() {
    return {
      form: {
        rname: "",

        rpassword: "",

        epassword: "",

        ruser: "",

        rcaptcha: "",
      },

      code: "",

      radio: "",

      rules: {
        ruser: [
          {
            required: true,

            trigger: "blur",

            message: "请输入账号",
          },
        ],

        rpassword: [
          {
            required: true,

            trigger: "blur",

            message: "请输入密码",
          },
        ],

        epassword: [
          {
            required: true,

            trigger: "blur",

            message: "请确认密码",
          },
        ],

        rcaptcha: [
          {
            required: true,

            trigger: "blur",

            message: "请输入验证码",
          },
        ],

        rname: [
          {
            required: true,

            trigger: "blur",

            message: "请输入用户名",
          },
        ],
      },

      save: {
        name: "",

        user: "",

        password: "",

        adio: "",
      },
    };
  },

  mounted() {
    // 调用随机数函数//刚进入页面随机先获取一个

    this.createCode();
  },

  methods: {
    //返回登录

    sq() {
      this.$router.push("/");
    },

    //注册

    sp() {
      if (
        this.form.rcaptcha === this.code &&
        this.form.ruser != "" &&
        this.form.rpassword != "" &&
        this.form.rpassword == this.form.epassword &&
        this.radio != "" &&
        this.form.rname != ""
      ) {
        this.save.name = this.form.rname;

        this.save.user = this.form.ruser;

        this.save.password = this.form.rpassword;

        this.save.adio = this.radio;

        this.$store.commit("updateData", this.save);

        this.$router.push("/");
      } else {
        if (this.radio == "") {
          this.$message.error("请选择管理员权限");
        }
      }
    },

    //确认密码框失去焦点时，两次密码不一致，报错

    onblur() {
      if (this.form.rpassword != this.form.epassword) {
        this.$message.error("两次密码输入不一致");
      }
    },

    //验证码框失去焦点时，验证码不一致，报错

    rcaptcha() {
      if (this.form.rcaptcha != this.code) {
        this.$message.error("验证码错了");

        this.createCode();
      }
    },

    createCode() {
      var code = "";

      //设置长度，这里看需求，我这里设置了4

      var codeLength = 4;

      //设置随机字符

      var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);

      //循环codeLength 我设置的4就是循环4次

      for (var i = 0; i < codeLength; i++) {
        //设置随机数范围,这设置为0 ~ 36

        var index = Math.floor(Math.random() * 9);

        //字符串拼接 将每次随机的字符 进行拼接

        code += random[index];
      }

      //将拼接好的字符串赋值给展示的code

      this.code = code;
    },
  },
};
</script>

  

  <style lang="less" scoped>
.resgin_card {
  width: 400px;

  border: 1px solid #eaeaea;

  margin: auto;

  padding: 35px 35px 15px 35px;

  background-color: rgba(255, 255, 255, 0.4);
  // opacity: 0.8;

  border-radius: 15px; //圆角

  // box-shadow: 0 0 25px #cac6c6; //阴影

  box-sizing: border-box;

  box-sizing: border-box;

  position: relative;

  top: 150px;

  left: 25em;

  .resgin_title {
    //注册标题

    text-align: center;

    padding-bottom: 40px;

    font-size: 40px;

    color: #ffffff;
    font-family: "宋体";
  }

  //权限身份选择

  .resgin_radio {
    position: relative;

    top: -30px;

    left: 36px;
  }

  //按钮

  .resgin_button {
    position: relative;

    // top: -30px;

    left: 20px;
  }
}

.code {
  //验证码

  width: 90px;

  height: 40px;

  background-color: #ffffff;

  text-align: center;

  font-size: 30px;

  margin-left: 10px;

  padding-top: 5px;

  border: 1px solid #c9c2c2;

  border-radius: 7px; //圆角

  user-select: none;

  color: rgb(31, 125, 125);

  position: relative;

  top: -62.5px;

  left: 200px;

  box-sizing: border-box;
}

.container {
  position: absolute;

  height: 100%;

  width: 100%;

  background-image: url("../../assets/img/222.jpg");

  background-size: cover;
}
</style> 
