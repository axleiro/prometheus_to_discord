const Config = require('./../config');
const fetch = require('node-fetch');
const queryString = require('query-string');

const GetURIToCall = function (startDate, endDate, query) {
    return queryString.stringifyUrl({
        url: Config.PromothiusAPI,
        query: {
            query: query,
            step: Config.Step,
            start: startDate.toJSON(),
            end: endDate.toJSON()
        }
    });
}

const Average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

const GetFinalValue = function (values, valueToUse) {
    // console.log("valueToUse is", valueToUse)
    if (valueToUse == "First") {
        return parseFloat(values[0][1]);
    }

    if (valueToUse == "Last") {
        return parseFloat(values[(values.length - 1)][1]);
    }

    if (valueToUse == "Min") {
        return Math.min(...values.map(x => parseFloat(x[1])));
    }

    if (valueToUse == "Max") {
        return Math.max(...values.map(x => parseFloat(x[1])));
    }

    if (valueToUse == "Avg") {
        return Average(values.map(x => parseFloat(x[1])));
    }

    return 0;
}

async function GetMatrixFromPromothius(startDate, endDate, query, valueToUse) {
    // console.log("Inside GetMatrixFromPromothius", valueToUse)
    let uriToCall = GetURIToCall(startDate, endDate, query);
    console.log("uriToCall is",uriToCall)
    const response = await fetch(uriToCall, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.56',
        },
        body: null
	})
	const responsedata = await response.json()
	console.log("query", query)
	console.log("json", responsedata)
	console.log("valueToUse", valueToUse)


	// 	.then(function (response) {
    // 	console.log(response)
    // })
    // .then( function( responsedata ) {
	// //console.log("data coming",respos)
	// //console.log("datafuction  coming",respos.json())
	// // console.log("Responsedata is", responsedata.data.result[0])
        if (responsedata.data.result && responsedata.data.result.length > 0 && responsedata.data.result[0].values.length > 0) {
            let valueToReturn = GetFinalValue(responsedata.data.result[0].values, valueToUse);
            // console.log("valueToReturn is", valueToReturn)
            return{ "value": valueToReturn };
        } else {
            return{ "value": 0 };
        }
}

module.exports = {
    GetMatrixFromPromothius: GetMatrixFromPromothius
}
