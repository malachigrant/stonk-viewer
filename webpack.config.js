const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const isDevServer = process.env.WEBPACK_DEV_SERVER;

module.exports = {
  entry: 'main.js',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            sourceMap: true,
            cacheDirectory: true,
          },
        },
      },

      {
        test: /\.(js)$/,
        exclude: /src/,
        use: {
          loader: 'babel-loader',
          options: {
            sourceMap: false,
            cacheDirectory: true,
          },
        },
      },

      {
        test: /\.(png|gif|cur|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name]__[hash:base64:5].[ext]!',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              optipng: {
                optimizationLevel: 7,
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ],
      },
      {
        test: /\.(woff2|woff|eot|ttf|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:base64:5].[ext]',
          },
        },
      },
    ],
  },
  resolve: {
    roots: [path.resolve(__dirname, 'src')],
    modules: [path.resolve('./src'), 'node_modules'],
  },
  output: {
    path: __dirname + '/server/dist',
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: require('html-webpack-template'),
      appMountId: 'root',
    }),
    new webpack.DefinePlugin({
      SOCKET_URL: isDevServer ? "'http://localhost:3000'" : '',
    }),
  ],
  devServer: {
    contentBase: './server/dist',
    hot: true,
    open: true,
    historyApiFallback: true,
  },
};
