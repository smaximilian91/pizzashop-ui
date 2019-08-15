const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const proxyConfig = require(path.resolve(__dirname, 'package.json'))['proxy'];

module.exports = function (webpackEnv) {
  const isEnvProduction = webpackEnv === 'production';
  const isEnvDevelopment = !isEnvProduction;

  const extractCss = new ExtractTextPlugin('styles.css');

  return {
    entry: {
      main: './src/js/main.js',
      main2: './src/js/main2.js'
    },
    output: {
      filename: isEnvProduction ? '[name].[chunkhash:8].js' : isEnvDevelopment && '[name].bundle.js',
      path: isEnvProduction ? path.resolve(__dirname, 'dist') : undefined,
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: extractCss.extract({
            use: 'css-loader',
            fallback: 'style-loader',
          }),
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      ],
    },
    plugins: [
      new UglifyJsPlugin({ sourceMap: true }),
      extractCss,
      new HtmlWebpackPlugin({ filename: 'index.html', template: path.join(__dirname, 'src', 'index.html'), chunks: ['main'] }),
      new HtmlWebpackPlugin({ filename: 'index2.html', template: path.join(__dirname, 'src', 'index2.html'), chunks: ['main2'] }),
      new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['dist'] }),
      new CopyWebpackPlugin([
        { from: 'src/assets', to: 'assets', ignore: ['js/**/*'] }
      ]),
    ],
    devServer: {
      compress: true,
      port: 3000,
      contentBase: path.join(__dirname, 'src'),
      watchContentBase: true,
      hot: true,
      publicPath: '/',
      proxy: proxyConfig,
    },
  };
};
