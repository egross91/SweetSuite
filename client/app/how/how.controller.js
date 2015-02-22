'use strict';

angular.module('sweetSuiteApp')
  .controller('HowCtrl', function ($scope, Auth, $location) {
    console.log("IM THE HOW CONTROLLER");
    console.log($location.path())
  });
