const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "./src"),
  target: "node",
  externals: [nodeExternals()],
  entry: {
    omnibus: "./functions/omnibus.js"
  },
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name].bundle.js",
    library: "library",
    libraryTarget: "commonjs2"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
            plugins: [
              require("babel-plugin-transform-object-rest-spread"),
              require("babel-plugin-transform-runtime")
            ],
            ignore: "/node_modules/"
          }
        }
      }
    ]
  },
  plugins: [new UglifyJsPlugin()]
};
