'use strict';

angular.module('jsTestCreatorApp').controller('fileServiceCtrl', ['$scope', 'arrayRandomizer', 'fileLoaderService', function ($scope, arrayRandomizer, fileLoaderService) {

    initData();

    $scope.data.fileChanged = fileLoaderService.getLoadFileFunction(getDataFromFile);
    $scope.data.generate = function () {
        if ($scope.data.questions == undefined) {
            alert('Brak danych');
            return;
        }
        randomizeData();
        getNumberOfQuestionsToGenerate();
        $scope.data.randomQuestions = [];
        generateRandomQuestions();
    };
    $scope.data.validate = function() {
        for (var questionIndex=0; questionIndex<$scope.data.randomQuestions; questionIndex++) {
            for (var answerIndex = 0; answerIndex < $scope.data.randomQuestions[questionIndex]; answerIndex++) {
                debugger;
                var answer = $scope.data.randomQuestions[questionIndex].answers[answerIndex];
                if (answer.isCorrect == $scope.data.providedAnswers[answer.id])
                    $scope.data.validationResult.good++;
                $scope.data.validationResult.all++;
            }
        }
        alert("Score: " + $scope.data.validationResult.good + " / " + $scope.data.validationResult.all);
    };

    document.getElementById('fileinput').addEventListener('change', $scope.data.fileChanged, false);

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
        $scope.data.validationResult = {
            answers: 0,
            good: 0
        };
    }

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
        var id = 1;
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
                        id: id++,
                        answer: currentAnswer.substr(1).trim(),
                        isCorrect: currentAnswer.substring(0, 1)
                    };
                    problem.answers.push(answer);
                }
            }
            $scope.data.randomQuestions.push(problem);
        }
    }

}]);
