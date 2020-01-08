const fs = require('fs')
const gulp = require('gulp')
const { dest } = require('gulp')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')
const less = require('gulp-less')
const stylus = require('gulp-stylus')

const StyleEngine = async function () {
  fs.readFile('./cc-config.json', 'utf-8', (err, data) => {
    if (err) throw err
    let res = JSON.parse(data)
    let css = res['css']
    let watch = css['watch']
    if ((css['lang'] === 'scss' && watch.endsWith('.scss')) || css['lang'] === 'sass' && watch.endsWith('.sass')) {
      return gulp.src(watch)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(`${res['output']}/${css['dist']}`));
    } else if (css['lang'] === 'less' && watch.endsWith('.less')) {
      return gulp.src(watch)
        .pipe(less())
        .pipe(dest(`${res['output']}/${css['dist']}`));
    } else if (css['lang'] === 'styl' && watch.endsWith('.styl')) {
      return gulp.src(watch)
        .pipe(stylus())
        .pipe(dest(`${res['output']}/${css['dist']}`));
    } else {
      return console.log('your style lang is not supported or watch extension is not correct! \nPlease check your cc-config.json')
    }
  })
}

module.exports = StyleEngine