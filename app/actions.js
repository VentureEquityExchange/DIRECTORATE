import { store } from './data/store';
import * as Ethereum from '.ethereum/index';

export const getNetworkStatus = () => {
  Ethereum.syncing().then(syncing => {
    Ethereum.web3.eth.getBlockNumber((error, blockNumber) => {
      store.dispatch({
        type:'NETWORK',
        status : {
          blockNumber,
          syncing : syncing.result
        }
      });
    })
  }).catch(error => {
    if(error.code == 'EADDRNOTAVAIL' || 'ENOENT'){
      store.dispatch({
        type:error.code,
        error
      });
    }
  });
}
