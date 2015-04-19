'use strict';

angular.module('jsTestCreatorApp')
  .service('resultPresenterService', function () {

    function showResult(validationResult) {
      var result = Math.round(validationResult.good/validationResult.all*100);
      alert("Score: " + validationResult.good + " / " + validationResult.all + '\n\n' + "Percent: " + result + "%");
    }

    return {
      showResult: showResult
    }
  });
