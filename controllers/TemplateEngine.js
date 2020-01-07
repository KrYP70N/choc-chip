const fs = require('fs')
const gulp = require('gulp')
const { src, dest } = require('gulp')
const rename = require('gulp-rename')
const pug = require('gulp-pug')
const ejs = require('gulp-ejs')
const mustache = require('gulp-mustache')
const underscore = require('gulp-underscore-template')

const TemplateEngine = async function () {
  fs.readFile('./cc-config.json', 'utf-8', (err, data) => {
    if (err) throw err
    let res = JSON.parse(data)['config']
    let html = res['html']
    let watch = html['output']['watch']
    if (html['lang'] === 'pug') {
      return gulp.src(watch)
        .pipe(pug())
        .pipe(dest(data))
        .pipe(dest(`${res['output']}/${html['output']['pipe']}`))
    } else if (html['lang'] === 'ejs') {
      return gulp.src(watch)
        .pipe(ejs({ title: 'gulp-ejs' }))
        .pipe(rename({extname : '.html'}))
        .pipe(dest(`${res['output']}/${html['output']['pipe']}`))
    } else if (html['lang'] === 'mustache') {
      return gulp.src(watch)
        .pipe(mustache())
        .pipe(rename({extname : '.html'}))
        .pipe(dest(`${res['output']}/${html['output']['pipe']}`))
    } else if (html['lang'] === 'underscore') {
      return gulp.src(watch)
        .pipe(underscore())
        .pipe(rename({extname : '.html'}))
        .pipe(dest(`${res['output']}/${html['output']['pipe']}`))
    } else {
      return console.log('your template format is not supported right now!')
    }
  })
}

module.exports = TemplateEngine