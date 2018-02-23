const fs = require('fs');
const myFile = process.argv[2];

const rawdata = fs.readFileSync(myFile);
var data = {};

try {
	data = JSON.parse(rawdata);
} catch (e) {
	console.log(e);
}
