
const commandLineArgs = require('command-line-args');
const fs = require('fs');
const date = require('date-and-time');
const HostService = require('./src/HostService');
const SlackService = require('./src/SlackService');

const optionDefinitions = [
    { name: 'input', alias: 'i', type: String, multiple: false },
    { name: 'days', alias: 'd', type: Number, multiple: false }
];

const options = commandLineArgs(optionDefinitions);

console.log("Start at " + (new Date()));

let rawData = fs.readFileSync(options.input);
let inputData = JSON.parse(rawData);

inputData.forEach(e => {
//     	e.Matrixs.forEach(d => {
// 		d.forEach(m => {
//         		m.Query = m.Query.replace(new RegExp("HOSTTOKEN", 'g'), e.Host).replace(new RegExp("JOBTOKEN", 'g'), e.Job);
//     	});
//     });
// });
e.Matrixs.forEach(m => {
    m.Query = m.Query.replace(new RegExp("HOSTTOKEN", 'g'), e.Host).replace(new RegExp("JOBTOKEN", 'g'), e.Job);
});
});

console.log("Data fetched ....");
console.log("Input data is", inputData)
const endDate = new Date();
const startDate = date.addDays(endDate, (-1 * options.days));

let index = 0;


const recursiveFunction = () => {
    if (index < inputData.length) {
	console.log("Index is",index);
        HostService.GetHostWiseMatrix(startDate, endDate, inputData[index], (result) => {
	    console.log("Result is", result);
            let finalResultToPush = "";

            finalResultToPush = finalResultToPush + "*Host - " + inputData[index].Host + "*\n\n";
            finalResultToPush = finalResultToPush + result;
            finalResultToPush = finalResultToPush + "\n";
            console.log(finalResultToPush);
            SlackService.PostMessage(finalResultToPush);
            index++;
            recursiveFunction();
        });
    } else {
        console.log("End at " + (new Date()));
    }
}
recursiveFunction();
