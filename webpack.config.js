var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");

var PORT = process.env.PORT || 8080;

console.log(PORT)

module.exports = {
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
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      { test: /\.(woff|woff2)$/,
        loader:"url?prefix=font/&limit=5000"
      },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      },
      { test: /\.png$/,
        loader: "url-loader?mimetype=image/png"
      }
    ]
  }
}
