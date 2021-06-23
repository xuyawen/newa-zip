const fs = require("fs");
const url = require("url");
const path = require("path");
const https = require("https");
const process = require("process");
const ora = require("ora");
const chalk = require("chalk");
const figures = require("figures");
const { byteSize, roundNum } = require("./utils");
const { generateHeader } = require("./generate");

function upload(file) {
	return new Promise((resolve, reject) => {
		const req = https.request(generateHeader(),
			res => res.on("data", data => {
				const parseData = JSON.parse(data.toString());
				parseData.error ? reject(parseData.message) : resolve(parseData);
			})
		);
		req.write(file, "binary");
		req.on("error", e => reject(e));
		req.end();
	});
}

function download(fileUrl) {
	const opts = new url.URL(fileUrl);
	return new Promise((resolve, reject) => {
		const req = https.request(opts, res => {
			let file = "";
			res.setEncoding("binary");
			res.on("data", chunk => file += chunk);
			res.on("end", () => resolve(file));
		});
		req.on("error", e => reject(e));
		req.end();
	});
}

async function compress(filePath) {
	const spinner = ora("Image is compressing...").start();
	try {
		const oldFile = fs.readFileSync(filePath, "binary");
		const { input, output } = await upload(oldFile);
		const newFile = await download(output.url);
		const oldSize = chalk.redBright(byteSize(input.size));
		const newSize = chalk.greenBright(byteSize(output.size));
		const ratio = chalk.blueBright(roundNum(1 - output.ratio, 2, true));
		const localPath = path.join(process.cwd(), path.basename(filePath));
		fs.writeFileSync(localPath, newFile, "binary");
		console.log(`\n${figures.tick} Compressed [${chalk.yellowBright(filePath)}] completed: Old Size ${oldSize}, New Size ${newSize}, Optimization Ratio ${ratio}`);
	} catch (err) {
		console.log(`\n${figures.cross} Compressed [${chalk.yellowBright(filePath)}] failed: ${chalk.redBright(err)}`)
	} finally {
		return spinner;
	}
}

module.exports = compress;