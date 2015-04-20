'use strict';

angular.module('jsTestCreatorApp').service('resultPresenterService', ['dialogService', function (dialogService) {

  function showResult(validationResult) {
      var result = Math.round(validationResult.good/validationResult.all*100);
      dialogService.showMessage("Score: " + validationResult.good + " / " + validationResult.all + '\n\n' + "Percent: " + result + "%");
    }

    return {
      showResult: showResult
    }
  }]);
