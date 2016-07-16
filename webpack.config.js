'use strict';
var webpack = require('webpack'),
    env = process.env.NODE_ENV,
    config = {
      module: {
        loaders: [
          { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
        ]
      },
      output: {
        library: 'V',
        libraryTarget: 'umd'
      },
      plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(env)
        })
      ]
    };

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  )
}

module.exports = config
