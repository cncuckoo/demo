const merge = require('webpack-merge')
const parts = require('./webpack.parts')
const path = require('path')
const dotenv = require('dotenv')
// dotenv.config()


const PATHS = {
  app: path.join(__dirname, 'src')
}

const commonConfig = merge([
  parts.loadJavaScript({ include: PATHS.app }),
  parts.setFreeVariable('TO_BE_REPLACED', 'free variable'),
  {
    output: {
      filename: "js/[name].[chunkhash:4].js",
      publicPath: '/'
      // publicPath: '/demo/'
    }
  }
])

const productionConfig = merge([
  parts.clean(),
  // parts.generateSourceMap({ type: 'source-map'}),
  // parts.attachRevision(),
  parts.extractCSS({ include: PATHS.app }),
  {
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /\/node_modules\//,
            name: 'vendor',
            chunks: 'initial'
          }
        }
      },
      runtimeChunk: {
        name: 'manifest'
      }
    }
  }
])

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS({
    include: /src/,
    exclude: /node_modules/
  })
])

module.exports = mode => {
  const pages = [
    parts.page({ 
      title: 'Webpack demo',
      entry: { app: PATHS.app },
      chunks: ['app', 'manifest','vendor']
    }),
    parts.page({ 
      title: 'Another demo', 
      path: 'another',
      entry: { another: path.join(PATHS.app, 'another.js') },
      chunks: ['another', 'manifest','vendor']
    })
  ]
  const config = 
    mode === 'production' ? productionConfig : developmentConfig

  return merge([commonConfig, config, { mode }].concat(pages))
}