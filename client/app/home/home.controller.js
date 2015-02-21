'use strict';

angular.module('sweetSuiteApp')
  .controller('HomeCtrl', function ($scope, Auth, $location, $window) {
    console.log("IM THE HOME CONTROLLER");
    console.log($location.path())
  });
