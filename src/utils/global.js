import $request from './open/request'
import $eltool from './open/eltool'
import $common from './open/common'
import $com from './com'
import $echartCom from './echart-com'
import $constant from './open/constant'
import $validate from './open/validate'
import $processDate from './open/processDate'
import $utils from './open/utils'
// import $echarts from './plugin/echart.js'
// const ctx = process.env.CTX
// const file_ctx = process.env.FILE_CTX



const ctx = window.apiUrl
const file_ctx = window.apiHost
// debugger
export default {
  $request,
  $eltool,
  $common,
  $com,
  $echartCom,
  $utils,
  $constant,
  $validate,
  $processDate,
  // $echarts,
  ctx,
  file_ctx
}
