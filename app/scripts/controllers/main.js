'use strict';

/**
 * @ngdoc function
 * @name jsTestCreatorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jsTestCreatorApp
 */
angular.module('jsTestCreatorApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
