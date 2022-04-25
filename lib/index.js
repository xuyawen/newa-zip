const fs = require("fs");
const chalk = require("chalk");
const compress = require("./compress");
const { resolve } = require('path');


function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir);
}

async function run() {
  const dir = process.cwd();
  const files = fs.readdirSync(dir)
  .filter(file => /.jpg$|.png$/.test(file))
  .map(file => pathResolve(file));
  const fileLength = files.length;
  if (!fileLength) {
    console.log(`[${chalk.redBright(dir)}] not found image.`)
  } else {
    for (let i = 0; i < fileLength; i++) {
      const spinner = await compress(files[i]);
      spinner.stop();
    }
  }
}

module.exports = run;