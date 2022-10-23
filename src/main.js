
// 解决低版本兼容性问题-放到最顶部
import 'babel-polyfill'
require('es6-promise').polyfill()

import Vue from 'vue'


import './global.js'
import App from './App'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css'
import '@/styles/animate.min.css'
import '@/styles/index.scss'
import '@/styles/custom-style.scss'

Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
