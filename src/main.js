import Vue from 'vue'
import App from './App.vue'
import { router } from './router';
import store from './store';
import VeeValidate from 'vee-validate';
import VueSmoothScroll from 'vue2-smooth-scroll'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './plugins/bootstrap-vue'
import '@babel/polyfill'
import 'mutationobserver-shim'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'

// library.add(fas)

import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

import datePicker from 'vue-bootstrap-datetimepicker';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
Vue.use(datePicker);

Vue.use(Chartkick.use(Chart))
Vue.use(VeeValidate);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSmoothScroll)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
