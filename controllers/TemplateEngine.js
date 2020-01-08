const fs = require('fs')
const gulp = require('gulp')
const { dest } = require('gulp')
const rename = require('gulp-rename')
const pug = require('gulp-pug')
const ejs = require('gulp-ejs')
const mustache = require('gulp-mustache')
const underscore = require('gulp-underscore-template')

const TemplateEngine = async function () {
  fs.readFile('./cc-config.json', 'utf-8', (err, data) => {
    if (err) throw err
    let res = JSON.parse(data)
    let html = res['html']
    let watch = html['watch']
    if (html['lang'] === 'pug' && watch.endsWith('.pug')) {
      return gulp.src(watch)
        .pipe(pug())
        .pipe(dest(`${res['output']}/${html['dist']}`))
    } else if (html['lang'] === 'ejs' && watch.endsWith('.ejs')) {
      return gulp.src(watch)
        .pipe(ejs({ title: 'gulp-ejs' }))
        .pipe(rename({extname : '.html'}))
        .pipe(dest(`${res['output']}/${html['dist']}`))
    } else if (html['lang'] === 'mustache' && watch.endsWith('.mustache')) {
      return gulp.src(watch)
        .pipe(mustache())
        .pipe(rename({extname : '.html'}))
        .pipe(dest(`${res['output']}/${html['dist']}`))
    } else if (html['lang'] === 'underscore' && watch.endsWith('.underscore')) {
      return gulp.src(watch)
        .pipe(underscore())
        .pipe(rename({extname : '.html'}))
        .pipe(dest(`${res['output']}/${html['dist']}`))
    } else {
      return console.log('your template format is not supported or watch extension is not correct! \nPlease check your cc-config.json')
    }
  })
}

module.exports = TemplateEngine