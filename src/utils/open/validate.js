/**
 * 验证工具类
 */

import eltool from '@/utils/open/eltool'
// import qs from 'qs'

export default {
  /**
   * @param {string} path
   * @returns {Boolean}
   */
  isExternal (path) {
    return /^(https?:|mailto:|tel:)/.test(path)
  },
  /**
   * 合法uri
   * @param textval
   * @returns {boolean}
   */
  isURL (textval) {
    const urlregex = /^(http:\/\/|^https:\/\/|^\/\/)((\w|=|\?|\.|\/|&|-)+)/g
    return urlregex.test(textval)
  },

  /**
   * 小写字母
   * @param str
   * @returns {boolean}
   */
  isLowerCase (str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
  },

  /**
   * 大写字母
   * @param str
   * @returns {boolean}
   */
  isUpperCase (str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
  },

  /**
   * 大小写字母
   * @param str
   * @returns {boolean}
   */
  validatAlphabets (str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
  },
  /**
   * 验证pad还是pc
   * @returns {boolean}
   */
  isPc () {
    const userAgentInfo = navigator.userAgent
    const Agents = ['Android', 'iPhone',
      'SymbianOS', 'Windows Phone',
      'iPad', 'iPod']
    let flag = true
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false
        break
      }
    }
    return flag
  },
  /**
   * validate email
   * @param email
   * @returns {boolean}
   */
  isEmail (email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  },

  /**
   * 判断身份证号码
   */
  isCardid (code) {
    const list = []
    let result = true
    let msg = ''
    var city = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江 ',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北 ',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏 ',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外 '
    }
    if (!this.isNull(code)) {
      if (code.length === 18) {
        if (!code || !/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code)) {
          msg = '证件号码格式错误'
        } else if (!city[code.substr(0, 2)]) {
          msg = '地址编码错误'
        } else {
          // 18位身份证需要验证最后一位校验位
          code = code.split('')
          // ∑(ai×Wi)(mod 11)
          // 加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
          // 校验位
          var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2, 'x']
          var sum = 0
          var ai = 0
          var wi = 0
          for (var i = 0; i < 17; i++) {
            ai = code[i]
            wi = factor[i]
            sum += ai * wi
          }
          // var last = parity[sum % 11]
          if (parity[sum % 11] !== code[17]) {
            msg = '证件号码校验位错误'
          } else {
            result = false
          }
        }
      } else {
        msg = '证件号码长度不为18位'
      }
    } else {
      msg = '证件号码不能为空'
    }
    list.push(result)
    list.push(msg)
    return list
  },
  /**
   * 判断手机号码是否正确
   * flag true 验证通过 false 验证失败
   */
  isMobile (phone, config) {
    config = config || { isTip: true }
    const obj = {
      flag: true,
      msg: ''
    }
    // 增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
    // debugger
    if (!this.isNull(phone)) {
      if (phone.length === 11) {
        const isPhone = /^[1][3,4,5,7,8][0-9]{9}$/
        // var tt = isPhone.test(phone)
        // debugger
        if (!isPhone.test(phone)) {
          obj.msg = '手机号码格式不正确'
          obj.flag = false
        }
      } else {
        obj.msg = '手机号码长度为11位'
        obj.flag = false
      }
    } else {
      obj.msg = '手机号码不能为空'
      obj.flag = false
    }
    if (!obj.flag && config.isTip) { // isTip是否允许弹窗提示，默认true
      eltool.errorMsg(obj.msg)
    }
    return obj
  },
  /**
   * 判断姓名是否正确
   */
  isName (name) {
    var regName = /^[\u4e00-\u9fa5]{2,4}$/
    if (!regName.test(name)) return false
    return true
  },
  /**
   * 判断是否为整数
   */
  isNum (num, type) {
    let regName = /[^\d.]/g
    if (type === 1) {
      if (!regName.test(num)) return false
    } else if (type === 2) {
      regName = /[^\d]/g
      if (!regName.test(num)) return false
    }
    return true
  },
  /**
   * 是否为数字类型
   * @param {any} val
   * @returns Boolean
   */
  isNumber (val) {
    // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，
    // debugger
    if (val === '' || val === null) {
      return false
    }
    if (typeof val === 'number' && !isNaN(val)) {
      // 对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,
      // 所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
      return true
    } else {
      return false
    }
  },
  // /**
  //  * 是否为数字类型
  //  * @param {any} val
  //  * @returns Boolean
  //  */
  // isNumber1 (val) {
  //   // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，
  //   // debugger
  //   if (val === '' || val === null) {
  //     return false
  //   }
  //   const val1 = Number(val)
  //   const val2 = parseFloat(val)
  //   // debugger
  //   if (typeof val1 === 'number' && !isNaN(val1)) {
  //     // 对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,
  //     // 所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
  //     return true
  //   } else {
  //     return false
  //   }
  // },
  /**
   * 判断是否为小数
   */
  isDecimals (num, type) {
    let regName = /[^\d.]/g
    if (type === 1) {
      if (!regName.test(num)) return false
    } else if (type === 2) {
      regName = /[^\d.]/g
      if (!regName.test(num)) return false
    }
    return true
  },
  /**
   * 判断是否为空
   */
  isNull (val) {
    if (val instanceof Array) {
      if (val.length === 0) return true
    } else if (val instanceof Object) {
      const arr = Object.keys(val) // 判断对象是否为空
      if (arr.length <= 0) return true
    } else {
      const str = '' + val
      if (str === '[]' || str === '{}') {
        return true
      } else if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true
      return false
    }
    return false
  },
  /**
   * 判断数据类型
   * @param {各种数据类型} o
   */
  judgeTypeOf (o) {
    var typeArr = ['String', 'Object', 'Number', 'Array', 'Undefined', 'Function', 'Null', 'Symbol']
    let name = ''
    for (const a of typeArr) {
      name = '[object ' + a + ']'
      if (Object.prototype.toString.call(o) === name) {
        return a
      }
    }
  },
  /*
    * 表单验证
    * tipArr: 要验证的表单字段+名字，json格式
    * data: 要验证的表单值，json格式
    * return true: 验证通过； false: 验证不通过
    * that
    * */
  validationForm (tipArr, data) {
    // debugger
    for (const k in tipArr) {
      if (k && tipArr.hasOwnProperty(k)) {
        let arr = []
        let key
        let val
        let type
        if (k.indexOf('.') > -1) { // 为这类设置 tipArr['noticeSign.endTime'] = '请选择截止时间！'
          arr = k.split('.')
          key = arr[0]
          val = data[arr[0]][arr[1]]
        } else {
          arr = k.split('-')
          key = arr[0]
          type = arr[1]
          val = data[key]
        }

        if (typeof val === 'undefined' || val === null || val === '' || val.length <= 0) { // 为空
          let text = '请输入'
          // debugger
          if (tipArr[k].indexOf('请') > -1) text = ''
          eltool.errorMsg(text + tipArr[k])
          return false
        } else { // 不为空
          if (type) {
            tipArr[k] = tipArr[k].replace('请输入', '')
            tipArr[k] = tipArr[k].replace('请选择', '')
            if (type === 'phone') { // 手机验证
              const reg = /^1\d{10}$/
              if (!reg.test(val)) {
                eltool.errorMsg(tipArr[k] + '有误')
                return false
              }
            } else if (type === 'mail') { // 邮箱验证
              const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
              if (!reg.test(val)) {
                eltool.errorMsg(tipArr[k] + '有误')
                return false
              }
            } else if (type === 'IDCard') { // 身份证验证
              const obj = this.isCardid(val)
              if (!obj.status) {
                eltool.errorMsg(obj.text)
                return obj.status
              }
              // return obj.status
            }
          }
        }
      }
    }
    return true
  },
  /**
   * 校验密码
   */
  checkPWD (pwd) {
    // debugger
    pwd = pwd.replace(/(^\s*)|(\s*)$|(\s{1})/g, '') // 去除首尾和中间空格
    var obj = {
      bool: false,
      pwd: pwd,
      text: ''
    }
    const reg1 = /([a-zA-Z0-9]){1,16}/
    // const reg3 = /[!@#$%^&*()_?<>{}\.]+/

    const t1 = reg1.test(pwd)
    // const t3 = reg3.test(pwd)
    // debugger
    if (pwd.length < 6) {
      obj.bool = false
      obj.text = '密码长度为6-16位'
    } else if (t1) { //  && t3
      obj.bool = true
      obj.text = '密码通过'
    } else {
      obj.bool = false
      obj.text = '密码必须是数字+字母' // +英文字符组合
    }
    return obj
  }
}
