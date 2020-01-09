const fs = require('fs')
const gulp = require('gulp')
const { dest } = require('gulp')

const concat = require('gulp-concat')
const gulpif = require('gulp-if')
const uglycss = require('gulp-uglifycss')
const uglyjs = require('gulp-uglify')
const rename = require('gulp-rename')

const PluginEngine = async function () {
  fs.readFile('./cc-config.json', 'utf-8', (err, data) => {
    if (err) throw err
    let res = JSON.parse(data)
    let plugin = res['plugin']
    let css = []
    let js = []
    plugin["list"].map(file => {
      for (const list in file) {
        if (file.hasOwnProperty(list) && file['name'] !== undefined) {
          list === 'js' ? js.push('./node_modules/' + file['name'] + '/' + file[list]) : null
          list === 'css' ? css.push('./node_modules/' + file['name'] + '/' + file[list]) : null
        } else {
          console.error('your plugin is not found, may be name is undefined\nplease check at cc-config')
        }
      }
    })
    // style bundle
    gulp.src(css)
      .pipe(concat('plugin.css'))
      .pipe(gulpif(plugin['beautify'], dest(`${res['output']}/${plugin['dist']}`)))
      .pipe(gulpif(plugin['minify'], uglycss({
        "maxLineLen": 80,
        "uglyComments": true
      })))
      .pipe(gulpif(plugin['minify'], rename({extname : '.min.css'})))
      .pipe(gulpif(plugin['minify'], dest(`${res['output']}/${plugin['dist']}`)))
      
    // script bundle
    gulp.src(js)
      .pipe(concat('plugin.js'))
      .pipe(gulpif(plugin['beautify'], dest(`${res['output']}/${plugin['dist']}`)))
      .pipe(gulpif(plugin['minify'], uglyjs()))
      .pipe(gulpif(plugin['minify'], rename({extname : '.min.js'})))
      .pipe(gulpif(plugin['minify'], dest(`${res['output']}/${plugin['dist']}`)))

    if(plugin['split mode']) {
      css.map(file => [
        gulp.src(file)
          .pipe(gulpif(plugin['beautify'], dest(`${res['output']}/${plugin['dist']}`)))
          .pipe(gulpif(plugin['minify'], uglycss({
            "maxLineLen": 80,
            "uglyComments": true
          })))
          .pipe(gulpif(plugin['minify'], rename({extname : '.min.css'})))
          .pipe(gulpif(plugin['minify'], dest(`${res['output']}/${plugin['dist']}`)))
      ])
      js.map(file => [
        gulp.src(file)
          .pipe(gulpif(plugin['beautify'], dest(`${res['output']}/${plugin['dist']}`)))
          .pipe(gulpif(plugin['minify'], uglyjs()))
          .pipe(gulpif(plugin['minify'], rename({extname : '.min.js'})))
          .pipe(gulpif(plugin['minify'], dest(`${res['output']}/${plugin['dist']}`)))
      ])
    }

    if(plugin['minify'] === false && plugin['beautify'] === false && plugin['split mode'] === false) {
      return console.log('please enable minify or beautify or split mode!')
    }
  })
}

module.exports = PluginEngine
