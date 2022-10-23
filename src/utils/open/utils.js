/**
 * 工具类方法
 */
export default {
  /**
   * 动态加载资源
   * @param {String} src 资源路径
   * @param {Function} callback 回调函数
   */
  loadScript (src, callback) {
    const script = document.createElement('script')
    const head = document.getElementsByTagName('head')[0]
    script.type = 'text/javascript'
    script.charset = 'UTF-8'
    script.src = src
    // debugger
    if (script.addEventListener) {
      script.addEventListener('load', function () {
        // debugger
        callback()
      }, false)
    } else if (script.attachEvent) {
      script.attachEvent('onreadystatechange', function () {
        const target = window.event.srcElement
        if (target.readyState === 'loaded') {
          // debugger
          callback()
        }
      })
    }
    head.appendChild(script)
  },
  /**
   * 获取html内存大小
   * @param {String} type: 1.localStorage  2.sessionStorage
   */
  getCacheSize (type) {
    let storageName = 'localStorage'
    if (type === 2) {
      storageName = 'sessionStorage'
    }
    var obj = window[storageName]
    if (!obj) {
      console.log('浏览器不支持', storageName)
      return
    }
    // if (storageName === 'localStorage') {
    //   if (!window.localStorage) {
    //     console.log('浏览器不支持localStorage')
    //   } else {
    //     obj = window.localStorage
    //   }
    // } else {
    //   if (!window.sessionStorage) {
    //     console.log('浏览器不支持sessionStorage')
    //   } else {
    //     obj = window.sessionStorage
    //   }
    // }
    if (obj !== '') {
      var size = 0
      for (const item in obj) {
        if (obj.hasOwnProperty(item)) {
          size += obj.getItem(item).length
        }
      }
      console.log(storageName, '当前已用存储：' + (size / 1024).toFixed(2) + 'KB')
    }
  }
}
