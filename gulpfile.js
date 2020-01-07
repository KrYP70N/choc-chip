const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp')

const Template = require('./controllers/TemplateEngine')

exports.default = Template