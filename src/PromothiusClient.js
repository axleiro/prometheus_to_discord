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



const GetMatrixFromPromothius = async function (startDate, endDate, query, valueToUse, callback) {

    let uriToCall = GetURIToCall(startDate, endDate, query);
    const res = await fetch(uriToCall, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.56',
        },
        body: null,
    });

    const responsedata = await res.json();
    console.log(responsedata)
    if (responsedata.data.result && responsedata.data.result.length > 0 && responsedata.data.result[0].values.length > 0) {
        let valueToReturn = GetFinalValue(responsedata.data.result[0].values, valueToUse);
        callback({ "value": valueToReturn });
    } else {
        callback({ "value": 0 });
    }

}

module.exports = {
    GetMatrixFromPromothius: GetMatrixFromPromothius
}
