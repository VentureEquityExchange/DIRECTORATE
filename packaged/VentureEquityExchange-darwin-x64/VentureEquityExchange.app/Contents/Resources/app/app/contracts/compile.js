'use strict';

var solc = require('solc');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var contractsFolder = path.dirname(require.main.filename);

function compile(contract){
	return new Promise(function(resolve, reject){
		fs.readFileAsync(contractsFolder+'/'+contract+'/'+contract+'.sol', 'utf8').then(function(source){
			var output = solc.compile(source, 1);
			console.log(output);
			if(output.errors) {reject(output);}
			resolve(output);
		}).catch(function(error){
			reject(error);
		})	
	})
}

function saveCompiled(Contract, compiled){
	return new Promise(function(resolve, reject){
		fs.writeFileAsync(contractsFolder+'/'+Contract+'/'+'abi.json', compiled.contracts[Contract].interface).then(function(data){
			return fs.writeFileAsync(contractsFolder+'/'+Contract+'/'+'bytecode.txt', compiled.contracts[Contract].bytecode);
		}).then(function(){
			resolve({abi : JSON.parse(compiled.contracts[Contract].interface), code : compiled.contracts[Contract].bytecode});
		}).catch(function(error){
			reject(error);
		});
	});
}

function compileAndSave(Contract){
	return new Promise(function(resolve, reject){
		compile(Contract).then(function(compiled){
			return saveCompiled(Contract, compiled);
		}).then(function(compiled){
			resolve(compiled);
		}).catch(function(error){
			reject(error);
		});
	});
}


process.on('message', function(contract){
	compileAndSave(contract).then(function(compiled){
		process.send(compiled);
	}).catch(function(error){
		process.send(error);
	});
});