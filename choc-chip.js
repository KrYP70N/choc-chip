const fs = require("fs");

let dev_info = function() {
  return JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
}

module.exports = {
  dev_info: dev_info
}
