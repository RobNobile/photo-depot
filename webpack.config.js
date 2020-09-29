const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    port: 8080,
    proxy: {
      '/': 'http://localhost:3000',
    },
    hot: true,
  },
  entry: ['babel-polyfill', './client/src/index.js'],
  module: {
    rules: [{
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },

      },
      {
        test: /.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/src/index.html',
    }),
    new CleanWebpackPlugin(),
    new Dotenv(),
  ]
}
