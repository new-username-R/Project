// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './style.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import dataV from '@jiaminghi/data-view'
import router from './router/index.js';
import store from './store/index.js';
import TreeTable from "vue-table-with-tree-grid"
Vue.config.productionTip = false
Vue.use(ElementUI).use(dataV)
Vue.component('tree-table', TreeTable)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  TreeTable,
  components: { App },
  template: '<App/>'
})
