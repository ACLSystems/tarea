const fs = require('fs');
const myFile = process.argv[2];

const readline = require('readline');

const rl = readline.createInterface({
	input: fs.createReadStream(myFile),
	crlfDelay: Infinity
});

const reQuestion = /^(\d*)\.-\s.*(\w.*$)/;
const reOption = /^(\w)\)\s.*(\w.*$)/;
const reAnswer = /^(\w)\)\s.*(\w.*<==.*$)/;
const subQuest = /[A-Z].*$/g;
const subOption = /[A-Z].*$/g;
const subAnswer = /<==.*$/g;
var indexQ = 0;
//var questionT = '';
var indexO = 0;
var indexA = 0;
//var opcion = '';
var i=0;
var j=0;
var optArray = 'abcdefghijklmnopqrstuvwxyz';
//var questions = new Array();
var question = {};
var options = new Array();
var answer = {};
rl.on('line', (line) => {
	if(line.length > 0) {
		if(reQuestion.test(line)) {
			//console.log(options.length);
			if(options.length > 0) {
				//console.log(options.length);
				question.options = options;
				question.answers = [answer];
				//questions.push(question);
				if(question.answers && question.answers.length > 0){
					console.log(JSON.stringify(question,null,2)+','); // eslint-disable-line
				}
				options = [];
				question = {};
				answer = {};
				indexA = 0;
				j=0;
				i=0;
				//console.log(JSON.stringify(questions));
			}
			indexQ = line.search(subQuest);
			//questionT = line.substr(indexQ);
			//console.log('Index: '+ indexQ +' Pregunta: ' + line);
			//console.log('Pregunta: ' + questionT + ' <-q-');
			question.text = line.substr(indexQ);
			//console.log(JSON.stringify(question));
		} else if (reOption.test(line)) {
			if(reAnswer.test(line)) {
				answer = i;
				indexA = line.search(subAnswer);
			}
			indexO = line.search(subOption);
			if(indexA > 0) {
				options.push({
					name	: optArray.substr(j,1),
					value	: line.substr(indexO,indexA-indexO)
				});
			} else {
				options.push({
					name	: optArray.substr(j,1),
					value	: line.substr(indexO)
				});
			}
			j++;
			i++;
			//console.log(JSON.stringify(options));
			//console.log('Opción: ' + option + ' <-o-');
		}
		//console.log('Num: '+line.length +'\tLine from file: '+line);
	}
}
);
