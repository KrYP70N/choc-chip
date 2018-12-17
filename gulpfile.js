const gulp = require("gulp");

// common module
const concat = require("gulp-concat");

// template module
const pug = require("gulp-pug");
const htmlBeautify = require("gulp-html-beautify");

// style module
const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const sourcemaps = require("gulp-sourcemaps");
const styleLint = require("gulp-stylelint");
const uglifycss = require("gulp-uglifycss");
const ccss = require("gulp-critical-css");

// js module
const esLint = require("gulp-eslint");
const jsUgly = require("gulp-uglify");
const babel = require("gulp-babel");

// image module
const imageMin = require("gulp-imagemin");

// test

console.log('test');

/*
  end of module
  start task
*/

// template task
gulp.task("template", () => {
  return gulp.src("./src/templates/*.pug")
    .pipe(pug())
    .pipe(htmlBeautify({
      "indent_size": 2, 
      "indent_char": " ",
      "eol": "\n",
      "indent_level": 0,
      "indent_with_tabs": false
    }))
    .pipe(gulp.dest("./dist"));
});

// style task
gulp.task("styleBundle", () => {
  return gulp.src([
    "./node_modules/bootstrap/dist/css/bootstrap.min.css", 
    "./node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css", 
    "./node_modules/@fortawesome/fontawesome-free/css/all.css",
    "./node_modules/slick-carousel/slick/slick.css",
    "./node_modules/slick-carousel/slick/slick-theme.css"
  ])
  .pipe(concat("bundle.css"))
  .pipe(gulp.dest("./src/assets/css"));
});

gulp.task("styleLint", () => {
  return gulp.src("./src/scss/custom.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({
      // outputStyle: "compressed"
    }).on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(styleLint({
      fix: true,
      reporters: [
        {formatter: "string", console: true},
        {formatter: "json", save: "./logs/report.stylelintrc.json"}
      ]
    }))
    .pipe(gulp.dest("./src/assets/css"));
});

gulp.task("styleCompress", () => {
  return gulp.src([
    "./src/assets/css/bundle.css",
    "./src/assets/css/custom.css" 
  ])
  .pipe(concat("style.min.css"))
  .pipe(uglifycss({
    "maxLineLen": 80,
    "uglyComments": true
  }))
  .pipe(ccss())
  .pipe(gulp.dest("./dist/assets/css"));
});

// js task
gulp.task("jsBundle", () => {
  return gulp.src([
    "./node_modules/jquery/dist/jquery.min.js", 
    "./node_modules/popper.js/dist/umd/popper.min.js", 
    "./node_modules/bootstrap/dist/js/bootstrap.min.js",
    "./node_modules/jquery-lazy/jquery.lazy.min.js",
    "./node_modules/slick-carousel/slick/slick.min.js",
    "./node_modules/paroller.js/dist/jquery.paroller.min.js"
  ])
  .pipe(concat("bundle.js"))
  .pipe(gulp.dest("./src/assets/js"));
});

gulp.task("esLint", () => {
  return gulp.src("./src/assets/js/custom.js")
    .pipe(esLint({fix: true}))
    .pipe(esLint.format())
    .pipe(esLint.failAfterError())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest("./src/assets/js/es/"));
});

gulp.task("jsCompress", () => {
  return gulp.src(["./src/assets/js/bundle.js", "./src/assets/js/es/custom.js"])
    .pipe(concat("core.min.js"))
    .pipe(gulp.dest("./dist/assets/js"))
});

// image task
gulp.task("imageMin", () => {
  return gulp.src("./src/assets/images/**/*")
    .pipe(imageMin([
      imageMin.gifsicle({interlaced: true}),
      imageMin.jpegtran({progressive: true}),
      imageMin.optipng({optimizationLevel: 5}),
      imageMin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('dist/assets/images'));
})

// watch list
gulp.task("watch", () => {
  gulp.watch("./src/templates/*.pug", ["template"]);
  gulp.watch("./src/scss/custom.scss", ["styleLint", "styleCompress"]);
  gulp.watch("./src/assets/js/custom.js", ["esLint", "jsCompress"]);
  gulp.watch("./src/assets/images/**/*", ["imageMin"])
});

// default task
gulp.task("default", ["template", "styleBundle", "styleLint", "styleCompress", "jsBundle", "esLint", "jsCompress"]);