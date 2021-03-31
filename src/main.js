import Vue from 'vue'
import Antd from 'ant-design-vue';
import App from './App'
import router from './router'
import { store } from './store';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false

Vue.use(Antd);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  template: '<App/>'
})
