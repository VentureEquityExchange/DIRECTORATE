'use strict';

/**
 * @ngdoc service
 * @name vexTradedeskApp.ethereum
 * @description
 * # ethereum
 * Factory in the vexTradedeskApp.
 */
angular.module('vexTradedeskApp')
  .factory('ethereum', function () {
    var Promise = require('bluebird');
    var net = require('net');
    var path = require('path');
    var fs = require('fs');
    var Web3 = require('web3');
    var web3 = new Web3();
    var gethSocket;


    // Determine Socket Path

    function socketPath(next){
      if(process.platform == 'darwin'){
        var user = '';
        var appdir = path.dirname(require.main.filename);
        fs.readdir('/Users', function(err, users){
          if(err) console.log(err);
          for (var i = users.length - 1; i >= 0; i--) {
            var user = new RegExp(users[i]);
            if(user.test(appdir)){
              user = users[i];
              next('/Users/'+user+'/Library/Ethereum/geth.ipc');
            }
          };
        });
      };  
    };

    socketPath(function(path){
      gethSocket = path;
      
      // Wait for Ethereum node to load completely.
      setTimeout(function(){
        web3.setProvider(new web3.providers.IpcProvider(gethSocket, net));
      }, 10000)
    });

    // Geth Socket Connection

    var gethIPC = function(payload, next){
      if(payload == null){
        console.log('no payload');
        next('error');
      };

      var client = net.connect({path: gethSocket}, function() {
            client.end(JSON.stringify(payload));
      });

      client.on('connection', function(d){
        console.log(d)
      });

      client.on('data', function(data) {
        var response = "";
        response += data.toString();
        var res = JSON.parse(response);
          next(res)
      });

      client.on('end', function() {
          // console.log('Socket Received payload');
      });

      client.on('error', function(data){
        console.log(data);
      });

      process.on('SIGINT', function() {
          console.log("Caught interrupt signal");

          client.end();
          process.exit();
      });
    };

    // Public API here
    return {
      web3 : web3,
      newAccount : function(password){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'personal_newAccount',params: [password],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });   
        });
      },
      listAccounts : function(){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'personal_listAccounts',params: [],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });  
        })
        
      },
      deleteAccount : function(address, password){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'personal_deleteAccount',params: [address, password],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });   
        });
      },
      unlockAccount : function(address, password){
        return new Promise(function(resolve, reject){
          var duration = 120;
          var payload = {jsonrpc: '2.0',method: 'personal_unlockAccount',params: [address, password, duration],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });   
        });
      },
      status : function(){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'txpool_status',params: [],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });  
        });
      },
      datadir : function(){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'admin_datadir',params: [],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });  
        });
      },
      exportChain : function(file){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'admin_exportChain',params: [file],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });  
        })
      },
      chainSyncStatus : function(){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'admin_chainSyncStatus',params: [],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });  
        });
      },
      verbosity : function(level){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'admin_verbosity',params: [level],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });  
        });
      },
      nodeInfo : function(){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'admin_nodeInfo',params: [],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });   
        });
      },
      addPeer : function(nodeUrl){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'admin_addPeer',params: [nodeUrl],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });  
        });
      },
      peers : function(){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'admin_addPeer',params: [nodeUrl],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });  
        });
      },
      startNatSpec : function(){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'admin_startNatSpec',params: [],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });   
        });
      },
      getContractInfo : function(address){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'admin_getContractInfo',params: [address],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });  
        });
      },
      saveInfo : function(contractInfo, filename){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'admin_getContractInfo',params: [contractInfo, filename],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });   
        });
      },
      register : function(address, contractaddress, contenthash){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'admin_register',params: [address, contractaddress, contenthash],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });   
        });
      },
      registerUrl : function(address, codehash, contenthash){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'admin_register',params: [address, codehash, contenthash],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });  
        });
      },
      minerStart : function(threadCount){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'miner_start',params: [threadCount],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });  
        });
      },
      minerStop : function(threadCount){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'miner_stop',params: [threadCount],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });  
        });
      },
      startAutoDAG : function(){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'miner_startAutoDAG',params: [],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });
        });
      },
      stopAutoDAG : function(){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'miner_stopAutoDAG',params: [],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });  
        });
      },
      makeDAG : function(blockNumber, dir){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'miner_makeDAG',params: [blockNumber, dir],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });  
        });
      },
      hashrate : function(){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'miner_hashrate',params: [],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });  
        });
      },
      setExtra : function(){ // Set Extra Block data to include 'VΞX'
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'miner_setExtra',params: ["VΞNTURΞ ΞQUITY ΞXCHANGΞ"],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });   
        });
      },
      setGasPrice : function(gasPrice){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'miner_setGasPrice',params: [gasPrice],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });  
        });
      },
      setEtherbase : function(account){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'miner_setEtherbase',params: [account],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });  
        });
      },
      setHead : function(blockNumber){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'debug_setHead',params: [blockNumber],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });  
        });
      },
      seedHash : function(blockNumber){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'debug_seedHash',params: [blockNumber],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });
        });
      },
      processBlock : function(blockNumber){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'debug_processBlock',params: [blockNumber],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });
        });
      },
      getBlockRlp : function(blockNumber){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'debug_getBlockRlp',params: [blockNumber],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });
        });
      },
      printBlock : function(blockNumber){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'debug_printBlock',params: [blockNumber],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });
        });
      },
      dumpBlock : function(blockNumber){
        return new Promise(function(resolve, reject){
          var payload = {jsonrpc: '2.0',method: 'debug_dumpBlock',params: [blockNumber],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });  
        });
      },
      metrics : function(raw){
        return new Promise(function(resolve,reject){
          var payload = {jsonrpc: '2.0',method: 'debug_metrics',params: [raw],id: 1};
          gethIPC(payload, function(data){
            if(data.error){reject(data.error);}
            resolve(data.result);
          });
        });
      }
    };
  });
