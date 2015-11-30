'use strict';

/**
 * @ngdoc service
 * @name vexTradedeskApp.registrar
 * @description
 * # registrar
 * Factory in the vexTradedeskApp.
 */
angular.module('vexTradedeskApp')
  .factory('registrar', function (socketio, Contracts) {
    // Service logic
    // ...
    socketio.socket.emit('registrar', null);
    socketio.socket.on('registration.sol', function(contract){
        Contracts.db.put({
          _id: contract.name,
          address : contract.address,
          abi : contract.abi,
        }).then(function(saved){
          console.log(saved);
        }).catch(function(error){
          if(error.status == 409){
            Contracts.db.get(contract.name, {include_docs: true, revs: true}).then(function(doc){
              return Contracts.db.put({
                _id: contract.name,
                _rev: doc._rev,
                address : contract.address,
                abi : contract.abi
              })
            }).then(function(saved){
              console.log('Registration contract updated');
              console.log(saved);
            }).catch(function(error){
              console.log(error);
            })
          }
        })
    });  
    

    // Public API here
    return {
      register: function(venture) {
        return $q(function(resolve, reject){

        })
      }
    };
  });
