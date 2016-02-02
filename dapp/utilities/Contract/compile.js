'use strict';

var solc = require('solc');
var Promise = require('bluebird');

function compile(contracts){
	return new Promise(function(resolve, reject){
    var output = solc.compile(contracts, 1);
    if(!output){reject(output)}
    resolve(output);
	})
}

process.on('message', function(contracts){
  compile(contracts).then((compiled) => {
    process.send(compiled);
  }).catch((error) => {
    process.send(error);
  });
});
