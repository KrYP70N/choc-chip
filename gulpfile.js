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

exports.default = series (
    TemplateChip,
    StyleChip,
    JSChip,
    MediaChip
)