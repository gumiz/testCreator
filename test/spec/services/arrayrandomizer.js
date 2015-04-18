'use strict';

describe('Service: arrayRandomizer', function () {

  // load the service's module
  beforeEach(module('jsTestCreatorApp'));

  // instantiate service
  var arrayRandomizer;
  beforeEach(inject(function (_arrayRandomizer_) {
    arrayRandomizer = _arrayRandomizer_;
  }));

  it('should do something', function () {
    expect(!!arrayRandomizer).toBe(true);
  });

});
