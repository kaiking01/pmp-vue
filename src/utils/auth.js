// import Cookies from 'js-cookie'
import $common from '@/utils/open/common'

// const TokenKey = 'hx-token'

export function getToken () {
  // return Cookies.get(TokenKey)
  const val = $common.getKeyVal('storeUser', 'token', 'sessionStorage')
  // debugger
  return val
}

export function setToken (data) {
  $common.setKeyVal('storeUser', 'token', data, 'sessionStorage')
  // debugger
  // return Cookies.set(TokenKey, data)
  return data
}

export function removeToken () {
  // return Cookies.remove(TokenKey)
  $common.setKeyVal('storeUser', 'token', '', 'sessionStorage')
  // debugger
  return ''
}
