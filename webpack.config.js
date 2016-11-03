module.exports = {
  entry: "./index.js",
  output: {
    path: __dirname,
    publicPath: '/build/',
    filename: "build/example.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};