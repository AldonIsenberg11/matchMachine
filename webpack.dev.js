const merge = require('webpack-merge');
const config = require('./webpack.config.js');

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
    }
  }
});
