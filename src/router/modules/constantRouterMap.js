import testDemo from '@/router/modules/testDemo'

const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/dashboard/index.vue'),
    name: 'Dashboard',
    redirect: '/statistics',
    meta: { title: 'dashboard', icon: '' },
    children: [
      {
        path: 'statistics',
        component: () => import('@/views/statistics/index.vue'),
        name: 'Statistics',
        meta: { title: '总统计分析', icon: '' },
      },
      {
        // src\views\analysis-presoner
        path: 'analysis-presoner',
        component: () => import('@/views/analysis-presoner/index.vue'),
        name: 'AnalysisPresoner',
        meta: { title: '分析个人答题情况', icon: '' },
      }
    ]
  }
]

const arr = constantRouterMap.concat([...testDemo])
export default arr
