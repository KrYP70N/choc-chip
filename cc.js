const fs = require('fs');
const color = require("./controller/color");
const info = require("./controller/info");

const cc = require("commander");
const modules = "node_modules";

// let folders = fs.readFileSync("cc.js");
let path = "./gulpfile.js";

fs.stat(path, (err, stats) => {
  console.log(stats);
});

cc
  .version("1.2.1:deom", "-v, --verison")
  .option("-I, --info [type]")
  .option("-F, --folder [type]")
  .option("-f, --file [type]")
  .parse(process.argv)

// req res info
if(typeof(cc.info) == "boolean") {
  console.log(info.get());
} else if(typeof(cc.info) == "string") {
  console.log(info.get()[cc.info]);
}

// req res file
if(typeof(cc.file) == "string") {
  return fs.open(cc.file, (err, fd) => {
    if(err) throw err;
    console.log(color.get.FgMagenta, `| ${cc.file} is exist!`)

    fs.close(fd, (err, fd) => {
      if(err) throw err;
      console.log(color.get.FgCyan, "- check done!");
    })
  })
}

// req res folder
if(cc.folder) {
  let folders = fs.readdirSync("./");
  for(var i=0; i<folders.length; i++) {
    console.log(color.get.FgCyan, folders[i], color.get.FgRed, "size");
  }
}
