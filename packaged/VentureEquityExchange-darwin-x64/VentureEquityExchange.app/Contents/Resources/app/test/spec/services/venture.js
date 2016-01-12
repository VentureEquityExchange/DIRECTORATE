'use strict';

describe('Service: Venture', function () {

  // load the service's module
  beforeEach(module('vexTradedeskApp'));

  // instantiate service
  var Venture;
  beforeEach(inject(function (_Venture_) {
    Venture = _Venture_;
  }));

  it('should do something', function () {
    expect(!!Venture).toBe(true);
  });

});
