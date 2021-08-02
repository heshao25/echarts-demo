import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from './axios/index.js'
import axios from 'axios'

import './assets/global.less'
// import echarts from 'echarts'
// import axios from 'axios'

 axios.defaults.baseURL = 'http://127.0.0.1:3000/api'
 Vue.prototype.$http = axios

Vue.config.productionTip = false
// Vue.prototype.$echarts = echarts;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
