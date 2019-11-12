import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elementUI from 'element-ui' // 引入UI
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
Vue.config.productionTip = false
Vue.use(elementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
