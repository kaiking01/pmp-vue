var sitecheck = sitecheck || {}
sitecheck = {
  /* 访问时间*/
  access_time: function() {
    return new Date().getTime()
  },
  /* 设备系统类型*/
  os_type: function() {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      return 'ios'
    } else if (/(Android)/i.test(navigator.userAgent)) {
      return 'android'
    } else if (/(Windows)/i.test(navigator.userAgent)) {
      return 'windows'
    } else if (/(Linux)/i.test(navigator.userAgent)) {
      return 'linux'
    } else if (/(mac)/i.test(navigator.userAgent)) {
      return 'mac'
    } else if (/(X11)/i.test(navigator.userAgent)) {
      return 'unix'
    }
  },
  /* 浏览器类型*/
  browser_info: function() {
    var userAgent = navigator.userAgent
    var isOpera = userAgent.indexOf('Opera') > -1
    var isChrome = userAgent.indexOf('Chrome') > -1
    var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1
    var isFF = userAgent.indexOf('Firefox') > -1
    var isSafari = userAgent.indexOf('Safari') > -1
    if (isIE) {
      return 'ie'
    }
    if (isFF) {
      return 'firefox'
    }
    if (isOpera) {
      return 'opera'
    }
    if (isChrome) {
      return 'chrome'
    }
    if (isSafari) {
      return 'safari'
    }
  },
  /* 设备类型*/
  device_type: function() {
    var sUserAgent = navigator.userAgent.toLowerCase()
    var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad'
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os'
    var bIsMidp = sUserAgent.match(/midp/i) == 'midp'
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4'
    var bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb'
    var bIsAndroid = sUserAgent.match(/android/i) == 'android'
    var bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce'
    var bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile'
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
      return 'phone'
    } else {
      return 'pc'
    }
  },
  /* 是否微信*/
  is_wechat: function() {
    var ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true
    } else {
      return false
    }
  },
  /* 访问当前地址*/
  location_href: function() {
    return window.location.href
  },
  /* 跳转来源*/
  source_desc: function() {
    var r = document.referrer
    if (r.length != 0) {
      r = r.toLowerCase()
      var aSites = new Array('google.', 'baidu.', 'soso.', 'so.', '360.', 'yahoo.', 'youdao.', 'sogou.', 'gougou.')
      var b = false
      for (i in aSites) {
        if (r.indexOf(aSites[i]) > 0) {
          b = true
          return aSites[i]
        }
      }
    } else {
      return 'local'
    }
  },
  /* 获取当授权后的经纬度*/
  get_location: function() {
    var data = {
      mid: site_info.mid,
      code: sitecheck.get_cookie_value('sefve_code').toString(),
      type: site_info.type,
      latitude: '',
      longitude: ''
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        data.latitude = position.coords.latitude
        data.longitude = position.coords.longitude
        sitecheck.ajax_post(data, sitecheck.u_path)
      })
    }
  },
  /* 屏幕分辨率*/
  get_screen: function() {
    var data = {
      height: document.body.clientHeight,
      width: document.body.clientWidth
    }
    return data
  },
  /* 添加cookie*/
  add_cookie: function addCookie(name, value, days, path) {
    var name = escape(name)
    var value = escape(value)
    var expires = new Date()
    expires.setTime(expires.getTime() + days * 3600000 * 24)
    // path=/，表示cookie能在整个网站下使用，path=/temp，表示cookie只能在temp目录下使用
    path = path == '' ? '' : ';path=' + path
    var _expires = (typeof days) === 'string' ? '' : ';expires=' + expires.toUTCString()
    document.cookie = name + '=' + value + _expires + path
  },
  /* 获取cookie*/
  get_cookie_value: function getCookieValue(name) {
    var name = escape(name)
    var allcookies = document.cookie
    name += '='
    var pos = allcookies.indexOf(name)
    if (pos != -1) {
      var start = pos + name.length
      var end = allcookies.indexOf(';', start)
      if (end == -1) end = allcookies.length
      var value = allcookies.substring(start, end)
      return (value)
    } else {
      return ''
    }
  },
  /* 删除cookie*/
  delete_cookie: function(name, path) {
    var name = escape(name)
    var expires = new Date(0)
    path = path == '' ? '' : ';path=' + path
    document.cookie = name + '=' + ';expires=' + expires.toUTCString() + path
  },
  /* 获取唯一编码*/
  get_code: function() {
    return sitecheck.get_date() + Date.parse(new Date()) + Math.round(Math.random() * 1000)
  },
  ajax_post: function(data, url) {
    sitecheck.jsonp({
      url: url,
      key: 'jsoncallback',
      data: data,
      callback: function(ret) {
        console.log(ret)
      }
    })
  },
  jsonp: function(setting) {
    setting.data = setting.data || {}
    setting.key = setting.key || 'callback'
    setting.callback = setting.callback || function() {
    }
    setting.data[setting.key] = '__onGetData__'
    window.__onGetData__ = function(data) {
      setting.callback(data)
    }
    var script = document.createElement('script')
    var query = []
    for (var key in setting.data) {
      query.push(key + '=' + encodeURIComponent(setting.data[key]))
    }
    script.src = setting.url + '?' + query.join('&')
    document.head.appendChild(script)
    document.head.removeChild(script)
  },
  get_date: function() {
    var d = new Date()
    return d.getFullYear() + '' + (d.getMonth() + 1) + '' + d.getDate()
  },
  track: function(er) {
    er.code = site_info.code
    er.mid = site_info.mid
    er.userid = site_info.userid
    er.openid = site_info.openid
    er.time = sitecheck.access_time()
    sitecheck.ajax_post(er, sitecheck.i_path)
  },
  i_path: 'http://192.168.100.198:8088/message/api/track/siteInsert',
  u_path: 'http://192.168.100.198:8088/message/api/track/siteUpdate'
}

window.onload = function() {
  var code = sitecheck.get_cookie_value('sefve_code')
  if (code.length == 0) {
    code = sitecheck.get_code()
    sitecheck.add_cookie('site_code', code, 365, '/')
    site_info.isOld = false
  } else {
    site_info.isOld = true
  }
  site_info.code = code.toString()
  site_info.accessTime = sitecheck.access_time()
  site_info.osType = sitecheck.os_type()
  site_info.browserInfo = sitecheck.browser_info()
  site_info.deviceType = sitecheck.device_type()
  site_info.isWechat = sitecheck.is_wechat()
  site_info.locationHref = sitecheck.location_href()
  site_info.sourceDesc = sitecheck.source_desc()
  site_info.sourceText = document.referrer
  site_info.screenWidth = sitecheck.get_screen().width
  site_info.screenHeight = sitecheck.get_screen().height
  sitecheck.ajax_post(site_info, sitecheck.i_path)
  sitecheck.get_location()
}
window.onbeforeunload = function() {
  var data = {
    mid: site_info.mid,
    type: site_info.type,
    code: sitecheck.get_cookie_value('site_code').toString(),
    lastTime: (new Date()).getTime()
  }
  sitecheck.ajax_post(data, sitecheck.u_path)
}

