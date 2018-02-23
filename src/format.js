const fs = require('fs');
const myFile = process.argv[2];

const rawdata = fs.readFileSync(myFile);
const data = JSON.parse(rawdata);

var orgUnits = new Array();
var orgUnit = {};

data.forEach(function(entry) {
	orgUnit = {};
	orgUnit.org = entry.org;
	orgUnit.name = entry.name;
	orgUnit.longName = entry.longName;
	orgUnit.address = entry.address;
	orgUnit.contactPhone = entry.contactPhone;
	orgUnit.formatted_address = entry.formatted_address;
	orgUnit.geometry = entry.geometry;
	switch (entry.address.state) {
	case 'Aguascalientes':
		orgUnit.parent = 'aguascalientes';
		break;
	case 'Baja California':
		orgUnit.parent = 'bajacalifornia';
		break;
	case 'Baja California Sur':
		orgUnit.parent = 'bajacaliforniasur';
		break;
	case 'Campeche':
		orgUnit.parent = 'campeche';
		break;
	case 'Coahuila':
		orgUnit.parent = 'coahuila';
		break;
	case 'Colima':
		orgUnit.parent = 'colima';
		break;
	case 'Chiapas':
		orgUnit.parent = 'chiapas';
		break;
	case 'Chihuahua':
		orgUnit.parent = 'chihuahua';
		break;
	case 'Ciudad de Mexico':
		orgUnit.parent = 'ciudaddemexico';
		break;
	case 'Durango':
		orgUnit.parent = 'durango';
		break;
	case 'Guanajuato':
		orgUnit.parent = 'guanajuato';
		break;
	case 'Guerrero':
		orgUnit.parent = 'guerrero';
		break;
	case 'Hidalgo':
		orgUnit.parent = 'hidalgo';
		break;
	case 'Jalisco':
		orgUnit.parent = 'jalisco';
		break;
	case 'Estado de Mexico':
		orgUnit.parent = 'mexico';
		break;
	case 'Michoacán':
		orgUnit.parent = 'michoacan';
		break;
	case 'Morelos':
		orgUnit.parent = 'morelos';
		break;
	case 'Nayarit':
		orgUnit.parent = 'nayarit';
		break;
	case 'Nuevo Leon':
		orgUnit.parent = 'nuevoleon';
		break;
	case 'Oaxaca':
		orgUnit.parent = 'oaxaca';
		break;
	case 'Puebla':
		orgUnit.parent = 'puebla';
		break;
	case 'Queretaro':
		orgUnit.parent = 'queretaro';
		break;
	case 'Quintana Roo':
		orgUnit.parent = 'quintanaroo';
		break;
	case 'San Luis Potosi':
		orgUnit.parent = 'sanluispotosi';
		break;
	case 'Sinaloa':
		orgUnit.parent = 'sinaloa';
		break;
	case 'Sonora':
		orgUnit.parent = 'sonora';
		break;
	case 'Tabasco':
		orgUnit.parent = 'tabasco';
		break;
	case 'Tamaulipas':
		orgUnit.parent = 'tamaulipas';
		break;
	case 'Tlaxcala':
		orgUnit.parent = 'tlaxcala';
		break;
	case 'Veracruz':
		orgUnit.parent = 'veracruz';
		break;
	case 'Yucatan':
		orgUnit.parent = 'yucatan';
		break;
	case 'Zacatecas':
		orgUnit.parent = 'zacatecas';
		break;
	default:
		orgUnit.parent = 'conalep';
	}
	orgUnit.type = 'campus',
	orgUnits.push(orgUnit);
});

fs.writeFileSync(myFile + '.out.json', JSON.stringify(orgUnits,null,2), (err) => {
	if(err) {
		console.log(err); // eslint-disable-line
		return;
	}
	console.log('File saved'); // eslint-disable-line
});
