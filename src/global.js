import Vue from 'vue'
import utils from '@/utils/global' // 公共方法
import Cookies from 'js-cookie'
import moment from 'moment'

import UmyUi from 'umy-ui'
Vue.use(UmyUi)

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';


// 全局使用mixin
// Vue.mixin(myMixin.myMixin)
// 全局设置prototype
Object.keys(utils).forEach(key => {
  Vue.prototype[key] = utils[key]
})
// dateFormat过滤器
Vue.filter('dateFormat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(dataStr).format(pattern)
})

// 全局修改默认配置
// Element.Dialog.props.closeOnClickModal.default = false
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// console.info('Element.Dialog', Element.Dialog.props.closeOnClickModal)
