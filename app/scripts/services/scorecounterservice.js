'use strict';
angular.module('jsTestCreatorApp')
  .service('scoreCounterService', ['resultPresenterService', function (resultPresenterService) {

    var providedAnswers = {};

    function getScore(questions, answers) {
      providedAnswers = answers;
      var validationResult = {
        good: 0,
        all: 0
      };
      for (var questionIndex = 0; questionIndex < questions.length; questionIndex++) {
        var question = questions[questionIndex];
        var correctAnswers = 0;
        for (var answerIndex = 0; answerIndex < question.answers.length; answerIndex++) {
          var answer = question.answers[answerIndex];
          if (validateAnswer(answer))
            correctAnswers++;
        }
        if (question.answers.length == correctAnswers)
          validationResult.good++;
        validationResult.all++;
      }
      resultPresenterService.showResult(validationResult);
    }

    function validateAnswer(answer) {
      debugger;
      var isValid = ( (answer.shouldBeChecked == providedAnswers[answer.id]) || ((answer.shouldBeChecked == false) && (providedAnswers[answer.id] == undefined)) );
      answer.isIncorrect = !isValid;
      return isValid;
    }

    return {
      getScore: getScore
    }

  }]);
