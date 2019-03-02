
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  // entry: './src-fail-attempt-1/clientEntry.js',
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
    ]
  },
  devServer: {
    open: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};




// const path = require('path');
//
// const config = {
//   mode: "production",
//   entry: {
//     app: path.resolve(__dirname, './src/src/clientEntry.js')
//   },
//   output: {
//     path: path.resolve(__dirname, './dist'),
//     publicPath: '/',
//     filename: '[name].bundle.js'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.png$/,
//         loader: 'file-loader',
//         exclude: /node_modules/,
//         options: {
//           name: '[hash].[ext]'
//         }
//       },
//       {
//         test: /\.vue$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'vue-loader',
//           options: {
//             css: 'css-loader'
//           }
//         }
//       },
//       {
//         test: /\.m?js$/,
//         exclude: /node_modules/,
//         use: {
//          loader: 'babel-loader',
//          options: {
//            presets: ['@babel/preset-env']
//          }
//         }
//       },
//       {
//         test: /\.coffee$/,
//         exclude: /node_modules/,
//         use: [
//           {
//             loader: 'coffee-loader',
//             options: {
//               transpile: {
//                 presets: ['env']
//               }
//             }
//           }
//         ]
//       }
//     ]
//   }
// };
//
// module.exports = config;
