import * as Ethereum from '../../ethereum/index';
import Promise from 'bluebird';

function getNetworkStatus(){
  return new Promisie((resolve, reject) => {
    Ethereum.syncing().then(syncing => {
      Ethereum.web3.eth.getBlockNumber((error, blockNumber) => {
        if(error){reject(error);}
        resolve({
          syncing : syncing.result
          blockNumber
        })
      })
    }).catch(error => {
      reject(error);
    });
  })
}


export { getNetworkStatus }
