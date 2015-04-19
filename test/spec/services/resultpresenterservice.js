'use strict';

describe('Service: resultPresenterService', function () {

  // load the service's module
  beforeEach(module('jsTestCreatorApp'));

  // instantiate service
  var resultPresenterService;
  beforeEach(inject(function (_resultPresenterService_) {
    resultPresenterService = _resultPresenterService_;
  }));

  it('should do something', function () {
    expect(!!resultPresenterService).toBe(true);
  });

});
