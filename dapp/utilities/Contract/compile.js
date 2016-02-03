'use strict';

var solc = require('solc');

function compile(contracts){
	  var output = solc.compile(contracts, 1);
		process.send(output);
}


process.on('message', function(contracts){
	compile(contracts);
});

process.setMaxListeners(Infinity);
