'use strict';

angular.module('jsTestCreatorApp')
  .controller('fileServiceCtrl', function ($scope) {
      $scope.data = {};
      $scope.data.test = 'TestCreator';
      $scope.data.fileChanged = function(evt) {
        var f = evt.target.files[0];

        if (f) {
          var r = new FileReader();
          r.onload = function(e) {
            var contents = e.target.result;
            alert( "Got the file.n"
                +"name: " + f.name + "n"
                +"type: " + f.type + "n"
                +"size: " + f.size + " bytesn"
                + "starts with: " + contents.substr(1, contents.indexOf("n"))
            );
          };
          r.readAsText(f);
        } else {
          alert("Failed to load file");
        }
      };


      document.getElementById('fileinput').addEventListener('change', $scope.data.fileChanged, false);
  });
