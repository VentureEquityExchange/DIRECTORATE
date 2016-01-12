'use strict';

describe('Service: updateDirectorate', function () {

  // load the service's module
  beforeEach(module('vexTradedeskApp'));

  // instantiate service
  var updateDirectorate;
  beforeEach(inject(function (_updateDirectorate_) {
    updateDirectorate = _updateDirectorate_;
  }));

  it('should do something', function () {
    expect(!!updateDirectorate).toBe(true);
  });

});
