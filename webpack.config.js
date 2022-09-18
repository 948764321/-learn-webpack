// Node.js的核心模块，专门用来处理文件路径
const path = require("path");

module.exports = {
  // 入口
  // 相对路径和绝对路径都行
  entry: "./src/main.js",
  // 输出
  output: {
    // path: 文件输出目录，必须是绝对路径
    // path.resolve()方法返回一个绝对路径
    // __dirname 当前文件的文件夹绝对路径
    path: path.resolve(__dirname, "dist"),
    // filename: 输出文件名
    filename: "main.js",
  },
  // 加载器
  module: {
    rules: [
      // loader 配置
      {
        test: /\.css$/, // 只检测 .css 文件
        use: [
          // 执行顺序：从右到左（从上到下）
          "style-loader", // 将 js 中的 css 通过创建 style 标签添加到 html 文件中生效
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
      },
    ],
  },
  // 插件
  plugins: [],
  // 模式
  mode: "development", // 开发模式
};
