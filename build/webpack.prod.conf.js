'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// webpack插件：filemanager-webpack-plugin，该插件可执行打包，复制，移动，删除文件以及新文件夹在build之前及之后创建。
const FileManagerPlugin = require('filemanager-webpack-plugin')
// const WebpackZipPlugin = require('webpack-zip-plugin')

// 判断是否是生产环境
const isProd = process.env.env_config === 'prod'
console.log('env_config', process.env.env_config);
console.log('isProd', isProd);

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const env = require('../config/' + process.env.env_config + '.env')

// For NamedChunksPlugin
const seen = new Set()
const nameLength = 4

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:8].css'),
      chunkFilename: utils.assetsPath('css/[name].[contenthash:8].css')
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new htmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      // favicon: resolve('favicon.ico'),
      title: '全优绩效云平台',
      templateParameters: {
        BASE_URL: config.build.assetsPublicPath + config.build.assetsSubDirectory,
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
      // default sort mode uses toposort which cannot handle cyclic deps
      // in certain cases, and in webpack 4, chunk order in HTML doesn't
      // matter anyway
    }),
    new ScriptExtHtmlWebpackPlugin({
      //`runtime` must same as runtimeChunk name. default is `runtime`
      inline: /runtime\..*\.js$/
    }),
    // keep chunk.id stable when chunk has no name
    new webpack.NamedChunksPlugin(chunk => {
      if (chunk.name) {
        return chunk.name
      }
      const modules = Array.from(chunk.modulesIterable)
      if (modules.length > 1) {
        const hash = require('hash-sum')
        const joinedHash = hash(modules.map(m => m.id).join('_'))
        let len = nameLength
        while (seen.has(joinedHash.substr(0, len))) len++
        seen.add(joinedHash.substr(0, len))
        return `chunk-${joinedHash.substr(0, len)}`
      } else {
        return modules[0].id
      }
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    // new WebpackZipPlugin({
    //   initialFile: './dist-prod',  //需要打包的文件夹(一般为dist)
    //   endPath: './',  //打包到对应目录（一般为当前目录'./'）
    //   zipName: 'dist-prod.zip' //打包生成的文件名
    // })

  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // 只打包初始时依赖的第三方
        },
        elementUI: {
          name: 'chunk-elementUI', // 单独将 elementUI 拆包
          priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
          test: /[\\/]node_modules[\\/]element-ui[\\/]/
        },
        commons: {
          name: 'chunk-commons',
          test: resolve('src/components'), // 可自定义拓展你的规则
          minChunks: 3, // 最小公用次数
          priority: 30,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: 'single',
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: {
            safari10: true
          },
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
          },
        },
        sourceMap: config.build.productionSourceMap,
        cache: true,
        parallel: true
      }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSAssetsPlugin()
    ]
  }
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + config.build.productionGzipExtensions.join('|') + ')$'
      ),
      threshold: 10240, // 达到10kb的静态文件进行压缩 按字节计算
      minRatio: 0.8, // 只有压缩率比这个值小的资源才会被处理
      deleteOriginalAssets: false // 是否删除压缩的源文件
    })
  )
}

if (config.build.generateAnalyzerReport || config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

  // 直接在浏览器上显示报告 npm run build:prod --report
  if (config.build.bundleAnalyzerReport) {
    webpackConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerPort: 81230,
        generateStatsFile: false
      })
    )
  }

  // 生成分析报告 npm run build:prod --generate_report
  if (config.build.generateAnalyzerReport) {
    webpackConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'bundle-report.html',
        openAnalyzer: false
      })
    )
  }
}

// 正式坏境的打包
if (isProd) {
  webpackConfig.plugins.push(
    new FileManagerPlugin({
      events: {
        onStart: {
          // delete: [buildFileName.replace('./', '/') + '.zip'],
          // delete: ['./dist-prod(pc).zip', './dist-prod(pc)/'],
          // delete: ['/dist-prod(pc).zip', '/dist-prod(pc)'],
        },
        onEnd: {
          // delete: ['/dist-prod(pc).zip', '/dist-prod(pc)'],
          // delete: [buildFileName.replace('./', '/') + '.zip', buildFileName],
          // copy: [
          //   { source: './dist-prod/', destination: buildFileNameYmd },
          // ],
          archive: [
            // { source: buildFileName, destination: buildFileName + '.zip' }, //需要压缩的资源
            { source: './dist', destination: 'dist.zip' }, //需要压缩的资源
          ],
          // delete: [buildFileName],
        }
      }
    })
  )
}

module.exports = webpackConfig
