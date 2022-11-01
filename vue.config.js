/**
 * vue-cli 打包配置文件
 * vue.config.js
 */
const webpack = require('webpack')
const path = require('path')
// gzip压缩
const CompressionPlugin = require('compression-webpack-plugin')
// webpack cdn 插件
// webpack插件：filemanager-webpack-plugin，该插件可执行打包，复制，移动，删除文件以及新文件夹在build之前及之后创建。
const FileManagerPlugin = require('filemanager-webpack-plugin')

// 构建工具函数
const utils = {
  // 处理路径
  resolve (dir) {
    return path.join(__dirname, dir)
  }
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
  return ymdhmsw
}

function __dateFormatter (str) {
  if (!str) return '00'
  const s = str.toString()
  return s.length > 1 ? s : '0' + s
}

// 判断是否是生产环境
const isProd = process.env.NODE_ENV === 'production'

const buildFileName = 'docs'
// if (isProd) {
//   // const date = getBuildDate() // 获取打包日期
//   // const ymdhms = `${date.year}${date.month}${date.day}-${date.hours}.${date.minutes}.${date.seconds}`
//   // buildFileName = `docs-prod/app-${ymdhms}`
//   buildFileName = `docs-prod`
// }
console.log('buildFileName-------', buildFileName)

const config = {
  lintOnSave: !isProd, // 开发坏境启用 eslint检测
  // publicPath: '/docs/', // 资源全局路径前缀 configEnv.publicPath   -> https://kaikingg.gitee.io/docs/assets/css/app.4dcb5dd5.css -> https://kaikingg.gitee.io/pmp-vue-sample/assets/css/app.4dcb5dd5.css
  publicPath: './', // 资源全局路径前缀 configEnv.publicPath
  assetsDir: 'assets', // 静态资源目录(js,css,img,fonts)这些文件都可以写里面
  productionSourceMap: false, // 打包时不生成.map文件
  outputDir: buildFileName, // 将构建好的文件输出到哪里（或者说将编译的文件）
  // webpack-dev-server 相关配置
  devServer: {
    host: '0.0.0.0', // 设置主机地址
    // port: 8088, // 设置默认端口
    disableHostCheck: true // 禁用host验证
  },
  configureWebpack () {
    const mergeConfig = {
      // devtools: true,
      devtool: isProd ? 'node' : 'source-map', // eval
      plugins: [
      ]
    }
    //
    // 为生产环境修改配置...
    // console.log('\n---生产环境---\n')
    // console.log(`1.gzip压缩(需要nginx开启gzip)`)
    mergeConfig.plugins.push(
      new CompressionPlugin({
        // filename: "[path].gz[query]",
        algorithm: 'gzip',
        test: /\.js$|\.css/,
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false
      })
    )

    // 定义正式坏境打包日期
    mergeConfig.plugins.push(
      new webpack.DefinePlugin({
        publistDate: __getDateDetailFn()
      })
    )

    if (isProd) {
      // const date = getBuildDate() // 获取打包日期
      // const ymdhms = `${date.year}${date.month}${date.day}-${date.hours}.${date.minutes}.${date.seconds}`
      const zipFileName = buildFileName + '(app)'
      // zip压缩
      mergeConfig.plugins.push(
        new FileManagerPlugin(
          {
            events: {
              onEnd: {
                delete: ['./' + zipFileName + '.zip'],
                archive: [{
                  source: path.join(__dirname, './' + buildFileName),
                  destination: path.join(__dirname, './' + zipFileName + '.zip')
                }]
              }
            }
          },

        )
      )
    }

    return mergeConfig
  },
  chainWebpack (config) {
    // 移除资源预加载(路由懒加载才能正常使用)
    // config.plugins.delete('preload') // TODO: need test
    // config.plugins.delete('prefetch') // TODO: need test
    // 设置别名
    config.resolve.alias
      .set('@', utils.resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', utils.resolve('src/components'))
      .set('_conf', utils.resolve('config'))
    // 设置 svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(utils.resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(utils.resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // 'text-color': '#111',
            // 'border-color': '#eee',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径
            hack: `true; @import "@/styles/vant-theme.less"; `
          }
        }
      },
      sass: {
        // 配置scss 全局样式文件 支持全局变量
        // prependData: `@import "@/assets/css/common.scss"; `
      }
    }
  }
}
// 打印webpack配置信息
// console.log(JSON.stringify(config))

module.exports = config
