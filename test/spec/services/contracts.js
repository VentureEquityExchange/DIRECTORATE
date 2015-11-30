'use strict';

describe('Service: Contracts', function () {

  // load the service's module
  beforeEach(module('vexTradedeskApp'));

  // instantiate service
  var Contracts;
  beforeEach(inject(function (_Contracts_) {
    Contracts = _Contracts_;
  }));

  it('should do something', function () {
    expect(!!Contracts).toBe(true);
  });

});
