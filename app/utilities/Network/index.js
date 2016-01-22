import * as Ethereum from '../../ethereum/index';
import Promise from 'bluebird';

export function getStatus(){
  return new Promise((resolve, reject) => {
    Ethereum.syncing().then(syncing => {

      Ethereum.web3.eth.getBlockNumber((error, blockNumber) => {
        if(error){reject(error);}
        resolve({
          syncing : syncing.result,
          blockNumber : blockNumber
        })
      })

    }).catch(error => {
      reject(error);
    });
  })
}
