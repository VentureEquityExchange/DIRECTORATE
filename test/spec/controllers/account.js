'use strict';

describe('Controller: AccountCtrl', function () {

  // load the controller's module
  beforeEach(module('vexTradedeskApp'));

  var AccountCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AccountCtrl = $controller('AccountCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AccountCtrl.awesomeThings.length).toBe(3);
  });
});
