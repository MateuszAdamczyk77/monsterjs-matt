//Konfiguracja Webpack
var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const sass = require('sass');


module.exports = (env, argv = {}) => {
  const isProduction = argv.mode === 'production';

  return {
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    watch: !isProduction,
    mode: isProduction ? 'production' : 'development',
    entry: {
      main: path.join(__dirname, 'js', 'app.js'),
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].bundle.js'
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 4500,
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env', '@babel/preset-react'
              ],
              "plugins": [
                [
                  "@babel/plugin-proposal-class-properties", {
                    "loose": true
                  }
                ],
                ["prismjs", {
                  "languages": ["javascript", "css", "html"],
                  "plugins": ["line-numbers", "show-language"],
                  "theme": "okaidia",
                  "css": true
                }]
              ]
            }
          }
        },
        {
          test: /\.(png|jpe?g|svg|gif|woff|otf)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  new require('autoprefixer')()
                ]
              }
            },
            // Compiles Sass to CSS
            {
              loader: 'sass-loader',
              options: {
                implementation: sass
              }
            },
          ],
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'index.html'),
        hash: true
      })
    ]
  };
};
