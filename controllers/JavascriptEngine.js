const fs = require('fs')
const gulp = require('gulp')
const { dest } = require('gulp')

const babel = require('gulp-babel')
const coffee = require('gulp-coffee')
const typescript = require('gulp-typescript')

const ScriptEngine = async function () { 
  fs.readFile('./cc-config.json', 'utf-8', (err, data) => {
    if (err) throw err
    let res = JSON.parse(data)
    let js = res['js']
    let watch = js['watch']
    if (js['lang'] === 'babel' && watch.endsWith('.babel')) {
      return gulp.src(watch)
        .pipe(babel({
          presets: ['@babel/env']
        }))
        .pipe(dest(`${res['output']}/${js['dist']}`))
    } else if (js['lang'] === 'coffee' && watch.endsWith('.coffee')) {
      return gulp.src(watch)
        .pipe(coffee({bare: true}))
        .pipe(dest(`${res['output']}/${js['dist']}`))
    } else if (js['lang'] === 'typescript' && watch.endsWith('.ts')) {
      return gulp.src(watch)
        .pipe(typescript({
            noImplicitAny: true
        }))
        .pipe(dest(`${res['output']}/${js['dist']}`));
    } else if (js['lang'] === 'elm' && watch.endsWith('.elm')) {
      return console.log('.eml will be support in sooner time :)')
    } else if (js['lang'] === 'dart' && watch.endsWith('.dart')) {
      return console.log('.dart will be support in sooner time :)')
    } else {
      return console.log('your script format is not supported or watch extension is not correct! \nPlease check your cc-config.json')
    }
  })
}
module.exports = ScriptEngine