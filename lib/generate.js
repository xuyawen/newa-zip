const { generateIP } = require("./utils");
const { TINYJPG_URL, TINYPNG_URL } = require("./constant");

let switchURL = true;

function generateHeader() {
  const hostname = switchURL ? TINYJPG_URL : TINYPNG_URL;
  switchURL = !switchURL;
	return {
		headers: {
			"Cache-Control": "no-cache",
			"Content-Type": "application/x-www-form-urlencoded",
			"Postman-Token": Date.now(),
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
			"X-Forwarded-For": generateIP(),
		},
		hostname,
		method: "POST",
		path: "/web/shrink",
		rejectUnauthorized: false
	};
}

module.exports = {
  generateHeader
}