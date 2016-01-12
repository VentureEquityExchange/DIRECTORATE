'use strict';

describe('Service: registrar', function () {

  // load the service's module
  beforeEach(module('vexTradedeskApp'));

  // instantiate service
  var registrar;
  beforeEach(inject(function (_registrar_) {
    registrar = _registrar_;
  }));

  it('should do something', function () {
    expect(!!registrar).toBe(true);
  });

});
