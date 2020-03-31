import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import { BootstrapVueIcons } from 'bootstrap-vue'
import ECharts from 'vue-echarts'
import Trend from "vuetrend"
import VueNumerals from 'vue-numerals'
import vSelect from "vue-select"

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import "vue-select/dist/vue-select.css";

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(require('vue-moment'))
Vue.use(ECharts)
Vue.use(Trend)
Vue.use(VueNumerals)
Vue.use(vSelect)

new Vue({
  render: h => h(App),
}).$mount('#app')