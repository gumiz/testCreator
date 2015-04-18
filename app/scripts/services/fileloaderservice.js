'use strict';

angular.module('jsTestCreatorApp')
  .service('fileLoaderService', function () {

      function getLoadFileFunction(onSuccessFunction) {
        return function loadFile(evt) {
          var file = evt.target.files[0];
          if (file) {
            var r = new FileReader();
            r.onload = function (e) {
              onSuccessFunction(e);
            };
            r.readAsText(file);
          } else {
            alert("Failed to load file");
          }
        }
      }

      return {
        getLoadFileFunction: getLoadFileFunction
      }
  });
