'use strict';

describe('Service: fileLoaderService', function () {

  // load the service's module
  beforeEach(module('jsTestCreatorApp'));

  // instantiate service
  var fileLoaderService;
  beforeEach(inject(function (_fileLoaderService_) {
    fileLoaderService = _fileLoaderService_;
  }));

  it('should do something', function () {
    expect(!!fileLoaderService).toBe(true);
  });

});
