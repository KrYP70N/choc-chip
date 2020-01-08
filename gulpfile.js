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

// build mode
exports.build = parallel (
    TemplateChip,
    StyleChip,
    JSChip,
    MediaChip,
    PluginChip
)

export.watch = async function () {
    console.log('hi')
}

// exported chip
exports.MediaChip = MediaChip
exports.PluginChip = PluginChip