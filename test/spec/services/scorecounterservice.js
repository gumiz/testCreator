'use strict';

describe('Service: scoreCounterService', function () {

  // load the service's module
  beforeEach(module('jsTestCreatorApp'));

  // instantiate service
  var scoreCounterService;
  beforeEach(inject(function (_scoreCounterService_) {
    scoreCounterService = _scoreCounterService_;
  }));

  it('should do something', function () {
    expect(!!scoreCounterService).toBe(true);
  });

});
