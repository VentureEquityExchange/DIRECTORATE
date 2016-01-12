'use strict';

describe('Service: NewVenture', function () {

  // load the service's module
  beforeEach(module('vexTradedeskApp'));

  // instantiate service
  var NewVenture;
  beforeEach(inject(function (_NewVenture_) {
    NewVenture = _NewVenture_;
  }));

  it('should do something', function () {
    expect(!!NewVenture).toBe(true);
  });

});
