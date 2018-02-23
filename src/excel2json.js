const excel2Json = require('node-excel-to-json');
const googleMaps = require('@google/maps');
const fs = require('fs');
const myFile = process.argv[2];
const sheet = process.argv[3];

var client = googleMaps.createClient({
	key: 'AIzaSyDJ5c6FGPvH3Ldyt81lD_DGguMsG0v1sjE'
});

excel2Json(myFile, {
	'convert_all_sheet': false,
	'return_type': 'Object',
	'sheetName': sheet
}, function(err, output){
	var result = new Array();
	var failed = new Array();
	if(err) {
		console.log(err.message); // eslint-disable-line
	} else {
		output.forEach(function(entry) {
			entry.name = trim(entry.name);
			entry.name = entry.name.padStart(3,'0');
			entry.longName = trim(entry.longName);
			entry.address = {
				line1 : trim(entry.addressline1),
				line2 : trim(entry.addressline2),
				postalCode : String(entry.postalCode),
				city : trim(entry.city),
				state : trim(entry.state),
				country : trim(entry.country)
			};
			delete entry.addressline1;
			delete entry.addressline2;
			delete entry.postalCode;
			delete entry.city;
			delete entry.state;
			delete entry.country;
			if(entry.locality) {
				entry.address.locality = trim(entry.locality);
				delete entry.locality;
			}
			entry.contactPhone = new Array();
			entry.contactPhone.push(trim(entry.contactPhone1));
			delete entry.contactPhone1;
			if(entry.contactPhone2) {
				entry.contactPhone.push(trim(entry.contactPhone2));
				delete entry.contactPhone2;
			}
			//console.log(JSON.stringify(entry, null,2)); // eslint-disable-line

			if(entry.addToFind) {
				geoCodeAddress(entry.addToFind)
					.then((results) => {
						entry.formatted_address =  results.formatted_address;
						entry.geometry =  {
							type: 'Point',
							location : [results.geometry.location.lng,results.geometry.location.lat]
						};
						console.log(JSON.stringify(entry, null,2)); // eslint-disable-line
						//console.log(JSON.stringify(results.geometry.location, null,2));  // eslint-disable-line
					})
					.catch(() => {
						var address = entry.address.line1 + ', ' + entry.address.line2 + ', ' + entry.address.postalCode + ' ' + entry.address.city + ' ' + entry.address.state;
						failed.push({name: entry.name, address: address});
						console.log('Error - ' + entry.name); // eslint-disable-line
						console.log(entry.addToFind); // eslint-disable-line
					});
			} else {
				geoCodeAddress(entry.address.line1 + ', ' + entry.address.line2 + ', ' + entry.address.postalCode + ' ' + entry.address.city + ' ' + entry.address.state)
					.then((results) => {
						entry.formatted_address =  results.formatted_address;
						entry.geometry =  {
							type: 'Point',
							location : [results.geometry.location.lng,results.geometry.location.lat]
						};
						console.log(JSON.stringify(entry, null,2)); // eslint-disable-line
						//console.log(JSON.stringify(results.geometry.location, null,2));  // eslint-disable-line
					})
					.catch(() => {
						var address = entry.address.line1 + ', ' + entry.address.line2 + ', ' + entry.address.postalCode + ' ' + entry.address.city + ' ' + entry.address.state;
						failed.push({name: entry.name, address: address});
						console.log('Error - ' + entry.name); // eslint-disable-line
						console.log(entry.address.line1 + ', ' + entry.address.line2 + ', ' + entry.address.postalCode + ' ' + entry.address.city + ' ' + entry.address.state); // eslint-disable-line
					});
			}

			result.push(entry);
		});

		/*
		// Con callback ------------------------------------------------------------
		client.geocode({
			address: 'R. Coahuayana, Colinas del Lago, 54744 Cuautitlán Izcalli Méx.'
		}, function(err, response) {
			if(err) {
				console.log(err.message); // eslint-disable-line
			} else {
				console.log(JSON.stringify(response.json.results[0].formatted_address, null,2));  // eslint-disable-line
				console.log(JSON.stringify(response.json.results[0].geometry.location, null,2));  // eslint-disable-line
			}
		}
		);
		 // Con PROMISE usando la funcion geoCodeAddress ---------------------------
		geoCodeAddress('R. Coahuayana, Colinas del Lago, 54744 Cuautitlán Izcalli Méx.')
			.then((results) => {
				console.log(JSON.stringify(results.formatted_address, null,2)); // eslint-disable-line
				console.log(JSON.stringify(results.geometry.location, null,2));  // eslint-disable-line
			})
			.catch((status) => {
				console.log('aca estoy'); // eslint-disable-line
				console.log(status); // eslint-disable-line
			});

			*/
		fs.writeFile(myFile + '.json', JSON.stringify(result,null,2), (err) => {
			if(err) {
				console.log(err); // eslint-disable-line
				return;
			}
			console.log('File created'); // eslint-disable-line
		});
		fs.writeFile(myFile + '-error.json', JSON.stringify(failed,null,2), (err) => {
			if(err) {
				console.log(err); // eslint-disable-line
				return;
			}
			console.log('Error file created'); // eslint-disable-line
		});
	}
});


function trim(string) {
	var temp = '';
	temp = string + '';
	return temp.trim();
}

/*
async function wait(ms) { // eslint-disable-line
	await sleep(ms);
}
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve,ms));
}
*/


function geoCodeAddress(address) {
	return new Promise(function(resolve, reject) {
		client.geocode({ 'address': address}, function(results, status) {
			if(status.json.status == 'OK') {
				resolve(status.json.results[0]);
			} else {
				reject(status);
			}
		});
	});
}
