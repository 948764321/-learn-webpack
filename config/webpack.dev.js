// Node.js的核心模块，专门用来处理文件路径
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // 入口
  // 相对路径 取决于运行时所在文件，因此 ./ 即可
  entry: "./src/main.js",
  // 输出
  output: {
    // 开发模式无输出
    path: undefined,
    // 入口文件打包输出文件名
    filename: "static/js/main.js",
  },
  // 加载器
  module: {
    rules: [
      // loader 配置
      {
        test: /\.css$/, // 只检测 .css 文件
        use: [
          // 执行顺序：从右到左（从上到下）
          MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            // 小于 10kb 的图片转 base64
            // 优点：减少请求数量
            // 缺点：体积会更大
            maxSize: 10 * 1024,
          },
        },
        generator: {
          // 打包输出文件名
          filename: "static/images/[hash:10][ext][query]",
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/main.css",
    }),
  ],
  devServer: {
    host: "localhost",
    port: "3334",
    open: true,
  },
  // 模式
  mode: "development", // 开发模式
};
