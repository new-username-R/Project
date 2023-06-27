<template>
  <div>
    <el-row :class="$store.state.isCollapse ? 'wied' : 'wid'">
      <el-aside>
        <el-menu
          default-active="2"
          :class="$store.state.isCollapse ? 'menu' : 'menus'"
          background-color="#00162A"
          text-color="#fff"
          active-text-color="#fff"
          :collapse-transition="false"
          :collapse="$store.state.isCollapse"
        >
          <h3 v-if="$store.state.isCollapse" style="fontsize: 14px">数据</h3>
          <h3 v-if="!$store.state.isCollapse">电商平台后台数据</h3>
          <el-menu-item
            v-for="item in inlists"
            :key="item.path"
            @click="clickMenu(item)"
          >
            <template>
              <i :class="item.icon"></i>
              <span>{{ item.label }}</span>
            </template>
          </el-menu-item>
          <el-submenu
            v-for="item in nolists"
            :index="item.label"
            :key="item.path"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.label }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(subitem, subindex) in item.children"
                :index="subitem.label"
                :key="subindex"
                @click="clickMenu(subitem)"
              >
                <i :class="subitem.icon"></i>
                <span>{{ subitem.label }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
    </el-row>
  </div>
</template>

  
<script>
export default {
  name: "Menu",
  data() {
    return {
      inlist: "",
      inlists: "",
      nolist: "",
      nolists: "",
      list: [],
    };
  },
  methods: {
    clickMenu(item) {
      if (this.$router.currentRoute.path == item.path) {
        return;
      } else {
        this.$router.push({
          name: item.name,
        });
      }
      this.$store.commit("selectMenu", item);
    },
  },
  mounted() {
    if (this.$store.state.save.adio == 1) {
      this.list = this.$store.state.luyou1;
    } else {
      this.list = this.$store.state.luyou2;
    }
    (this.inlist = () => {
      return this.list.filter((item) => !item.children);
    }),
      (this.inlists = Object.values(this.inlist())),
      (this.nolist = () => {
        return this.list.filter((item) => item.children);
      }),
      (this.nolists = Object.values(this.nolist()));
  },
};
</script>
<style lang="less" scoped>
.wid {
  width: 200px;
}
.wied {
  width: 70px;
}
h3 {
  text-align: center;
  font-family: "Times New Roman", Times, serif;
  line-height: 60px;
  color: #fff;
  font-size: 20px;
}

.menus {
  height: 100vh;
  width: 200px;
  border: none;
}
.menu {
  height: 100vh;
  width: 70px;
  border: none;
}
</style>