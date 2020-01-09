const fs = require('fs')
const gulp = require('gulp')
const os = require('os')
const open = require('gulp-open')
const host = require("gulp-connect");

const HostEngine = async function (cb) {
  fs.readFile('./cc-config.json', 'utf-8', (err, data) => {
    if (err) throw err
    let port = JSON.parse(data)['port']
    host.server({
      root: JSON.parse(data)['output'],
      port: port,
      livereload: true
    }, cb);

    // browser
    var browser = os.platform() === 'linux' ? 'google-chrome' : (
    os.platform() === 'darwin' ? 'google chrome' : (
    os.platform() === 'win32' ? 'chrome' : 'firefox'));
    
    // open direct
    gulp.src(__filename)
      .pipe(open({
        uri: `http://localhost:${port}`,
        app: browser
      }))
  })
}

module.exports = HostEngine
