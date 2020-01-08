const fs = require('fs')
const gulp = require('gulp')
const { dest } = require('gulp')
const rename = require('gulp-rename')

const PluginEngine = async function () {
    return console.log('load plugin')
}

module.exports = PluginEngine