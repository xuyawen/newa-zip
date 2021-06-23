const fs = require("fs");
const chalk = require("chalk");
const compress = require("./compress");

async function run() {
  const dir = process.cwd();
  const files = fs.readdirSync(dir)
  .filter(file => /.jpg$|.png$/.test(file))
  .map(file => `${dir}\\${file}`);
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