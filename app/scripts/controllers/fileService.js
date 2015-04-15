'use strict';

angular.module('jsTestCreatorApp').controller('fileServiceCtrl', function ($scope) {
        $scope.data = {};
        $scope.data.number = 10;
        $scope.data.questions = undefined;
        $scope.data.randomQuestions = undefined;
        $scope.data.fileChanged = function(evt) {
        var f = evt.target.files[0];

        if (f) {
          var r = new FileReader();
          r.onload = function(e) {
            var contents = e.target.result;
            $scope.data.questions = contents.split('#');
            debugger;
            $scope.data.generate();
            $scope.$apply();
          };
          r.readAsText(f);
        } else {
          alert("Failed to load file");
        }
      };


      $scope.data.generate = function() {
        debugger;
        if ($scope.data.questions == undefined) {
          alert('Brak danych');
          return;
        }
        $scope.data.questions = shuffle($scope.data.questions);
        $scope.data.randomQuestions = [];
        var tablen = Math.min($scope.data.questions.length, $scope.data.number);
        debugger;
        for (var i=0; i<=tablen; i++) {
          if ($scope.data.questions[i] == '') continue;
          var temp = $scope.data.questions[i].split('\n');
          var problem = {
            question: temp[0],
            answers: []
          };
          for (var a=1; a<temp.length; a++) {
            if (temp[a].trim()!='')
              problem.answers.push(temp[a].substr(1));
          }
          $scope.data.randomQuestions.push(problem);
        }
        debugger;
      }

      function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }

      document.getElementById('fileinput').addEventListener('change', $scope.data.fileChanged, false);
  });
