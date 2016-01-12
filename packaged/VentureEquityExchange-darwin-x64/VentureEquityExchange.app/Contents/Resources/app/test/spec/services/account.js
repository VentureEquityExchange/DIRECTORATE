'use strict';

describe('Service: Account', function () {

  // load the service's module
  beforeEach(module('vexTradedeskApp'));

  // instantiate service
  var Account;
  beforeEach(inject(function (_Account_) {
    Account = _Account_;
  }));

  it('should do something', function () {
    expect(!!Account).toBe(true);
  });

});
