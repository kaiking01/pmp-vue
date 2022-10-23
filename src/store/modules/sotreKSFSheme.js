/**
 * ksf 方案
 **/

export default {
  namespaced: true,
  state: {
    ksfPlanList: [], // 配置列表当前方案数据（点击配置方案跳到下一页需要）
    qzZbTotal: '' // 月薪权重指标总和
  },
  mutations: {
    // 月薪权重指标总和
    UPDATE_QZZBTOTAL (state, data) {
      state.qzZbTotal = data
    },
    // 配置列表当前方案数据
    UPDATE_KSFPLANLIST (state, data) {
      state.ksfPlanList = data
    }
  },
  actions: {
    // 月薪权重指标总和
    UpdateQzZbTotal ({ commit }, data) {
      commit('UPDATE_QZZBTOTAL', data)
    },
    // 配置列表当前方案数据
    UpdateKsfPlanList ({ commit }, data) {
      commit('UPDATE_KSFPLANLIST', data)
    }
  }
}
