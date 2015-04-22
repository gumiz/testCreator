'use strict';

angular.module('jsTestCreatorApp').controller('fileServiceCtrl', ['$scope', 'arrayRandomizer', 'fileLoaderService', 'scoreCounterService', 'dialogService', function ($scope, arrayRandomizer, fileLoaderService, scoreCounterService, dialogService) {

  initData();

  $scope.data.fileChanged = fileLoaderService.getLoadFileFunction(getDataFromFile);

  $scope.data.generate = function () {
    $scope.data.providedAnswers = {};
    if ($scope.data.questions == undefined) {
      dialogService.showMessage('Brak danych');
      return;
    }
    removeEmptyQuestions();
    randomizeData();
    getNumberOfQuestionsToGenerate();
    $scope.data.randomQuestions = [];
    generateRandomQuestions();
  };

  $scope.data.getScore = function() {
    scoreCounterService.getScore($scope.data.randomQuestions, $scope.data.providedAnswers);
  };

  document.getElementById('fileinput').addEventListener('change', $scope.data.fileChanged, false);

  function getDataFromFile(data) {
    debugger;
    var contents = data.target.result;
    $scope.data.questions = contents.split('#');
    $scope.data.generate();
    $scope.$apply();
  }

    function randomizeData() {
    $scope.data.questions = arrayRandomizer.shuffleArray($scope.data.questions);
  }

  function getNumberOfQuestionsToGenerate() {
    $scope.numberOfQuestionsToGenerate = Math.min($scope.data.questions.length, $scope.data.number);
  }

  function generateRandomQuestions() {
    var answerIdent = 1;
    for (var i = 0; i < $scope.numberOfQuestionsToGenerate; i++) {
      if ($scope.data.questions[i] == '') continue;
      var item = $scope.data.questions[i].split('\n');
      var problem = {
        question: item[0],
        answers: []
      };
      for (var a = 1; a < item.length; a++) {
        var currentAnswer = item[a];
        if (currentAnswer.trim() != '') {
          var answer = {
            id: answerIdent++,
            answer: currentAnswer.substr(1).trim(),
            shouldBeChecked: (currentAnswer.substring(0, 1) == "1")
          };
          problem.answers.push(answer);
        }
      }
      $scope.data.randomQuestions.push(problem);
    }
  }

  function removeEmptyQuestions() {
    $scope.data.questions = _.filter($scope.data.questions, function (item) {
      return item != ""
    });
  }

  function initData() {
    $scope.data = {};
    $scope.data.number = 10;
    $scope.numberOfQuestionsToGenerate = 0;
    $scope.data.questions = undefined;
    $scope.data.randomQuestions = [
      {
        question: "1. Pytanie testowe?",
        answers: [
          {id: 1, answer: "odpowiedź błędna", shouldBeChecked: 0},
          {id: 2, answer: "odpowiedź prawidłowa", shouldBeChecked: 1},
          {id: 3, answer: "odpowiedź błędna", shouldBeChecked: 0}
        ]
      }
    ];
    $scope.data.providedAnswers = {};
  }

}]);
