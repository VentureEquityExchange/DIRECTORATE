'use strict';

describe('Directive: sync', function () {

  // load the directive's module
  beforeEach(module('vexTradedeskApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sync></sync>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the sync directive');
  }));
});