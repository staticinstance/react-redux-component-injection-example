var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");

var PORT = process.env.PORT || 8080;


var config = {
  cache: true,
  entry: [
    "webpack-dev-server/client?http://localhost:" + PORT,
    "webpack/hot/only-dev-server",
    "./src/main.jsx"
  ],
  output: {
    path: path.join(__dirname, "build"),
    filename: 'app.js'
  },
  devServer: {
    contentBase: "./build",
    publicPath: "/",
    port: PORT
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "component injection",
      template: "./index.ejs"
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ],
  module: {
    loaders: [
      { include: path.join(__dirname, "src"),
        test: /\.jsx?$/,
        loaders: ["babel"]
      },
      { test: /\.css?$/,
        loader: "style-loader!css-loader"
      }
    ]
  }
}

if (process.env.NODE_ENV === "production") {
  config.entry = ["./src/main.jsx"]; // remove webpack-dev-server-artifacts
}

module.exports = config;

