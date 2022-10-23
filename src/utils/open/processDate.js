/**
 * 对日期操作方法：
 * 获取日期，转换日期格式等等
 */
export default {
  // 获取时间戳
  /**
   * 获取时间戳
   * @param {date} 日期 2020-10-18 2020.10.18
   */
  getStamp (dateStr) {
    const curDate = this.getDateObj(dateStr)
    const curStamp = curDate.getTime()
    return curStamp
  },
  // 返回 日期对象
  getDateObj (dateStr) {
    let d = null
    if (dateStr && dateStr.toString().length > 0) {
      const reg2 = /(\.|\-)/gm
      d = dateStr.replace(reg2, '/') // '/'为兼容ios 和 ie
    }
    let curDate = ''
    if (d) {
      curDate = new Date(d)
    } else { // 没值，则返回当前时间戳
      curDate = new Date()
    }
    return curDate
  },
  // 单字符格式化
  /**
   * 单字符格式化
   * @param str
   * @returns {string}
   */
  dateFormatter (str) {
    if (!str) return '00'
    const s = str.toString()
    return s.length > 1 ? s : '0' + s
  },
  // 时间转成 文字
  /** 时间转换
   * @param timeStamp
   * @param format: yyMM yyMMDD yyMMDD HH:MM:SS
   * @returns {{year: number, month: (*|string), day: (*|string), hours: (*|string), minutes: (*|string), seconds: (*|string), week: number, weekDay: *, timeStamp: *}}
   */
  turnDate (timeStamp, format) {
    let symbol = '-'
    // debugger
    if (format) { // 暂定 format： 1.空格 2.点 3./ 默认是-
      if (format === 1) {
        symbol = ''
      } else if (format.indexOf('.') > -1) {
        symbol = '.'
      } else if (format.indexOf('/') > -1) {
        symbol = '/'
      }
    }

    timeStamp = timeStamp || ''
    let date = ''
    // debugger
    if (timeStamp) {
      if (timeStamp instanceof Date) { // 日期对象
        date = timeStamp
      } else {
        const len = timeStamp.toString().length
        if (len === 13) {
          date = new Date(timeStamp)
        } else { // 非时间戳，则重新生成
          date = this.getDateObj(timeStamp)
          timeStamp = date.getTime()
        }
      }
    } else { // 非时间戳，则重新生成
      date = new Date()
      timeStamp = date.getTime()
    }
    // if (!timeStamp) {
    //   date = new Date()
    //   timeStamp = date.getTime()
    // } else {
    //   date = new Date(timeStamp)
    // }
    const year = date.getFullYear()
    const month = this.dateFormatter((date.getMonth() + 1))
    const day = this.dateFormatter(date.getDate())
    const hours = this.dateFormatter(date.getHours())
    const minutes = this.dateFormatter(date.getMinutes())
    const seconds = this.dateFormatter(date.getSeconds())
    const week = date.getDay() // 星期
    const weekArr = {
      1: '星期一',
      2: '星期二',
      3: '星期三',
      4: '星期四',
      5: '星期五',
      6: '星期六',
      0: '星期日'
    }
    const ym = `${year}${symbol}${month}`
    const ymd = `${year}${symbol}${month}${symbol}${day}`
    const ymdhm = `${year}${symbol}${month}${symbol}${day} ${hours}:${minutes}`
    const ymdhms = `${year}${symbol}${month}${symbol}${day} ${hours}:${minutes}:${seconds}`
    const obj = {
      Date: date,
      year: year,
      month: month,
      jsMonth: this.dateFormatter((date.getMonth())),
      day: day,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      week: week,
      weekDay: weekArr[week],
      timeStamp: timeStamp,
      ym,
      ymd,
      ymdhm,
      ymdhms
    }
    return obj
  },
  // 日期格式转成文字描述，比如：10分钟前
  /**
   * 日期格式转成文字描述，比如：10分钟前
   * @param pastStamp // 过去时间戳
   * @param currentStamp // 当前时间戳
   * @returns {string}
   */
  date2Txt (pastStamp, currentStamp) {
    // debugger
    if (pastStamp && pastStamp.toString().length !== 13) { // 非时间戳，则重新生成
      // pastStamp = +new Date(pastStamp)
      pastStamp = this.getStamp(pastStamp)
    }

    const thatDateObj = this.turnDate(pastStamp)
    const curDateObj = this.turnDate(currentStamp)
    const thatDate = thatDateObj.year + '-' + thatDateObj.month + '-' + thatDateObj.day
    const curDate = curDateObj.year + '-' + curDateObj.month + '-' + curDateObj.day
    let ts = '过去'
    // debugger
    if (thatDate === curDate) { // 当天
      const hour = Math.abs(parseInt((pastStamp - currentStamp) / 1000 / 3600)) // 小时
      const minutes = Math.abs(parseInt((pastStamp - currentStamp) / 1000 / 60)) // 分钟
      const seconds = Math.abs(parseInt((pastStamp - currentStamp) / 1000)) // 秒
      if (seconds > 0 && seconds < 60) {
        ts = parseInt(seconds) + '秒前'
      } else if (minutes > 0 && minutes < 60) {
        ts = parseInt(minutes) + '分钟前'
      } else if (hour > 0 && hour < 24) {
        ts = parseInt(hour) + '小时前'
      }
    } else { // 一天之后的
      // const day = Math.abs(parseInt((pastStamp - currentStamp) / 1000 / 3600 / 24)) // 日期
      const day = (currentStamp - pastStamp) / 1000 / 3600 / 24
      if (day <= 1) { // 小于24小时
        ts = '昨天'
      } else if (day < 30) { // 小于30天
        // ts = parseInt(day) + '天前'
        ts = Math.floor(day) + '天前'
      } else {
        const curDate = this.turnDate(pastStamp)
        ts = curDate.year + '-' + curDate.month + '-' + curDate.day
      }
    }
    return ts
  },
  // 获取上一天日期
  /**
   * 获取上一天日期
   *
   * @param _year
   * @param _month
   * @param _day
   * @returns {*|{year: number, month: (*|string), day: (*|string), hours: (*|string), minutes: (*|string), seconds: (*|string), week: number, weekDay: *, timeStamp: *}}
   */
  getPrevDayFn (_year, _month, _day) {
    // debugger
    const date = _year + '-' + _month + '-' + _day
    const curStamp = this.getStamp(date)
    const oneDatStamp = 24 * 60 * 60 * 1000 // 一天的时间戳
    const nextStamp = curStamp - oneDatStamp
    const nextDate = this.turnDate(nextStamp)
    // console.log(nextDate)
    return nextDate
  },
  // 获取下一天日期
  /**
   * 获取下一天日期
   *
   * @param _year
   * @param _month
   * @param _day
   * @returns {*|{year: number, month: (*|string), day: (*|string), hours: (*|string), minutes: (*|string), seconds: (*|string), week: number, weekDay: *, timeStamp: *}}
   */
  getNextDayFn (_year, _month, _day) {
    // debugger
    const date = _year + '-' + _month + '-' + _day
    const curStamp = this.getStamp(date)
    const oneDatStamp = 24 * 60 * 60 * 1000 // 一天的时间戳
    const nextStamp = curStamp + oneDatStamp
    const nextDate = this.turnDate(nextStamp)
    // console.log(nextDate)
    return nextDate
  },
  // 获取上一月日期
  /**
   * 获取上一月日期
   * @param _year 当前年
   * @param _month 当前月
   * @param _day 当前日
   * @returns {*|{year: number, month: (*|string), day: (*|string), hours: (*|string), minutes: (*|string), seconds: (*|string), week: number, weekDay: *, timeStamp: *}}
   */
  getPrevMonthFn (_year, _month, _day) {
    _day = _day || '01'
    const date = _year + '-' + _month + '-' + _day
    // debugger
    const curDate = this.getDateObj(date)
    const curMonth = curDate.getMonth()
    curDate.setMonth(curMonth - 1)
    const y = curDate.getFullYear()
    const m = curDate.getMonth() + 1
    const nextStr = y + '-' + m + '-' + _day
    const nextDate = this.getDateObj(nextStr)
    const nextObj = this.turnDate(nextDate)
    // debugger
    return nextObj
  },
  // 获取下一月日期
  /**
   * 获取下一月日期
   * @param _year
   * @param _month
   * @param _day
   * @returns {*|{year: number, month: (*|string), day: (*|string), hours: (*|string), minutes: (*|string), seconds: (*|string), week: number, weekDay: *, timeStamp: *}}
   */
  getNextMonthFn (_year, _month, _day) {
    _day = _day || '01'
    const date = _year + '-' + _month + '-' + _day
    // debugger
    const curDate = this.getDateObj(date)
    const curMonth = curDate.getMonth()
    curDate.setMonth(curMonth + 1)
    const y = curDate.getFullYear()
    const m = curDate.getMonth() + 1
    const nextStr = y + '-' + m + '-' + _day
    const nextDate = this.getDateObj(nextStr)
    const nextObj = this.turnDate(nextDate)
    // debugger
    return nextObj
  },
  // 获取下一年日期
  /**
   * 获取下一年日期
   * @param _year
   * @param _month
   * @param _day
   * @returns {*|{year: number, month: (*|string), day: (*|string), hours: (*|string), minutes: (*|string), seconds: (*|string), week: number, weekDay: *, timeStamp: *}}
   */
  getNextYearFn (_year, _month, _day) {
    _day = _day || '01'
    let date = ''
    let curDate = null
    let curYear = ''
    // debugger
    if (this.isNull(_year) || this.isNull(_month)) {
      const dateObj = this.turnDate()
      curDate = dateObj.Date
      date = dateObj.year + '-' + dateObj.month + '-' + dateObj.day
      curYear = dateObj.year
    } else {
      date = _year + '-' + _month + '-' + _day
      curDate = this.getDateObj(date)
      curYear = curDate.getFullYear()
    }
    // debugger

    curDate.setYear(curYear + 1)
    const y = curDate.getFullYear()
    const m = curDate.getMonth() + 1
    const nextStr = y + '-' + m + '-' + _day
    const nextDate = this.getDateObj(nextStr)
    const nextObj = this.turnDate(nextDate)
    // debugger
    return nextObj
  },
  // 获取当前日期的周一和周日的日期
  getCurSEDate (_year, _month, _day) {
    const date = _year + '-' + _month + '-' + _day
    var now = this.getDateObj(date)
    var nowTime = now.getTime()
    var day = now.getDay() || 7
    var oneDayTime = 24 * 60 * 60 * 1000
    var MondayStamp = nowTime - (day - 1) * oneDayTime// 显示周一
    var SundayStamp = nowTime + (7 - day) * oneDayTime// 显示周日
    const sDate = this.turnDate(MondayStamp)
    const eDate = this.turnDate(SundayStamp)
    const arr = [
      {
        date: sDate.Date,
        stamp: sDate.timeStamp,
        ymd: sDate.ymd,
        week: sDate.week,
        weekDay: sDate.weekDay
      },
      {
        date: eDate.Date,
        stamp: eDate.timeStamp,
        ymd: eDate.ymd,
        week: eDate.week,
        weekDay: eDate.weekDay
      }
    ]
    return arr
  },
  // 获取一个月总天数
  getMonthTotalDays (_year, _month) {
    var d = new Date(_year, _month, 0)
    // debugger
    return d.getDate()
  },
  // 获取最近N天的日期
  /**
   * 获取最近N天的日期
   * @param {Number} num 天数 正数：过去的天数； 负数：未来的天数
   */
  getNearDate (num) {
    const curStamp = this.getStamp()
    const nearStamp = num * 24 * 60 * 60 * 1000 // 间距天数的时间戳
    const disStamp = curStamp - nearStamp
    const nearDate = this.turnDate(disStamp)
    // debugger
    return nearDate
  },
  // 根据指定的日期，月数，获取距离该月数的日期
  /**
   * 根据指定的日期，月数，获取距离该月数的日期
   * @param {String,Date} date 日期对象，或者字符，2022-08-24。
   * @param {Object}
   *  Object.monthNum: 月数 负数：过去日期，正数: 未来日期
   *  Object.isContainCur: 是否包含当前日期，默认true（包含本月，会比不包含本月 少1个月）
   */
  getNearMonthDate (date, { monthNum, isContainCur }) {
    const mNum = parseInt(monthNum)
    const curDate = this.turnDate(date)
    // debugger
    let dateStr = null
    if (mNum < 0) { // 获取过去日期
      // debugger
      dateStr = this._getPreMonthDay(curDate, { monthNum: mNum * -1, isContainCur })
    } else { // 获取未来日期
      // debugger
      dateStr = this._getNextMonthDay(curDate, { monthNum: mNum, isContainCur })
    }

    const nearDate = this.turnDate(dateStr)
    // debugger
    return nearDate
  },
  // 获取未来日期 返回一个字符串日期： 2022-08-25
  _getNextMonthDay (dateObj, { monthNum, isContainCur }) {
    if (isContainCur) { // 包含本月，少1个月
      monthNum--
    }

    let curY = parseInt(dateObj.year)
    const month = parseInt(dateObj.month)

    const allM = month + monthNum // 总月数
    let disY = 0
    let curM = 1
    // debugger
    if (allM > 12) {
      disY = Math.floor(allM / 12) // 相差年份
      curY += disY // 目标年份
      curM = allM % 12 // 相差月份
    } else {
      curM = allM
    }

    // 日期
    let curD = dateObj.day
    const maxDay = this.getMonthTotalDays(curY, curM) // js的月份要减1
    // debugger
    if (maxDay < dateObj.day) {
      curD = maxDay
    }

    // 保证两位数格式输出
    if (('' + curM).length < 2) {
      curM = '0' + curM
    }

    const curDate = curY + '-' + curM + '-' + curD
    return curDate
  },
  // 获取过去日期 返回一个字符串日期： 2022-08-25
  _getPreMonthDay (dateObj, { monthNum, isContainCur }) {
    if (isContainCur) { // 包含本月，少1个月
      monthNum--
    }

    let curY = parseInt(dateObj.year)
    let curM = parseInt(dateObj.month)
    const disM = curM - monthNum
    // debugger
    if (disM > 0) { // 本年的日期
      curM = disM
    } else { // 非本年的日期
      const disM1 = Math.abs(disM)

      const m1 = disM1 % 12
      curM = 12 - m1
      // const disM1 = monthNum
      // debugger
      const disY = Math.floor(disM1 / 12)
      curY = curY - disY - 1
    }
    // 保证两位数格式输出
    if (('' + curM).length < 2) {
      curM = '0' + curM
    }

    // 日期
    let curD = dateObj.day
    const maxDay = this.getMonthTotalDays(curY, curM) // js的月份要减1
    // debugger
    if (maxDay < dateObj.day) {
      curD = maxDay
    }

    const t2 = curY + '-' + curM + '-' + curD
    return t2
  },
  // 获取近几月的日期
  /**
 * 获取近几月的日期
 * @param {Number} num 月数 负数：过去日期，正数: 未来日期
 */
  getNearMonth (num) {
    const isInitNum = num > 0 ? 1 : -1 // 一个系数(正负数)
    const curDate = this.turnDate()
    const month = Number(curDate.month)
    const disNum = Math.abs(num)
    let disM = num
    const disMonth = num + month // 和当前月份的距离
    const disY = disNum % 12 * isInitNum
    // debugger
    if (isInitNum > 0) { // 未来日期
      // debugger
      if (disNum > 12) { // 月份大于12，则需要
        const year = curDate.year + disY
        curDate.Date.setYear(year)
        disM = disNum - disY * 12 // 除去年份，剩余月份数
      } else if (disMonth > 12) { // 当前月份+未来月份大于12
        const year = curDate.year + 1
        curDate.Date.setYear(year)
        disM = disNum - 12 // 除去年份，剩余月份数
      } else {
        disM = disMonth
      }
    } else { // 过去日期
      // debugger
      if (disNum > 12) { // 月份大于12，则需要
        const year = curDate.year + disY
        curDate.Date.setYear(year)
        disM = disNum + disY * 12 // 除去年份，剩余月份数
      } else if (disMonth <= 0) { // 当前月份+未来月份大于12
        const year = curDate.year - 1
        curDate.Date.setYear(year)
        disM = disMonth + 12 // 除去年份，剩余月份数
      } else {
        disM = disMonth
      }
    }

    curDate.Date.setMonth(disM - 1) // js的月份从0开始

    const nearDate = this.turnDate(curDate.Date)
    // debugger
    return nearDate
  },
  // 获取将来和过往的月份
  /**
 * 获取将来和过往的月份
 * @param {String}} ym
 * @param {Number} monthNum: 负数：过去日期， 正数: 未来日期
 * @returns {Array} 起始日期
 */
  getRangeMonth (ym, monthNum) {
    // debugger
    let ym0 = ym
    if (ym0.indexOf('-') > -1) {
      const dateArr = ym0.split('-')
      if (dateArr.length === 2) {
        ym0 += '-01'
      }
    } else if (ym0.indexOf('/') > -1) {
      const dateArr = ym0.split('/')
      if (dateArr.length === 2) {
        ym0 += '/01'
      }
    }
    const curDateObj = this.turnDate(ym0)
    const curY = Number(curDateObj.year)
    const curM = Number(curDateObj.month)
    const isInitNum = monthNum > 0 ? 1 : -1 // 一个系数(正负数)
    let year1 = ''
    let month1 = ''
    // debugger
    const dateNum = Math.abs(monthNum) // 取天数
    if (dateNum > 12) {
      month1 = dateNum % 12 // 月
      year1 = Math.floor(dateNum / 12) // 年
    } else {
      month1 = dateNum
      year1 = 0
    }

    let year2 = curY + year1 * isInitNum
    let month2 = curM + month1 * isInitNum

    // debugger
    if (month2 <= 0) {
      year2--
      month2 += 12
    } else if (month2 > 12) {
      year2++
      month2 %= 12
    }

    const ym1 = year2 + '-' + this.dateFormatter(month2)
    // 小日期放在第一位
    let obj = []
    if (ym > ym1) {
      obj = [ym1, ym]
    } else {
      obj = [ym, ym1]
    }
    return obj
  },
  // 获取近半年日期，大概值 比如：2021-07-27 09:40  -》 2021-01-26
  getHalfYearDate (ymd, format) {
    ymd = ymd || ''
    const date = this.getDateObj(ymd)
    date.setDate(date.getDate() - 1)
    date.setMonth(date.getMonth() - 6)
    const curDate = this.turnDate(date)
    return curDate.ymd
  },
  // 获取近半年日期 精确到时分秒 比如：2021-07-27 09:43:20 -》 2021-01-25 21:43:20
  getHalfYearDateByStamp (ymd) {
    ymd = ymd || ''
    const curStamp = this.getStamp(ymd)
    // const ttt1 = this.turnDate(curStamp)
    const halfYear = 365 / 2 * 24 * 3600 * 1000
    const pastResult = curStamp - halfYear
    const pastDate = new Date(pastResult)
    const y = pastDate.getFullYear()
    const m = pastDate.getMonth() + 1
    const d = pastDate.getDate()
    // const ttt2 = this.turnDate(pastDate)
    // debugger
    return `${y}-${m}-${d}`
  },
  // 获取两个日期之间的天数
  /**
 * 获取两个日期之间的天数
 * @param {Array} arr [Date, Date]
 * @returns Number
 */
  getNumDays2Date (arr) {
    const [sDate, eDate] = arr
    var startDate = sDate.getTime()
    var endDate = eDate.getTime()

    // if (startDate > endDate) { // 如果开始日期大于结束日期，则调换过来
    //   const mid = startDate
    //   startDate = endDate
    //   endDate = mid
    // }

    const disf = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000)
    const days = Math.abs(disf)
    return parseInt(days)
  },
  // 获取日期相差多少月
  /**
 * @params {Array} [startDate, endDate], 比如 ['2022-08-04', '2023-06-07']
 * @return {Number} 绝对值
 */
  getNumMonths (arr) {
    const m1 = arr[0]
    const m2 = arr[1]
    const stamp1 = this.getStamp(m1)
    const stamp2 = this.getStamp(m2)
    const disStamp = stamp2 - stamp1
    const disNum = disStamp / 1000 / 30 / 24 / 60 / 60
    // debugger
    return Math.abs(disNum)
  },
  // 判断是否为空
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
  }
}
