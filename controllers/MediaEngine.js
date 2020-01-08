const fs = require('fs')
const gulp = require('gulp')
const { dest } = require('gulp')

const assets = require('gulp-image')

const MediaEngine = async function () {
  fs.readFile('./cc-config.json', 'utf-8', (err, data) => {
    if (err) throw err
    let res = JSON.parse(data)
    let media = res['media']
    let watch = media['watch']
    return gulp.src(watch)
      .pipe(assets())
      .pipe(dest(`${res['output']}/${media['dist']}`));
  })
}

module.exports = MediaEngine