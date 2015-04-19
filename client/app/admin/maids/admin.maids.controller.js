'use strict';

angular.module('sweetSuiteApp')
  .controller('AdminMaidsCtrl', function ($scope, $http, Auth, User) {
  	
  	$scope.maids = User.query();
    $scope.errors = {};

  });
