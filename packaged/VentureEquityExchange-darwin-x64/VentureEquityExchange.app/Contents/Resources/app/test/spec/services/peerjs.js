'use strict';

describe('Service: peerjs', function () {

  // load the service's module
  beforeEach(module('vexTradedeskApp'));

  // instantiate service
  var peerjs;
  beforeEach(inject(function (_peerjs_) {
    peerjs = _peerjs_;
  }));

  it('should do something', function () {
    expect(!!peerjs).toBe(true);
  });

});
