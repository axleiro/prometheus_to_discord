
const PromothiusClient = require('./PromothiusClient');
const mexp = require('math-expression-evaluator');

const GetHostWiseMatrix = function (startDate, endDate, host, callback) {
    
	let index = 0;
    let returnValue =  "";

    const recursiveFunction = () => {
        if (index < host.Matrixs.length) {
            // for(let i=0; i<host.Matrixs[index].length; i++){
            //       let metrics = host.Matrixs[index][i]
    	    //host.Matrixs[index].forEach(async function(metrics,i) {
		// console.log(metrics)
            PromothiusClient.GetMatrixFromPromothius(startDate, endDate, host.Matrixs[index].Query, host.Matrixs[index].ValueToUse, (result) => {

                let finalValue = result.value;
                if(host.Matrixs[index].Expression != undefined &&  host.Matrixs[index].Expression != "" ){
                    finalValue = mexp.eval(host.Matrixs[index].Expression.replace("X" , finalValue));
                }

                if(host.Matrixs[index].Decimal != 0){
                    finalValue = finalValue.toFixed(host.Matrixs[index].Decimal);
                }

                returnValue = returnValue +  host.Matrixs[index].Name + " - " + finalValue + " " + host.Matrixs[index].Scale + "\n";
                index++;
                recursiveFunction();
            });
        } else {
			callback(returnValue);
    	}
    }
    recursiveFunction();
}

module.exports = {
    GetHostWiseMatrix: GetHostWiseMatrix
}
