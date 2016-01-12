'use strict';

describe('Service: registration', function () {

  // load the service's module
  beforeEach(module('vexTradedeskApp'));

  // instantiate service
  var registration;
  beforeEach(inject(function (_registration_) {
    registration = _registration_;
  }));

  it('should do something', function () {
    expect(!!registration).toBe(true);
  });

});
