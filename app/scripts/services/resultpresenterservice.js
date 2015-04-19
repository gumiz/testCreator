'use strict';

angular.module('jsTestCreatorApp')
  .service('resultPresenterService', function () {

    function showResult(validationResult) {
      alert("Score: " + validationResult.good + " / " + validationResult.all);
    }

    return {
      showResult: showResult
    }
  });
