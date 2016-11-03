const gulp = require('gulp');
const gutil = require("gulp-util");
const webpack = require("webpack");
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config.js");

gulp.task("default",["lib-dev", "webpack-dev-server"]);

// Production build
gulp.task("build", ["webpack:build", "lib", "lib-styles"]);

gulp.task("webpack:build", function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);

  // run webpack
  webpack(myConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task("lib", function(callback) {
  return gulp.src("src/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});

gulp.task("lib-styles", function() {
  return gulp.src("src/styles/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/styles"));
})

gulp.task("lib-dev", function(){
  gulp.watch('src/*.js',['lib']);
  gulp.watch('src/styles/*.scss',['lib-styles']);
});

// modify some webpack config options
const myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;

gulp.task("webpack-dev-server", function(callback) {
  // modify some webpack config options
  let myConfig = Object.create(webpackConfig);
  myConfig.devtool = "eval";
  myConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    publicPath: "/" + myConfig.output.publicPath,
    stats: {
      colors: true
    }
  }).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
  });
});