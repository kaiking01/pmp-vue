import $eltool from '@/utils/open/eltool'
import $common from '@/utils/open/common'

/**
   * 识别业务code
   * @param code
   */
/**
 * 获取业务code 转移提醒
 * @param code
 * @returns {boolean}
 */
/**
 * code:
 * 200 成功
 * 201 询问提示
 * 202 弹出警告提示
 * 205 员工详情：工作经历子表(RYProperty/GetSubTableForms) 和 教育经历子表(RYProperty/GetSubTableForms)，返回205，需要刷新对应的主表接口
 * 206 导入文件，有成功，也有失败（员工列表）
 * 207 导入文件，模板不对的提醒
 * 208 导入员工花名册，刷新部门数据
 * 300 失败
 * 507 登录超时
 */

// 错误弹窗
const showErrorTipFn = $common.debounce(function (tip) {
  $eltool.errorMsg(tip)
}, null, { eventType: 'discern-showErrorTipFn' })

const passCodeArr = [200, 201, 205, 206, 207, 208]

/**
 * 关于code ，能识别的识别，不能识别的，一律返回true
 * @param {object} res
 * @param {Array} notTipCode 不提示的 code 数组
 */
export function getCodeMsg (res, notTipCode) {
  const code = Number(res.code)
  // if (notTipCode.length > 0) {
  //   debugger
  // }
  const isNotShowTip = notTipCode.indexOf(code) > -1
  if (passCodeArr.indexOf(code) > -1) {
    return true
  } else if (code === 202 && !isNotShowTip) {
    $eltool.warnMsg(res.message)
    return true
  } else if (code === 300 && !isNotShowTip) { // TODO:加入300请求失败，也返回，测试中
    // $eltool.errorMsg(res.message)
    $eltool.errorMsg({ title: '', message: res.message, desc: '' }, { dangerouslyUseHTMLString: true })

    return true
  } else if (code === 507 && !isNotShowTip) {
    showErrorTipFn(res.message || '登录超时')
    return true
  } else {
    return true
  }
  // else {
  //   showErrorTipFn(res.message || '请求出错')
  //   return false
  // }
}

/**
 * 获取响应状态 转义提醒
 * @param code
 * @returns {boolean}
 */
export function getErrMsgByCode (code) {
  switch (code) {
    case 507:
      showErrorTipFn(code + '：登录凭证已失效！')
      return false
    case 403:
      showErrorTipFn(code + '：您没有操作权限！')
      return false
    case 404:
      showErrorTipFn(code + '：未找到相关api！')
      return false
    case 400:
      showErrorTipFn(code + '：服务器出异常！')
      return false
    case 500:
      // debugger
      showErrorTipFn(code + '：服务器出异常！')
      return false
    default:
      return true
  }
}
