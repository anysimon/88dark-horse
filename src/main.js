import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elementUI from 'element-ui' // 引入UI
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
import axios from 'axios'
// 引入 nprogress 样式
// 引入格式："包名/具体文件路径"
import 'nprogress/nprogress.css' // 引入axios
Vue.prototype.$axios = axios // axios 赋值给全局属性
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.config.productionTip = false
Vue.use(elementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
