var webpack = require('webpack');
var path = require('path');
var extractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var noErrorsPlugin = new webpack.NoErrorsPlugin();
var extractCss = new extractTextPlugin('../css/[name].css', {allChunks: true});

module.exports = [{
  name: 'browser',

  entry: {
    index: './src/client/index.js',
    login: './src/client/login.js',
  },
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-async-to-generator', 'transform-class-properties', 'transform-es2015-modules-commonjs', 'transform-object-rest-spread', 'transform-object-assign']
        }
      },
      {
        test: /\.(scss|css)$/,
        loader: extractTextPlugin.extract(['css-loader', 'postcss-loader', 'sass-loader'])}
    ]
  },

  postcss: [
    autoprefixer({browsers: ['last 2 versions'] }),
    require('postcss-inline-svg'),
    require('cssnano')
  ],
  plugins: [
    extractCss,
    noErrorsPlugin
  ],
  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  }
}];
