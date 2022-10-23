//build/IP.js
const os = require('os')

module.exports = {
  getIp(){
    let ifaces = os.networkInterfaces()
    let ip = '', result = []
    for(let dev in ifaces) {
      ifaces[dev].forEach(function(details) {
        if(ip === '' && details.family === 'IPv4' && !details.internal) {
          ip = details.address
          return;
        }
      })
    }
    // console.log('ip:',ip)
    return ip || '127.0.0.1'
  }
}