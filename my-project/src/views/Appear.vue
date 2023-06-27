<template>
    <div class="common-layout">
        <el-container class="lay-container">
            <Menu />
            <el-container class="r-container">
                <Header></Header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import Menu from '@/assets/commons/Menu.vue';
import Header from '@/assets/commons/Header.vue';
export default {
    name:'Appear',
    components:{
            Menu,
            Header
        }
}
</script>
<style lang="less">
.el-container {
    flex-wrap: wrap;
    align-items: flex-start;
}
.common-layout {
    height: 100%;
    & > .el-container {
        height: 100%;
        & > .el-aside {
            height: 100%;
            background-color: #2c5ef2;
        }
    }
    .lay-container {
        flex-wrap: nowrap;
        .el-main {
            margin-top: 10px;
        }
    }
}
</style>