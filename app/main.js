import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import DirectorateApp from './components/DirectorateApp';
import * as Ethereum from './ethereum/index';
import Promise from 'bluebird';

// Promise.delay(5000).then(() => {
// 	Ethereum.listAccounts().then((accounts) => {
// 		console.log(accounts);
//
// 	}).catch((error) =>{
// 		console.log(error);
// 	})
// })

// Ethereum.socketPath((path) => {
// 	console.log(path);
// })

// Ethereum.test().then((value) => {
// 	console.log(value);
// }).catch((error) => {
// 	console.log(error);
// })



ReactDOM.render(<DirectorateApp view="wallet"/>, document.getElementById('DirectorateApp'));
