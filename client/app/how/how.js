'use strict';

angular.module('sweetSuiteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('how', {
        url: '/how',
        templateUrl: 'app/how/how.html',
        controller: 'HowCtrl'
      });
    console.log("THIS RUNS");
  });
