'use strict';

angular.module('sweetSuiteApp')
  .controller('ClientCtrl', function ($scope, Auth, $location) {
    console.log("IM THE HOME CONTROLLER");
    console.log($location.path())

    $scope.showTodoList = false;

    $scope.toggleTodoList = function() {
      $scope.showTodoList = !$scope.showTodoList;
    };

    $scope.hideExampleList = function() {
      $scope.showTodoList = false;
    } ;
  });
