/*
 * @FilePath: \vue-typescript-admin-template\vue.config.js
 * @Author: maskMan
 * @Date: 2023-04-14 12:46:13
 * @LastEditTime: 2023-04-18 17:55:16
 * @Reference: 引用方
 * @Descripttion: 说明 vue webpack 配置文件
 */

// Vue配置
const path = require('path')
// 设置80端口需要管理员权限执行命令
const devServerPort = 9527 // 开发调试端口
const mockServerPort = 9528 // 模拟数据端口
const name = 'Vue Typescript Admin' // 网页标题名字
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  publicPath: '/', // 输出根目录
  outputDir: 'dist', // 输出文件目录
  filenameHashing: true, // 是否开启文件名哈希
  runtimeCompiler: false, // 开启即时编译模板系统
  lintOnSave: process.env.NODE_ENV === 'development', // 保存时格式化
  productionSourceMap: true, // 文件源码映射
  // css: {
  //   // 需要安装extract-text-webpack-plugin插件
  //   extract: process.env.NODE_ENV === 'development' // 编译独立的css文件 开发环境默认true
  // },
  devServer: {
    host: 'localhost', // 本地地址
    port: devServerPort, // 端口号
    open: true, // 自动打开网址
    hot: false, // 开发时热更新模块
    overlay: {
      // 是否开启网页显示错误/警告
      warnings: false,
      errors: false
    },
    progress: false, // 构建进度条
    proxy: {
      // 开发时代理解决跨域
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:${mockServerPort}/mock-api/v1`, // api地址
        changeOrigin: true, // 是否开启跨域
        ws: true, // websocket通信
        pathRewrite: {
          // 标记头替换/消除
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  pluginOptions: {
    // 插件设置
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        // 设置全局变量通用样式
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  configureWebpack: {
    devtool: 'source-map'
    // plugins: [
    //   new CleanWebpackPlugin() // 设置清除的目录
    // ]
  },
  // 配置Webpack调用链
  chainWebpack(config) {
    // index页面标题
    config.plugin('html').tap((args) => {
      args[0].title = name
      return args
    })
    // 开启首屏预加载提高优化
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])
    // 删除重复的无意义的请求
    config.plugins.delete('prefetch')
    // 开启源码调试映射
    // config.when(process.env.NODE_ENV === 'development', (config) =>
    //   config.devtool('eval-source-map')
    // )
    // 打包资源分块优化
    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // 打包时依赖的第三方
          },
          elementUI: {
            name: 'chunk-elementUI', // 分割elementUI
            priority: 20, // 分割权限
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            // 拆分组件
            name: 'chunk-commons',
            test: path.resolve(__dirname, 'src/components'),
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
