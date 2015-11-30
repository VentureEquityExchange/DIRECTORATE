'use strict';

/**
 * @ngdoc service
 * @name vexTradedeskApp.updateDirectorate
 * @description
 * # updateDirectorate
 * Factory in the vexTradedeskApp.
 */
angular.module('vexTradedeskApp')
  .factory('updateDirectorate', function (socketio, Contracts, registrar) {
    // Service logic
    // ...

    socketio.socket.emit('directorate_contracts', null);
    socketio.socket.on('directorate_contracts', function(contracts){
        
        Contracts.save(contracts).then(function(saved){
            console.log('Contracts Retrieved');
            console.log(saved);
        }).catch(function(error){
            if(error.status == 409){
                Contracts.destroy().then(function(){
                    return Contracts.save(contracts);
                }).then(function(saved){
                    console.log('Contracts Retrieved');
                    console.log(saved);
                }).catch(function(error){
                    console.log(error);
                })
            }
        });
    });

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
