import moment from 'moment'
import $constant from '@/utils/open/constant'
import $validate from '@/utils/open/validate'
import $eltool from '@/utils/open/eltool'

import { commonApi } from '@/api/modules/api-common'

// const bcrypt = require('bcryptjs') // 引入bcryptjs库
import qs from 'qs'
import store from '@/store/index'
import router from '@/router'
// eslint-disable-next-line
import CryptoJS from 'crypto-js'
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
  // // 数组去重 - 结构版
  // distinct: function (arr, o) {
  //   let len = arr.length
  //   for (let i = 0; i < len; i++) {
  //     for (let j = i + 1; j < len; j++) {
  //       if (arr[i][o] === arr[j][o]) {
  //         arr.splice(j, 1)
  //         len--
  //         j--
  //       }
  //     }
  //   }
  //   return arr
  // },
  // // 数组去重 - 简版
  // // 利用for嵌套for，然后splice去重（ES5中最常用）
  // distinctFn: function (arr) {
  //   let len = arr.length
  //   for (let i = 0; i < len; i++) {
  //     for (let j = i + 1; j < len; j++) {
  //       if (arr[i] === arr[j]) { // 第一个等同于第二个，splice方法删除第二个
  //         arr.splice(j, 1)
  //         len--
  //         j--
  //       }
  //     }
  //   }
  //   return arr
  // },
  /**
   * 初始化页面的权限按钮
   * @param {Array} arr1 页面中定义的权限元素集合比如 btnList
   * @param {String} key 匹配的关键字段(其关键字段可能是id或者value)
   * @returns arr
  */
  initPowerData (arr1, key, cfg) {
    cfg = cfg || {}
    const arr = []
    const persionalPowerBtnData = this.getKeyVal('storePermission', 'persionalPowerBtnData')
    const persionalPowerBtnList = persionalPowerBtnData.data
    if (cfg.findOneId) { // 精确匹配某个按钮权限
      // debugger
      const index = this.findKey(persionalPowerBtnList, 'id', cfg.findOneId)
      // debugger
      if (index > -1) {
        return true
      }
      return false
    } else {
      arr1.forEach(o => {
        let val = o[key]
        const type = this.getType(val)
        // debugger
        val = type === 'undefined' ? o.value : val // 关键字端一般为value和id
        if (val.indexOf('releaseAuth') > -1) { // releaseAuth 放开权限
          arr.push(o)
        } else {
          const index = this.findKey(persionalPowerBtnList, 'id', val)
          if (index > -1) {
            arr.push(o)
          }
        }

        // 考虑子级的情况
        const child = o[cfg.childName]
        if (cfg && child && Array.isArray(child) && child.length > 0) {
          const res = this.initPowerData(child, key, cfg)
          // debugger
          if (res.length <= 0) {
            o.eleType = '' // 当子级没有数据，则设置eleType为空，即不显示
          }
          o[cfg.childName] = res
        }
      })
    }

    return arr
  },
  /**
   * 路由拦截 通过构造器方法，创建协程来控制方法的一步步执行
   * @param {Number} num 0.获取状态 1.休息中 2.等待确认 3.确定 4.取消
   */
  genRouterParamsFn (num) {
    this.setKeyVal('storeSystem', 'isPageTrigger', num, 'sessionStorage') // 0.获取状态 1.休息中 2.等待确认 3.确定 4.取消
    // this.setIsPageTriggerVal(num) // 设置获取数据状态
    window.genRouterPedding && window.genRouterPedding.next()
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
  // // 在当前页码 刷新 列表数据
  // /**
  //  * 在当前页码 刷新 列表数据
  //  * @param {Object} _this
  //  * @param {Object} data {domName,tableIndex}
  //  */
  // refreshCurPageData (_this, data) {
  //   data = data || {}
  //   const { domName = 'tableDom', tableIndex = 0 } = data
  //   // debugger
  //   const dom = _this.$refs[domName]
  //   if (Array.isArray(dom) && dom.length > 0) {
  //     const dom1 = dom[tableIndex]
  //     dom1.refreshPageDataFn()
  //   } else {
  //     dom && dom.refreshPageDataFn()
  //   }
  // },
  // 设置表格loading状态
  setTableLoadingStatus (that, key, value, _delay) {
    _delay = _delay || 30
    that.$nextTick(() => {
      setTimeout(() => {
        that[key] = value
      }, _delay)
    })
  },
  turnDataType (type) {
    if ($validate.isNull(type)) return 'string'
    // debugger
    type = type.toString().toLowerCase()
    // colType= INT,CHAR,DATE,TIME,DATETIME,NUMBER,MONTH,YAER,TEXT
    const initType = ['char', 'varchar']
    if (initType.indexOf(type) > -1) {
      return 'string'
    } else if (type === 'number') { // 因为element-ui form表单校验对数据类型有要求，这里前端提交的数据类型都设置为字符
      return 'string'
    } else if (type === 'boolean') {
      return 'boolean'
    }
  },
  // 数据类型 处理
  initDataType (colType, val) {
    // debugger
    let value = val
    const type = colType.toLowerCase()
    if (type === 'int') { // 整型  // 因为element-ui form表单校验对数据类型有要求，这里前端提交的数据类型都设置为字符
      // value = parseInt(val)
      value = '' + val
    } else if (type === 'number') { // 数字类型 // 因为element-ui form表单校验对数据类型有要求，这里前端提交的数据类型都设置为字符
      if ('' + val) { // 为空不执行
        // value = Number(val)
        value = '' + val
      }
    } else if (type === 'char' || type === 'varchar') { // 数字类型
      value = '' + val
    }
    return value
  },
  // 获取编辑的表单数据 - 数据清洗
  getEditFormData (data, params) {
    return new Promise((resolve, reject) => {
      commonApi.getEditFormData(data, params).then(res => {
        this.initEditFormData(res.data) // 处理组件EditForm数据
        // debugger
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 获取添加的表单数据 - 数据清洗
  getAddFormData (data, params) {
    return new Promise((resolve, reject) => {
      commonApi.getAddForm(data, params).then(res => {
        this.initEditFormData(res.data) // 处理组件EditForm数据
        // debugger
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 公共方法保存
   * @param {Object} params 参数
   * @param {Object} originData 修改前的数据
   * @param {Object} curData 当前的数据
   * @returns Promise
   */
  saveDataFormFn (data1, fn) {
    const {
      that = this,
      params,
      originData,
      curData,
      groupsItem = {},
      updateConfig = {}
    } = data1
    const str1 = qs.stringify(originData)
    const str2 = qs.stringify(curData)
    const isChange = str1 !== str2 // 不等，说明有改动

    let validType = 1 // validType: 0.校验不通过 1.暂无修改 2.可保存
    const fnType = (this.getType(fn) === 'function')
    // debugger
    if (!isChange) {
      validType = 1
      fnType && fn({ code: 202, message: '暂无修改，不需保存！', validType })
      return
    } else {
      const data = this.compareInitData(groupsItem, originData, curData)
      // debugger
      if (data.length <= 0) {
        validType = 1
        fnType && fn({ code: 202, message: '暂无修改，不需保存！', validType })
      }
      validType = 2
      if (groupsItem.saveFormFn) { // 调用父级保存方法(父子嵌套组件时用)
        that.$emit('saveForm', { data, params, groupsItem, updateConfig }, fn)
      } else {
        this.comSaveDataFormFn(data, params).then(res => {
          res.validType = validType
          fnType && fn(res)
        }).catch(err => {
          err = err || {}
          err.validType = validType
          fnType && fn(err)
        })
      }
    }
  },
  comSaveDataFormFn (data, params) {
    return commonApi.saveDataForm(data, params)
  },
  /**
   * 获取部门tree数据（简单接口）
   */
  getDepartTreeData (params) {
    // debugger
    return new Promise((resolve, reject) => {
      // debugger
      // 从缓存获取
      const res = this.getKeyVal('storeDepartManage', 'departTreeData', 'sessionStorage')
      // debugger
      if (!$validate.isNull(res)) {
        resolve(res)
        // debugger
        // console.log('-------从缓存获取部门tree数据（简单接口）')
        return
      }
      // debugger
      // 缓存没有，则请求接口
      commonApi.getDepartTree(params).then(res => {
        // debugger
        if (res.code === 200) {
          const rData = {
            code: res.code,
            message: res.message,
            data: { gridData: res.data } // 为了和 getDepartMainTreeData 接口的数据一致
          }
          this.setKeyVal('storeDepartManage', 'departTreeData', rData, 'sessionStorage')
          resolve(rData)
        } else {
          reject()
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // // 获取接口地址
  // getApiUrl () {
  //   let baseURL = ''
  //   // 判断开发环境（一般用于本地代理）
  //   if (process.env.ENV_CONFIG === 'prod') { // 生产环境
  //     baseURL = window.APIURL.prodApiUrl
  //   } else { // 开发环境
  //     baseURL = window.APIURL.devApiUrl
  //   }
  //   return baseURL
  // },
  /**
   * 把 NodeList 转成数组
   * @param {NodeList} nodes
   */
  // convertToArray (nodes) {
  //   var array = null
  //   debugger
  //   array = []
  //   for (var i = 0, len = nodes.length; i < len; i++) {
  //     const val = nodes[i]
  //     array.push(val)
  //   }
  //   return array
  // },
  /**
   * 更多功能 触发
   * item.clickMode: 0.方法 1.url 2.弹窗
   */
  // onClickBtnFn (that, item) {
  //   // console.log('onClickBtnFn', item)
  //   // debugger
  //   item.isParent = 0
  //   if (item.isParent1 - item.isParent) {
  //     // 在父级页执行
  //     item.isParent++ // isParent:number类型，1表示上一级，每到一级都会逐级减一
  //     that.$emit('eventFn', item)
  //   } else if (item.clickMode === 0) {
  //     that[item.fnName](item)
  //   } else if (item.clickMode === 1) {
  //     that.$router.push({ name: item.fnName })
  //   } else {
  //     that[item.fnName] = true
  //   }
  // },

  // 处理组件EditForm数据（初始化表单数据）
  initEditFormData (data, cfg) {
    data = data || {}
    cfg = cfg || {}
    const { isFormRules = true, isAllowEdit = true, isOpenForm = true } = cfg
    data.groups = data.groups || []
    // debugger
    data.groups.forEach(groupsItem => {
      // console.log(' ')
      // console.log('groupLabel:', groupsItem.groupLabel)
      groupsItem.list = groupsItem.list || [] // 员工详情页：个人信息》（教育情况子表，培训经历，证件子集若为空，接口数据 groups=[]）
      const groupsList = groupsItem.list
      groupsItem.isFormRules = isFormRules
      groupsItem.isAllowEdit = isAllowEdit // 是否允许编辑（当所有的表单元素都只读，则不允许编辑）
      groupsItem.isOpenForm = isOpenForm // isOpenForm: true展开 false折叠（点击标题展开/折叠）
      // debugger
      if (!groupsItem.hasOwnProperty('isShowTitle')) {
        groupsItem.isShowTitle = true
      }

      let noEditLen = 0
      groupsList.forEach(listItem => {
        if (!listItem.formItemStyle) {
          listItem.formItemStyle = {} // 初始化，为hideOthers准备
        }
        // 处理子表单隐藏状态
        if (listItem.hideOthers) {
          // debugger
          this.initFormEleHideStatus(groupsList, listItem)
        }
        const rData = this.initFormListItemData(listItem) // 单一处理表单listItem
        listItem = rData.listItem
        noEditLen += rData.noEditLen
      })

      // 当所有子表单都不允许编辑，则设置整个表单不允许编辑
      if (noEditLen === groupsList.length) {
        groupsItem.isAllowEdit = false
      }
    })
    return data
  },
  // 设置表格无数据提示
  initTableDataFn (tableData, tableConfig, config) {
    config = config || { isSetLastW: true }
    // console.log(tableData, tableConfig)
    tableData = tableData || {}
    tableConfig = tableConfig || {}
    const data = tableData
    data.groups = data.groups || []
    data.gridData = data.gridData || []
    data.columns = data.columns || []

    // TODO:记得屏蔽
    // data.gridData = []
    // data.message = 'test-1111'
    // TODO:记得屏蔽

    // this.initTableValueTypeData(tableData)

    if (data.gridData.length === 0 && data.message !== '') {
      tableConfig.emptyTip = data.message
    } else {
      tableConfig.emptyTip = '暂无数据'
    }

    // 列宽的总和
    tableConfig.allColW = 0
    data.columns.forEach(colItem => {
      tableConfig.allColW += colItem.width
    })
    // console.log('window.innerWidth', window.innerWidth, 'tableConfig.allColW', tableConfig.allColW)
    // debugger

    // 非多级表头，若列的宽度总和小于浏览器当前可视区域宽度，则把columns最后一项的width设置为auto
    if (config.isSetLastW && data.groups.length === 0 && data.columns.length > 0) {
      // debugger
      if (tableConfig.allColW < window.innerWidth) {
        console.log('window.innerWidth', window.innerWidth, 'tableConfig.allColW', tableConfig.allColW)
        const columns = data.columns
        const lastItem = columns[columns.length - 1]
        lastItem.minWidth = lastItem.width
        lastItem.width = 'auto'
      }
    }
    return {
      tableData,
      tableConfig
    }
  },
  // 初始化表格数据 valueType
  initTableValueTypeData (data = {}, cfg) {
    cfg = cfg || { trigger: '' }
    data.gridData = data.gridData || []
    data.columns = data.columns || []
    // debugger
    if (data.columns.length <= 0) return

    /**
     * valueType===1，判断该字段下的icon值:
     * 0普通
     * 1.打勾图标（绿色）
     * 2.打叉图标（红色）
     * 3.停止图标（黄色）
     * 4.锁定
     * 5.解锁
     * 11.上升
     * 12.下降
     * 99.label值为一段HTML
     * 101. AVG 求平均值
     * 102. MIN 求最小值
     * 103. MAX 求最大值
    */

    const valueTypeObj = {
      0: '',
      1: '<i class="green-font-color fs-14 pd-r5 el-icon-success" ></i>',
      2: '<i class="danger-font-color fs-14 pd-r5 el-icon-error" ></i>',
      3: '<i class="yellow-font-color fs-14 pd-r5 el-icon-remove" ></i>',
      4: '<i class="fs-14 pd-r5 iconfont icon-suoding" ></i>',
      5: '<i class="fs-14 pd-r5 iconfont icon-jiesuo" ></i>',
      11: '<i class="fs-14 pd-r5 iconfont icon-up" ></i>',
      12: '<i class="fs-14 pd-r5  iconfont icon-down" ></i>',
      99: 'label值为一段HTML-待处理',
      101: '<i class="fs-18 pd-r5 font-bold iconfont icon-pingjunzhi" ></i>',
      102: '<i class="fs-18 pd-r5 font-bold iconfont icon-zuixiaozhi" ></i>',
      103: '<i class="fs-18 pd-r5 font-bold iconfont icon-zuidazhi" ></i>'
    }
    // console.log('valueTypeObj', valueTypeObj)
    // const data = res.data || {}
    // debugger
    const colValueType = {}
    data.columns.forEach(colItem => {
      const colName = colItem.colName
      if (colItem.valueType === 1) {
        if (colItem.FormField) { // 编辑表格，使用FormField作为columns的数据
          colItem.FormField.isHtml = true
        } else { // 普通表格的设置
          colItem.isHtml = true
        }
        // debugger
        colValueType[colName] = colItem
      }
    })

    data.gridData.forEach(row => {
      // debugger
      // console.log('')
      for (const colName in row) {
        const colData = colValueType[colName]
        if (colData) {
          const valObj = row[colName]
          // debugger
          const iconType = valObj.icon
          if (iconType === 99) {
            row[colName] = `<span>${valObj.label}</span>`
          } else {
            const iconHtml = valueTypeObj[iconType]
            row[colName] = `${iconHtml || ''}<span>${valObj.label}</span>`
          }

          // console.log(colName, row[colName])

          // 备份原始值（EditTable会用到）
          const key2 = colName + '_valueTypeObj'
          row[key2] = { // 该字段是valueType=1时的状态
            label: valObj.label,
            value: valObj.value,
            icon: valObj.icon
          }
        }
      }
    })
    // debugger
    return data
  },
  // 单一处理表单listItem（高级查找需要单一处理listItem）
  initFormListItemData (listItem) {
    listItem = listItem || {}
    let noEditLen = 0

    // if (listItem.colName === 'AGEVALUE2') {
    //   listItem.text = '年龄'
    //   // debugger
    // }

    if (listItem.inputType === 0) { // 只读
      noEditLen++
    } else if (listItem.inputType === 13 || listItem.inputType === 8) { // 选择部门 13.多选 8.单选 返回的值是string，这里转成数组
      const { value } = listItem
      listItem.multiple = listItem.inputType === 13
      if ($validate.isNull(value)) { // 为空
        listItem.value = []
      } else { // 不为空
        if (!Array.isArray(value)) { // 非数组
          listItem.value = value.split(',')
        } else {
          listItem.value = value
        }
      }
    } else if (listItem.inputType === 3) { // 3.从服务端加载下拉列表
      if (!Array.isArray(listItem.dropList) && listItem.dropList === null) {
        // debugger
        listItem.dropList = []
      }
    } else if (listItem.inputType === 2) { // 2.下拉列表 （TODO:若value没值，select-tree会报错，原因待研究？？）
      if (!listItem.value && (Array.isArray(listItem.dropList) && listItem.dropList.length > 0)) {
        // debugger
        const firstItem = listItem.dropList[0]
        listItem.value = firstItem.value
        listItem.text = firstItem.label
      }
    } else if (listItem.inputType === 14) { // 3.多选人员
      const obj = this.initItemValueText(listItem) // 需要把value,text转为数组
      // debugger
      listItem.value = obj.value
      listItem.text = obj.text
    } else if (listItem.inputType === 1001) { // 1001.inputrange (前端自定义)
      const obj = this.initItemValueText(listItem) // 需要把value,text转为数组
      listItem.value = obj.value
      listItem.text = obj.text
    } else if (listItem.inputType === 1002) { // 1002.daterange (前端自定义)
      // debugger
      const obj = this.initItemValueText(listItem) // 需要把value,text转为数组
      listItem.value = obj.value
      listItem.text = obj.text

      listItem.colType = 'daterange'
    } else if (listItem.inputType === 1003) { // 1003.monthrange (前端自定义)
      const obj = this.initItemValueText(listItem) // 需要把value,text转为数组
      listItem.value = obj.value
      listItem.text = obj.text

      listItem.colType = 'monthrange'
    }

    return { listItem, noEditLen }
  },
  // 需要把value,text转为数组
  initItemValueText (listItem) {
    let value = listItem.value
    let text = listItem.text
    if ($validate.isNull(value)) {
      value = []
    } else if (typeof (value) === 'string') {
      value = value.split(',')
    }

    if ($validate.isNull(text)) {
      text = []
    } else if (typeof (text) === 'string') {
      text = text.split(',')
    }
    return {
      value, text
    }
  },
  // 处理子表单隐藏状态
  initFormEleHideStatus (groupsList, listItem) {
    const hideOthers = listItem.hideOthers
    // debugger
    if (Array.isArray(hideOthers) && hideOthers.length > 0) {
      const isExist = {}
      hideOthers.forEach(item => {
        const cols = item.cols || []
        const doms = item.doms || []
        const values = item.values || []

        const isHide = values.some(v => v === listItem.value) // 是否隐藏
        const isvisibility = isHide ? 'none' : 'inline-block'
        // debugger
        // 根据字段名隐藏 相应子表单
        cols.forEach(colName => {
          groupsList.some(o => {
            // 联动显示隐藏的时候把隐藏的必填项改为不是必填的
            if (isHide) {
              o.colNull = 1
            }
            if (colName === o.colName) {
              if (isExist[colName]) {
                // debugger
                return true
              }
              if (!isExist[colName]) {
                isExist[colName] = isvisibility
              }
              // debugger
              if (!o.formItemStyle) {
                o.formItemStyle = {
                  display: isvisibility
                }
              } else {
                o.formItemStyle.display = isvisibility
              }
              return true
            }
          })
        })

        // 根据domId隐藏 相应子表单
        // TODO:待测试
        doms.forEach(domId => {
          const dom = document.getElementById(domId)
          debugger
          if (dom) {
            dom.style.display = isvisibility
          }
        })
      })
      // let valueArr = [] // 值数组
      // let colsArr = [] // 字段数组
      // let domArr = [] // domId数组
      // hideOthers.forEach(o => {
      //   valueArr = valueArr.concat(o.values)
      //   colsArr = colsArr.concat(o.cols)
      //   domArr = domArr.concat(o.doms)
      // })
      // debugger
      // // 去重
      // valueArr = this.unique(valueArr)
      // colsArr = this.unique(colsArr)
      // domArr = this.unique(domArr)

      // const isHide = valueArr.some(v => v === listItem.value) // 是否隐藏
      // const isvisibility = isHide ? 'none' : 'inline-block'
      // // debugger
      // // 根据字段名隐藏 相应子表单
      // colsArr.forEach(colName => {
      //   groupsList.some(o1 => {
      //     // debugger
      //     if (o1.colName === colName) {
      //       if (!o1.formItemStyle) {
      //         o1.formItemStyle = {
      //           display: isvisibility
      //         }
      //       } else {
      //         o1.formItemStyle.display = isvisibility
      //       }

      //       // console.log(o1.label, o1.colName, o1.formItemStyle)
      //       return true
      //     }
      //   })
      // })

      // // 根据domId隐藏 相应子表单
      // // TODO:待完善
      // domArr.forEach(domId => {
      //   debugger
      // })
    }
  },
  /**
   * 整合 状态数据
   * @param {Array} gridData
   * @param {Array} columns
   * @param {Array} includeFieldArr 需要包含的字段
   * @param {Array} excludeFieldArr 需要排除的字段
   * @returns Array
   */
  initStatusData (gridData, columns, includeFieldArr = [], excludeFieldArr = []) {
    const arr = []
    if (includeFieldArr.length <= 0) {
      columns.forEach(o => {
        const isExclude = excludeFieldArr.some(k1 => k1 === o.colName) // 不排除该字段
        // debugger
        !isExclude && includeFieldArr.push(o.colName)
      })
    }
    if (includeFieldArr.length > 0) {
      // debugger
      gridData.forEach(item => {
        for (const key in item) {
          const isExclude = excludeFieldArr.some(k1 => k1 === key) // 不排除该字段
          if (!isExclude && includeFieldArr.indexOf(key) > -1) {
            let label = ''
            columns.some(colItem => {
              if (key === colItem.colName) {
                label = colItem.label
                return true
              }
            })
            const obj = {
              fieldName: key,
              label: $validate.isNull(label) ? key : label,
              value: item[key]
            }
            arr.push(obj)
          }
        }
      })
    }

    return arr
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
  // 切换企业，需要重置的数据(日后不仅是切换企业，其他操作也需要重置数据)
  switchCompany () {
    this.setKeyVal('storeDepartManage', 'departTreeData', {}, 'sessionStorage') // 重置部门数据
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
  testFn111 (tip) {
    $eltool.warnMsg(tip || '功能正开发中...')
  },
  // 弹窗保存回调 保存表单接口
  /**
   * 弹窗组件调用 保存表单接口
   * @params {String} config 弹窗回调参数
   * @params {Objct} params 参数
   * @params {Function} fn 回调函数
   */
  dialogCallUSaveForm (config, params, fn) {
    // debugger
    // const configName = config.saveFnName
    // console.log('弹窗保存回调', configName, params)
    // // debugger
    // this[configName](params).then(res => {
    //   res = res || {}
    //   // debugger
    //   res.flag = true
    //   fn && fn(res)
    // }).catch((err) => {
    //   err = err || {}
    //   // debugger
    //   err.flag = false
    //   fn && fn(err)
    // })
  },
  /**
   * 导出excel文档
   * @param {String} url
   */
  exportExcel (url) {
    // debugger
    // console.log('exportExcel:',url)
    // 判断是否有id为_exportForm的form表单，如果没有则创建一个隐藏的form，把url放入，然后submit
    var exportForm = document.getElementById('_exportForm')
    if (!exportForm) {
      exportForm = document.createElement('form')
      exportForm.setAttribute('id', '_exportForm')
      exportForm.setAttribute('action', url)
      exportForm.setAttribute('method', 'post')
    }
    document.body.appendChild(exportForm)
    exportForm.submit()
    document.body.removeChild(exportForm) // 导出成功后将form元素移除以免影响下一次导出
  },
  /**
   * 清空用户账户数据
   * 退出，密码出错都会执行
   */
  clearAccountFn (config) {
    config = config || { relogin: true } // 清除账户号，默认重新登录
    // TODO:不需要清除： selectOneMenuIndex， 为什么不能删？
    const sessionArr = ['navIndex', 'firstUrlParam', 'isCutOutUrl', 'userInfo', 'userResource', 'addRouters', 'originalPermission', 'departMainTreeData', 'departTreeData', 'curPageTitle', 'headPortraitBg', 'isAllowGetListTime', 'isAllowGetListTimeId', 'isNavFold', 'token', 'client_id', 'phone', 'isPageTrigger', 'logo', 'employeeList', 'selectOneMenuIndex', 'persionalPowerBtnData'] // 需要清除的存储数据
    sessionArr.forEach(k => {
      if (k) {
        window.sessionStorage.removeItem(k)
      }
    })
    const localStorageArr = []
    localStorageArr.forEach(k => {
      if (k) {
        window.localStorage.removeItem(k)
      }
    })
    // debugger
    // this.setKeyVal('storeUser', 'userInfo', {}, 'sessionStorage')
    store.dispatch('storeUser/clearToken')
    // debugger
    if (config.relogin) {
      // 清空了白名单后，这里的path已经不起作用
      // // 下次的登录，再不关闭浏览器标签的情况下，登陆后直接进到上一次退出的界面
      // let path = location.hash
      // if (path.indexOf('#') === 0) {
      //   path = path.substr(1)
      // }
      // const query = {
      //   redirect: path
      // }
      // debugger
      window.whiteList = ['Login'] // 清空路由白名单，作用：避免无法退到登录页
      router.replace({ name: 'Login' })
      setTimeout(() => {
        window.location.reload()
      }, 200)
    }
  },
  /**
   * 返回首页
   */
  goHomeFn () {
    router.push('/')
  },
  /**
   * 返回上一页
   */
  backFn () {
    // console.log('返回上一页')
    router.go(-1)
  },
  // 整合router的name
  initRouterName (routerName, url) {
    if ($validate.isNull(routerName)) { // 为空的情况
      // debugger
      return {
        routerName: '',
        query: {}
      }
    }
    const name = routerName.replace('/', '')

    // 获取连接参数
    let query = {}
    if (url) {
      const hasParams = url.indexOf('?')
      if (hasParams > -1) {
        const queryStr = url.substr(hasParams + 1)
        // debugger
        query = this.str2Obj(queryStr) // 截取链接后面的参数，并转为对象
        if (query.RouterNameList) {
          // debugger
          const routeData = this.initRouterName(query.RouterNameList)
          query.RouterNameList = routeData.routerName
        }
        // debugger
      }
    }

    // 获取路由名字
    const lastArr = name.split('-')
    let urlName = ''
    if (lastArr.length) {
      lastArr.forEach(str => {
        const s1 = str.toLowerCase()
        const fStr1 = s1.substring(0, 1)
        const fStr = fStr1.toUpperCase()
        const lStr = str.substr(1)
        const s2 = fStr + lStr
        urlName += s2
      })
      // oRouter.name = urlName
    }
    return { routerName: urlName, query }
  },
  // 整合router的name
  initRouterName1 (routerName, url) {
    const result = {
      routerName: '',
      query: {}
    }
    if ($validate.isNull(routerName)) {
      return result
    }

    const name = routerName.replace('/', '')

    // 获取连接参数
    // let query = {}
    if (url) {
      const hasParams = url.indexOf('?')
      if (hasParams > -1) {
        const queryStr = url.substr(hasParams + 1)
        // debugger
        result.query = this.str2Obj(queryStr) // 截取链接后面的参数，并转为对象
        if (result.query.RouterNameList) {
          // debugger
          const routeData = this.initRouterName(result.query.RouterNameList)
          result.query.RouterNameList = routeData.routerName
        }
        // debugger
      }
    }

    // 获取路由名字
    const lastArr = name.split('-')
    // let urlName = ''
    if (lastArr.length) {
      lastArr.forEach(str => {
        const s1 = str.toLowerCase()
        const fStr1 = s1.substring(0, 1)
        const fStr = fStr1.toUpperCase()
        const lStr = str.substr(1)
        const s2 = fStr + lStr
        result.urlName += s2
      })
      // oRouter.name = urlName
    }
    return result
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
  // recursionLinkStr (arr, object) {
  //   object = object || {
  //     str: '',
  //     arr: []
  //   }
  //   arr = arr || []
  //   const obj = {
  //     str: '',
  //     arr: []
  //   }
  //   obj.str = object.str
  //   let str = ''
  //   for (const item of arr) {
  //     str = object.str
  //     if (Array.isArray(item)) {
  //       const t = this.recursionLinkStr(item, obj)
  //       if (this.getType(t) === 'string') {
  //         obj.str += this.isNotItali(t) ? t : '/' + t
  //       }
  //     } else {
  //       str += this.isNotItali(item) ? item : '/' + item
  //       $constant.testNoAuth.push(str)
  //     }
  //   }
  //   return object
  // },
  // 反扁平化 tree 数据
  getNestedChildren (arr, parent) {
    const res = []
    for (const item of arr) {
      // debugger
      if (item.pId === parent) {
        // console.log(item.name)
        const children = this.getNestedChildren(arr, item.keyId)
        if (children.length) {
          item.children = children
        }
        res.push(item)
      }
    }
    return res
  },
  /**
   * 嵌套的数组扁平化(多维数组变成一维数组)
   * @param {Array} arr 嵌套的数据
   * @param {Object} config 配置 {otherKey[Array]:需要保留的其他字段}
   * @param {String} pid 父级id
   */
  flatten (arr, config, pid) {
    config = config || { id: 'id', child: 'child' }
    const idName = config.id
    const childName = config.child
    var res = []
    // debugger
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i]
      // debugger
      if (Array.isArray(item)) {
        const newArr = this.flatten(item, config, pid)
        res = res.concat(newArr)
      } else {
        const obj = { pId: pid }
        obj[idName] = item[idName]
        if (!$validate.isNull(config.otherKey)) {
          for (const key of config.otherKey) {
            obj[key] = this.deepCloneObj(item[key])
            obj[childName] = []
          }
        }
        res.push(obj)
      }

      // debugger
      if (Array.isArray(item[childName]) && item[childName].length > 0) {
        const newArr = this.flatten(item[childName], config, item[idName])
        res = res.concat(newArr)
      }
    }
    // debugger
    return res
  },
  isNotItali (str) {
    if (str.indexOf('/') > -1) {
      return true
    } else {
      return false
    }
  },
  /**
 * 加密
 * @returns {string}
 * oldPwd: $2a$10$My07QGXPUGaIrQGRph4SguKiEQqcLgbTByrj/J7NLbLH5wiPMGx8i
 * newPwd: $2a$10$EBvqTkx2apD3x/cSsfUCt./Hv/1Kpp94Y9nKVl.wXvqDVpaTJEi7q
 */
  // encryptionFn (value) {
  //   var bcryptSalt = bcrypt.genSaltSync(10) // 定义密码加密的计算强度,默认10
  //   var hash = bcrypt.hashSync(value, bcryptSalt) // 把自己的密码(this.registerForm.passWord)带进去,变量hash就是加密后的密码
  //   return hash
  // },
  encrypt (word, keyStr) {
    keyStr = keyStr || 'hxcloud-client12' // 判断是否存在ksy，不存在就用定义好的key
    var key = CryptoJS.enc.Utf8.parse(keyStr)
    var srcs = CryptoJS.enc.Utf8.parse(word)
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.toString()
  },
  /**
 * 获取uuid
 * @returns {string}
 */
  uuid () {
    function S4 () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    )
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
    return Cookies.get(key)
  },
  /**
 * 设置 cookie
 * @param key
 */
  setCookie (key, val) {
    return Cookies.set(key, val)
  },
  /**
 * 删除 cookie
 * @param key
 */
  removeCookie (key) {
    return Cookies.set(key)
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
  },
  /**
 * 对比两个json，返回
 *
 */
  // compareJson (obj1, obj2) { },
  /**
 * 将FORM的数据转成FieldValue类型的数据
 * @param {Object,Array} data  FORM转入值
 */
  copyDataToFieldValue (data) {
    var arr = []
    const type = this.getType(data)
    // debugger
    if (type === 'array') {
      for (const item of data) {
        arr = arr.concat(this.copyDataToFieldValue(item))
      }
    } else if (type === 'object') {
      for (var key in data) {
        // debugger
        // if (key === 'DEPTS') {
        //   debugger
        // }
        if (key.indexOf('noSaveKey_') === -1) { //  // noSaveKey_是前端自定义字段名，不作为提交保存的标识
          // debugger
          const value = this.getParamsLastVal(data[key]) // // 将传参为json中的值为数组的，取数组最后一项
          arr.push({ colName: key, value: '' + value })
        }
      }
    } else {
      arr.push([{ colName: 'test-todo-ttt', value: 'copyDataToFieldValue方法-test有空值' }])
    }

    return arr
  },
  // 将传参json中的值为数组的取数组最后一项
  getParamsLastVal (data) {
    // debugger
    const type = this.getType(data)
    if (type === 'array') { // 保存时，需转成字符
      // const len = data.length
      // data = data[len - 1]
      data = data.join(',')
    } else if (type === 'null') {
      data = ''
    }
    return data
  },
  // 比较并初始化提交保存数据
  /**
   * @param {Object} listItem gropus.list => [item]
   * @param {Array} originData 原始值
   * @param {Array} curData 当前变化的值
   * @return {Array} data 返回数据
   */
  compareInitData (groupItem, originData, curData) {
    const data = []
    const hasListItem = !$validate.isNull(groupItem)
    // debugger
    /* 比对两次数据，取得修过以后的数据项*/
    for (let i = 0; i < originData.length; i++) {
      const obj1 = originData[i]
      const obj2 = curData[i]
      // debugger
      for (const key in obj2) {
        // const t = key.indexOf('noSaveKey_')
        // if (key.indexOf('PERSONLIABLE') > -1) {
        //   debugger
        // }
        if (obj2.hasOwnProperty(key) && key.indexOf('noSaveKey_') === -1) {
          // noSaveKey_是前端自定义字段名，不作为提交保存的标识
          let value1 = obj1[key]
          let value2 = obj2[key]
          // if (key === 'WORKITEM' || key === 'GWCODES_valueTypeObj') {
          //   debugger
          // }

          // TODO:这里需要考虑多种可能
          // 值是数组，级联选择器，会返回一个数组得值（比如：部门下拉框）
          const type1 = this.getType(value1)
          const type2 = this.getType(value2)
          // debugger
          if (type1 === 'array') {
            // debugger
            // value2 = value2[value2.length - 1] // TODO:只取最后一个属于少数情况，这里需要注意，估计有的接口是这样要求，对于这种情况需要自定义
            value1 = value1.join(',')
          }
          if (type2 === 'array') {
            // debugger
            value2 = value2.join(',')
          }
          if ((!$validate.isNull(value1) || !$validate.isNull(value2)) && JSON.stringify(value1) !== JSON.stringify(value2)) {
            // debugger
            const obj = {
              colName: key,
              value: value2 === null ? '' : value2 // 传null，ksf测算平衡点会报错
            }
            data.push(obj)
            // debugger
            // if (key === 'GWCODES' || key === 'GWCODES_valueTypeObj') {
            //   debugger
            // }

            if (hasListItem) {
              this.updateListItem(groupItem, key, value2)
            }
          }
        }
      }
    }
    return data
  },
  // 更新列表显示 formData
  updateListItem (listItem, key, value2) {
    listItem.list.some(O => {
      if (O.colName === key) {
        // debugger
        O.value = value2
        const dropList = O.dropList || []
        dropList.some(dItem => {
          if (dItem.value === value2) {
            O.text = dItem.label
            return true
          }
        })
        return true
      }
    })
  },
  // 获取浏览器信息
  getBrowserInfo (n) {
    var ua = navigator.userAgent.toLowerCase()
    let s = ''
    let name = ''
    let ver = 0;
    // eslint-disable-next-line
    (s = ua.match(/msie ([\d.]+)/))
      ? _set('ie', _toFixedVersion(s[1]))
      : (s = ua.match(/firefox\/([\d.]+)/))
        ? _set('firefox', _toFixedVersion(s[1]))
        : (s = ua.match(/chrome\/([\d.]+)/))
          ? _set('chrome', _toFixedVersion(s[1]))
          : (s = ua.match(/opera.([\d.]+)/))
            ? _set('opera', _toFixedVersion(s[1]))
            : (s = ua.match(/version\/([\d.]+).*safari/))
              ? _set('safari', _toFixedVersion(s[1]))
              : 0
    function _toFixedVersion (ver, floatLength) {
      ver = ('' + ver).replace(/_/g, '.')
      floatLength = floatLength || 1
      ver = String(ver).split('.')
      ver = ver[0] + '.' + (ver[1] || '0')
      ver = Number(ver).toFixed(floatLength)
      return ver
    }
    function _set (bname, bver) {
      name = bname
      ver = bver
    }
    return n === 'n' ? name : n === 'v' ? ver : name + ver
  },
  // 修改css变量值
  setThemeVariables (themeColor) {
    // 设置主题变量
    document.documentElement.style.setProperty('--mainColor', themeColor.mainColor)
    document.documentElement.style.setProperty('--activeCls', themeColor.activeCls)
    document.documentElement.style.setProperty('--mainColorActived', themeColor.mainColorActived)
    document.documentElement.style.setProperty('--secondColor', themeColor.secondColor)
    document.documentElement.style.setProperty('--select', themeColor.secondColor)
    document.documentElement.style.setProperty('--mainTextColor', themeColor.mainTextColor)
    document.documentElement.style.setProperty('--mainBgColor', themeColor.mainBgColor)
    document.documentElement.style.setProperty('--guideBtnHoverColor', themeColor.guideBtnHoverColor)
    document.documentElement.style.setProperty('--documentCopyIcon', themeColor.documentCopyIcon)
    document.documentElement.style.setProperty('--titSpace', themeColor.titSpace)
    document.documentElement.style.setProperty('--btnHoverBg', themeColor.btnHoverBg)
    document.documentElement.style.setProperty('--btnHoverBoder', themeColor.btnHoverBoder)
    document.documentElement.style.setProperty('--currentRow', themeColor.currentRow)
    document.documentElement.style.setProperty('--primaryColor', themeColor.primaryColor)
    document.documentElement.style.setProperty('--tableTrTh', themeColor.tableTrTh)
    document.documentElement.style.setProperty('--tableTrThColor', themeColor.tableTrThColor)
    document.documentElement.style.setProperty('--bgGreen', themeColor.bgGreen)
    document.documentElement.style.setProperty('--menuBg', themeColor.menuBg)
    document.documentElement.style.setProperty('--sBottom', themeColor.sBottom)
    document.documentElement.style.setProperty('--nearListLi', themeColor.nearListLi)
  }
}
