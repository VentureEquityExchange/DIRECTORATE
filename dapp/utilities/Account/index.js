import Promise from 'bluebird';
const crypto = Promise.promisifyAll(require('crypto'));
const fs = Promise.promisifyAll(require('fs'));
const jsonfile = Promise.promisifyAll(require('jsonfile'));
const DataStore = (require('path').dirname(require.main.filename)+'/dapp/data/');
const AliasStore = DataStore+'.aliasstore';
const algorithm = 'aes-256-ctr';
const salt = "0d1d4a88c2afd4fa8c0e1e63537ed4ad64918c";

function encryptText(text) {
  return new Promise((resolve, reject) => {
    let cipher = crypto.createCipher(algorithm, salt);
    if(!cipher){reject(cipher);}
    let cryptedText = cipher.update(text, 'utf', 'hex')
    cryptedText += cipher.final('hex');
    resolve(cryptedText);

  });
}

function decryptText(text) {
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

// export function getBalance()
