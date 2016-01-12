'use strict';

describe('Controller: SearchventuresCtrl', function () {

  // load the controller's module
  beforeEach(module('vexTradedeskApp'));

  var SearchventuresCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchventuresCtrl = $controller('SearchventuresCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SearchventuresCtrl.awesomeThings.length).toBe(3);
  });
});
