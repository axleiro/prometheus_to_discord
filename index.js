
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

// console.log("Start at " + (new Date()));

let rawData = fs.readFileSync(options.input);
let inputData = JSON.parse(rawData);

inputData.forEach(e => {
    //console.log("e is ",e)
    e.Matrixs.forEach(g => {
        //console.log("g is ",g)
        g.forEach(m => {
            //console.log("m is ",m)
            if(typeof(m) === 'string') return
            m.Query = m.Query.replace(new RegExp("HOSTTOKEN", 'g'), e.Host).replace(new RegExp("JOBTOKEN", 'g'), e.Job);
        });
    });
});
// console.log(inputData)

const endDate = new Date();
const startDate = date.addDays(endDate, (-1 * options.days));

let index = 0;
let finalResultToPush = "";


const recursiveFunction = () => {
    if (index < inputData.length) {
        HostService.GetHostWiseMatrix(startDate, endDate, inputData[index], (result) => {
	    //console.log("result is ",result)

            // let finalResultToPush = "";

            finalResultToPush = finalResultToPush + "*Host - " + inputData[index].Host + "*\n";
            finalResultToPush = finalResultToPush + result;
            //  console.log("finalResultToPush is \n",finalResultToPush);

	    // commenting code to stop posting to slack channel 
        // SlackService.PostMessage(finalResultToPush).then(response => {
		//     console.log(response)
        //     }).catch(err => {
		//     console.log(err)
	    // });

            index++;
            recursiveFunction();
        });
    } else {
        // console.log("End at " + (new Date()));
        const url = `https://discordapp.com/api/webhooks/1029687589910880256/haIhnWaFZxgfrDIcKyWGzgcxrSxxjTfHpBGMZfv9GJsCgVD-AXfkloGP-4z73w-p761f`;
        const fetch = require('node-fetch');

        function sendMessage(message) {
        fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"username": "singhritesh750", "content": `New blog post 👉  ${message.title}`})
            });
        }
        sendMessage({title: finalResultToPush})
    }
}

recursiveFunction();
