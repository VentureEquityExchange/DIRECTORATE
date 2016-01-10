'use strict';

describe('Service: Contract', function () {

  // load the service's module
  beforeEach(module('vexTradedeskApp'));

  // instantiate service
  var Contract;
  beforeEach(inject(function (_Contract_) {
    Contract = _Contract_;
  }));

  it('should do something', function () {
    expect(!!Contracts).toBe(true);
  });

});
