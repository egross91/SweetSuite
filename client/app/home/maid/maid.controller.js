'use strict';

angular.module('sweetSuiteApp')
  .controller('MaidCtrl', function ($scope, Auth, $location) {
    console.log("IM THE HOME CONTROLLER");
    console.log($location.path())
  });
