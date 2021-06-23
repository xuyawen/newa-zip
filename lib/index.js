const fs = require("fs");
const compress = require("./compress");

async function run() {
  const dir = process.cwd();
  const files = fs.readdirSync(dir)
  .filter(file => /.jpg$|.png$/.test(file))
  .map(file => `${dir}\\${file}`);

  for (let i = 0; i < files.length; i++) {
    const spinner = await compress(files[i]);
    spinner.stop();
  }
}

module.exports = run;