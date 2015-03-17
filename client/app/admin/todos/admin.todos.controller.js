'use strict';

angular.module('sweetSuiteApp')
  .controller('AdminTodosCtrl', function ($scope, $http, Auth, User, _, $location, $anchorScroll) {
    $scope.clients = User.query(function(users) {
      angular.forEach(users, function(u, i) {
        if (u.role !== 'user') {
          users.splice(i, 1);
        }
      });
    });

    $scope.focusUser = function(name) {
      var aref = 'user' + name;
      if ($location.hash() !== aref) {
        $location.hash(aref);
      } else {
        $anchorScroll();
      }
    };

  });
