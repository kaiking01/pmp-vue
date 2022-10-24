'use strict'
// Template version: 1.2.6
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
// const ipFile = require('../build/ip')

let buildFileName = 'docs'
if (process.env.env_config === 'sit') {
  buildFileName = 'docs'
}
console.log('buildFileName-------', buildFileName)
module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // proxyTable: {
    //   // '/api': {
    //   //   target: process.env.FILE_CTX,
    //   //   changeOrigin: true,
    //   // }
    // },
    proxyTable: {
      // 用‘/api’开头，代理所有请求到目标服务器
      '/t': {
        target: 'http://at.alicdn.com', // 接口域名
        changeOrigin: true, // 是否启用跨域
        pathRewrite: { //
          '^/api': ''
        }
      }
    },
    host: '127.0.0.1',
    // host: ipFile.getIp(),
    port: 8080,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false,
    useEslint: false,
    showEslintErrorsInOverlay: false,
    devtool: 'source-map', // eval
    cssSourceMap: false
  },
  build: {
    // index: path.resolve(__dirname, '../dist/index.html'),
    // assetsRoot: path.resolve(__dirname, '../dist'),
    index: path.resolve(__dirname, `../${buildFileName}/index.html`),
    assetsRoot: path.resolve(__dirname, `../${buildFileName}`),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/pmp-vue/',

    /**
     * Source Maps
     */
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: 'none',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build:prod --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report || false,

    // npm run build:prod --generate_report
    generateAnalyzerReport: process.env.npm_config_generate_report || false
  }
}
