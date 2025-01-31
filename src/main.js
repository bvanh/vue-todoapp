import Vue from 'vue'
import App from './App.vue'
import Antd from "ant-design-vue/es";

import "ant-design-vue/dist/antd.css";
import store from './store'
import router from './router'
Vue.use(Antd);
Vue.config.productionTip = false;
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
