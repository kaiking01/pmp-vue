import moment from 'moment'
import $constant from '@/utils/open/constant'
import $validate from '@/utils/open/validate'
import $eltool from '@/utils/open/eltool'

// const bcrypt = require('bcryptjs') // 引入bcryptjs库
import store from '@/store/index'
// eslint-disable-next-line
// import CryptoJS from 'crypto-js'
// eslint-disable-next-line
let debounceNum = 0
/**
 * 公用脚本方法类
 */
export default {
  // 编码 对任何非标准字符进行编码
  encodeContent (value) {
    var str = encodeURIComponent(value)
    // const div = document.createElement('div')
    // debugger
    // div.textContent = str
    // str = div.textContent
    return str
  },
  // 解码 对任何非标准字符进行解码
  decodeContent (value) {
    var str = decodeURIComponent(value)
    // const div = document.createElement('div')
    // debugger
    // div.innerHTML = str
    // str = div.innerText || div.innerHTML
    return str
  },
  //  数组去重 利用ES6 Set去重（ES6中最常用）
  unique (arr) {
    return Array.from(new Set(arr))
  },
  // 去重对象数组
  uniqueObjArr (arr, key) {
    // 第一层for用来控制循环的次数
    for (var i = 0; i < arr.length; i++) {
      const val1 = arr[i][key]
      // 第二层for 用于控制与第一层比较的元素
      for (var j = i + 1; j < arr.length; j++) {
        const val2 = arr[j][key]
        if (val1 === val2) {
          // 删除后面的 即第 j个位置上的元素  删除个数 1 个
          arr.splice(j, 1)
          j--
        }
      }
    }
    return arr
  },
  // // 设置获取数据状态
  // setIsPageTriggerVal (val) {
  //   // val = val + '-' + Math.random()
  //   debugger
  //   this.setKeyVal('storeSystem', 'isPageTrigger', val, 'sessionStorage') // 设置获取数据状态
  // },
  // getIsPageTriggerVal () {
  //   const str = this.getKeyVal('storeSystem', 'isPageTrigger', 'sessionStorage') // 设置获取数据状态
  //   // const arr = str.split('-')
  //   // const val = Number(arr[0])
  //   debugger
  //   return str
  // },
  // 初始化echartData
  initEchartData (_this, res) {
    // const that = this
    const graphData = res.data || {}
    const options = _this.ehcartOptions

    // 柱状图
    const { legend = { data: [] },
      series = [],
      xAxis = { data: [] }
    } = graphData
    // debugger
    if (!_this.$validate.isNull(graphData)) {
      const yAxisName = []
      // const seriesLabel = {
      //   show: true, // 开启显示
      //   position: 'top', // 在上方显示
      //   textStyle: { // 数值样式
      //     color: 'black',
      //     fontSize: 16,
      //     fontWeight: 600
      //   }
      // }

      const seriesArr = []
      const persionMaxArr = []
      let persionMax = 0
      const moneyMaxArr = []
      let hasRight = false
      series.forEach(item => {
        const chartType = _this.$constant.echartType[item.chart]
        const obj = {
          name: item.name,
          type: chartType || 'bar',
          data: item.data,
          barWidth: 20
          // 勿删！！
          // label: {
          //   show: false,
          //   position: 'top',
          //   formatter: function (params) { // 在最顶上的数据顶部添加格式化的总和
          //     let val = params.value
          //     val = that.chartTurnNumber(val) // 数据分等级取整，比如 1000 》 1千
          //     // debugger
          //     return val
          //   }
          // }
        }

        if (item.right === 1) {
          hasRight = true
          // debugger
          // obj.label = seriesLabel
          yAxisName.push(item.name)
          obj.yAxisIndex = 1
          options.yAxis[1].axisLabel = { formatter: `{value} ${graphData.rightUnit}` }
          persionMaxArr.push(Math.max(...item.data))
        } else {
          moneyMaxArr.push(Math.max.apply(null, item.data))
        }
        seriesArr.push(obj)
      })
      // debugger
      if (!hasRight) { // 只有左侧 纵向坐标
        options.yAxis = [options.yAxis[0]]
      }

      if (options.yAxis[0]) {
        // debugger
        // const moneyMax = Math.max(...moneyMaxArr)
        // const moneyMaxObj = _this.$common.cacularMaxValue(moneyMax) // // 计算该值的向上取整10的倍数的最大值，以及间隔数

        // debugger
        // TODO1:注意一旦右侧纵坐标值大于左侧纵坐标值，这里就不适用了
        const moneyMax = this.formatInt(Math.max(...moneyMaxArr) * 1.3) // 该系数乘以柱形的最大高度值，决定了统计图的y轴最大值。
        persionMax = Math.max(...persionMaxArr)
        const moneyMaxObj = { max: moneyMax, interval: parseInt(moneyMax / 6) }
        // debugger

        options.yAxis[0].max = moneyMaxObj.max // 资金最大值
        options.yAxis[0].interval = moneyMaxObj.interval // 资金每段多少
      }

      if (options.yAxis[1]) {
        persionMax = Math.max(...persionMaxArr)
        const persionMaxObj = _this.$common.cacularMaxValue(persionMax) // // 计算该值的向上取整10的倍数的最大值，以及间隔数

        options.yAxis[1].name = yAxisName.join('/') // 右侧Y轴名字
        options.yAxis[1].max = persionMaxObj.max // 人数最大值
        options.yAxis[1].interval = persionMaxObj.interval // 人数每段多少
      }

      options.series = seriesArr
      options.xAxis[0].data = xAxis.data
      options.legend.data = legend.data
    } else {
      options.series.forEach(obj1 => {
        const arr = obj1.data || []
        arr.forEach((value, i) => {
          arr[i] = 0
        })
      })
    }

    return options
  },
  // 统计图 数据分等级取整，比如 1000 》 1千
  chartTurnNumber (val) {
    // if (val === 476894) {
    //   debugger
    // }
    let unit = ''
    let num = 0
    if (val >= 100000000) { // 亿
      unit = '亿'
      num = 100000000
    } else if (val >= 10000000) { // 千万
      unit = '万'
      num = 10000
    } else if (val >= 1000000) { // 百万
      unit = '万'
      num = 10000
    } else if (val >= 100000) { // 十万
      unit = '万'
      num = 10000
    } else if (val >= 10000) { // 万
      unit = '万'
      num = 10000
      // debugger
    } else if (val >= 1000) { // 千
      unit = '千'
      num = 1000
    }

    if (unit) {
      const v0 = val / num // 小数点前的数(这里说的小数点是指最终结果，而不是num)
      const v1 = Math.floor(v0)
      let v2 = val % num // 小数点后的数(这里说的小数点是指最终结果，而不是num)
      if (v2 !== 0) {
        v2 = '' + Math.ceil(v2)
        const v3 = v2.slice(0, 1)

        // 获取多余的数字，然后组成新的小数，最后取整
        const v4 = parseInt(v2.slice(1))
        const v5 = Number(v3 + '.' + v4)
        const v6 = Math.ceil(v5)
        val = `${v1}.${v6}${unit}`
      } else {
        val = `${v1}${unit}`
      }
    } else if (val > 0) {
      if (val.toString().indexOf('.') > -1) { // 有小数点，则保留两位小数
        val = val.toFixed(2)
      }
    }
    return val
  },
  /**
   * 将数字取整为10的倍数
   * @param {Number} num 需要取整的值
   * @param {Boolean} ceil 是否向上取整
   * @param {Number} prec 需要用0占位的数量
   */
  formatInt (num, prec = 2, ceil = true) {
    const len = String(parseInt(num)).length
    // debugger
    if (len <= prec) {
      return num
    } else {
      prec = len - prec
    }

    const mult = Math.pow(10, prec)
    const t1 = Math.ceil(num / mult)
    const t2 = Math.floor(num / mult)
    return ceil ? t1 * mult : t2 * mult
  },
  // 计算该值的向上取整10的倍数的最大值，以及间隔数
  cacularMaxValue (val) {
    const setctionNum = 6 // 分几段
    let interval = 0 // 每一段多少
    let max = 0
    if ($validate.isNull(val)) {
      max = 2
    } else {
      const t1 = Math.ceil(val / setctionNum)
      // debugger
      max = (t1 * 2) * setctionNum
    }
    interval = max / setctionNum
    return {
      max: max, interval
    }
  },
  // 延时
  delay (time) {
    time = time || 100
    return new Promise((resolve) => {
      // debugger
      setTimeout(() => {
        // debugger
        console.log('delay', time)
        resolve()
      }, time)
    })
  },
  // 批量处理 获取选中的参数
  /**
   * 批量处理 获取选中的参数
   * @params {Object} that 单页面的实例
   * @params {Array} tablesRows 表格行记录
   * @params {Object} config 配置参数
   * @return {Array} ids 数组id
   */
  getParamsOfMore (that, tableRows, config) {
    config = config || {}

    if (!config.hasOwnProperty('isShowTip')) { // 默认为true
      config.isShowTip = true
    }

    // debugger
    // if (!$validate.isNull(config)) {
    //   if (!config.hasOwnProperty('isShowTip')) { // 默认为true
    //     config.isShowTip = true
    //   }
    // } else {
    //   if (!config.hasOwnProperty('isShowTip')) { // 默认为true
    //     config.isShowTip = true
    //   }
    //   // config = { isShowTip: true }
    // }

    tableRows = tableRows || []
    let array = []
    const key = config.key || 'keyId'
    // debugger
    if (Array.isArray(tableRows) && tableRows.length > 0) {
      // 单选
      array = tableRows
    } else {
      // 多选
      array = that.selectTableRows || []
    }
    const ids = []
    if (array.length === 0) {
      if (config.isShowTip) {
        $eltool.warnMsg(config.tip || '请勾选需要操作的数据！')
      }
      // return false
    } else {
      for (const k of array) {
        ids.push(k[key])
      }
    }
    return ids
  },
  /**
   * 设置公共页标题 面包屑
   * @param {String} title 标题
   */
  setCurPageBreadCurmbTit (title) {
    // debugger
    console.log('title---------', title)
    // 放在路由跳转之后修改，避免被覆盖
    setTimeout(() => {
      // debugger
      if ($validate.isNull(title)) {
        title = ''
      }
      this.setKeyVal('app', 'curPageTitle', title, 'sessionStorage')
    }, 200)
  },
  /**
   * 深度递归过滤对象字段
   * @param {Array} includeArr 需要保留的字段
   * @param {Object} keyVal 原对象字段对应的字段名
   * @param {Array,Object} data 数据
   */
  recursionFilterFile (includeArr, keyVal, data) {
    const type = this.getType(data)
    let obj
    if (type === 'array') {
      obj = []
    } else if (type === 'object') {
      obj = {}
    } else {
      return data
    }
    if (type === 'array') {
      for (let i = 0, len = data.length; i < len; i++) {
        const item = this.recursionFilterFile(includeArr, keyVal, data[i])
        // if (obj.length <= 2) {
        obj.push(item)
        // }
      }
    } else if (type === 'object') {
      for (const key in data) {
        if (includeArr.indexOf(key) > -1 && data.hasOwnProperty(key)) {
          const value = this.recursionFilterFile(includeArr, keyVal, data[key]) || ''
          let key1 = keyVal[key]
          if (key1 === undefined) { // 若没有键值对，则key和value取一样
            key1 = key
          }
          obj[key1] = value
        }
      }
    }
    return obj
  },
  /**
   * 递归遍历
   * @param {Array} arr 数组
   * @param {String} childName 子级字段名
   */
  recursionArr (arr, childName, fn) {
    arr = arr || []
    for (const obj of arr) {
      const item = childName ? obj[childName] : obj
      fn && fn(item, obj)
      if (Array.isArray(item) && item.length > 0) {
        this.recursionArr(item, childName, fn)
      }
    }
  },
  /**
   * 递归遍历 设置pid
   * @param {Array} arr 数组
   * @param {String} pid 父级id
   */
  recursionSetPid (arr, pid) {
    arr = arr || []
    for (const obj of arr) {
      const child = obj.children
      obj.pid = pid
      if (Array.isArray(child) && child.length > 0) {
        this.recursionSetPid(child, obj.keyId)
      }
    }
  },
  /**
   * 递归遍历查找，匹配到第一个就返回
   * @param {Array} arr 数组
   * @param {String} childName 子级字段名
   * @param {String} key 字段
   * @param {any} val 值
   * @returns 返回匹配的值，或者null
   */
  recursionFindOne (arr, childName, key, val) {
    for (let index = 0; index < arr.length; index++) {
      const obj = arr[index]
      const item = childName ? obj[childName] : obj.children
      // debugger
      // console.log(obj.name, obj.code, item)
      if (obj[key] === val) {
        // debugger
        return obj
      } else if (Array.isArray(item) && item.length > 0) {
        const result = this.recursionFindOne(item, childName, key, val)

        // 这个判断很重要，在没有返回值的情况下才进行递归
        if (result) {
          return result
        }
      }
    }
    return null
  },
  /**
 * 格式化时间
 * pattern
 * yyyy-MM-dd HH:mm:ss
 * @param datetime
 * @param pattern
 */
  format (datetime, pattern) {
    return moment(datetime).format(pattern)
  },
  // 设置连接参数
  setHrefParams (q) {
    // const query = this.queryParams
    var queryParams = this.getCurPathParam()
    // const obj = Object.assign({}, query, q)
    const obj = { ...queryParams, ...q }
    this.onlyModifyParamsOnUrl(obj, { isReplace: true }) // TODO1:1关于该方法修改了query参数，是否需要及时更新queryParams
  },
  /**
   * 在不刷新页面的情况下，修改url参数
   * @param {Object} data
   *  主要方法h5的 pushState(replaceState 和 pushState 唯一的区别：replaceState不会新增历史，pushState会新增历史)
   *  stateObject:JavaScript对象，通过pushState方法可以将stateObject内容传递到新页面中;
   *  title: 几乎没有浏览器支持该参数，但是传一个空字符串会比较安全。
   *  url: 新的历史记录条目的地址（可选，不指定的话则为文档当前URL）；浏览器在调用pushState()方法后不会加载该地址；传入的URL与当前URL应该是同源的，否则，pushState()会抛出异常。
   * @param {Object} config
   */
  onlyModifyParamsOnUrl (data, config) {
    config = config || {}
    // const tt = window.location
    let url = ''
    let len = ''
    if ($constant.isRouterHistory) {
      // router history mode
      // debugger
      url = location.href
      len = url.indexOf('?')
    } else {
      // router hash mode
      // debugger
      url = location.hash
      len = url.indexOf('?')
    }

    if (len !== -1) {
      url = url.substring(0, len)
    }

    const str = this.obj2Str(data)
    url += str
    if (config.isReplace) {
      history.replaceState({}, '', url)
      // debugger
      // merge(router.query, data)
      // router.replace({ query: data })
    } else {
      history.pushState({}, '', url)
    }
  },
  /**
   * 节流函数: 指定时间间隔内只会执行一次任务
   * @param {function} fn
   * @param {Number} interval
   */
  throttle (fn, interval = 300) {
    let canRun = true
    // console.log('节流-throttle-1')
    return function () {
      // console.log('节流-throttle-2')
      if (!canRun) return
      canRun = false
      setTimeout(() => {
        // console.log('节流-throttle-3')
        fn.apply(this, arguments)
        canRun = true
      }, interval)
    }
  },
  /**
   * 防抖: 指定时间间隔内只会执行一次任务，并且该时间段内再触发，都会重新计算时间。(函数防抖的非立即执行版)
   * 在频繁触发某些事件，导致大量的计算或者非常消耗资源的操作的时候，防抖可以强制在一段连续的时间内只执行一次
   * */
  debounce (fn, delay, config) {
    const _delay = delay || 200
    config = config || {}
    // const _this = this // 该this指向common.js
    // console.log('debounce', this, config.eventType, arguments)
    return function () {
      const th = this // 该this指向实例
      const args = arguments
      // debounceNum++
      // let str = `, label: ${th && th.listItem && th.listItem.label}`
      // console.log('debounce++', ', debounceNum:', debounceNum, ', timer: ', fn.timer, str, config.eventType)
      if (fn.timer) {
        // console.log('debounce-clearTime', ', debounceNum:', debounceNum, ', timer: ', fn.timer, config.eventType)
        clearTimeout(fn.timer)
        fn.timer = null
      } else {
        // fn.debounceNum = debounceNum
      }
      fn.timer = setTimeout(function () {
        // str = `, label: ${th && th.listItem && th.listItem.label}`
        // console.log('debounce-setTimeout', ', debounceNum:', fn.debounceNum, ', timer: ', fn.timer, str, config.eventType)
        fn.timer = null
        fn.apply(th, args)
      }, _delay)
    }
  },
  /**
 * 对象转url str
 * 只支持一级obj
 */
  obj2Str (obj) {
    // debugger
    if ($validate.isNull(obj)) {
      return ''
    }
    let str = ''
    const unique = {}
    for (const key in obj) {
      // debugger
      if (!unique[key] && key && obj.hasOwnProperty(key)) {
        unique[key] = true
        let val = obj[key]
        // if (this.checkChinese(val)) {
        val = encodeURIComponent(val)
        // }
        str += '&' + key + '=' + val
      }
    }
    str = '?' + str.substr(1)
    return str
  },
  // str转json对象
  str2Obj (str) {
    const newObj = {}
    // debugger
    if (str) {
      const sysbolIndex = str.lastIndexOf('?')
      if (sysbolIndex > -1) {
        // 有？则从?后开始截取
        str = str.substr(1)
      }

      const obj = str.split('&')
      let arr = []
      for (const key of obj) {
        arr = key.split('=')
        newObj[arr[0]] = arr[1]
      }
    }
    // debugger
    return newObj
  },
  /**
 * 数组转对象，深拷贝
 * @param {array} arr 数组
 * @param {String} keyName colName
 * @param {String} valueName value
 */
  arr2Obj (arr, keyName, valueName) {
    arr = arr || []
    let obj = {}
    // debugger
    arr.forEach(item => {
      if (Array.isArray(item)) {
        const obj1 = this.arr2Obj(item)
        // debugger
        obj = this.deepCloneObj(obj1)
        // debugger
      } else {
        if (keyName) {
          const value = item[valueName]
          obj[keyName] = value
        } else {
          const key = item.colName
          const value = item.value
          obj[key] = value
          // debugger
          // for (const key in item) {
          //   const value = item[key]
          //   obj[key] = value
          //   debugger
          // }
        }
      }
    })
    return obj
  },
  // 查找两个数组的不同
  getArrDifference (arr1, arr2) {
    return arr1.concat(arr2).filter(function (v, i, arr) {
      return arr.indexOf(v) === arr.lastIndexOf(v)
    })
  },
  // 字符串拼接
  /**
 * @param {String} str1
 * @param {Array} arr
 * @return {String} str
 */
  splitStr (str1, arr) {
    let str = !str1 ? '' : str1.toString()
    if (arr.length <= 0) return str
    arr.forEach(item => {
      str += ' ' + item
    })
    return str.trim()
  },
  /**
 * 获取链接末尾参数
 */
  getCurPathParam () {
    // debugger
    const newObj = {}
    if (!$constant.isRouterHistory) { // 路由模式 true:history; false:hash
      const url = location.hash // 获取链接 #/...? 后的字符串，并组合成 json 格式
      const reg = /#\/.*?\?/gi

      // if(url.indexOf('?') !== -1){
      const res = url.match(reg)
      // debugger
      if (res && url.match(reg).length > 0) {
        // let str = url.substr(3);
        let str = url.replace(reg, '')
        str = str.replace(/#\/$/, '')
        const strs = str.split('&')
        for (let i = 0; i < strs.length; i++) {
          const key = strs[i].split('=')[0]
          const value = strs[i].split('=')[1]
          newObj[key] = decodeURIComponent(value)
        }
      }
    } else {
      let url = location.search // 获取链接 #/...? 后的字符串，并组合成 json 格式
      if (url) {
        url = url.substr(1)
        const obj = url.split('&')
        let arr = []
        for (const key of obj) {
          arr = key.split('=')
          newObj[arr[0]] = arr[1]
        }
      }
    }
    return newObj
  },
  /**
 * 存储 store , sessionStorage
 * 注意传参格式
 * @param {String} module
 * @param {String} key
 * @param {String} val
 * @param {String} storeName 可不传 localStorage,sessionStorage
 */
  setKeyVal (module, key, val, storeName) {
    const fnName =
      module + '/Update' + key.substring(0, 1).toUpperCase() + key.substring(1)
    // debugger
    const type = $validate.judgeTypeOf(val)
    if (type !== 'String' && type !== 'Undefined' && type !== 'Null') {
      store.dispatch(fnName, val)
      if (storeName) {
        let val1 = this.deepCloneObj(val)
        val1 = JSON.stringify(val1)
        window[storeName].setItem(key, val1)
      }
    } else {
      if (storeName) {
        window[storeName].setItem(key, val)
      }

      try {
        if (val.match(/\{/)) {
          // 若匹配到{则说明是json字符
          val = JSON.parse(val)
        }
      } catch (e) {
        // dosome...
      } finally {
        if (type === 'String') {
          store.dispatch(fnName, val)
        }
      }
    }
  },
  /**
 * 获取 store,sessionStorage
 * @param {String} module 模块名字
 * @param {String} key state属性
 * @param {Boolean} storeName localStorage,sessionStorage
 */
  getKeyVal (module, key, storeName) {
    let val = store.state[module][key]
    // debugger
    // if (key === 'token') {
    //   debugger
    // }
    if ($validate.isNull(val) && !$validate.isNull(storeName)) {
      val = window[storeName].getItem(key)
      if (!$validate.isNull(val)) {
        this.setKeyVal(module, key, val)

        const type = $validate.judgeTypeOf(val)
        if (type === 'String' && val.match(/\{/)) {
          // 若匹配到{则说明是json字符
          val = JSON.parse(val)
        }
      }
    }
    return val
  },
  /**
 * 设置 临时 缓存
 * @param key
 * @param value
 */
  setSession (key, value) {
    // debugger
    return new Promise((resolve, reject) => {
      try {
        window.sessionStorage.setItem(key, JSON.stringify(value))
        resolve()
      } catch (e) {
        console.error('setSession 错误')
        reject('setSession 错误')
      }
    })
  },
  /**
 * 获取 临时 缓存
 * @param key
 */
  getSession (key) {
    const item = window.sessionStorage.getItem(key)
    if ($validate.isNull(item)) {
      return ''
    }
    return JSON.parse(window.sessionStorage.getItem(key))
  },
  /**
 * 设置 永久 缓存
 * @param key
 * @param value
 */
  setLocalStorage (key, value) {
    // debugger
    return new Promise((resolve, reject) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value))
        resolve()
      } catch (e) {
        console.error('setSession 错误')
        reject('setSession 错误')
      }
    })
  },
  /**
 * 获取 永久 缓存
 * @param key
 */
  getLocalStorage (key) {
    const item = window.localStorage.getItem(key)
    if ($validate.isNull(item)) {
      return ''
    }
    return JSON.parse(window.localStorage.getItem(key))
  },
  /**
 * 获取 cookie
 * @param key
 */
  getCookie (key) {
    // return Cookies.get(key)
  },
  /**
 * 设置 cookie
 * @param key
 */
  setCookie (key, val) {
    // return Cookies.set(key, val)
  },
  /**
 * 删除 cookie
 * @param key
 */
  removeCookie (key) {
    // return Cookies.set(key)
  },
  clearCookie (name) {
    var myDate = new Date()
    myDate.setTime(-1000) // 设置时间
    for (var i = 0, len = name.length; i < len; i++) {
      document.cookie = '' + name[i] + "=''; path=/; expires=" + myDate.toGMTString()
    }
  },
  /**
 * 对象，浅拷贝
 * @param {Object} obj
 */
  easyCloneObj (obj) {
    const newObj = {}
    for (const i in obj) {
      if (i && obj.hasOwnProperty(i)) {
        newObj[i] = obj[i]
      }
    }
    return newObj
  },
  /**
 * 对象，深拷贝
 * @param {Object} obj
 */
  deepCloneObj (data) {
    const type = this.getType(data)
    let obj
    // debugger
    if (type === 'array') {
      obj = []
    } else if (type === 'object') {
      obj = {}
    } else {
      return data
    }
    if (type === 'array') {
      for (let i = 0, len = data.length; i < len; i++) {
        obj.push(this.deepCloneObj(data[i]))
      }
    } else if (type === 'object') {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          obj[key] = this.deepCloneObj(data[key])
        }
      }
    }
    return obj
  },
  // 复制对象公共属性的值
  /**
 * 复制对象公共属性的值
 * @param {Object} obj1 拷贝的对象
 * @param {Array} arr 被拷贝的数组对象
 */
  copyObjComVal (obj1, arr) {
    // debugger
    if ($validate.isNull(obj1) && $validate.isNull(arr)) {
      return obj1
    }
    // debugger
    for (let obj2 of arr) {
      obj2 = obj2 || {}
      if ($validate.isNull(obj2)) {
        continue
      }
      for (const key in obj1) {
        if (key && obj2.hasOwnProperty(key)) {
          obj1[key] = obj2[key]
        }
      }
    }

    return obj1
  },
  /**
 * 复制对象属性
 * @param {Object} obj1 拷贝的对象
 * @param {Array} arr 被拷贝的数组对象
 */
  copyObjVal (obj1 = {}, arr = []) {
    // debugger
    if ($validate.isNull(obj1) && $validate.isNull(arr)) {
      return obj1
    }
    // debugger
    for (let obj2 of arr) {
      obj2 = obj2 || {}
      if ($validate.isNull(obj2)) {
        continue
      }
      for (const key in obj2) {
        if (key && obj2.hasOwnProperty(key)) {
          obj1[key] = obj2[key]
        }
      }
    }

    return obj1
  },
  /**
 * 删除Object的某些属性
 * @param {Object} O
 * @param {Array} arr
 */
  rmProByKey (O, arr) {
    for (const key of arr) {
      delete O[key]
    }
  },
  // 正则表达式截取html标签内的内容
  getHtmlText (val) {
    const reg = /<[^<>]+>/g
    val = val.replace(reg, '')
    val = val.replace(/&nbsp;/g, ' ')
    // val = this.faceTopic2Img(val)
    return val
  },
  /**
 * 获取对象属性类型
 * @param e
 * @returns {string}
 */
  getType (value) {
    var type = ''
    // if (value == null) {
    //   return type
    // }
    if (typeof value !== 'object') {
      type = typeof value
      // debugger
    } else {
      // debugger
      if (value instanceof Array) {
        type = 'array'
      } else if (value instanceof Object) {
        type = 'object'
      } else if (value instanceof Function) {
        type = 'function'
      } else if (typeof value === 'string') {
        type = 'string'
      } else {
        type = 'null'
      }
    }
    return type

    // if (value.constructor === Array) {
    //   return 'array'
    // } else if (value.constructor === Object) {
    //   return 'object'
    // } else if (value.constructor === String) {
    //   return 'string'
    // } else if (value.constructor === Number) {
    //   return 'number'
    // } else if (value.constructor === Boolean) {
    //   return 'boolean'
    // }
    // return ''
  },
  /**
 * 获取dom元素style
 * @param dom
 * @param attr
 */
  getStyle (dom, attr) {
    // debugger
    if (dom.currentStyle) {
      return dom.currentStyle[attr]
    } else {
      return getComputedStyle(dom, null)[attr]
    }
  },
  /**
 * 查找父元素
 * @param {Object} child 目标dom元素
 * @param {String} parentCls 父元素的class
 */
  getParentByClass (child, parentCls, config) {
    config = config || null
    let pNode = null
    try {
      if (!child) { //  不能加这个判断，否则拖拽会出问题 || child.tagName === 'BODY' BODY 查找的上限
        return {
          flag: false,
          dom: child
        }
      }

      if (child.classList.contains(parentCls) || (config && child.classList.contains(config.limitClassName))) { // limitClassName 自定义查找的上限
        return {
          flag: false,
          dom: child
        }
      }

      pNode = child.parentNode
      if (pNode && pNode.classList.length && pNode.classList.contains(parentCls)) {
        return {
          flag: true,
          dom: pNode
        }
      } else {
        return this.getParentByClass(pNode, parentCls, config)
      }
    } catch (err) {
      // TODO:拖拽这里跨行会报错,待解决
      // console.log(pNode, pNode.nodeName, err)
    }
  },
  /**
 * 获取元素的位置以及大小
 * @param {Object} el dom
 */
  getRect (el) {
    if (!el) {
      return false
    }
    if (el instanceof window.SVGElement) {
      const rect = el.getBoundingClientRect()
      return {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      }
    } else {
      return {
        top: el.offsetTop,
        left: el.offsetLeft,
        width: el.offsetWidth,
        height: el.offsetHeight
      }
    }
  },
  getComputedStyleFn (el, attr) {
    //    兼容IE和火狐谷歌等的写法
    let attrVal = {}
    // debugger
    if (window.getComputedStyle) {
      // attrVal = parseInt(getComputedStyle(el, attr))
      attrVal = getComputedStyle(el, null)
    } else {
      attrVal = el.currentStyle// 兼容IE的写法
    }
    return attrVal
  },
  /**
 * 通过数组键值删除元素
 * @param {Array} arr 数组
 * @param {String} key 匹配的键，可能为空
 * @param {String} val 匹配的值
 */
  removeByKey (arr, key, val) {
    const index = this.findKey(arr, key, val)
    if (index > -1) {
      arr.splice(index, 1)
    }
  },
  /**
 * 返回数组匹配到的索引
 * @param {Array} arr 数组
 * @param {String} key 匹配的键
 * @param {String} val 匹配的值
 * @return {Number} index 返回匹配到的索引
 */
  findKey (arr, key, val) {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      let value = item[key]
      if (key === '') {
        value = item
      }
      if (value === val) {
        return i
      }
    }
    return -1
  },
  // 根据父级标签名，查找某元素的父级，找到立马返回
  /**
   * @param {Node} el 当前元素Node
   * @param {String} parentName 当前元素父级的标签名，必须大写
   * @returns Node
   */
  findEleParentNode (el, parentName) {
    if (!el) {
      return el
    }
    // debugger
    parentName = parentName || 'BODY'
    let pNode = null
    pNode = el.parentNode
    if (pNode.nodeName !== parentName) {
      pNode = this.findEleParentNode(pNode, parentName)
    }
    // debugger
    return pNode
  },
  // TODO:待完善
  // 查找所有匹配的父级
  findEleParentAllNode (el, parentName, parentArr) {
    if (!el) {
      return el
    }
    parentArr = parentArr || []
    const parentNode = el.parentNode
    // let attrType = ''
    let attrName = parentName || 'BODY'
    let bool = false
    debugger
    if (attrName.indexOf('.') > -1) { // class
      // attrType = 'class'
      attrName = attrName.replace('.', '')
      bool = parentNode.classList.contains(attrName)
    } else if (attrName.indexOf('#') > -1) { // id
      // attrType = 'id'
      attrName = attrName.replace('#', '')
      bool = parentNode.id === attrName
    } else { // 元素名称
      const parentNodeName = parentNode.nodeName
      bool = parentNodeName === attrName
    }
    if (bool) {
      parentArr.push(parentNode)
    }

    if (parentNode.nodeName !== attrName) {
      return this.findEleParentAllNode(parentNode, attrName, parentArr)
    }
    return parentArr
  },
  /**
 * 查找父元素
 * @param {Nodes} el 元素
 * @param {String} attrName class,id
 */
  fintParentEle (el, attrName) {
    let targetEle = null
    // debugger
    if (!el) {
      return document.body
    } else {
      const parentNode = el.parentNode
      if (!parentNode) {
        // debugger
        return document.body
      }
      let bool = false
      const parentNodeName = parentNode.nodeName.toLowerCase()
      // debugger
      if (parentNodeName === 'body') { // 上限是body
        bool = true
      } else if (attrName.indexOf('.') > -1) { // class
        const cls = attrName.replace('.', '')
        bool = parentNode.classList.contains(cls)
      } else if (attrName.indexOf('#') > -1) { // id
        const id = attrName.replace('#', '')
        bool = parentNode.id === id
      } else { // 元素名称
        bool = parentNodeName === attrName.toLowerCase()
      }
      // debugger
      if (bool) {
        targetEle = parentNode
      } else {
        targetEle = this.fintParentEle(parentNode, attrName)
      }
    }
    // debugger
    return targetEle
  },
  // 查找兄弟级元素，并返回
  /**
 * 查找兄弟级元素，并返回
 * @param {Node} el
 * @param {Array} ExceptArr 排除个别node 有.的是class，有#的是id,都没有的是标签名
 */
  findSiblingsEle (el, ExceptArr) {
    let array = []
    if (!el) {
      return array
    }
    const pDom = el.parentNode
    const childArr = pDom.children // 获取到所有的子元素
    // node.children 转为数组
    try {
      array = Array.prototype.slice.call(childArr, 0)
    } catch (ex) {
      array = []
      for (var i = 0, len = childArr.length; i < len; i++) {
        array.push(childArr[i])
      }
    }
    // debugger
    // 排除个别子元素
    if (ExceptArr && Array.isArray(ExceptArr) && ExceptArr.length > 0) {
      for (const attrName of ExceptArr) {
        // debugger
        for (var j = 0; j < array.length; j++) {
          const o = array[j]
          let bool = false
          // debugger
          if (this.isDOMFn(attrName)) {
            // debugger
            bool = o === attrName
          } else if (attrName.indexOf('.') > -1) {
            const t = attrName.replace('.', '')
            if (o.classList.contains(t)) {
              bool = true
            }
          } else if (attrName.indexOf('#') > -1) {
            var t = attrName.replace('#', '')
            // debugger
            if (o.id === t) {
              bool = true
            }
          }

          if (bool) {
            array.splice(j, 1)
            --j
          }
          // if (o.classList.contains(attrName)) {
          //   // debugger
          //   array.splice(j, 1)
          //   --j
          //   // debugger
          // }
        }
      }
    }

    // debugger
    return array
  },
  turnNodeListArr (domArr) {
    return [].slice.call(domArr, 0)
  },
  // 首先要对HTMLElement进行类型检查，因为即使在支持HTMLElement的浏览器中，类型却是有差别的，在Chrome,Opera中HTMLElement的类型为function，此时就不能用它来判断了
  isDOMFn (dom) {
    let bool = false
    // debugger
    if (HTMLElement === 'object') {
      bool = dom instanceof HTMLElement
    } else {
      if (dom && typeof dom === 'object' && dom.nodeType === 1 && typeof dom.nodeName === 'string') {
        bool = true
      }
    }
    return bool
  }
}
