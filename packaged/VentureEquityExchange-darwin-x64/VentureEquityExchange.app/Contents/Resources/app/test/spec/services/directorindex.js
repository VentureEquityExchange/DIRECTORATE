'use strict';

describe('Service: DirectorIndex', function () {

  // load the service's module
  beforeEach(module('vexTradedeskApp'));

  // instantiate service
  var DirectorIndex;
  beforeEach(inject(function (_DirectorIndex_) {
    DirectorIndex = _DirectorIndex_;
  }));

  it('should do something', function () {
    expect(!!DirectorIndex).toBe(true);
  });

});
