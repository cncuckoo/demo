const path = require("path");
const glob = require("glob");
const page = require('./webpack.parts').page
const merge = require('webpack-merge')

const I18nPlugin = require("i18n-webpack-plugin");

const PATHS = {
  build: path.join(__dirname, "i18n", "build"),
  i18nDemo: path.join(__dirname, "i18n", "i18n.js"),
};

const TRANSLATIONS = [{ language: "en" }].concat(
  glob.sync("./i18n/languages/*.json").map(file => ({
    language: path.basename(file, path.extname(file)),
    translation: require(file),
  }))
);

const CleanWebpackPlugin = require('clean-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = TRANSLATIONS.map(({ language, translation }) => (
  {
  mode: "production",
  entry: {
    index: PATHS.i18nDemo,
  },
  output: {
    path: PATHS.build,
    filename: `./dist/[name].${language}.js`,
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new I18nPlugin(translation),
    new HtmlWebpackPlugin({
      filename: `./${language}/index.html`,
      template: require.resolve('html-webpack-plugin/default_index.ejs'),
      title: language,
    })
  ],
}));