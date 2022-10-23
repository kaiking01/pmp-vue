import { Loading, Message, MessageBox } from 'element-ui'
// import request from '@/utils/open/request'
import $common from '@/utils/open/common'
import $validate from '@/utils/open/validate'

const eltoolOffset = 60

/**
 * element 自定义封装脚本方法，特针对模板生成组件
 */
export default {
  /**
   * 无权限提醒
   */
  noAuth () {
    this.errorMsg('无权限查看')
  },
  /**
   * 重置组件
   *
   * @param that
   * @param name
   */
  reset (that, name) {
    that.$refs[name].resetFields()
  },
  /**
   * 成功提醒
   * @param msg
   */
  successMsg (msg) {
    Message({
      showClose: true,
      offset: eltoolOffset, // Message 距离窗口顶部的偏移量
      message: msg,
      type: 'success',
      duration: 5 * 1000
    })
  },
  /**
   * 警告提醒
   *
   * @param msg
   */
  warnMsg: $common.throttle(function (msg, confing) {
    confing = confing || {}
    Message({
      showClose: true,
      message: msg,
      offset: eltoolOffset, // Message 距离窗口顶部的偏移量
      type: 'warning',
      duration: confing.duration || 5 * 1000
    })
  }),
  /**
   * 错误提醒
   *
   * @param msg
   */
  errorMsg (msg, config) {
    config = config || { dangerouslyUseHTMLString: false }
    // debugger
    let msgStr = msg
    // html
    if (config.dangerouslyUseHTMLString) {
      msgStr = ''
      if (!$validate.isNull(msg.title)) {
        msgStr += `<p>${msg.title}</p>`
      }
      if (!$validate.isNull(msg.message)) {
        msg.message = msg.message.replace(/[\n]/gi, '<br/>')
        msgStr += `<p class="pd-l10">${msg.message}</p>`
      }
      if (!$validate.isNull(msg.desc)) {
        msgStr += `<p>${msg.desc}</p>`
      }
    }
    Message({
      dangerouslyUseHTMLString: config.dangerouslyUseHTMLString,
      message: msgStr,
      type: 'error',
      offset: eltoolOffset, // Message 距离窗口顶部的偏移量
      duration: 5 * 1000,
      showClose: true
    })
  },
  /**
   * 操作框提醒
   * @param title
   * @param message
   * @param {Object} config
   * @param {Function} fn
   */
  confirm (title, message, config, fn) {
    config = config || {}
    // debugger
    let instance1 = null
    // MessageBox.close()

    if (config.cuntDown) { // 存在倒计时 则会自动确认并关闭
      config.customClass += ' ' + config.cuntDown.class
    }
    let msgBoxDom = {}
    let confirmBtnDom = {}
    let txtDom = {}

    const cfg = { // 设置默认值
      distinguishCancelAndClose: false,
      dangerouslyUseHTMLString: false,
      showCancelButton: true,
      msgType: 'warning',
      iconClass: 'el-icon-question yellow-font-color', // 默认为问号图标
      confirmTxt: '确定',
      cancelTxt: '取消'
    }
    for (const key in config) {
      cfg[key] = config[key]
    }

    if (!cfg.dangerouslyUseHTMLString) { // tip不是以html形式展示，若带了html内容的，需要剔除html标签
      // debugger
      message = $common.getHtmlText(message)
    }

    const oMsg = MessageBox({
      title: title,
      message: message,
      distinguishCancelAndClose: cfg.distinguishCancelAndClose,
      customClass: cfg.customClass, // MessageBox 的自定义类名 iconClass
      iconClass: cfg.iconClass, // 自定义图标的类名，会覆盖 type
      confirmButtonText: cfg.confirmTxt,
      cancelButtonText: cfg.cancelTxt,
      dangerouslyUseHTMLString: cfg.dangerouslyUseHTMLString, // 是否将 message 属性作为 HTML 片段处理
      showCancelButton: cfg.showCancelButton,
      closeOnClickModal: !!cfg.closeOnClickModal,
      confirmButtonClass: cfg.confirmButtonClass,
      type: cfg.msgType,
      beforeClose: $common.debounce(function (action, instance, done) { // 防止双击导致提交两次
        // debugger
        instance.isConfirm = (action === 'confirm')
        instance1 = instance
        // 若有，则清除字段确认倒计时
        if (confirmBtnDom.timer) {
          clearTimeout(confirmBtnDom.timer)
          confirmBtnDom.timer = null
          instance1.message = ''
        }

        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          instance.confirmButtonText = '操作中...'
          fn && fn(instance, done)
        } else { // action: close 关闭， cancel 取消 distinguishCancelAndClose 为true的情况下，才会区分close cancel
          config.cancelCB && config.cancelCB(action, instance, done) // 取消回调
          done()
        }
      })
    }).then((res) => {
      // arguments
      // debugger
      // 需要做执行 成功 提示
      instance1.confirmButtonLoading = false
      instance1.confirmButtonText = '确定'
      // debugger
    }).catch(() => {
      // arguments
      // debugger
      // 需要做执行 失败 提示
      instance1.confirmButtonLoading = false
      instance1.confirmButtonText = '确定'
      // debugger
    })

    // 存在倒计时 则会自动确认并关闭
    if (config.cuntDown) {
      const num = config.cuntDown.time
      setTimeout(() => {
        msgBoxDom = document.querySelector('.' + config.cuntDown.class)
        confirmBtnDom = msgBoxDom.querySelector('.el-button--primary')
        const contentDom = msgBoxDom.querySelector('.el-message-box__message')
        txtDom = contentDom.getElementsByTagName('P')[0]
        const txt = txtDom.innerText
        txtDom.setAttribute('title', txt)
        this.autoCloseConfirmBox(txt, txtDom, confirmBtnDom, num) // 倒计时关闭弹窗
      }, 200)
    }
    return { oMsg, MessageBox }
  },
  // 倒计时自动确定 Confirm 弹窗
  autoCloseConfirmBox (txt, txtDom, confirmBtnDom, num) {
    // debugger
    txtDom.innerText = `${txt}（${num}后，将自动确认）`
    --num
    if (confirmBtnDom.timer) {
      clearTimeout(confirmBtnDom.timer)
      confirmBtnDom.timer = null
    }
    confirmBtnDom.timer = setTimeout(() => {
      if (num === 0) {
        confirmBtnDom.click()
      } else {
        this.autoCloseConfirmBox(txt, txtDom, confirmBtnDom, num)
      }
    }, 1000)
  },
  /**
   * 设置加载状态
   * @params {Node} dom
   * @params {Boolean} flag 是否显示laoding
   * @params {Object} confing 是否显示laoding {indexPath,fullscreen}
   *  confing.fullscreen 默认局部显示
   *  confing.indexPath 辨别是谁触发，调试用
   */
  setLoading (dom, flag, config) {
    config = config || {}
    dom = dom || document.body
    // indexPaht: config.indexPath,
    const option = {
      text: config.hasOwnProperty('text') ? config.text : '加载中',
      fullscreen: !!config.fullscreen,
      target: dom
    }
    // debugger

    if (flag) {
      dom._loading = this.startLoading(option)
      // debugger
    } else {
      this.endLoading(option)
    }
  },
  /**
   * 开始loading
   * @param {Object} option
   */
  startLoading (option) {
    option = option || {}
    // console.log('startLoading')
    const loading = Loading.service(option)
    return loading
  },
  /**
   * 结束loading
   * @param {Object} option
   */
  endLoading (option) {
    option = option || {}
    option.target = option.target || {}
    const loadingOption = option.target._loading
    // 不能使用 isNull 判断
    if (!loadingOption) return
    setTimeout(() => {
      // console.log('endLoading')
      loadingOption.close()
    }, 300)
  },
  disabledDateFn (pickerOptions, time) {
    // arguments
    let bool = false
    // debugger
    if (pickerOptions.hasOwnProperty('disabledDate')) {
      const dDate = pickerOptions.disabledDate || []
      const curTime = time.getTime()
      const Date0 = new Date(dDate[0] + ' 00:00:00')
      const time0 = Date0.getTime()
      if (dDate.length > 1) {
        const Date1 = new Date(dDate[1] + ' 00:00:00')
        const time1 = Date1.getTime()
        if (curTime < time0 || curTime > time1) {
          bool = true
        }
      } else {
        if (curTime < time0) {
          bool = true
        }
      }
    }
    return bool
  }
}
