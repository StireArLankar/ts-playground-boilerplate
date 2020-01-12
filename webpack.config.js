const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FilemanagerPlugin = require('filemanager-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

var config = {
  entry: {
    index: './src/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new FilemanagerPlugin({
      onStart: {
        delete: [path.resolve(__dirname, 'build')],
      },
    }),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  devServer: {
    open: true,
    watchContentBase: true,
  },
  stats: {
    children: false,

    modules: false,
  },
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map'
    config.optimization = {
      usedExports: true,
    }
  }

  return config
}
