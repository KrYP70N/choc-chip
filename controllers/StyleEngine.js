const fs = require('fs')
const gulp = require('gulp')
const { dest } = require('gulp')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')
const less = require('gulp-less')
const stylus = require('gulp-stylus')
const host = require('gulp-connect')
const gulpif = require('gulp-if')

const StyleEngine = async function () {
  fs.readFile('./cc-config.json', 'utf-8', (err, data) => {
    if (err) throw err
    let res = JSON.parse(data)
    let css = res['css']
    let watch = css['watch']
    let validWatch = watch.filter(ext => !(ext.endsWith(css['lang'])))

    // validate rule
    if (validWatch.length > 0) return console.log('watch and lang is not match.\nPlease check at cc-config.json')

    if (!['scss', 'sass', 'less', 'styl'].includes(css['lang'])) return console.log('Sorry, your lang is not supported right now!')

    return gulp.src(watch)
      .pipe(gulpif(css['lang'] === 'scss' || css['lang'] === 'sass', sass().on('error', sass.logError)))
      .pipe(gulpif(css['lang'] === 'less', less()))
      .pipe(gulpif(css['lang'] === 'styl', stylus()))
      .pipe(dest(`${res['output']}/${css['dist']}`))
      .pipe(host.reload())
  })
}

module.exports = StyleEngine