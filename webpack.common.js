const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')

const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js',
    dictionary: './src/dictionary.js',
    jsbasic: './src/jsbasic.js',
    adcgame: './src/adcgame.js',
    select: './src/select.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'docs')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']]
              }
            }
          }
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source'
      },
      {
        test: /\.(jpeg|jpg|svg|png|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    }),

    // Chunk select
    new HtmlWebpackPlugin({
      template: './src/select.html',
      filename: './select.html',
      chunks: ['select']
    }),
    new HtmlWebpackPlugin({
      template: './src/select2.html',
      filename: './select2.html',
      chunks: ['select']
    }),
    // Chunk ADC game
    new HtmlWebpackPlugin({
      template: './src/adcgame.html',
      filename: './adcgame.html',
      chunks: ['adcgame']
    }),
    // Chunk JS Basic
    new HtmlWebpackPlugin({
      template: './src/jsbasic.html',
      filename: './jsbasic.html',
      chunks: ['jsbasic']
    }),
    // Chunk Dictionary
    new HtmlWebpackPlugin({
      template: './src/dictionary.html',
      filename: './dictionary.html',
      chunks: ['dictionary']
    }),
    // Index
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: './src/about.html',
      filename: './about.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: './src/html-css.html',
      filename: './html-css.html',
      chunks: ['index']
    }),

    // Section
    new HtmlWebpackPlugin({
      template: './src/spaceships.html',
      filename: './spaceships.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './src/spaceobjects.html',
      filename: './spaceobjects.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './src/simplegrid.html',
      filename: './simplegrid.html',
      chunks: ['index']
    }),

    // Article
    new HtmlWebpackPlugin({
      template: './src/spaceships/buran.html',
      filename: './spaceships/buran.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './src/spaceobjects/moon.html',
      filename: './spaceobjects/moon.html',
      chunks: ['index']
    }),

    // Partials
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/analytics.html'),
        location: 'analytics',
        template_filename: '*',
        priority: 'replace'
      }
    ])
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  }
}
