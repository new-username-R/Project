<template>
  <el-header>
    <div class="contier">
      <div @click="changeBtn">
        <el-button size="small">
          <i
            :class="
              $store.state.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
            "
          ></i>
        </el-button>
      </div>
      <div class="con">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: current.path }" v-if="current">
            {{ current.label }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div>
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="tou" src="../img/bg.png" alt="" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- <el-dropdown-item>
              <div @click="user">个人中心</div>
            </el-dropdown-item> -->
            <el-dropdown-item @click="exit">
              <div @click="exit">退出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {
    changeBtn() {
      this.$store.state.isCollapse = !this.$store.state.isCollapse;
    },
    // user() {
    //   if (this.$router.currentRoute.name == "user") {
    //     return;
    //   } else {
    //     this.$router.push({
    //       path: "user",
    //     });
    //   }
    // },
    exit() {
      this.$router.push({
        name: "login",
      });
    },
  },
  computed: {
    current() {
      return this.$store.state.currentMenu;
    },
  },
};
</script>
<style scoped lang="less">
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 2px 2px #ccc;
  z-index: 1;
  .contier {
    display: flex;
    align-items: center;
  }
  .con {
    margin-left: 20px;
    .tags {
      cursor: pointer;
    }
  }
}

.el-dropdown-link {
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>