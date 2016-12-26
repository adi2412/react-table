module.exports = {
  entry: {
    basic: "./basic/index.js",
    styling: "./styling/index.js",
    pagination: "./pagination/index.js"
  },
  output: {
    path: __dirname + "/build",
    filename: "[name].js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};