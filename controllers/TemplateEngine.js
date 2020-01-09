const fs = require('fs')
const gulp = require('gulp')
const { dest } = require('gulp')
const rename = require('gulp-rename')
const pug = require('gulp-pug')
const ejs = require('gulp-ejs')
const mustache = require('gulp-mustache')
const underscore = require('gulp-underscore-template')
const host = require('gulp-connect');
const gulpif = require('gulp-if')

const TemplateEngine = async function () {
  fs.readFile('./cc-config.json', 'utf-8', (err, data) => {
    if (err) throw err
    let res = JSON.parse(data)
    let html = res['html']
    let watch = html['watch']
    let validWatch = watch.filter(ext => !(ext.endsWith(html['lang'])))

    // validate rule
    if (validWatch.length > 0) return console.log('watch and lang is not match.\nPlease check at cc-config.json')

    if (!['pug', 'ejs', 'mustache', 'underscore'].includes(html['lang'])) return console.log('Sorry, your makeup lang is not supported right now!')

    return gulp.src(watch)
      .pipe(gulpif(html['lang'] === 'pug', pug()))
      .pipe(gulpif(html['lang'] === 'ejs', ejs({ title: 'gulp-ejs' })))
      .pipe(gulpif(html['lang'] === 'mustache', mustache()))
      .pipe(gulpif(html['lang'] === 'underscore', underscore()))
      .pipe(rename({ extname: '.html' }))
      .pipe(dest(`${res['output']}/${html['dist']}`))
      .pipe(host.reload())
  })
}

module.exports = TemplateEngine