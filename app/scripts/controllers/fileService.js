'use strict';

angular.module('jsTestCreatorApp').controller('fileServiceCtrl', ['$scope', 'arrayRandomizer', 'fileLoaderService', 'resultPresenterService', function ($scope, arrayRandomizer, fileLoaderService, resultPresenterService) {

  initData();

  $scope.data.fileChanged = fileLoaderService.getLoadFileFunction(getDataFromFile);

  $scope.data.generate = function () {
    $scope.data.providedAnswers = {};
    if ($scope.data.questions == undefined) {
      alert('Brak danych');
      return;
    }
    removeEmptyQuestions();
    randomizeData();
    getNumberOfQuestionsToGenerate();
    $scope.data.randomQuestions = [];
    generateRandomQuestions();
  };

  $scope.data.getScore = function () {
    var validationResult = {
      good: 0,
      all: 0
    };
    for (var questionIndex = 0; questionIndex < $scope.data.randomQuestions.length; questionIndex++) {
      var correctAnswers = 0;
      for (var answerIndex = 0; answerIndex < $scope.data.randomQuestions[questionIndex].answers.length; answerIndex++) {
        var answer = $scope.data.randomQuestions[questionIndex].answers[answerIndex];
        answer.validationResult = validateAnswer(answer);
        if (answer.validationResult)
          correctAnswers++;
      }
      if ($scope.data.randomQuestions[questionIndex].answers.length == correctAnswers)
        validationResult.good++;
      validationResult.all++;
    }
    resultPresenterService.showResult(validationResult);
  };

  function validateAnswer(answer) {
    return ( (answer.isCorrect == $scope.data.providedAnswers[answer.id]) || ((answer.isCorrect == false) && ($scope.data.providedAnswers[answer.id] == undefined)) );
  }

  document.getElementById('fileinput').addEventListener('change', $scope.data.fileChanged, false);

  function getDataFromFile(data) {
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
            isCorrect: (currentAnswer.substring(0, 1) == "1")
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
        question: "1. Dummy test question?",
        answers: [
          {id: 1, answer: "answer 1", isCorrect: 0},
          {id: 2, answer: "answer 2", isCorrect: 1},
          {id: 3, answer: "answer 3", isCorrect: 0}
        ]
      }
    ];
    $scope.data.providedAnswers = {};
  }

}]);
