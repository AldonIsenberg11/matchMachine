const merge = require('webpack-merge');
const config = require('./webpack.config.js');
const webpack = require('webpack')

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: 'dist',
    open: false, // This will auto-open the project in default browser, could also add --open to npm script to make this work
    hot: true, // Hot reloading
    overlay: true,
    stats: {
      color: true
    },
    port: 8080,
    host: '0.0.0.0',
    proxy: {
      "/api": "http://localhost:8081"
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
