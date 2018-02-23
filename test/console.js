var infinite = 200000;



for (var i=0; i<infinite; i++) {
	console.log('-');
	wait(500);
	console.log('\b\\');
	wait(500);
	console.log('\b|');
	wait(500);
	console.log('\b/');
	wait(500);
}

async function wait(ms) {
	await sleep(ms);
}
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve,ms));
}
