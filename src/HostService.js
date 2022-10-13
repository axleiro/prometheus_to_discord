const PromothiusClient = require('./PromothiusClient');
const mexp = require('math-expression-evaluator');
let returnValue = "";

const processObject = async function (startDate, endDate, matrixObject, callback) {
	// console.log("returnValue", returnValue)
	if (typeof (matrixObject) != 'string') {
		// console.log("Matrix object is", matrixObject)
		const result = await PromothiusClient.GetMatrixFromPromothius( startDate, endDate, matrixObject.Query, matrixObject.ValueToUse)
			let finalValue = result.value;
			if( matrixObject.Expression != undefined &&  matrixObject.Expression != "" ) {
				finalValue = mexp.eval( matrixObject.Expression.replace("X" , finalValue) );
			}

			if( matrixObject.Decimal != 0 ) {
				finalValue = finalValue.toFixed( matrixObject.Decimal );
				// console.log( "finalValue is \n", finalValue );
			}

			returnValue += "\n" + matrixObject.Name + " - " + finalValue + " " + matrixObject.Scale;
			// console.log( "returnValue is \n", returnValue );
	} else {
		returnValue = returnValue + "\n```\n" + matrixObject;
	}
}

const processItem = async function( startDate, endDate, item, callback ) {
	await (async function processMatrix() {
		for ( const object of item ) {
			await processObject( startDate, endDate, object, callback );
		}
		// console.log("process Item Done!");
		returnValue = returnValue + "\n```";
	})();
}

const GetHostWiseMatrix = async function (startDate, endDate, host, callback) {
	console.log("Host is", host);
	await (async function processArray( matrixsArray ) {
		for ( const item of matrixsArray ) {
		  await processItem( startDate, endDate, item, callback, returnValue );
		}
		// console.log('process Array Done!');
	})(host.Matrixs);
	// console.log( "returnValue is", returnValue );
    callback(returnValue);
}

module.exports = {
    GetHostWiseMatrix: GetHostWiseMatrix
}
