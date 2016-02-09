import Promise from 'bluebird';
const fs = Promise.promisifyAll(require('fs'));

const jsonfile = Promise.promisifyAll(require('jsonfile'));
const DataStore = (require('path').dirname(require.main.filename)+'/dapp/data/');
const ContractStore = DataStore+'.contractstore';
const convert = require('binstring');

import { web3, unlockAccount, minerStart, minerStop } from '../../ethereum/index';
import { encryptText, decryptText } from '../Account/index';
import * as Contract from '../Contract/index';
import * as DirectorIndex from '../VEX/DirectorIndex/index';
import async from 'async';

/*

These functions handle the deployment of sections of the DAV...


*/


export function DAVContracts(){
  return new Promise((resolve, reject) => {
    let DAV = new Object();
    let contracts = ['Directorate', 'Bylaws', 'Shareholders', 'Directors', 'Voting'];
    async.forEach(contracts, (contract, cb)  => {

      fs.readFileAsync(__dirname+'/dapp/utilities/DAV/DAV_Contracts/'+contract+'.sol', 'utf8').then((source) => {
        DAV[contract+'.sol'] = source;
        cb();
      }).catch((error) => {
        reject(error);
      });

    }, (error) => {
      if(error){reject(error)}
      resolve({sources : DAV});
    });
  });
}

export function Directorate(Address){
  return new Promise((resolve, reject) => {
    DAVContracts().then((contracts) => {
      return Contract.Compile(contracts);
    }).then((compiled) => {
      let { Directorate } = compiled.contracts;

      let instance = web3.eth.contract(JSON.parse(Directorate.interface)).at(Address);
      resolve(instance);
    }).catch((error) => {
      reject(error);
    });
  });
}

export function COMPILE_DAV(){
  return new Promise((resolve, reject) => {
    DAVContracts().then((contracts) => {
      return Contract.Compile(contracts);
    }).then((compiled) => {
      console.log(compiled);
      resolve(true);
    }).catch((error) => {
      reject(error);
    })
  })
}

// Eventually all of these functions should be consolidated into an single function with a switch;
// A perfect fit for here.

export function Directors(DirectorsAddress){
  return new Promise((resolve, reject) => {
    DAVContracts().then((contracts) => {
      return Contract.Compile(contracts);
    }).then((compiled) => {
      let { Directors } = compiled.contracts;

      let instance = web3.eth.contract(JSON.parse(Directors.interface)).at(DirectorsAddress);
      resolve(instance);
    }).catch((error) => {
      reject(error);
    });
  });
}


export function Shareholders(ShareholdersAddress){
  return new Promise((resolve, reject) => {
    DAVContracts().then((contracts) => {
      return Contract.Compile(contracts);
    }).then((compiled) => {
      let { Shareholders } = compiled.contracts;

      let instance = web3.eth.contract(JSON.parse(Shareholders.interface)).at(ShareholdersAddress);
      resolve(instance);
    }).catch((error) => {
      reject(error);
    });
  })
}


export function Bylaws(BylawsAddress){
  return new Promise((resolve, reject) => {
    DAVContracts().then((contracts) => {
      return Contract.Compile(contracts);
    }).then((compiled) => {
      let { Bylaws } = compiled.contracts;

      let instance = web3.eth.contract(JSON.parse(Bylaws.interface)).at(BylawsAddress);
      resolve(instance);
    }).catch((error) => {
      reject(error);
    });
  })
}

export function Voting(VotingAddress){
  return new Promise((resolve, reject) => {
    DAVContracts().then((contracts) => {
      return Contract.Compile(contracts);
    }).then((compiled) => {
      let { Voting } = compiled.contracts;

      let instance = web3.eth.contract(JSON.parse(Voting.interface)).at(VotingAddress);
      resolve(instance);
    }).catch((error) => {
      reject(error);
    });
  })
}


export function NewDAV(Account, venture){
  return new Promise((resolve, reject) => {
    let nDAV = new Object();

    unlockAccount(Account.address, Account.password).then((unlocked) => {
      console.log(unlocked);
      return DAVContracts();

    }).then((DAV) => {

      return Contract.Compile(DAV);
    }).then((compiled) => {

      let { Directorate } = compiled.contracts;

      nDAV.name = venture.name
      nDAV.abi = Directorate.interface;
      nDAV.directors = venture.directors;

      return DeployDirectorate(Directorate.interface, Directorate.bytecode, Account, venture);
    }).then((deployed) => {
      console.log(deployed);


      nDAV.address = deployed.address;

      return AddDAVToIndex(Account, nDAV);

    }).then((txhash) => {

      resolve({name : venture.name, DAV : nDAV.address});

    }).catch((error) => {
      reject(error);
    });
  });
}

export function AddDAVToIndex(Account, DAV){
  return new Promise((resolve, reject) => {
    DirectorIndex.Instance().then((DI) => {
      DI.AddVenture(DAV.address, {from: Account.address}, (error, txhash) => {
        if(error){reject(error)}
        async.forEach(DAV.directors, (director, cb) => {
          DI.NewDirector(director, DAV.address, {from: Account.address}, (error, Tx) => {
            if(error){reject(error);}
            console.log(Tx);
            cb();
          })
        }, (error) => {
          if(error){reject(error)}
          resolve(txhash);
        });
      });
    });
  });
}

export function GET_DIRECTORS(DirectorsAddress){
  let DirectorsArray = [];
  return new Promise((resolve, reject) => {
    Directors(DirectorsAddress).then((D) => {
      D.GetDirectors.call((error, directors) => {
        console.log(error);
        console.log(directors);
        async.forEach(directors, (director, cb) => {
          D.GetDirector.call(director, (error, d) => {
            if(error){reject(error)}
            let Active;
            { d[3] ? Active = 'Yes' : Active = 'No'}
            DirectorsArray.push({
              address : d[0],
              name : d[1],
              role : convert(d[2],{out:'utf8'}),
              active : Active
            });
            cb();
          });

        }, (error) => {
            if(error){reject(error)}
            resolve(DirectorsArray);
        });
      });
    });
  })
}


export function GetVentures(Account){
  return new Promise((resolve, reject) => {
    console.log('Getting DAVs')
    let DAVs = [];
    DirectorIndex.Instance().then((DI) => {
      console.log(DI);
      DI.GetVentures.call(Account.address, (error, ventures) => {
        console.log(ventures);
        if(error){reject(error)}
        async.forEach(ventures, (venture, cb) => {
          Directorate(venture).then((instance) => {
            let Venture = new Object();
            instance.venture.call((error, v) => {
              console.log(v);
              Venture.name = v[0];
              Venture.DAV = v[1];

            });
            instance.contracts.call((error, c) => {
              console.log(c);
              Venture.contract = {
                Bylaws : c[0],
                Shareholders : c[1],
                Directors : c[2],
                Exchange : c[3],
                Voting : c[4]
              }
              DAVs.push(Venture);
              cb();
            })
          });

        }, () => {
          console.log(DAVs)
          resolve(DAVs);
        });

      });

    }).catch((error) => {
      reject(error);
    });

  });
}

// export function GetVenturesDetails(ventures){
//   let Ventures = [];
//
//   return new Promise((resolve, reject) => {
//     Contract.details('Directorate').then((c) => {
//       // We can use array of ventures addresses to grab venture information;
//
//       async.forEach(ventures, (venture, cb) => {
//         // Here we want to make a call to each venture's directorate contract and pull back venture's details;
//         // venture == address
//         console.log(venture);
//         let Directorate = web3.eth.contract(JSON.parse(c.abi)).at(venture);
//         Directorate.venture.call({from : }(error, v) => {
//
//           // I suspect this will fail because the contract may not send us our struct data object back...
//           // lets find out...
//
//           console.log(error);
//           console.log(v);
//           Ventures.push({name : v[0], address : v[1]});
//           cb();
//         });
//
//       }, (error) => {
//         if(error){reject(error)}
//         resolve(Ventures);
//       });
//
//
//     }).catch((error) => {
//       reject(error);
//     })
//   })
// }

export function AMEND_BYLAWS(Account, newBylawResolution){
  return new Promise((resolve, reject) => {


    unlockAccount(Account.address, Account.password).then((unlocked) => {
      console.log(unlocked);

      return Directorate(newBylawResolution.venture);

    }).then((D) => {
      console.log(D);
      console.log(newBylawResolution);


      let { proposedBy, proposal, EOR, voteItem, proposedValue, currentValue } = newBylawResolution;

      D.callVote(proposal, EOR, voteItem, proposedValue, currentValue, {from : Account.address}, (error, txhash) => {
          if(error){reject(error)}
          console.log(txhash);
          resolve(txhash);
      });

    }).catch((error) => {
      reject(error);
    })
  })
}

export function GET_OPEN_RESOLUTIONS(venture){
  return new Promise((resolve, reject) => {
    Voting(venture.contract.Voting).then((V) => {
      V.GetAllResolutions.call((error, resolutions) => {
        if(error){reject(error)}
        resolve(resolutions);
      });
    });
  });
}

export function GET_SHAREHOLDERS(venture){
  return new Promise((resolve, reject) => {
    let ShareholdersArray = [];
    Shareholders(venture.contract.Shareholders).then((Sh) => {
      Sh.getCurrentShareholders.call((error, shareholders) => {
        async.forEach(shareholders, (shareholder, cb) => {
          Sh.getSharesHeld.call(shareholder, (error, sharesHeld) => {
            console.log(error);

            if(error){reject(error)}

            console.log(sharesHeld);

            ShareholdersArray.push({
              shareholder : shareholder,
              sharesHeld : sharesHeld.c[0]
            });
            cb();

          })
        }, (error) => {
          if(error){reject(error)}
          resolve(ShareholdersArray);
        });
      })
    })
  })
}

export function GET_BYLAWS(venture){
  return new Promise((resolve, reject) => {
    let BylawsObject = new Object();
    Bylaws(venture.contract.Bylaws).then((B) => {
      B.getBylaws.call((error, items) => {
        if(error){reject(error)}
        // let period;

        console.log('BYLAWS');

        async.forEach(items, (item, cb) => {
          B.getValue.call(item, (error, value) => {
            let period;
            let I = convert(item, {out:'utf8'});
            if(I.match(RegExp('resolutionPeriod'))){
              switch(value.c[0]){
                case 1209600:
                  period = "Two Weeks";
                  break;
                default:
                  period = "Two Weeks";
                  break;
              }
              BylawsObject[I] = period;
              cb();
            } else {
              BylawsObject[I] = value.c[0];
              cb();
            }
          });

        }, (error) => {
          if(error){reject(error)}
          console.log(BylawsObject);
          B.DAV.call((error, DAV) => {
            if(error){reject(error)}
            BylawsObject['DAV'] = DAV;
            resolve(BylawsObject);
          });
        });


      });
    });
  });
}


export function DeployDirectorate(abi, code, Account, venture){
  return new Promise((resolve, reject) => {
    // Passing in two arguments
    // 1. Venture name;
    // 2. Venture Directors;

    web3.eth.contract(JSON.parse(abi)).new(venture.name, venture.directors, Account.alias, {from: Account.address, data : code, gas : 3141592},
      (error, deployed) => {
        if(error){reject(error);}
        if(!deployed.address){
          console.log('Waiting for contract transaction '+deployed.transactionHash+' to be mined...');
        } else {
          console.log('Contract mined! Contract Address: '+deployed.address);
          resolve(deployed);
        }
      });
  });
}



// Bylaws
// Shareholders
// Exchange
// Voting
