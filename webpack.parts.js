const webpack = require("webpack")

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: "errors-only",
    host,
    port,
    open: true,
    overlay: true
  }
})

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.s?css$/,
        include,
        exclude,
        use: ['style-loader', 'css-loader','sass-loader']
      },
      {
        test: /\.less$/,
        include,
        exclude,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.styl$/,
        include,
        exclude,
        use: ['style-loader', 'css-loader', {
          loader: 'stylus-loader',
          options: {
            use: [require('yeticss')()]
          }
        }]
      }
    ]
  }
})

const MiniCssExtractionPlugin = require('mini-css-extract-plugin')


exports.extractCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.s?css$/,
        include,
        exclude,
        use: [MiniCssExtractionPlugin.loader,'css-loader', 'sass-loader']
      },
      {
        test: /\.less$/,
        include,
        exclude,
        use: [MiniCssExtractionPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        test: /\.styl$/,
        include,
        exclude,
        use: [MiniCssExtractionPlugin.loader, 'css-loader', {
          loader: 'stylus-loader',
          options: {
            use: [require('yeticss')()]
          }
        }]
      }
    ]
  },
  plugins: [new MiniCssExtractionPlugin({
    filename: "css/[name].[contenthash:4].css"
  })]
})

exports.loadJavaScript = ({include, exclude} = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        loader: 'babel-loader'
      }
    ]
  }
})

exports.generateSourceMap = ({type}) => ({
  devtool: type
})

const CleanWebpackPlugin = require('clean-webpack-plugin')

exports.clean = path => ({
  plugins: [new CleanWebpackPlugin()],
})


const GitRevisionPlugin = require("git-revision-webpack-plugin")

exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version()
    })
  ]
})

exports.setFreeVariable = (key, value) => {
  const env = {}
  env[key] = JSON.stringify(value)

  return {
    plugins: [new webpack.DefinePlugin(env)]
  }
}

const HtmlWebpackPlugin = require('html-webpack-plugin')

exports.page = ({
  path = '',
  template = require.resolve('html-webpack-plugin/default_index.ejs'),
  title,
  entry,
  chunks
} = {}) => ({
  entry,
  plugins: [
    new HtmlWebpackPlugin({
      filename: `${path && path + '/'}index.html`,
      template,
      chunks,
      title
    })
  ]
})