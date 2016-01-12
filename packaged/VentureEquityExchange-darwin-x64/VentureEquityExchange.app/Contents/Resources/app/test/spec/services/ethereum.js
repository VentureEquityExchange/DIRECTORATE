'use strict';

describe('Service: ethereum', function () {

  // load the service's module
  beforeEach(module('vexTradedeskApp'));

  // instantiate service
  var ethereum;
  beforeEach(inject(function (_ethereum_) {
    ethereum = _ethereum_;
  }));

  it('should do something', function () {
    expect(!!ethereum).toBe(true);
  });

});
