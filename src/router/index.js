import Vue from 'vue'
import Router from 'vue-router'
import $constant from '@/utils/open/constant'

Vue.use(Router)

import constantRouterMap from './modules/constantRouterMap'

const routerObj = {
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
}
if ($constant.isRouterHistory) {
  routerObj.mode = 'history' // require service support
  routerObj.base = '/' // require service support
}
const createRouter = () => new Router(routerObj)

const router = createRouter()

// 路由出错触发
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  if (isChunkLoadFailed) {
    window.location.reload()
    // router.replace(router.history.pending.fullPath);
  } else {
    console.log('router.onError: ', error)
    router.push({ path: '/404' }) // 郭宽电脑，退出会走这个逻辑，而我的不会，所以他每次进来都会到404
    // router.push({ path: '/' })
  }
})

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
