'use strict';

angular.module('sweetSuiteApp')
  .controller('ClientCtrl', function ($scope, $rootScope, socket, $http, Modal, _, User, $location, $anchorScroll, Auth) {
    $scope.showTodoExampleImage = false;
    $scope.showTodoExample = false;
    $scope.showModal = true;

    User.get().$promise.then(function(user) {
      var users = [];
      users.push(user);

      $rootScope.$broadcast('setClients', users);
    });

    $scope.toggleTodoExampleImage = function() {
      $scope.showTodoExampleImage = !$scope.showTodoExampleImage;
    };

    $scope.toggleTodoExample = function() {
      $scope.showTodoExample = !$scope.showTodoExample;
    };

    $scope.hideExampleLists = function() {
      $scope.showTodoExampleImage = false;
      $scope.showTodoExample = false;
    };
  });
