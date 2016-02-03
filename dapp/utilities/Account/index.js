import Promise from 'bluebird';
const crypto = Promise.promisifyAll(require('crypto'));
const fs = Promise.promisifyAll(require('fs'));
const jsonfile = Promise.promisifyAll(require('jsonfile'));
const DataStore = (require('path').dirname(require.main.filename)+'/dapp/data/');
const AliasStore = DataStore+'.aliasstore';
const algorithm = 'aes-256-ctr';
const salt = "0d1d4a88c2afd4fa8c0e1e63537ed4ad64918c";
import { web3, unlockAccount } from '../../ethereum/index';

export function encryptText(text) {
  return new Promise((resolve, reject) => {
    let cipher = crypto.createCipher(algorithm, salt);
    if(!cipher){reject(cipher);}
    let cryptedText = cipher.update(text, 'utf', 'hex')
    cryptedText += cipher.final('hex');
    resolve(cryptedText);

  });
}

export function decryptText(text) {
  return new Promise((resolve, reject) => {
    let decipher = crypto.createDecipher(algorithm, salt);
    if(!decipher){reject(decipher);}
    let decryptedText = decipher.update(text,'hex','utf8')
    decryptedText += decipher.final('utf8');
    resolve(decryptedText);
  });
}

function checkAliasStore() {
  return new Promise((resolve, reject) => {
    fs.readdirAsync(DataStore).then((files) => {
      files.forEach((file) => {
        if(file == '.aliasstore') {
            resolve(true);
        }
      });
      resolve(false);
    }).catch((error) => {
      reject(error);
    });
  })
}

function getAliasStore() {
  return new Promise((resolve, reject) => {
    checkAliasStore().then((exists) => {
      if(!exists){
        resolve([])
      } else {
        return jsonfile.readFileAsync(AliasStore);
      }
    }).then((aliasstore) => {
      resolve(aliasstore);
    }).catch((error) => {
      reject(error);
    })
  })
}

export function decryptAliases() {
  let decryptedAliases = [];
  return new Promise((resolve, reject) => {
    getAliasStore().then((aliases) => {
      if(aliases.length == 0){resolve(aliases);}
      aliases.forEach((alias) => {
        let decipher = crypto.createDecipher(algorithm, salt);
        if(!decipher){reject(decipher);}
        let decryptedText = decipher.update(alias,'hex','utf8')
        decryptedText += decipher.final('utf8');
        decryptedAliases.push(JSON.parse(decryptedText));
      });
      resolve(decryptedAliases);
    }).catch((error) => {
      reject(error);
    })

  })
}

export function setAliasStore(text) {
  let Alias;
  return new Promise((resolve, reject) => {
    encryptText(text).then((alias) => {
      Alias = alias;
      return getAliasStore();
    }).then((aliases) => {
      aliases.push(Alias);
      return jsonfile.writeFileAsync(AliasStore, aliases);
    }).then((data) => {
      resolve(data);
    }).catch((error) => {
      reject(error);
    });
  })
}

export function importAccount(account){
  return new Promise((resolve, reject) => {
    unlockAccount(account.address, account.password).then(unlocked => {
      account.set = true;
      return setAliasStore(JSON.stringify(account));
    }).then(() => {
      console.log('Alias Store Created');
      resolve(account);
    }).catch(error => {
      reject(error);
    });
  });
}

export function getBalance(account){
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(account, (error, balance ) => {
      if(error){reject(error)}
      let Balance = web3.fromWei(balance, 'ether');
      console.log(Balance);
      let bigNumber = ['.'];

      switch(Balance.e){
        case -9:
          resolve(Number('.00000000'+Balance.c[0]+''+Balance.c[1]));
        case -8:
          resolve(Number('.0000000'+Balance.c[0]+''+Balance.c[1]));
        case -7:
          resolve(Number('.000000'+Balance.c[0]+''+Balance.c[1]));
        case -6:
          resolve(Number('.00000'+Balance.c[0]+''+Balance.c[1]));
        case -5:
          resolve(Number('.0000'+Balance.c[0]+''+Balance.c[1]));
        case -4:
          resolve(Number('.000'+Balance.c[0]+''+Balance.c[1]));
        case -3:
          resolve(Number('.00'+Balance.c[0]+''+Balance.c[1]));
        case -2:
          resolve(Number('.0'+Balance.c[0]+''+Balance.c[1]));
        case -1:
          resolve(Number('.'+Balance.c[0]+''+Balance.c[1]));
        case 0:
          resolve(Number(Balance.c[0]));
        default:
          resolve(Number(Balance.c[0]+'.'+`${ Balance.c[1] > 0 ? Balance.c[1] : 0 }` ));
      }
    });
  });
}
