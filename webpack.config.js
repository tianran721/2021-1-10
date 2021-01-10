const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 模式: 生产环境
  // mode: 'production',
  // 入口
  entry: {
    app: path.resolve(__dirname, 'src/index.js')
  },
  // 出口(打包生成js)
  output: {
    filename: 'static/js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // 模块加载器
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /node_modules/,//排除
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],//预设包 包含es6，7...转化的包
            plugins:[]
          }
        }
      },
      //css:
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // 多个loader从右到左处理
      },
      //图片
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'static/img/[name].[hash:7].[ext]' // 相对于output.path
            },
          },
        ],
      },
    ]
  },
  // 插件webpack-dev-server
  plugins: [
   new HtmlWebpackPlugin({
     template:'index.html',
     filename:'index.html'//打包到dist文件下
   })
  ],
  devServer:{
    open:true,//浏览器自动打开
    quiet:true,//不生成过多的日志
  },
  //配置source-map调试
  devtool: 'cheap-module-eval-source-map',
}