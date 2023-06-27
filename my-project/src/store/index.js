import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex)
const state = {
    isCollapse: false,
    wid: "60px",
    wied: "180px",
    currentMenu: null,
    luyou1: [
        {
            path: "/home",
            name: "homes",
            icon: "el-icon-s-home",
            label: "首页",
        },
        {
            path: "/list",
            name: "list",
            icon: "el-icon-place",
            label: "用户信息",
        },
        {
            path: "/manage",
            name: "manage",
            icon: "el-icon-setting",
            label: "商品管理",
        },
        {
            path: "/user",
            name: "user",
            icon: "el-icon-user",
            label: "个人中心",
        },
        {
            path: "/ohter",
            icon: "el-icon-s-order",
            label: "数据管理",
            children: [
                {
                    path: "/thing",
                    name: "thing",
                    icon: "el-icon-help",
                    label: "产品分类",
                },
                {
                    path: "/stores",
                    name: "stores",
                    icon: "el-icon-takeaway-box",
                    label: "库存",
                },
                {
                    path: "/nums",
                    name: "nums",
                    icon: "el-icon-s-data",
                    label: "销量",
                },
                {
                    path: "/page1",
                    name: "page1",
                    icon: "el-icon-s-goods",
                    label: "订单详情",
                },
            ],
        },
    ],
    luyou2: [
        {
            path: "/home",
            name: "homes",
            icon: "el-icon-s-home",
            label: "首页",
        },

        {
            path: "/manage",
            name: "manage",
            icon: "el-icon-setting",
            label: "商品管理",
        },
        {
            path: "/ohter",
            icon: "el-icon-s-order",
            label: "数据管理",
            children: [
                {
                    path: "/thing",
                    name: "thing",
                    icon: "el-icon-help",
                    label: "产品分类",
                },
                {
                    path: "/stores",
                    name: "stores",
                    icon: "el-icon-takeaway-box",
                    label: "库存",
                },


            ],
        },
    ],
    save: { name: '', user: '', password: '', adio: '', },
    changeLu: null
}
const mutations = {
    selectMenu(state, val) {
        val.name == 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
        if (val.name == 'home') {
            state.currentMenu = null
        } else {
            state.currentMenu = val
        }
    },
    DELETE_ITEM(state, val) {
        const targetIndex = state.myArray.findIndex(obj => obj.name === val);
        const value = state.myArray.splice(targetIndex, 1)[0] // 删除元素并返回删除的值
        return value
    },
    flot(state, val) {
        state.deletedArr.push(val)
    },
    deleteRes(state, val) {
        const targetIndex = state.deletedArr.findIndex(obj => obj.name === val);
        const value = state.deletedArr.splice(targetIndex, 1)[0]
        return value
    },
    addItems(state, val) {
        state.myArray.push(val)
    },
    clearItem(state, val) {
        const targetIndex = state.deletedArr.findIndex(obj => obj.name === val);
        const value = state.deletedArr.splice(targetIndex, 1)[0]
        return value
    },
    updateData(state, data) {
        state.save = data
    },
    // save: { name: '', user: '', password: '', adio: '', },
    Updatauser(state, value) {
        state.save.user = value
    },
    Updatapassword(state, value) {
        state.save.password = value
    },
    Updataname(state, value) {
        state.save.name = value
    }
}
const actions = {
    updatauser(store, value) {
        store.commit('Updatauser', value)
    },
    updatapassword(store, value) {
        store.commit('Updatapassword', value)

    },
    updataname(store, value) {
        store.commit('Updataname', value)
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    plugins: [
        createPersistedState({
            key: "item",
            paths: ['tableData', 'save']
        })
    ]
})