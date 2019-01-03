/*
(c) 2019 kyawmyohtut@lab2020
*/

const fs = require("fs");

exports.get = function() {
  return JSON.parse(fs.readFileSync( "./package.json", "utf-8"));
}
