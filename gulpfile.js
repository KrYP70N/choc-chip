const fs =  require('fs')
const {
  src,
  dest,
  series,
  parallel,
  watch
} = require('gulp')

const TemplateChip = require('./controllers/TemplateEngine')
const StyleChip = require('./controllers/StyleEngine')
const JSChip = require('./controllers/JavascriptEngine')
const MediaChip = require('./controllers/MediaEngine')
const PluginChip = require('./controllers/PluginEngine')
const HostEngine = require('./controllers/HostEngine')

// runner chip
const RunnerChip = async function () {
  fs.readFile('./cc-config.json', 'utf-8', (err, data) => {
    if (err) throw err
    let config = JSON.parse(data)
    watch(config['html']['watch'], TemplateChip)
    watch(config['css']['watch'], StyleChip)
    watch(config['js']['watch'], JSChip)
    watch(config['media']['watch'], MediaChip)
  })
}

// build mode
exports.build = parallel(
  TemplateChip,
  StyleChip,
  JSChip,
  MediaChip,
  PluginChip
)

// default task
exports.default = parallel (
  HostEngine,
  RunnerChip
)

// exported chip
exports.MediaChip = MediaChip
exports.PluginChip = PluginChip