'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const { VueLoaderPlugin } = require('vue-loader')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require('webpack')

// 耗时分析插件 speed-measure-webpack-plugin
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// 获取当前日期时间
function __getDateDetailFn () {
  const date = new Date()
  const year = date.getFullYear()
  const month = __dateFormatter((date.getMonth() + 1))
  const day = __dateFormatter(date.getDate())
  const hours = __dateFormatter(date.getHours())
  const minutes = __dateFormatter(date.getMinutes())
  const seconds = __dateFormatter(date.getSeconds())
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
  const ymdhmsw = `'${year}.${month}.${day} ${hours}:${minutes}:${seconds} ${weekArr[week]}'`
  console.log('run time:', ymdhmsw)
  return ymdhmsw
}

function __dateFormatter (str) {
  if (!str) return '00'
  const s = str.toString()
  return s.length > 1 ? s : '0' + s
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

const options = {
  context: path.resolve(__dirname, '../'),
  entry: {
    // app: './src/main.js'
    app: ['babel-polyfill', './src/main.js']
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      '@config': resolve('config'),
      '@assets': path.resolve(__dirname, '../src/assets')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory', // cacheDiretory: 开启缓存，避免babel-loader执行的时，产生一些重复的公共文件，造成代码冗余，减慢编译效率
        query: {
          presets: ['es2015']
        },
        include: [
          resolve('src'),
          resolve('static'),
          resolve('test'),
          resolve('node_modules/webpack-dev-server/client'),
          // resolve('node_modules/_crypto-js@4.1.1@crypto-js/enc-base64url.js'),
          // resolve('node_modules/_element-ui@2.13.2@element-ui/src/locale/format.js'),
          // resolve('node_modules/_element-ui@2.13.2@element-ui/src/locale/index.js'),
          // resolve('node_modules/_element-ui@2.13.2@element-ui/src/utils/date-util.js'),
          // resolve('node_modules/_element-ui@2.13.2@element-ui/src/utils/types.js'),
          // resolve('node_modules/_element-ui@2.13.2@element-ui/src/utils/util.js')
          // resolve('node_modules/_element-ui@2.13.2@element-ui/src/'),
          // resolve('node_modules/_vue-loader@15.3.0@vue-loader/lib/index.js')
          // resolve('node_modules')
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolve('src/icons')],
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      publistDate: __getDateDetailFn()
    })
  ],
  externals: {
    // 'crypto-js': 'CryptoJS'
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

module.exports = smp.wrap(options)
