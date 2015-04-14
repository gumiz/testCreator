'use strict';

/**
 * @ngdoc function
 * @name jsTestCreatorApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jsTestCreatorApp
 */
angular.module('jsTestCreatorApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
