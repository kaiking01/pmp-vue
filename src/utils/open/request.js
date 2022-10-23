import axios from 'axios'
import { getCodeMsg, getErrMsgByCode } from '@/utils/open/discern'
import { getToken } from '@/utils/auth'
import store from '@/store'
// import router from '@/router'
import $validate from '@/utils/open/validate'
import $processDate from '@/utils/open/processDate'
import $eltool from '@/utils/open/eltool'
import $common from '@/utils/open/common'

// const baseURL = $common.getApiUrl() // 获取接口地址
const baseURL = ''

// 特殊接口，返回结果格式与其他不一样
// const errorFilterUrl = ['connect/token', 'connect/userinfo', 'api/Ksf/KsfData/CheckXLSFile']
const errorFilterUrl = ['/t/font_']

let _params = {}

try {
  _params = {
    errType: 2,
    pageMsg: '',
    columnNo: '',
    lineNo: '',
    stack: '',
    cod: '',
    msg: '',
    controllerAddress: '',
    ipAddress: '', // window.returnCitySN['cip']
    createTime: '',
    systemType: 3,
    dbName: 'pc_error_log'
  }
} catch (err) {
  console.error('request-error-log', err)
}

// 处理 code=507
const handle507 = $common.debounce(function () {
  // alert('handle507')
  $common.clearAccountFn() // 清空用户账户数据
}, null, { eventType: 'request-handle507' })
//
// 网络连接异常提示
const netWorkErrTip = $common.debounce(function () {
  // debugger
  $eltool.errorMsg('服务器异常，请联系管理员！')
}, null, { eventType: 'request-netWorkErrTip' })
// 请求超时！
const timeoutErrTip = $common.debounce(function () {
  $eltool.errorMsg('请求超时！')
}, null, { eventType: 'request-timeoutErrTip' })

/**
 * 请求前置处理
 */
const timeouts = 180 * 1000
axios.defaults.timeout = timeouts
axios.interceptors.request.use(config => {
  config.headers['accept'] = 'application/json; charset=utf-8'
  // debugger
  if (store.getters.token) {
    const token = getToken() || {}
    if (!$validate.isNull(token)) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  }

  return config
}, function (err) {
  return Promise.reject(err)
})
/**
 * 请求后置处理
 *
 */
axios.interceptors.response.use(response => {
  const res = response.data
  const resCfg = response.config || {}
  const url = resCfg.url
  const headers = resCfg.headers
  // const params = resCfg.params
  let notTipCode = []
  if (headers.frontParams) {
    // debugger
    notTipCode = headers.frontParams.notTipCode || []
  }
  // debugger
  const isNoSpecialUrl = errorFilterUrl.some(oUrl => {
    const flag = url.indexOf(oUrl) > -1
    return flag
  })

  if (headers && headers['responseType'] === 'blob') {
    const downloadCfg = headers.frontParams.downloadCfg
    const isDown = downloadCfg.hasOwnProperty('isDown') ? downloadCfg.isDown : true // 默认支持下载
    // debugger
    if (isDown) { // isDown:true:下载， fales ：不下载，直接弹窗显示图片
      // console.log('blob-response', response)
      setTimeout(() => {
        executeDownloadFile(response)
      }, 600)
    }
    return response.data
  }
  if (!isNoSpecialUrl) { // 非特殊接口
    if (getCodeMsg(res, notTipCode)) {
      return res
    } else {
      throw new Error(JSON.stringify(res))
    }
  } else { // 特殊接口，不需要判断code
    return res
  }
}, (err) => {
  const errMsg = err.toString()
  // console.log('errMsg', errMsg)
  // debugger
  const code = errMsg.substr(errMsg.indexOf('code') + 5)
  // debugger
  if (!getErrMsgByCode(parseInt(code))) {
    _params.msg = errMsg
    _params.stack = '错误原因:' + errMsg + ',定位页面路由：' + window.location.hash.slice(1)
    _params.createTime = Date.now()
    if (parseInt(code) === 507) {
      // debugger
      handle507()
    }
  } else if (errMsg.indexOf('Network Error') > -1) { // 网络连接异常提示
    // debugger
    netWorkErrTip()
  } else if (errMsg.indexOf('timeout') > -1) { // 请求超时
    timeoutErrTip()
  }
  //
  // return Promise.reject(err)
  return Promise.reject({ code, message: errMsg, data: null })
})

/**
 * 下载主方法
 * @param res
 */
function executeDownloadFile (res) {
  const blob = new Blob([res.data])
  const header = res.headers
  const frontParams = res.config.headers.frontParams || {} // 前端配置的参数，只做逻辑处理，不传后台
  const downloadCfg = frontParams.downloadCfg || {}
  // let filename = res.config.params['fileName']
  let filename = downloadCfg.fileName
  // debugger
  // 文件名从接口返回
  const fileName2 = header['content-disposition']
  // debugger
  if (fileName2) {
    const startIndex = fileName2.indexOf('filename=')
    // debugger
    let file1 = fileName2.substr(startIndex)
    if (file1) {
      file1 = decodeURIComponent(file1)
      let file2 = file1.replace('filename=', '')
      // var tt = file2.indexOf('.') === -1
      // file2 = ''
      // debugger
      if (file2) { // 后台返回的
        if (file2.indexOf('.') > -1) { // file2 有后缀
          filename = file2
        } else if (filename) { // file2 无后缀---使用前端定义的后缀（前提是，前端也得定义）
          const i = filename.lastIndexOf('.')
          file2 = file2 + filename.substr(i)
          filename = file2
        } else { // 否则直接使用后台的返回的
          filename = file2
        }
      } else {
        const pointIndex = filename.lastIndexOf('.')
        const file1 = filename.substring(0, pointIndex)
        const sufix = filename.substr(pointIndex + 1)
        const curDate = $processDate.turnDate(null, 1)
        const newFileName = `${file1}${curDate.ymd}_${curDate.hours}_${curDate.minutes}.${sufix}`
        filename = newFileName
      }
    }
  }

  if (window.navigator.msSaveBlob) { // 判断是否是IE浏览器，是的话返回true
    try {
      window.navigator.msSaveBlob(blob, filename)
    } catch (err) {
      console.error(err)
    }
  } else { // 谷歌浏览器 创建a标签 添加download属性下载
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
}

export default {
  /**
   * post download
   * @param {String} url 链接
   * @param {Array,Object} data json对象
   * @param {Object} params json对象
   * @param {String} fileName 文件名
   */
  postDownload (url, data, params, fileName) {
    const config = {
      fileName,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'responseType': 'blob'
      }

    }
    return this.download(url, 'post', data, params, config)
  },
  /**
   * getDownload
   * @param {String} url 链接
   * @param {Array,Object} data json对象
   * @param {Object} params json对象
   * @param {String} fileName 文件名
   */
  getDownload (url, data, params, fileName) {
    const config = {
      fileName,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'responseType': 'blob'
      }
    }
    return this.download(url, 'get', data, params, config)
  },
  /**
   * 小文件下载方法
   * @param url
   * @param params
   * @param fileName  下载文件的名称，包括后缀
   * @returns {*|Promise<any>}
   */
  download (url, methods, data, params, config) {
    params = params || {}
    let URL = url.indexOf('http') !== -1 ? url : baseURL + url
    if (config.isExternal) { // 外部链接
      URL = url
    }
    const headers = config.headers || {
      'content-type': 'application/x-www-form-urlencoded',
      'esponseType': 'blob'
    }

    params.fileName = config.fileName
    const param = {}
    const filterArr = ['isDown', 'fileName']
    for (const key in params) {
      if (filterArr.indexOf(key) <= -1) { // 注意参数
        param[key] = params[key]
      }
    }

    // 前端预置的参数，用来判断作请求接口的逻辑判断，不传后台
    headers.frontParams = headers.frontParams || {}
    headers.frontParams.downloadCfg = {
      fileName: params.fileName
    }
    if (params.hasOwnProperty('isDown')) { // 该参数不传的情况下，默认为true
      headers.frontParams.downloadCfg.isDown = params.isDown
    }
    // debugger
    return new Promise((resolve, reject) => {
      axios({
        method: methods,
        baseURL: URL,
        params: param,
        data,
        headers: headers,
        responseType: 'blob' // 表明返回服务器返回的数据类型，返回数据的格式，可选值为arraybuffer,blob,document,json,text,stream，默认值为json
      }).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  /**
   * GET 资源请求
   * 特别用于查询操作
   * @param url
   * @param params
   * @returns {*}
   */
  get (url, params, config) {
    // debugger
    return this.createForm(url, 'get', config, params)
  },
  /**
   * POST 资源请求
   * 特用于保存操作，支持DTO
   * @param url
   * @param params
   * @returns {*}
   */
  postForm (url, data, params, config) {
    config = config || {}
    return this.createJson(url, 'post', config, data, params)
  },
  /**
   * POST 资源请求
   * 特用于保存操作，支持DTO
   * @param url
   * @param params
   * @returns {*}
   */
  postJson (url, data, params, config) {
    // debugger
    config = config || {}
    config.headers = config.headers || { 'Content-Type': 'application/json; charset=utf-8' }
    return this.createJson(url, 'post', config, data, params)
  },
  /**
   * 原生请求 支持FORM表单参数提交
   * @param url
   * @param method
   * @param headers
   * @param params
   * @returns {Promise<any>}
   */
  createForm (url, method, config, params) {
    params = params || {}
    config = config || {}
    // debugger
    const headers = config.headers || {}

    // 前端预置的参数，用来判断作请求接口的逻辑判断，比如： notTipCode=[300] 表示对应的code值，request基础方法内不做任何提示，code=300
    if (params.frontParams) { // frontParams 对象
      // debugger
      headers.frontParams = params.frontParams
      // 剔除 frontParams 属性
      const p = {}
      for (const k in params) {
        if (k !== 'frontParams') {
          p[k] = params[k]
        }
      }
      params = p
    }

    headers.frontParams1 = { name: 'createForm-xcs' }
    let URL = url.indexOf('http') !== -1 ? url : baseURL + url
    if (config.isExternal) { // 外部链接
      URL = url
    }
    // debugger
    return new Promise((resolve, reject) => {
      const axiosObj = {
        isExternal: config.isExternal,
        method: method,
        baseURL: URL,
        params: params,
        headers: headers,
        timeout: config.timeout || timeouts
      }
      // 富文本编辑器，保存的传参
      if (config.hasOwnProperty('transformRequest')) {
        // debugger
        axiosObj.transformRequest = config.transformRequest
      }

      axios(axiosObj).then((res) => {
        resolve(res)
      }).catch((err) => {
        _params.controllerAddress = URL
        reject(err)
      })
    })
  },
  /**
   * 原生请求 支持DTO 提交
   * @param url
   * @param method
   * @param headers
   * @param data
   * @param params
   * @returns {Promise<any>}
   */
  createJson (url, method, config, data, params) {
    params = params || {}
    config = config || {}
    const headers = config.headers || {}

    // 前端预置的参数，用来判断作请求接口的逻辑判断，比如： notTipCode:300 表示对应的code值，request基础方法内不做任何提示，code=300
    if (params.frontParams) { // frontParams 对象
      // debugger
      headers.frontParams = params.frontParams
      // 剔除 frontParams 属性
      const p = {}
      for (const k in params) {
        if (k !== 'frontParams') {
          p[k] = params[k]
        }
      }
      params = p
    }

    let URL = url.indexOf('http') !== -1 ? url : baseURL + url
    if (config.isExternal) { // 外部链接
      URL = url
    }

    // debugger
    return new Promise((resolve, reject) => {
      const axiosObj = {
        method: method,
        baseURL: URL,
        data,
        params,
        headers: headers,
        timeout: config.timeout || timeouts
      }
      if (config.hasOwnProperty('transformRequest')) {
        // debugger
        axiosObj.transformRequest = config.transformRequest
      }

      axios(axiosObj).then((res) => {
        resolve(res)
      }).catch((err) => {
        _params.controllerAddress = URL
        reject(err)
      })
    })
  }
}
